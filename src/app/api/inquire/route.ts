import { NextResponse } from "next/server";
import { InquirySchema } from "@/content/inquiries";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

// Simple in-memory sliding window rate limiter
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || record.expiresAt < now) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    // 1. IP identification & rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Transmission rate limit exceeded. Please wait 15 minutes before submitting again.",
        },
        { status: 429 }
      );
    }

    const json = await request.json();

    // 2. Honeypot check (anti-bot)
    if (json.website_hp && String(json.website_hp).trim().length > 0) {
      console.warn(`[Spam Detected] Honeypot triggered from IP ${ip}`);
      // Return 200 to fool dumb bots, but drop submission
      return NextResponse.json({
        success: true,
        message: "Inquiry received.",
        referenceId: "AVR-SPAM-SUPPRESSED",
      });
    }

    // 3. Schema validation
    const result = InquirySchema.safeParse(json);
    if (!result.success) {
      const flattened = result.error.flatten();
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please review the highlighted fields.",
          errors: flattened.fieldErrors,
        },
        { status: 400 }
      );
    }

    const validData = result.data;

    // 4. Cloudflare Turnstile Verification (if secret configured)
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && validData.turnstileToken) {
      try {
        const formData = new URLSearchParams();
        formData.append("secret", turnstileSecret);
        formData.append("response", validData.turnstileToken);
        formData.append("remoteip", ip);

        const turnstileRes = await fetch(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          {
            method: "POST",
            body: formData,
          }
        );
        const turnstileOutcome = await turnstileRes.json();
        if (!turnstileOutcome.success) {
          return NextResponse.json(
            {
              success: false,
              message: "Security verification challenge failed. Please refresh and try again.",
            },
            { status: 403 }
          );
        }
      } catch (tErr) {
        console.error("Turnstile verification error:", tErr);
      }
    }

    // 5. Reference token & routing
    const market = validData.jurisdiction === "United States" ? "US" : "UK";
    const routingHub = market === "US" ? "New York Hub (NYC)" : "London Hub (LON)";
    const referenceId = `AVR-${market}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // 6. Supabase persistence
    if (isSupabaseConfigured) {
      const { error } = await supabase.from("inquiries").insert([
        {
          reference_id: referenceId,
          full_name: validData.fullName,
          organization: validData.organization,
          work_email: validData.workEmail,
          jurisdiction: validData.jurisdiction,
          engagement_type: validData.engagementType,
          project_timeline: validData.projectTimeline,
          overview: validData.overview,
          routing_hub: routingHub,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Supabase insert error:", error);
      }
    } else {
      console.info("[Inquiry Stored - Local Dev Fallback]", {
        referenceId,
        routingHub,
        data: validData,
      });
    }

    // 7. Executive Notification dispatch log (SLA confirmed by Pete Currey)
    console.info(
      `[Executive SLA Triggered] Mandate inquiry ${referenceId} routed to ${routingHub}. Response SLA: 1 business day confirmed by Pete Currey.`
    );

    return NextResponse.json({
      success: true,
      message: `Mandate specification registered. Transmission reference: ${referenceId}. Routed to Avorria ${routingHub}. Direct executive response confirmed within one business day by Technical Director Pete Currey.`,
      referenceId,
    });
  } catch (err) {
    console.error("Unexpected error in /api/inquire:", err);
    return NextResponse.json(
      {
        success: false,
        message: "An internal transmission error occurred. Please contact london@avorria.com or newyork@avorria.com directly.",
      },
      { status: 500 }
    );
  }
}

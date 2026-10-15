import { NextResponse } from "next/server";
import { AuditRequestSchema } from "@/content/audits";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

// In-memory sliding window rate limiter
const auditRateLimitMap = new Map<string, { count: number; expiresAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_AUDITS_PER_WINDOW = 5;

function checkAuditRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = auditRateLimitMap.get(ip);

  if (!record || record.expiresAt < now) {
    auditRateLimitMap.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_AUDITS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    if (!checkAuditRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Audit request rate limit reached. Please wait 15 minutes before submitting another audit request.",
        },
        { status: 429 }
      );
    }

    const json = await request.json();

    // Honeypot check
    if (json.website_hp && String(json.website_hp).trim().length > 0) {
      console.warn(`[Spam Suppressed] Audit honeypot triggered from IP ${ip}`);
      return NextResponse.json({
        success: true,
        message: "Audit request received.",
        referenceId: "AVR-AUDIT-SUPPRESSED",
      });
    }

    // Schema validation
    const result = AuditRequestSchema.safeParse(json);
    if (!result.success) {
      const flattened = result.error.flatten();
      return NextResponse.json(
        {
          success: false,
          message: "Please correct the highlighted fields.",
          errors: flattened.fieldErrors,
        },
        { status: 400 }
      );
    }

    const validData = result.data;
    const market = validData.jurisdiction === "United States" ? "US" : "UK";
    const routingHub = market === "US" ? "New York Hub (NYC)" : "London Hub (LON)";
    const referenceId = `AVR-AUDIT-${market}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Supabase persistence
    if (isSupabaseConfigured) {
      const { error } = await supabase.from("audits").insert([
        {
          reference_id: referenceId,
          full_name: validData.fullName,
          organization: validData.organization,
          work_email: validData.workEmail,
          target_url: validData.targetUrl,
          current_stack: validData.currentStack,
          primary_focus: validData.primaryFocus,
          notes: validData.notes,
          jurisdiction: validData.jurisdiction,
          routing_hub: routingHub,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Supabase audit insert error:", error);
      }
    } else {
      console.info("[Site Audit Request Stored - Local Dev Fallback]", {
        referenceId,
        routingHub,
        data: validData,
      });
    }

    // Email dispatch simulation / notification log
    console.info(
      `[Audit Dispatch] Platform audit scheduled for ${validData.targetUrl} (Ref: ${referenceId}). Assigned to ${routingHub}. SLA: 48 business hours.`
    );

    return NextResponse.json({
      success: true,
      message: `Architectural audit queued for ${validData.targetUrl}. Transmission reference: ${referenceId}. Baseline crawl scheduled within 48 business hours.`,
      referenceId,
    });
  } catch (err) {
    console.error("Unexpected error in /api/audit:", err);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred. Please contact audits@avorria.com directly.",
      },
      { status: 500 }
    );
  }
}

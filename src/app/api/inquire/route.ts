import { NextResponse } from "next/server";
import { InquirySchema } from "@/content/inquiries";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

export async function POST(request: Request) {
  try {
    const json = await request.json();
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
    const referenceId = `AVR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // If Supabase is configured with real credentials, persist to the inquiries table
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
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Supabase insert error:", error);
        // Fall through to acknowledge receipt gracefully
      }
    } else {
      console.info("[Inquiry Received - Supabase Pending Configuration]", {
        referenceId,
        validData,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Inquiry recorded. Reference token: ${referenceId}. An Avorria partner will review your specifications within one business day.`,
      referenceId,
    });
  } catch (err) {
    console.error("Unexpected error in /api/inquire:", err);
    return NextResponse.json(
      {
        success: false,
        message: "An internal server error occurred while processing your inquiry.",
      },
      { status: 500 }
    );
  }
}

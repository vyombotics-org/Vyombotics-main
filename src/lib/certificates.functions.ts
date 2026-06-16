import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

function genSerial() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SV-${ts}-${rand}`;
}

// Issue certificate if student completed (>=80% lectures completed AND passed all published quizzes)
export const issueCertificate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { batch_id: string }) => z.object({ batch_id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: batch } = await supabaseAdmin
      .from("batches")
      .select("id,course_id,name,courses(title)")
      .eq("id", data.batch_id)
      .maybeSingle();
    if (!batch) throw new Error("Batch not found");
    const { data: en } = await supabaseAdmin
      .from("enrollments")
      .select("id,payment_status,expires_at")
      .eq("user_id", context.userId)
      .eq("batch_id", data.batch_id)
      .maybeSingle();
    if (!en || en.payment_status !== "success") throw new Error("Enrollment required");

    // Already issued?
    const { data: existing } = await supabaseAdmin
      .from("certificates")
      .select("*")
      .eq("user_id", context.userId)
      .eq("batch_id", data.batch_id)
      .maybeSingle();
    if (existing) return { certificate: existing, just_issued: false };

    // Eligibility: 80% lectures completed
    const { data: lectures } = await supabaseAdmin
      .from("lectures")
      .select("id")
      .eq("batch_id", data.batch_id);
    const total = (lectures ?? []).length;
    if (total === 0) throw new Error("No lectures in batch yet");
    const { data: progress } = await supabaseAdmin
      .from("lecture_progress")
      .select("lecture_id,completed")
      .eq("user_id", context.userId)
      .in(
        "lecture_id",
        (lectures ?? []).map((l: any) => l.id),
      );
    const completed = (progress ?? []).filter((p: any) => p.completed).length;
    const pct = (completed / total) * 100;
    if (pct < 80)
      throw new Error(`Complete at least 80% of lectures (currently ${Math.floor(pct)}%)`);

    // All published quizzes passed (at least once)
    const { data: quizzes } = await supabaseAdmin
      .from("quizzes")
      .select("id")
      .eq("batch_id", data.batch_id)
      .eq("is_published", true);
    if ((quizzes ?? []).length > 0) {
      const qids = (quizzes ?? []).map((q: any) => q.id);
      const { data: attempts } = await supabaseAdmin
        .from("quiz_attempts")
        .select("quiz_id,passed")
        .eq("user_id", context.userId)
        .in("quiz_id", qids);
      const passedSet = new Set(
        (attempts ?? []).filter((a: any) => a.passed).map((a: any) => a.quiz_id),
      );
      const allPassed = qids.every((id: any) => passedSet.has(id));
      if (!allPassed) throw new Error("Pass all published quizzes first");
    }

    const serial = genSerial();
    const { data: cert, error } = await supabaseAdmin
      .from("certificates")
      .insert({
        user_id: context.userId,
        batch_id: data.batch_id,
        course_id: batch.course_id,
        serial_no: serial,
      })
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return { certificate: cert, just_issued: true };
  });

export const myCertificates = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("certificates")
      .select("id,serial_no,issued_at,batches(name),courses(title,slug)")
      .eq("user_id", context.userId)
      .order("issued_at", { ascending: false });
    return { certificates: data ?? [] };
  });

// Public verification by serial number — no auth required
export const verifyCertificate = createServerFn({ method: "GET" })
  .inputValidator((d: { serial_no: string }) =>
    z
      .object({
        serial_no: z
          .string()
          .min(4)
          .max(64)
          .regex(/^[A-Z0-9-]+$/),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: cert } = await supabaseAdmin
      .from("certificates")
      .select("serial_no, issued_at, batches(name), courses(title), profiles:user_id(full_name)")
      .eq("serial_no", data.serial_no)
      .maybeSingle();
    if (!cert) return { valid: false };
    return {
      valid: true,
      serial_no: cert.serial_no,
      issued_at: cert.issued_at,
      student_name: (cert as any).profiles?.full_name ?? "Student",
      course_title: (cert as any).courses?.title ?? "Course",
      batch_name: (cert as any).batches?.name ?? "",
    };
  });

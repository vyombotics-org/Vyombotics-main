import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

async function assertBatchAdminOrOwner(supabaseAdmin: any, userId: string, batch_id: string) {
  const { data: batch } = await supabaseAdmin
    .from("batches")
    .select("id, name, course_id, validity_days, price_inr, courses(title, instructor_id)")
    .eq("id", batch_id)
    .maybeSingle();
  if (!batch) throw new Error("Batch not found");
  const { data: roleRow } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  const isAdmin = !!roleRow;
  const isOwner = (batch as any).courses?.instructor_id === userId;
  if (!isAdmin && !isOwner) throw new Error("Forbidden");
  return batch as any;
}

export const listBatchEnrollments = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { batch_id: string }) => z.object({ batch_id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const batch = await assertBatchAdminOrOwner(supabaseAdmin, context.userId, data.batch_id);

    const { data: enrollments } = await supabaseAdmin
      .from("enrollments")
      .select(
        "id, user_id, payment_status, amount_paid, purchased_at, expires_at, created_at, profiles:user_id(full_name, avatar_url)",
      )
      .eq("batch_id", data.batch_id)
      .order("created_at", { ascending: false });

    const userIds = (enrollments ?? []).map((e: any) => e.user_id);
    const emails = new Map<string, string>();
    if (userIds.length) {
      // best-effort fetch of emails via admin auth
      const { data: authList } = await supabaseAdmin.auth.admin.listUsers({
        page: 1,
        perPage: 200,
      });
      authList?.users?.forEach((u: any) => emails.set(u.id, u.email ?? ""));
    }

    // certificates issued
    const { data: certs } = await supabaseAdmin
      .from("certificates")
      .select("user_id, serial_no")
      .eq("batch_id", data.batch_id);
    const certMap = new Map<string, string>();
    (certs ?? []).forEach((c: any) => certMap.set(c.user_id, c.serial_no));

    const rows = (enrollments ?? []).map((e: any) => ({
      ...e,
      email: emails.get(e.user_id) ?? "",
      certificate_serial: certMap.get(e.user_id) ?? null,
    }));
    return { batch, enrollments: rows };
  });

export const adminMarkEnrollmentPaid = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { enrollment_id: string; amount_paid?: number }) =>
    z
      .object({
        enrollment_id: z.string().uuid(),
        amount_paid: z.coerce.number().min(0).optional(),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: en } = await supabaseAdmin
      .from("enrollments")
      .select("id, batch_id, batches(price_inr, validity_days)")
      .eq("id", data.enrollment_id)
      .maybeSingle();
    if (!en) throw new Error("Enrollment not found");
    await assertBatchAdminOrOwner(supabaseAdmin, context.userId, (en as any).batch_id);

    const validity = (en as any).batches?.validity_days ?? 45;
    const expires = new Date();
    expires.setDate(expires.getDate() + validity);
    const amount = data.amount_paid ?? (en as any).batches?.price_inr ?? 0;
    const { error } = await supabaseAdmin
      .from("enrollments")
      .update({
        payment_status: "success",
        amount_paid: amount,
        purchased_at: new Date().toISOString(),
        expires_at: expires.toISOString(),
      })
      .eq("id", en.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminRevokeEnrollment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { enrollment_id: string }) =>
    z.object({ enrollment_id: z.string().uuid() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: en } = await supabaseAdmin
      .from("enrollments")
      .select("id, batch_id")
      .eq("id", data.enrollment_id)
      .maybeSingle();
    if (!en) throw new Error("Enrollment not found");
    await assertBatchAdminOrOwner(supabaseAdmin, context.userId, (en as any).batch_id);
    const { error } = await supabaseAdmin.from("enrollments").delete().eq("id", en.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

function genSerial() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SV-${ts}-${rand}`;
}

// Admin/instructor: force-issue a certificate for a student (bypasses self-claim eligibility)
export const adminIssueCertificate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { batch_id: string; user_id: string }) =>
    z.object({ batch_id: z.string().uuid(), user_id: z.string().uuid() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const batch = await assertBatchAdminOrOwner(supabaseAdmin, context.userId, data.batch_id);

    const { data: existing } = await supabaseAdmin
      .from("certificates")
      .select("id, serial_no")
      .eq("user_id", data.user_id)
      .eq("batch_id", data.batch_id)
      .maybeSingle();
    if (existing) return { certificate: existing, just_issued: false };

    const { data: cert, error } = await supabaseAdmin
      .from("certificates")
      .insert({
        user_id: data.user_id,
        batch_id: data.batch_id,
        course_id: batch.course_id,
        serial_no: genSerial(),
      })
      .select("id, serial_no")
      .single();
    if (error) throw new Error(error.message);

    // Notify student
    await supabaseAdmin.from("notifications").insert({
      user_id: data.user_id,
      type: "certificate",
      title: "Certificate issued",
      body: `Your certificate for ${batch.courses?.title ?? "the course"} (${batch.name}) is now available.`,
      link: `/certificates`,
    });

    return { certificate: cert, just_issued: true };
  });

// Admin: list contact messages
export const adminListContactMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roleRow } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) throw new Error("Forbidden: admin only");
    const { data, error } = await supabaseAdmin
      .from("contact_messages")
      .select("id, name, email, message, status, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return { messages: data ?? [] };
  });

export const adminUpdateContactMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; status?: "new" | "read" | "replied"; delete?: boolean }) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["new", "read", "replied"]).optional(),
        delete: z.boolean().optional(),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roleRow } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) throw new Error("Forbidden: admin only");
    if (data.delete) {
      const { error } = await supabaseAdmin.from("contact_messages").delete().eq("id", data.id);
      if (error) throw new Error(error.message);
    } else if (data.status) {
      const { error } = await supabaseAdmin
        .from("contact_messages")
        .update({ status: data.status })
        .eq("id", data.id);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

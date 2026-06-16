import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

export const listBatchAssignments = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { batch_id: string }) => z.object({ batch_id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: batch } = await supabaseAdmin
      .from("batches")
      .select("id, courses(instructor_id)")
      .eq("id", data.batch_id)
      .maybeSingle();
    if (!batch) throw new Error("Batch not found");
    const { data: role } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    const isAdmin = !!role;
    const isOwner = (batch as any).courses?.instructor_id === context.userId;
    const canManage = isAdmin || isOwner;

    let q = supabaseAdmin
      .from("assignments")
      .select("id,title,description,max_marks,due_at,is_published,created_at")
      .eq("batch_id", data.batch_id)
      .order("created_at", { ascending: false });
    if (!canManage) {
      const { data: en } = await supabaseAdmin
        .from("enrollments")
        .select("id")
        .eq("user_id", context.userId)
        .eq("batch_id", data.batch_id)
        .eq("payment_status", "success")
        .maybeSingle();
      if (!en) return { assignments: [], submissions: [], canManage: false };
      q = q.eq("is_published", true);
    }
    const { data: assignments } = await q;
    const ids = (assignments ?? []).map((a: any) => a.id);
    const { data: submissions } = ids.length
      ? await supabaseAdmin
          .from("assignment_submissions")
          .select(
            "id,assignment_id,user_id,text_content,file_url,submitted_at,marks_awarded,feedback,graded_at,profiles:user_id(full_name,avatar_url)",
          )
          .in("assignment_id", ids)
      : { data: [] as any };
    const filtered = canManage
      ? (submissions ?? [])
      : (submissions ?? []).filter((s: any) => s.user_id === context.userId);
    return { assignments: assignments ?? [], submissions: filtered, canManage };
  });

export const upsertAssignment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: any) =>
    z
      .object({
        id: z.string().uuid().optional(),
        batch_id: z.string().uuid(),
        title: z.string().min(1).max(200),
        description: z.string().max(5000).optional().nullable(),
        max_marks: z.coerce.number().int().min(1).max(1000).default(100),
        due_at: z.string().optional().nullable(),
        is_published: z.boolean().default(false),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: batch } = await supabaseAdmin
      .from("batches")
      .select("id, courses(instructor_id)")
      .eq("id", data.batch_id)
      .maybeSingle();
    if (!batch) throw new Error("Batch not found");
    const { data: role } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!role && (batch as any).courses?.instructor_id !== context.userId)
      throw new Error("Forbidden");
    const payload = {
      batch_id: data.batch_id,
      title: data.title,
      description: data.description,
      max_marks: data.max_marks,
      due_at: data.due_at || null,
      is_published: data.is_published,
    };
    if (data.id) {
      const { error } = await supabaseAdmin.from("assignments").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }
    const { data: created, error } = await supabaseAdmin
      .from("assignments")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: created.id };
  });

export const deleteAssignment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: a } = await supabaseAdmin
      .from("assignments")
      .select("batch_id, batches(courses(instructor_id))")
      .eq("id", data.id)
      .maybeSingle();
    if (!a) throw new Error("Not found");
    const { data: role } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!role && (a as any).batches?.courses?.instructor_id !== context.userId)
      throw new Error("Forbidden");
    await supabaseAdmin.from("assignments").delete().eq("id", data.id);
    return { ok: true };
  });

export const submitAssignment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: any) =>
    z
      .object({
        assignment_id: z.string().uuid(),
        text_content: z.string().max(20000).optional().nullable(),
        file_url: z.string().url().max(1000).optional().nullable(),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: a } = await supabaseAdmin
      .from("assignments")
      .select("id,batch_id,is_published")
      .eq("id", data.assignment_id)
      .maybeSingle();
    if (!a || !a.is_published) throw new Error("Assignment not available");
    const { data: en } = await supabaseAdmin
      .from("enrollments")
      .select("id")
      .eq("user_id", context.userId)
      .eq("batch_id", a.batch_id)
      .eq("payment_status", "success")
      .maybeSingle();
    if (!en) throw new Error("Enrollment required");
    const { data: existing } = await supabaseAdmin
      .from("assignment_submissions")
      .select("id,marks_awarded")
      .eq("assignment_id", data.assignment_id)
      .eq("user_id", context.userId)
      .maybeSingle();
    if (existing && existing.marks_awarded !== null)
      throw new Error("Already graded — cannot resubmit");
    if (existing) {
      const { error } = await supabaseAdmin
        .from("assignment_submissions")
        .update({
          text_content: data.text_content,
          file_url: data.file_url,
          submitted_at: new Date().toISOString(),
        })
        .eq("id", existing.id);
      if (error) throw new Error(error.message);
      return { id: existing.id, updated: true };
    }
    const { data: created, error } = await supabaseAdmin
      .from("assignment_submissions")
      .insert({
        assignment_id: data.assignment_id,
        user_id: context.userId,
        text_content: data.text_content,
        file_url: data.file_url,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: created.id, updated: false };
  });

export const gradeSubmission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: any) =>
    z
      .object({
        submission_id: z.string().uuid(),
        marks_awarded: z.coerce.number().int().min(0).max(1000),
        feedback: z.string().max(5000).optional().nullable(),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: s } = await supabaseAdmin
      .from("assignment_submissions")
      .select("id, assignments(batch_id, batches(courses(instructor_id)))")
      .eq("id", data.submission_id)
      .maybeSingle();
    if (!s) throw new Error("Submission not found");
    const { data: role } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!role && (s as any).assignments?.batches?.courses?.instructor_id !== context.userId)
      throw new Error("Forbidden");
    const { error } = await supabaseAdmin
      .from("assignment_submissions")
      .update({
        marks_awarded: data.marks_awarded,
        feedback: data.feedback,
        graded_by: context.userId,
        graded_at: new Date().toISOString(),
      })
      .eq("id", data.submission_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

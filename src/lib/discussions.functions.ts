import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

async function ensureAccess(supabaseAdmin: any, userId: string, batchId: string) {
  const { data: batch } = await supabaseAdmin
    .from("batches")
    .select("id, courses(instructor_id)")
    .eq("id", batchId)
    .maybeSingle();
  if (!batch) throw new Error("Batch not found");
  const isOwner = batch.courses?.instructor_id === userId;
  const { data: roleRow } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  const isAdmin = !!roleRow;
  if (isOwner || isAdmin) return { isOwner, isAdmin };
  const { data: en } = await supabaseAdmin
    .from("enrollments")
    .select("payment_status, expires_at")
    .eq("user_id", userId)
    .eq("batch_id", batchId)
    .maybeSingle();
  const isMember =
    en?.payment_status === "success" && (!en.expires_at || new Date(en.expires_at) > new Date());
  if (!isMember) throw new Error("Access denied");
  return { isOwner: false, isAdmin: false };
}

export const listLectureDiscussions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { lecture_id: string }) =>
    z.object({ lecture_id: z.string().uuid() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: lec } = await supabaseAdmin
      .from("lectures")
      .select("batch_id")
      .eq("id", data.lecture_id)
      .maybeSingle();
    if (!lec?.batch_id) throw new Error("Lecture not found");
    await ensureAccess(supabaseAdmin, context.userId, lec.batch_id);

    const { data: posts } = await supabaseAdmin
      .from("discussions")
      .select("id, user_id, parent_id, body, is_resolved, created_at")
      .eq("lecture_id", data.lecture_id)
      .order("created_at", { ascending: true });
    const userIds = Array.from(new Set((posts ?? []).map((p: any) => p.user_id)));
    const { data: profs } = userIds.length
      ? await supabaseAdmin.from("profiles").select("id, full_name, avatar_url").in("id", userIds)
      : { data: [] as any[] };
    const profMap = new Map<string, any>();
    (profs ?? []).forEach((p: any) => profMap.set(p.id, p));
    const merged = (posts ?? []).map((p: any) => ({
      ...p,
      profiles: profMap.get(p.user_id) ?? null,
    }));
    return { posts: merged };
  });

export const postDiscussion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { lecture_id: string; body: string; parent_id?: string | null }) =>
    z
      .object({
        lecture_id: z.string().uuid(),
        body: z.string().trim().min(1).max(5000),
        parent_id: z.string().uuid().nullish(),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: lec } = await supabaseAdmin
      .from("lectures")
      .select("id, title, batch_id")
      .eq("id", data.lecture_id)
      .maybeSingle();
    if (!lec?.batch_id) throw new Error("Lecture not found");
    await ensureAccess(supabaseAdmin, context.userId, lec.batch_id);

    const { data: inserted, error } = await supabaseAdmin
      .from("discussions")
      .insert({
        lecture_id: data.lecture_id,
        batch_id: lec.batch_id,
        user_id: context.userId,
        parent_id: data.parent_id ?? null,
        body: data.body.trim(),
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);

    // Notify: reply notifies parent author; new question notifies batch owner
    try {
      if (data.parent_id) {
        const { data: parent } = await supabaseAdmin
          .from("discussions")
          .select("user_id")
          .eq("id", data.parent_id)
          .maybeSingle();
        if (parent && parent.user_id !== context.userId) {
          await supabaseAdmin.from("notifications").insert({
            user_id: parent.user_id,
            type: "discussion_reply",
            title: "New reply to your question",
            body: data.body.slice(0, 200),
            link: `/learn/${lec.batch_id}?lecture=${lec.id}#discussions`,
          });
        }
      } else {
        const { data: batch } = await supabaseAdmin
          .from("batches")
          .select("courses(instructor_id)")
          .eq("id", lec.batch_id)
          .maybeSingle();
        const ownerId = (batch as any)?.courses?.instructor_id;
        if (ownerId && ownerId !== context.userId) {
          await supabaseAdmin.from("notifications").insert({
            user_id: ownerId,
            type: "discussion_question",
            title: `New question on "${lec.title}"`,
            body: data.body.slice(0, 200),
            link: `/learn/${lec.batch_id}?lecture=${lec.id}#discussions`,
          });
        }
      }
    } catch {
      // Ignore notification insertion failure
    }
    return { id: inserted.id };
  });

export const deleteDiscussion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("discussions")
      .select("user_id, batch_id")
      .eq("id", data.id)
      .maybeSingle();
    if (!row) throw new Error("Not found");
    const { isOwner, isAdmin } = await ensureAccess(supabaseAdmin, context.userId, row.batch_id);
    if (row.user_id !== context.userId && !isOwner && !isAdmin) throw new Error("Forbidden");
    const { error } = await supabaseAdmin.from("discussions").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const toggleResolved = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; resolved: boolean }) =>
    z.object({ id: z.string().uuid(), resolved: z.boolean() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("discussions")
      .select("batch_id, user_id")
      .eq("id", data.id)
      .maybeSingle();
    if (!row) throw new Error("Not found");
    const { isOwner, isAdmin } = await ensureAccess(supabaseAdmin, context.userId, row.batch_id);
    if (!isOwner && !isAdmin && row.user_id !== context.userId) throw new Error("Forbidden");
    const { error } = await supabaseAdmin
      .from("discussions")
      .update({ is_resolved: data.resolved })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

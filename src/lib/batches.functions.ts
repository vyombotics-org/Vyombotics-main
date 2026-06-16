import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

async function assertCanManageCourse(ctx: { supabase: any; userId: string }, courseId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const [{ data: roleRow }, { data: course }] = await Promise.all([
    supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", ctx.userId)
      .eq("role", "admin")
      .maybeSingle(),
    supabaseAdmin.from("courses").select("instructor_id").eq("id", courseId).maybeSingle(),
  ]);
  if (roleRow) return;
  if (course?.instructor_id === ctx.userId) return;
  throw new Error("Forbidden: only the course instructor or admin can manage this");
}

async function assertCanManageBatch(ctx: { supabase: any; userId: string }, batchId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: batch } = await supabaseAdmin
    .from("batches")
    .select("course_id")
    .eq("id", batchId)
    .maybeSingle();
  if (!batch) throw new Error("Batch not found");
  await assertCanManageCourse(ctx, batch.course_id);
  return batch;
}

const BatchInput = z.object({
  id: z.string().uuid().optional(),
  course_id: z.string().uuid(),
  name: z.string().min(2).max(120),
  start_date: z.string(),
  end_date: z.string(),
  validity_days: z.coerce.number().int().min(1).max(3650).default(45),
  price_inr: z.coerce.number().min(0).max(1_000_000),
  seats: z.coerce.number().int().min(1).max(100000).default(100),
  is_active: z.boolean().default(true),
  buy_url: z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? null : v),
    z.string().url().nullable().optional(),
  ),
});

export const getCourseBySlugAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().min(1) }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const identifier = data.slug.trim();
    const isUuid = z.string().uuid().safeParse(identifier).success;
    const { data: course, error } = await supabaseAdmin
      .from("courses")
      .select("id, title, slug, instructor_id")
      .eq(isUuid ? "id" : "slug", identifier)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!course) throw new Error("Course not found");
    await assertCanManageCourse(context, course.id);
    return { course };
  });

export const listBatchesForCourse = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { course_id: string }) => z.object({ course_id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertCanManageCourse(context, data.course_id);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: batches, error } = await supabaseAdmin
      .from("batches")
      .select("*")
      .eq("course_id", data.course_id)
      .order("start_date", { ascending: false });
    if (error) throw new Error(error.message);
    return { batches: batches ?? [] };
  });

export const upsertBatch = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => BatchInput.parse(d))
  .handler(async ({ data, context }) => {
    await assertCanManageCourse(context, data.course_id);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const payload = {
      course_id: data.course_id,
      name: data.name,
      start_date: data.start_date,
      end_date: data.end_date,
      validity_days: data.validity_days,
      price_inr: data.price_inr,
      seats: data.seats,
      is_active: data.is_active,
      buy_url: data.buy_url ?? null,
    };
    if (data.id) {
      const { data: updated, error } = await supabaseAdmin
        .from("batches")
        .update(payload)
        .eq("id", data.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return { batch: updated };
    } else {
      const { data: created, error } = await supabaseAdmin
        .from("batches")
        .insert(payload)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return { batch: created };
    }
  });

export const deleteBatch = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertCanManageBatch(context, data.id);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("batches").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- LECTURES ----------
const optionalUrl = z.preprocess(
  (v) => (v === "" || v === null || v === undefined ? null : v),
  z.string().url().nullable().optional(),
);

const LectureInput = z.object({
  id: z.string().uuid().optional(),
  batch_id: z.string().uuid(),
  title: z.string().min(2).max(200),
  description: z.string().max(2000).optional().nullable(),
  kind: z.enum(["live", "recorded"]),
  scheduled_at: z.string().optional().nullable(),
  duration_min: z.coerce.number().int().min(0).max(1440).default(60),
  meeting_url: optionalUrl,
  video_url: optionalUrl,
  order_index: z.coerce.number().int().min(0).default(0),
  is_preview: z.boolean().default(false),
});

export const getBatchAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const batch = await assertCanManageBatch(context, data.id);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [{ data: full }, { data: course }] = await Promise.all([
      supabaseAdmin.from("batches").select("*").eq("id", data.id).single(),
      supabaseAdmin.from("courses").select("id, title, slug").eq("id", batch.course_id).single(),
    ]);
    return { batch: full, course };
  });

export const listLecturesForBatch = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { batch_id: string }) => z.object({ batch_id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertCanManageBatch(context, data.batch_id);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: lectures, error } = await supabaseAdmin
      .from("lectures")
      .select("*")
      .eq("batch_id", data.batch_id)
      .order("order_index", { ascending: true })
      .order("scheduled_at", { ascending: true });
    if (error) throw new Error(error.message);
    return { lectures: lectures ?? [] };
  });

export const upsertLecture = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => LectureInput.parse(d))
  .handler(async ({ data, context }) => {
    await assertCanManageBatch(context, data.batch_id);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const payload: any = {
      batch_id: data.batch_id,
      title: data.title,
      description: data.description ?? null,
      kind: data.kind,
      scheduled_at: data.scheduled_at || null,
      duration_min: data.duration_min,
      meeting_url: data.kind === "live" ? (data.meeting_url ?? null) : null,
      video_url: data.kind === "recorded" ? (data.video_url ?? null) : null,
      order_index: data.order_index,
      is_preview: data.is_preview,
    };
    if (data.id) {
      const { data: updated, error } = await supabaseAdmin
        .from("lectures")
        .update(payload)
        .eq("id", data.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return { lecture: updated };
    } else {
      const { data: created, error } = await supabaseAdmin
        .from("lectures")
        .insert(payload)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return { lecture: created };
    }
  });

export const deleteLecture = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: lec } = await supabaseAdmin
      .from("lectures")
      .select("batch_id")
      .eq("id", data.id)
      .maybeSingle();
    if (!lec?.batch_id) throw new Error("Lecture not found");
    await assertCanManageBatch(context, lec.batch_id);
    const { error } = await supabaseAdmin.from("lectures").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

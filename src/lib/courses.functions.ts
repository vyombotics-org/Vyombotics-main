import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

export const listPublishedCourses = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("courses")
    .select(
      "id,title,slug,description,thumbnail_url,category,level,price_inr,duration_hours,rating,students_count",
    )
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return { courses: data ?? [] };
});

export const getCourseBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().min(1).max(120) }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: course, error } = await supabaseAdmin
      .from("courses")
      .select("*")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!course) throw new Error("NOT_FOUND");
    return { course };
  });

export const listPreviewLecturesBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().min(1).max(120) }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: course } = await supabaseAdmin
      .from("courses")
      .select("id")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (!course) return { lectures: [] };
    const { data: batches } = await supabaseAdmin
      .from("batches")
      .select("id")
      .eq("course_id", course.id);
    const batchIds = (batches ?? []).map((b: any) => b.id);
    if (batchIds.length === 0) return { lectures: [] };
    const { data: lectures } = await supabaseAdmin
      .from("lectures")
      .select("id,title,description,kind,video_url,duration_min,order_index,is_preview")
      .in("batch_id", batchIds)
      .eq("is_preview", true)
      .order("order_index", { ascending: true });
    return { lectures: lectures ?? [] };
  });

// ----- Admin -----
const CourseInput = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3).max(160),
  slug: z.string().min(0).max(120).optional(),
  description: z.string().max(5000).optional().default(""),
  thumbnail_url: z.string().url().optional().nullable(),
  category: z.string().max(60).optional().default(""),
  level: z.enum(["beginner", "intermediate", "advanced"]).optional().default("beginner"),
  price_inr: z.coerce.number().min(0).max(1_000_000),
  duration_hours: z.coerce.number().int().min(0).max(2000).default(0),
  is_published: z.boolean().default(false),
});

async function assertAdmin(ctx: { supabase: any; userId: string }) {
  const { data, error } = await ctx.supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", ctx.userId)
    .in("role", ["admin", "instructor"]);
  if (error) throw new Error(error.message);
  if (!data || data.length === 0) throw new Error("Forbidden: admin/instructor role required");
}

export const adminListCourses = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("courses")
      .select("id,title,slug,category,level,price_inr,is_published,students_count,created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { courses: data ?? [] };
  });

export const upsertCourse = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => CourseInput.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const slug =
      (data.slug && data.slug.length > 0 ? data.slug : slugify(data.title)) || slugify(data.title);
    const payload = {
      title: data.title,
      slug,
      description: data.description ?? "",
      thumbnail_url: data.thumbnail_url ?? null,
      category: data.category ?? "",
      level: data.level ?? "beginner",
      price_inr: data.price_inr,
      duration_hours: data.duration_hours ?? 0,
      is_published: data.is_published,
      instructor_id: context.userId,
    };
    if (data.id) {
      const { data: updated, error } = await supabaseAdmin
        .from("courses")
        .update(payload)
        .eq("id", data.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return { course: updated };
    } else {
      const { data: created, error } = await supabaseAdmin
        .from("courses")
        .insert(payload)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return { course: created };
    }
  });

export const deleteCourse = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("courses").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

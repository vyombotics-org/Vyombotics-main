import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

// PUBLIC: list active batches for a course slug (used on course detail page)
export const listBatchesByCourseSlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().min(1).max(120) }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: course } = await supabaseAdmin
      .from("courses")
      .select("id")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (!course) return { batches: [] };
    const { data: batches } = await supabaseAdmin
      .from("batches")
      .select("id,name,start_date,end_date,validity_days,price_inr,seats,is_active")
      .eq("course_id", course.id)
      .eq("is_active", true)
      .order("start_date", { ascending: true });
    return { batches: batches ?? [] };
  });

// Authenticated: create a pending enrollment for the current user
export const enrollInBatch = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { batch_id: string }) => z.object({ batch_id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: batch, error: bErr } = await supabaseAdmin
      .from("batches")
      .select("id, price_inr, validity_days")
      .eq("id", data.batch_id)
      .maybeSingle();
    if (bErr || !batch) throw new Error("Batch not found");
    const { data: existing } = await supabaseAdmin
      .from("enrollments")
      .select("id, payment_status")
      .eq("user_id", context.userId)
      .eq("batch_id", batch.id)
      .maybeSingle();
    if (existing) return { enrollment_id: existing.id, payment_status: existing.payment_status };
    const expires = new Date();
    expires.setDate(expires.getDate() + (batch.validity_days || 45));
    const { data: created, error } = await supabaseAdmin
      .from("enrollments")
      .insert({
        user_id: context.userId,
        batch_id: batch.id,
        payment_status: "pending",
        amount_paid: 0,
        expires_at: expires.toISOString(),
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { enrollment_id: created.id, payment_status: created.payment_status };
  });

// Demo "pay" endpoint — marks pending enrollment as success. Replace with real gateway later.
export const markEnrollmentPaidDemo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { enrollment_id: string }) =>
    z.object({ enrollment_id: z.string().uuid() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: en } = await supabaseAdmin
      .from("enrollments")
      .select("id, user_id, batch_id, batches(price_inr, validity_days)")
      .eq("id", data.enrollment_id)
      .maybeSingle();
    if (!en || en.user_id !== context.userId) throw new Error("Enrollment not found");
    const validity = (en as any).batches?.validity_days ?? 45;
    const expires = new Date();
    expires.setDate(expires.getDate() + validity);
    const { error } = await supabaseAdmin
      .from("enrollments")
      .update({
        payment_status: "success",
        amount_paid: (en as any).batches?.price_inr ?? 0,
        purchased_at: new Date().toISOString(),
        expires_at: expires.toISOString(),
      })
      .eq("id", en.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Authenticated: list current user's active (success + not expired) batches
export const myActiveBatches = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("enrollments")
      .select(
        "id, expires_at, payment_status, batches(id, name, course_id, courses(title, slug, thumbnail_url))",
      )
      .eq("user_id", context.userId)
      .order("purchased_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { enrollments: data ?? [] };
  });

// Authenticated: get batch + lectures for learner (must be active member, owner, or admin)
export const getLearnerBatch = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { batch_id: string }) => z.object({ batch_id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: batch } = await supabaseAdmin
      .from("batches")
      .select("id, name, course_id, start_date, end_date, courses(title, slug, instructor_id)")
      .eq("id", data.batch_id)
      .maybeSingle();
    if (!batch) throw new Error("Batch not found");

    const [{ data: roleRow }, { data: enrollment }] = await Promise.all([
      supabaseAdmin
        .from("user_roles")
        .select("role")
        .eq("user_id", context.userId)
        .in("role", ["admin"])
        .maybeSingle(),
      supabaseAdmin
        .from("enrollments")
        .select("id, payment_status, expires_at")
        .eq("user_id", context.userId)
        .eq("batch_id", data.batch_id)
        .maybeSingle(),
    ]);
    const isAdmin = !!roleRow;
    const isOwner = (batch as any).courses?.instructor_id === context.userId;
    const isMember =
      enrollment?.payment_status === "success" &&
      (!enrollment.expires_at || new Date(enrollment.expires_at) > new Date());
    if (!isAdmin && !isOwner && !isMember) throw new Error("Access denied — enrollment required");

    const { data: lectures } = await supabaseAdmin
      .from("lectures")
      .select(
        "id, title, description, kind, scheduled_at, duration_min, meeting_url, video_url, order_index, is_preview",
      )
      .eq("batch_id", data.batch_id)
      .order("order_index", { ascending: true });

    const lectureIds = (lectures ?? []).map((l: any) => l.id);
    const [{ data: progress }, { data: attendance }] = await Promise.all([
      lectureIds.length
        ? supabaseAdmin
            .from("lecture_progress")
            .select("lecture_id, watched_seconds, completed")
            .eq("user_id", context.userId)
            .in("lecture_id", lectureIds)
        : Promise.resolve({ data: [] }),
      lectureIds.length
        ? supabaseAdmin
            .from("attendance")
            .select("lecture_id, status, watched_seconds")
            .eq("user_id", context.userId)
            .in("lecture_id", lectureIds)
        : Promise.resolve({ data: [] }),
    ]);

    return {
      batch,
      lectures: lectures ?? [],
      progress: progress ?? [],
      attendance: attendance ?? [],
      enrollment,
      isAdmin,
      isOwner,
      isMember,
    };
  });

// Authenticated: record watched seconds + compute attendance status for recorded lectures
export const recordWatchProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { lecture_id: string; watched_seconds: number }) =>
    z
      .object({
        lecture_id: z.string().uuid(),
        watched_seconds: z.coerce.number().int().min(0).max(86400),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: lec } = await supabaseAdmin
      .from("lectures")
      .select("id, batch_id, duration_min, kind")
      .eq("id", data.lecture_id)
      .maybeSingle();
    if (!lec) throw new Error("Lecture not found");

    // Upsert progress
    const { data: existing } = await supabaseAdmin
      .from("lecture_progress")
      .select("id, watched_seconds")
      .eq("user_id", context.userId)
      .eq("lecture_id", lec.id)
      .maybeSingle();
    const watched = Math.max(existing?.watched_seconds ?? 0, data.watched_seconds);
    const totalSec = Math.max(1, (lec.duration_min || 0) * 60);
    const ratio = watched / totalSec;
    const completed = ratio >= 0.95;

    if (existing) {
      await supabaseAdmin
        .from("lecture_progress")
        .update({ watched_seconds: watched, completed, updated_at: new Date().toISOString() })
        .eq("id", existing.id);
    } else {
      await supabaseAdmin.from("lecture_progress").insert({
        user_id: context.userId,
        lecture_id: lec.id,
        watched_seconds: watched,
        completed,
      });
    }

    // Attendance: recorded → present if ≥70%, partial if 20-70%, else nothing
    let status: "present" | "partial" | null = null;
    if (ratio >= 0.7) status = "present";
    else if (ratio >= 0.2) status = "partial";
    if (status) {
      const { data: a } = await supabaseAdmin
        .from("attendance")
        .select("id")
        .eq("user_id", context.userId)
        .eq("lecture_id", lec.id)
        .maybeSingle();
      if (a) {
        await supabaseAdmin
          .from("attendance")
          .update({ status, watched_seconds: watched, updated_at: new Date().toISOString() })
          .eq("id", a.id);
      } else {
        await supabaseAdmin.from("attendance").insert({
          user_id: context.userId,
          lecture_id: lec.id,
          batch_id: lec.batch_id!,
          status,
          watched_seconds: watched,
        });
      }
    }
    return { ok: true, watched_seconds: watched, completed };
  });

// Authenticated: mark live class attendance when student clicks Join
export const markLiveJoin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { lecture_id: string }) =>
    z.object({ lecture_id: z.string().uuid() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: lec } = await supabaseAdmin
      .from("lectures")
      .select("id, batch_id")
      .eq("id", data.lecture_id)
      .maybeSingle();
    if (!lec) throw new Error("Lecture not found");
    const { data: a } = await supabaseAdmin
      .from("attendance")
      .select("id")
      .eq("user_id", context.userId)
      .eq("lecture_id", lec.id)
      .maybeSingle();
    if (!a) {
      await supabaseAdmin.from("attendance").insert({
        user_id: context.userId,
        lecture_id: lec.id,
        batch_id: lec.batch_id!,
        status: "present",
        joined_at: new Date().toISOString(),
      });
    }
    return { ok: true };
  });

// Instructor/admin: per-batch attendance matrix
export const getBatchAttendance = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { batch_id: string }) => z.object({ batch_id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: batch } = await supabaseAdmin
      .from("batches")
      .select("id, name, course_id, courses(title, slug, instructor_id)")
      .eq("id", data.batch_id)
      .maybeSingle();
    if (!batch) throw new Error("Batch not found");
    const { data: roleRow } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    const isOwner = (batch as any).courses?.instructor_id === context.userId;
    if (!roleRow && !isOwner) throw new Error("Forbidden");

    const [{ data: lectures }, { data: enrollments }, { data: attendance }] = await Promise.all([
      supabaseAdmin
        .from("lectures")
        .select("id, title, order_index")
        .eq("batch_id", data.batch_id)
        .order("order_index"),
      supabaseAdmin
        .from("enrollments")
        .select("user_id, payment_status, profiles:user_id(full_name, avatar_url)")
        .eq("batch_id", data.batch_id)
        .eq("payment_status", "success"),
      supabaseAdmin
        .from("attendance")
        .select("user_id, lecture_id, status")
        .eq("batch_id", data.batch_id),
    ]);
    return {
      batch,
      lectures: lectures ?? [],
      students: enrollments ?? [],
      attendance: attendance ?? [],
    };
  });

// Instructor/admin: manually set a student's attendance for a lecture
export const setAttendance = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (d: {
      batch_id: string;
      lecture_id: string;
      user_id: string;
      status: "present" | "absent" | "partial" | "clear";
    }) =>
      z
        .object({
          batch_id: z.string().uuid(),
          lecture_id: z.string().uuid(),
          user_id: z.string().uuid(),
          status: z.enum(["present", "absent", "partial", "clear"]),
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
    const { data: roleRow } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    const isOwner = (batch as any).courses?.instructor_id === context.userId;
    if (!roleRow && !isOwner) throw new Error("Forbidden");

    if (data.status === "clear") {
      await supabaseAdmin
        .from("attendance")
        .delete()
        .eq("batch_id", data.batch_id)
        .eq("lecture_id", data.lecture_id)
        .eq("user_id", data.user_id);
      return { ok: true };
    }

    const { data: existing } = await supabaseAdmin
      .from("attendance")
      .select("id")
      .eq("lecture_id", data.lecture_id)
      .eq("user_id", data.user_id)
      .maybeSingle();
    if (existing) {
      await supabaseAdmin
        .from("attendance")
        .update({
          status: data.status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);
    } else {
      await supabaseAdmin.from("attendance").insert({
        user_id: data.user_id,
        lecture_id: data.lecture_id,
        batch_id: data.batch_id,
        status: data.status,
      });
    }
    return { ok: true };
  });

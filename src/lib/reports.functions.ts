import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

export const getStudentReport = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { batch_id: string; user_id?: string }) =>
    z.object({ batch_id: z.string().uuid(), user_id: z.string().uuid().optional() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const targetUserId = data.user_id ?? context.userId;

    // Authorization: self, batch owner, or admin
    const { data: batch } = await supabaseAdmin
      .from("batches")
      .select(
        "id, name, start_date, end_date, validity_days, course_id, courses(title, slug, instructor_id)",
      )
      .eq("id", data.batch_id)
      .maybeSingle();
    if (!batch) throw new Error("Batch not found");

    if (targetUserId !== context.userId) {
      const { data: roleRow } = await supabaseAdmin
        .from("user_roles")
        .select("role")
        .eq("user_id", context.userId)
        .eq("role", "admin")
        .maybeSingle();
      const isOwner = (batch as any).courses?.instructor_id === context.userId;
      if (!roleRow && !isOwner) throw new Error("Forbidden");
    }

    const [{ data: profile }, { data: enrollment }, { data: lectures }] = await Promise.all([
      supabaseAdmin
        .from("profiles")
        .select("id, full_name, avatar_url")
        .eq("id", targetUserId)
        .maybeSingle(),
      supabaseAdmin
        .from("enrollments")
        .select("payment_status, expires_at, purchased_at, amount_paid")
        .eq("user_id", targetUserId)
        .eq("batch_id", data.batch_id)
        .maybeSingle(),
      supabaseAdmin
        .from("lectures")
        .select("id, title, kind, duration_min, order_index, scheduled_at")
        .eq("batch_id", data.batch_id)
        .order("order_index"),
    ]);

    const lectureIds = (lectures ?? []).map((l: any) => l.id);
    const [
      { data: progress },
      { data: attendance },
      { data: quizzes },
      { data: assignments },
      { data: certificate },
      { data: discussions },
    ] = await Promise.all([
      lectureIds.length
        ? supabaseAdmin
            .from("lecture_progress")
            .select("lecture_id, watched_seconds, completed")
            .eq("user_id", targetUserId)
            .in("lecture_id", lectureIds)
        : Promise.resolve({ data: [] as any[] }),
      lectureIds.length
        ? supabaseAdmin
            .from("attendance")
            .select("lecture_id, status, joined_at, watched_seconds")
            .eq("user_id", targetUserId)
            .in("lecture_id", lectureIds)
        : Promise.resolve({ data: [] as any[] }),
      supabaseAdmin
        .from("quizzes")
        .select("id, title, pass_percent")
        .eq("batch_id", data.batch_id)
        .eq("is_published", true),
      supabaseAdmin
        .from("assignments")
        .select(
          "id, title, max_marks, due_at, assignment_submissions(user_id, marks_awarded, submitted_at, feedback)",
        )
        .eq("batch_id", data.batch_id),
      supabaseAdmin
        .from("certificates")
        .select("serial_no, issued_at")
        .eq("user_id", targetUserId)
        .eq("batch_id", data.batch_id)
        .maybeSingle(),
      supabaseAdmin
        .from("discussions")
        .select("id, parent_id")
        .eq("batch_id", data.batch_id)
        .eq("user_id", targetUserId),
    ]);

    // Fetch quiz attempts for this user across these quizzes
    const quizIds = (quizzes ?? []).map((q: any) => q.id);
    const { data: attempts } = quizIds.length
      ? await supabaseAdmin
          .from("quiz_attempts")
          .select("quiz_id, score_percent, passed, submitted_at")
          .eq("user_id", targetUserId)
          .in("quiz_id", quizIds)
      : { data: [] as any[] };

    // Aggregates
    const totalDuration = (lectures ?? []).reduce(
      (s: number, l: any) => s + (l.duration_min || 0),
      0,
    );
    const watchedSec = (progress ?? []).reduce(
      (s: number, p: any) => s + (p.watched_seconds || 0),
      0,
    );
    const watchedMin = Math.floor(watchedSec / 60);
    const overallPct = totalDuration
      ? Math.min(100, Math.round((watchedMin / totalDuration) * 100))
      : 0;
    const completedLectures = (progress ?? []).filter((p: any) => p.completed).length;
    const presentCount = (attendance ?? []).filter((a: any) => a.status === "present").length;
    const partialCount = (attendance ?? []).filter((a: any) => a.status === "partial").length;
    const attendancePct = (lectures ?? []).length
      ? Math.round((presentCount / (lectures ?? []).length) * 100)
      : 0;

    // Filter submissions to this user
    const assignmentRows = (assignments ?? []).map((a: any) => {
      const sub =
        (a.assignment_submissions ?? []).find((s: any) => s.user_id === targetUserId) ?? null;
      return {
        id: a.id,
        title: a.title,
        max_marks: a.max_marks,
        due_at: a.due_at,
        marks_awarded: sub?.marks_awarded ?? null,
        submitted_at: sub?.submitted_at ?? null,
        feedback: sub?.feedback ?? null,
      };
    });
    const gradedAssignments = assignmentRows.filter((a) => a.marks_awarded != null);
    const avgAssignment = gradedAssignments.length
      ? Math.round(
          gradedAssignments.reduce((s, a) => s + (a.marks_awarded! / (a.max_marks || 1)) * 100, 0) /
            gradedAssignments.length,
        )
      : 0;

    const quizRows = (quizzes ?? []).map((q: any) => {
      const qa = (attempts ?? []).filter((a: any) => a.quiz_id === q.id);
      const best = qa.reduce(
        (b: any, a: any) => (!b || a.score_percent > b.score_percent ? a : b),
        null,
      );
      return {
        id: q.id,
        title: q.title,
        pass_percent: q.pass_percent,
        attempts: qa.length,
        best_score: best?.score_percent ?? null,
        passed: !!best?.passed,
      };
    });
    const passedQuizzes = quizRows.filter((q) => q.passed).length;
    const avgQuiz = quizRows.length
      ? Math.round(quizRows.reduce((s, q) => s + (q.best_score ?? 0), 0) / quizRows.length)
      : 0;

    const questionsAsked = (discussions ?? []).filter((d: any) => !d.parent_id).length;
    const repliesPosted = (discussions ?? []).filter((d: any) => d.parent_id).length;

    return {
      generated_at: new Date().toISOString(),
      student: profile,
      batch,
      enrollment,
      summary: {
        totalLectures: (lectures ?? []).length,
        completedLectures,
        watchedMin,
        totalDuration,
        overallPct,
        attendancePct,
        presentCount,
        partialCount,
        quizzesCount: quizRows.length,
        passedQuizzes,
        avgQuiz,
        assignmentsCount: assignmentRows.length,
        gradedAssignments: gradedAssignments.length,
        avgAssignment,
        questionsAsked,
        repliesPosted,
        certificate,
      },
      lectures: (lectures ?? []).map((l: any) => {
        const p = (progress ?? []).find((x: any) => x.lecture_id === l.id);
        const a = (attendance ?? []).find((x: any) => x.lecture_id === l.id);
        return {
          ...l,
          watched_seconds: p?.watched_seconds ?? 0,
          completed: !!p?.completed,
          attendance_status: a?.status ?? null,
        };
      }),
      quizzes: quizRows,
      assignments: assignmentRows,
    };
  });

export const listBatchStudentsForReports = createServerFn({ method: "GET" })
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
    const { data: roleRow } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    const isOwner = (batch as any).courses?.instructor_id === context.userId;
    if (!roleRow && !isOwner) throw new Error("Forbidden");

    const { data: ens } = await supabaseAdmin
      .from("enrollments")
      .select("user_id")
      .eq("batch_id", data.batch_id)
      .eq("payment_status", "success");
    const ids = (ens ?? []).map((e: any) => e.user_id);
    const { data: profs } = ids.length
      ? await supabaseAdmin.from("profiles").select("id, full_name, avatar_url").in("id", ids)
      : { data: [] as any[] };
    return { students: profs ?? [] };
  });

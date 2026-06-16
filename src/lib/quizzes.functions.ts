import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const OptionsSchema = z
  .array(z.object({ id: z.string().min(1).max(8), text: z.string().min(1).max(500) }))
  .min(2)
  .max(8);

// Admin/instructor: list quizzes for a batch with question counts
export const listBatchQuizzes = createServerFn({ method: "GET" })
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
    const isOwner = (batch as any).courses?.instructor_id === context.userId;
    const isAdmin = !!role;
    const isMember = !isAdmin && !isOwner; // for members we filter to published below
    let query = supabaseAdmin
      .from("quizzes")
      .select(
        "id,title,description,pass_percent,time_limit_min,is_published,lecture_id, quiz_questions(count)",
      )
      .eq("batch_id", data.batch_id)
      .order("created_at", { ascending: true });
    if (isMember) {
      const { data: en } = await supabaseAdmin
        .from("enrollments")
        .select("id")
        .eq("user_id", context.userId)
        .eq("batch_id", data.batch_id)
        .eq("payment_status", "success")
        .maybeSingle();
      if (!en) return { quizzes: [], canManage: false };
      query = query.eq("is_published", true);
    }
    const { data: quizzes } = await query;
    return { quizzes: quizzes ?? [], canManage: isAdmin || isOwner };
  });

export const upsertQuiz = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: any) =>
    z
      .object({
        id: z.string().uuid().optional(),
        batch_id: z.string().uuid(),
        title: z.string().min(1).max(200),
        description: z.string().max(2000).optional().nullable(),
        pass_percent: z.coerce.number().int().min(0).max(100).default(60),
        time_limit_min: z.coerce.number().int().min(0).max(360).optional().nullable(),
        is_published: z.boolean().default(false),
        lecture_id: z.string().uuid().optional().nullable(),
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
    if (data.id) {
      const { error } = await supabaseAdmin
        .from("quizzes")
        .update({
          title: data.title,
          description: data.description,
          pass_percent: data.pass_percent,
          time_limit_min: data.time_limit_min,
          is_published: data.is_published,
          lecture_id: data.lecture_id,
        })
        .eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }
    const { data: created, error } = await supabaseAdmin
      .from("quizzes")
      .insert({
        batch_id: data.batch_id,
        title: data.title,
        description: data.description,
        pass_percent: data.pass_percent,
        time_limit_min: data.time_limit_min,
        is_published: data.is_published,
        lecture_id: data.lecture_id,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: created.id };
  });

export const deleteQuiz = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: q } = await supabaseAdmin
      .from("quizzes")
      .select("batch_id, batches(courses(instructor_id))")
      .eq("id", data.id)
      .maybeSingle();
    if (!q) throw new Error("Quiz not found");
    const { data: role } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!role && (q as any).batches?.courses?.instructor_id !== context.userId)
      throw new Error("Forbidden");
    const { error } = await supabaseAdmin.from("quizzes").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Admin: full quiz with correct answers
export const getQuizAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { quiz_id: string }) => z.object({ quiz_id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: quiz } = await supabaseAdmin
      .from("quizzes")
      .select("*, batches(course_id, courses(instructor_id))")
      .eq("id", data.quiz_id)
      .maybeSingle();
    if (!quiz) throw new Error("Not found");
    const { data: role } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!role && (quiz as any).batches?.courses?.instructor_id !== context.userId)
      throw new Error("Forbidden");
    const { data: questions } = await supabaseAdmin
      .from("quiz_questions")
      .select("*")
      .eq("quiz_id", data.quiz_id)
      .order("order_index");
    return { quiz, questions: questions ?? [] };
  });

export const saveQuizQuestions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: any) =>
    z
      .object({
        quiz_id: z.string().uuid(),
        questions: z
          .array(
            z.object({
              id: z.string().uuid().optional(),
              prompt: z.string().min(1).max(2000),
              options: OptionsSchema,
              correct_option: z.string().min(1).max(8),
              marks: z.coerce.number().int().min(1).max(100).default(1),
              order_index: z.coerce.number().int().min(0).max(1000),
            }),
          )
          .max(100),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: q } = await supabaseAdmin
      .from("quizzes")
      .select("batch_id, batches(courses(instructor_id))")
      .eq("id", data.quiz_id)
      .maybeSingle();
    if (!q) throw new Error("Quiz not found");
    const { data: role } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!role && (q as any).batches?.courses?.instructor_id !== context.userId)
      throw new Error("Forbidden");
    // Replace all questions
    await supabaseAdmin.from("quiz_questions").delete().eq("quiz_id", data.quiz_id);
    if (data.questions.length) {
      const rows = data.questions.map((qq) => ({
        quiz_id: data.quiz_id,
        prompt: qq.prompt,
        options: qq.options,
        correct_option: qq.correct_option,
        marks: qq.marks,
        order_index: qq.order_index,
      }));
      const { error } = await supabaseAdmin.from("quiz_questions").insert(rows);
      if (error) throw new Error(error.message);
    }
    return { ok: true, count: data.questions.length };
  });

// Student: get quiz without correct answers
export const getQuizForStudent = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { quiz_id: string }) => z.object({ quiz_id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: quiz } = await supabaseAdmin
      .from("quizzes")
      .select("id,batch_id,title,description,pass_percent,time_limit_min,is_published")
      .eq("id", data.quiz_id)
      .maybeSingle();
    if (!quiz || !quiz.is_published) throw new Error("Quiz not available");
    const { data: en } = await supabaseAdmin
      .from("enrollments")
      .select("id")
      .eq("user_id", context.userId)
      .eq("batch_id", quiz.batch_id)
      .eq("payment_status", "success")
      .maybeSingle();
    if (!en) throw new Error("Enrollment required");
    const { data: questions } = await supabaseAdmin
      .from("quiz_questions")
      .select("id,prompt,options,marks,order_index")
      .eq("quiz_id", data.quiz_id)
      .order("order_index");
    const { data: attempts } = await supabaseAdmin
      .from("quiz_attempts")
      .select("id,score,max_score,passed,submitted_at")
      .eq("user_id", context.userId)
      .eq("quiz_id", data.quiz_id)
      .order("submitted_at", { ascending: false });
    return { quiz, questions: questions ?? [], attempts: attempts ?? [] };
  });

export const submitQuizAttempt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: any) =>
    z
      .object({
        quiz_id: z.string().uuid(),
        answers: z.record(z.string().uuid(), z.string().min(1).max(8)),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: quiz } = await supabaseAdmin
      .from("quizzes")
      .select("id,batch_id,pass_percent,is_published")
      .eq("id", data.quiz_id)
      .maybeSingle();
    if (!quiz || !quiz.is_published) throw new Error("Quiz not available");
    const { data: en } = await supabaseAdmin
      .from("enrollments")
      .select("id")
      .eq("user_id", context.userId)
      .eq("batch_id", quiz.batch_id)
      .eq("payment_status", "success")
      .maybeSingle();
    if (!en) throw new Error("Enrollment required");
    const { data: questions } = await supabaseAdmin
      .from("quiz_questions")
      .select("id,correct_option,marks")
      .eq("quiz_id", data.quiz_id);
    let score = 0,
      max = 0;
    (questions ?? []).forEach((q: any) => {
      max += q.marks;
      if (data.answers[q.id] && data.answers[q.id] === q.correct_option) score += q.marks;
    });
    const passed = max > 0 && (score / max) * 100 >= quiz.pass_percent;
    const { data: created, error } = await supabaseAdmin
      .from("quiz_attempts")
      .insert({
        quiz_id: data.quiz_id,
        user_id: context.userId,
        answers: data.answers,
        score,
        max_score: max,
        passed,
        submitted_at: new Date().toISOString(),
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: created.id, score, max_score: max, passed };
  });

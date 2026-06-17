import { c as createServerRpc } from "./createServerRpc-ZYejvlcI.mjs";
import { c as createServerFn } from "./server-CtNwD_lG.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-CZNhPrkM.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "firebase-admin/app";
import "firebase-admin/auth";
import "firebase-admin/firestore";
import "firebase-admin/storage";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "stream";
import "util";
import "crypto";
import "../_libs/isbot.mjs";
import "./client.server-B5gl9oyA.mjs";
const getStudentReport_createServerFn_handler = createServerRpc({
  id: "057a1226280c368e5edfce5a6ba73455a52d93e5ab7fb212b6f5d39899cefff9",
  name: "getStudentReport",
  filename: "src/lib/reports.functions.ts"
}, (opts) => getStudentReport.__executeServer(opts));
const getStudentReport = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid(),
  user_id: stringType().uuid().optional()
}).parse(d)).handler(getStudentReport_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const targetUserId = data.user_id ?? context.userId;
  const {
    data: batch
  } = await supabaseAdmin.from("batches").select("id, name, start_date, end_date, validity_days, course_id, courses(title, slug, instructor_id)").eq("id", data.batch_id).maybeSingle();
  if (!batch) throw new Error("Batch not found");
  if (targetUserId !== context.userId) {
    const {
      data: roleRow
    } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
    const isOwner = batch.courses?.instructor_id === context.userId;
    if (!roleRow && !isOwner) throw new Error("Forbidden");
  }
  const [{
    data: profile
  }, {
    data: enrollment
  }, {
    data: lectures
  }] = await Promise.all([supabaseAdmin.from("profiles").select("id, full_name, avatar_url").eq("id", targetUserId).maybeSingle(), supabaseAdmin.from("enrollments").select("payment_status, expires_at, purchased_at, amount_paid").eq("user_id", targetUserId).eq("batch_id", data.batch_id).maybeSingle(), supabaseAdmin.from("lectures").select("id, title, kind, duration_min, order_index, scheduled_at").eq("batch_id", data.batch_id).order("order_index")]);
  const lectureIds = (lectures ?? []).map((l) => l.id);
  const [{
    data: progress
  }, {
    data: attendance
  }, {
    data: quizzes
  }, {
    data: assignments
  }, {
    data: certificate
  }, {
    data: discussions
  }] = await Promise.all([lectureIds.length ? supabaseAdmin.from("lecture_progress").select("lecture_id, watched_seconds, completed").eq("user_id", targetUserId).in("lecture_id", lectureIds) : Promise.resolve({
    data: []
  }), lectureIds.length ? supabaseAdmin.from("attendance").select("lecture_id, status, joined_at, watched_seconds").eq("user_id", targetUserId).in("lecture_id", lectureIds) : Promise.resolve({
    data: []
  }), supabaseAdmin.from("quizzes").select("id, title, pass_percent").eq("batch_id", data.batch_id).eq("is_published", true), supabaseAdmin.from("assignments").select("id, title, max_marks, due_at, assignment_submissions(user_id, marks_awarded, submitted_at, feedback)").eq("batch_id", data.batch_id), supabaseAdmin.from("certificates").select("serial_no, issued_at").eq("user_id", targetUserId).eq("batch_id", data.batch_id).maybeSingle(), supabaseAdmin.from("discussions").select("id, parent_id").eq("batch_id", data.batch_id).eq("user_id", targetUserId)]);
  const quizIds = (quizzes ?? []).map((q) => q.id);
  const {
    data: attempts
  } = quizIds.length ? await supabaseAdmin.from("quiz_attempts").select("quiz_id, score_percent, passed, submitted_at").eq("user_id", targetUserId).in("quiz_id", quizIds) : {
    data: []
  };
  const totalDuration = (lectures ?? []).reduce((s, l) => s + (l.duration_min || 0), 0);
  const watchedSec = (progress ?? []).reduce((s, p) => s + (p.watched_seconds || 0), 0);
  const watchedMin = Math.floor(watchedSec / 60);
  const overallPct = totalDuration ? Math.min(100, Math.round(watchedMin / totalDuration * 100)) : 0;
  const completedLectures = (progress ?? []).filter((p) => p.completed).length;
  const presentCount = (attendance ?? []).filter((a) => a.status === "present").length;
  const partialCount = (attendance ?? []).filter((a) => a.status === "partial").length;
  const attendancePct = (lectures ?? []).length ? Math.round(presentCount / (lectures ?? []).length * 100) : 0;
  const assignmentRows = (assignments ?? []).map((a) => {
    const sub = (a.assignment_submissions ?? []).find((s) => s.user_id === targetUserId) ?? null;
    return {
      id: a.id,
      title: a.title,
      max_marks: a.max_marks,
      due_at: a.due_at,
      marks_awarded: sub?.marks_awarded ?? null,
      submitted_at: sub?.submitted_at ?? null,
      feedback: sub?.feedback ?? null
    };
  });
  const gradedAssignments = assignmentRows.filter((a) => a.marks_awarded != null);
  const avgAssignment = gradedAssignments.length ? Math.round(gradedAssignments.reduce((s, a) => s + a.marks_awarded / (a.max_marks || 1) * 100, 0) / gradedAssignments.length) : 0;
  const quizRows = (quizzes ?? []).map((q) => {
    const qa = (attempts ?? []).filter((a) => a.quiz_id === q.id);
    const best = qa.reduce((b, a) => !b || a.score_percent > b.score_percent ? a : b, null);
    return {
      id: q.id,
      title: q.title,
      pass_percent: q.pass_percent,
      attempts: qa.length,
      best_score: best?.score_percent ?? null,
      passed: !!best?.passed
    };
  });
  const passedQuizzes = quizRows.filter((q) => q.passed).length;
  const avgQuiz = quizRows.length ? Math.round(quizRows.reduce((s, q) => s + (q.best_score ?? 0), 0) / quizRows.length) : 0;
  const questionsAsked = (discussions ?? []).filter((d) => !d.parent_id).length;
  const repliesPosted = (discussions ?? []).filter((d) => d.parent_id).length;
  return {
    generated_at: (/* @__PURE__ */ new Date()).toISOString(),
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
      certificate
    },
    lectures: (lectures ?? []).map((l) => {
      const p = (progress ?? []).find((x) => x.lecture_id === l.id);
      const a = (attendance ?? []).find((x) => x.lecture_id === l.id);
      return {
        ...l,
        watched_seconds: p?.watched_seconds ?? 0,
        completed: !!p?.completed,
        attendance_status: a?.status ?? null
      };
    }),
    quizzes: quizRows,
    assignments: assignmentRows
  };
});
const listBatchStudentsForReports_createServerFn_handler = createServerRpc({
  id: "172e5bb5ae5b85ff822b81675d65589c2e083e85e260c8188aacb7842c5fd596",
  name: "listBatchStudentsForReports",
  filename: "src/lib/reports.functions.ts"
}, (opts) => listBatchStudentsForReports.__executeServer(opts));
const listBatchStudentsForReports = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid()
}).parse(d)).handler(listBatchStudentsForReports_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: batch
  } = await supabaseAdmin.from("batches").select("id, courses(instructor_id)").eq("id", data.batch_id).maybeSingle();
  if (!batch) throw new Error("Batch not found");
  const {
    data: roleRow
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  const isOwner = batch.courses?.instructor_id === context.userId;
  if (!roleRow && !isOwner) throw new Error("Forbidden");
  const {
    data: ens
  } = await supabaseAdmin.from("enrollments").select("user_id").eq("batch_id", data.batch_id).eq("payment_status", "success");
  const ids = (ens ?? []).map((e) => e.user_id);
  const {
    data: profs
  } = ids.length ? await supabaseAdmin.from("profiles").select("id, full_name, avatar_url").in("id", ids) : {
    data: []
  };
  return {
    students: profs ?? []
  };
});
export {
  getStudentReport_createServerFn_handler,
  listBatchStudentsForReports_createServerFn_handler
};

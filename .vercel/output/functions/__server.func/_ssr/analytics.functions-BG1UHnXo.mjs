import { c as createServerRpc } from "./createServerRpc-ZYejvlcI.mjs";
import { c as createServerFn } from "./server-CtNwD_lG.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-CZNhPrkM.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "firebase-admin/app";
import "firebase-admin/auth";
import "firebase-admin/firestore";
import "firebase-admin/storage";
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
const getInstructorAnalytics_createServerFn_handler = createServerRpc({
  id: "808605e1235f5f4562957278169b12dae2f82b0a620f304c322c9c6c22b5d86d",
  name: "getInstructorAnalytics",
  filename: "src/lib/analytics.functions.ts"
}, (opts) => getInstructorAnalytics.__executeServer(opts));
const getInstructorAnalytics = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).handler(getInstructorAnalytics_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: roleRow
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  const isAdmin = !!roleRow;
  let coursesQ = supabaseAdmin.from("courses").select("id, title, slug, instructor_id");
  if (!isAdmin) coursesQ = coursesQ.eq("instructor_id", context.userId);
  const {
    data: courses
  } = await coursesQ;
  const courseIds = (courses ?? []).map((c) => c.id);
  if (courseIds.length === 0) {
    return {
      scope: isAdmin ? "admin" : "instructor",
      totals: {
        revenue: 0,
        enrollments: 0,
        activeStudents: 0,
        courses: 0,
        batches: 0
      },
      revenueByMonth: [],
      enrollmentsByMonth: [],
      topBatches: [],
      coursesCount: 0
    };
  }
  const {
    data: batches
  } = await supabaseAdmin.from("batches").select("id, name, course_id, price_inr, is_active").in("course_id", courseIds);
  const batchIds = (batches ?? []).map((b) => b.id);
  const {
    data: enrollments
  } = batchIds.length ? await supabaseAdmin.from("enrollments").select("id, user_id, batch_id, amount_paid, payment_status, purchased_at, expires_at").in("batch_id", batchIds) : {
    data: []
  };
  const paid = (enrollments ?? []).filter((e) => e.payment_status === "success");
  const now = Date.now();
  const activeStudents = new Set(paid.filter((e) => !e.expires_at || new Date(e.expires_at).getTime() > now).map((e) => e.user_id)).size;
  const totalRevenue = paid.reduce((s, e) => s + Number(e.amount_paid || 0), 0);
  const months = [];
  const d = /* @__PURE__ */ new Date();
  d.setDate(1);
  for (let i = 5; i >= 0; i--) {
    const m = new Date(d.getFullYear(), d.getMonth() - i, 1);
    months.push({
      key: `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, "0")}`,
      label: m.toLocaleString("en-US", {
        month: "short"
      })
    });
  }
  const revByMonth = new Map(months.map((m) => [m.key, 0]));
  const enrByMonth = new Map(months.map((m) => [m.key, 0]));
  for (const e of paid) {
    if (!e.purchased_at) continue;
    const dt = new Date(e.purchased_at);
    const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`;
    if (revByMonth.has(key)) {
      revByMonth.set(key, (revByMonth.get(key) || 0) + Number(e.amount_paid || 0));
      enrByMonth.set(key, (enrByMonth.get(key) || 0) + 1);
    }
  }
  const batchMap = new Map((batches ?? []).map((b) => [b.id, b]));
  const courseMap = new Map((courses ?? []).map((c) => [c.id, c]));
  const perBatch = /* @__PURE__ */ new Map();
  for (const e of paid) {
    const cur = perBatch.get(e.batch_id) || {
      revenue: 0,
      enrollments: 0
    };
    cur.revenue += Number(e.amount_paid || 0);
    cur.enrollments += 1;
    perBatch.set(e.batch_id, cur);
  }
  const topBatches = Array.from(perBatch.entries()).map(([batchId, stats]) => {
    const b = batchMap.get(batchId);
    const c = b ? courseMap.get(b.course_id) : null;
    return {
      batch_id: batchId,
      batch_name: b?.name ?? "—",
      course_title: c?.title ?? "—",
      ...stats
    };
  }).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  return {
    scope: isAdmin ? "admin" : "instructor",
    totals: {
      revenue: totalRevenue,
      enrollments: paid.length,
      activeStudents,
      courses: courses?.length ?? 0,
      batches: batches?.length ?? 0
    },
    revenueByMonth: months.map((m) => ({
      month: m.label,
      revenue: revByMonth.get(m.key) || 0
    })),
    enrollmentsByMonth: months.map((m) => ({
      month: m.label,
      enrollments: enrByMonth.get(m.key) || 0
    })),
    topBatches
  };
});
export {
  getInstructorAnalytics_createServerFn_handler
};

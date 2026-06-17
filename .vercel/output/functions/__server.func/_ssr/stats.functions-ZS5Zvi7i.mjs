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
const getStudentStats_createServerFn_handler = createServerRpc({
  id: "336bd982cb82f92838daa56b06571bfde39af45307a1734d44fbbcf206f183aa",
  name: "getStudentStats",
  filename: "src/lib/stats.functions.ts"
}, (opts) => getStudentStats.__executeServer(opts));
const getStudentStats = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).handler(getStudentStats_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const userId = context.userId;
  const {
    data: enrollments
  } = await supabaseAdmin.from("enrollments").select("id, batch_id, payment_status, expires_at").eq("user_id", userId).eq("payment_status", "success");
  const active = (enrollments ?? []).filter((e) => !e.expires_at || new Date(e.expires_at) > /* @__PURE__ */ new Date());
  const {
    data: progress
  } = await supabaseAdmin.from("lecture_progress").select("watched_seconds, completed, updated_at").eq("user_id", userId);
  const watchedSec = (progress ?? []).reduce((s, p) => s + (p.watched_seconds || 0), 0);
  const hoursLearned = Math.round(watchedSec / 3600 * 10) / 10;
  const {
    count: certCount
  } = await supabaseAdmin.from("certificates").select("id", {
    count: "exact",
    head: true
  }).eq("user_id", userId);
  const days = new Set((progress ?? []).map((p) => p.updated_at?.slice(0, 10)).filter(Boolean));
  let streak = 0;
  const day = /* @__PURE__ */ new Date();
  while (true) {
    const key = day.toISOString().slice(0, 10);
    if (days.has(key)) {
      streak += 1;
      day.setDate(day.getDate() - 1);
    } else {
      if (streak === 0) {
        day.setDate(day.getDate() - 1);
        const yk = day.toISOString().slice(0, 10);
        if (!days.has(yk)) break;
      } else break;
    }
    if (streak > 365) break;
  }
  return {
    activeCourses: active.length,
    streak,
    hoursLearned,
    certificates: certCount ?? 0
  };
});
export {
  getStudentStats_createServerFn_handler
};

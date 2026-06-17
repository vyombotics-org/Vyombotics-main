import { c as createServerRpc } from "./createServerRpc-ZYejvlcI.mjs";
import { c as createServerFn } from "./server-CtNwD_lG.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-CZNhPrkM.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "firebase-admin/app";
import "firebase-admin/auth";
import "firebase-admin/firestore";
import "firebase-admin/storage";
import { o as objectType, b as booleanType, a as arrayType, s as stringType } from "../_libs/zod.mjs";
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
const listMyNotifications_createServerFn_handler = createServerRpc({
  id: "acdc1590236f0839542f983a97a7193af437f8125c921a77e6feea3b73ccec73",
  name: "listMyNotifications",
  filename: "src/lib/notifications.functions.ts"
}, (opts) => listMyNotifications.__executeServer(opts));
const listMyNotifications = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).handler(listMyNotifications_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data
  } = await supabaseAdmin.from("notifications").select("id, type, title, body, link, is_read, created_at").eq("user_id", context.userId).order("created_at", {
    ascending: false
  }).limit(50);
  const unread = (data ?? []).filter((n) => !n.is_read).length;
  return {
    notifications: data ?? [],
    unread
  };
});
const markNotificationsRead_createServerFn_handler = createServerRpc({
  id: "6bfebce53de79ea584d348eedfd311153ea2846ececed2e5a3b23fad942cd7a3",
  name: "markNotificationsRead",
  filename: "src/lib/notifications.functions.ts"
}, (opts) => markNotificationsRead.__executeServer(opts));
const markNotificationsRead = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  ids: arrayType(stringType().uuid()).max(100).optional(),
  all: booleanType().optional()
}).parse(d)).handler(markNotificationsRead_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  let q = supabaseAdmin.from("notifications").update({
    is_read: true
  }).eq("user_id", context.userId);
  if (!data.all && data.ids?.length) q = q.in("id", data.ids);
  const {
    error
  } = await q;
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  listMyNotifications_createServerFn_handler,
  markNotificationsRead_createServerFn_handler
};

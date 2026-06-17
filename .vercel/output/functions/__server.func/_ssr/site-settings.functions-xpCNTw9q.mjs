import { c as createServerRpc } from "./createServerRpc-ZYejvlcI.mjs";
import { c as createServerFn } from "./server-CtNwD_lG.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-CZNhPrkM.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "firebase-admin/app";
import "firebase-admin/auth";
import "firebase-admin/firestore";
import "firebase-admin/storage";
import { o as objectType, d as anyType, e as enumType } from "../_libs/zod.mjs";
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
const ALLOWED_KEYS = ["hero", "announcement", "floating_video", "stem_pillars", "batch_announcements", "announcements_section", "stem_voices", "faculty_page", "feedback_page", "faq_page"];
const getSiteSettings_createServerFn_handler = createServerRpc({
  id: "6e1c851c26039a1e477558b67785ba4bc850b6cd7fffb599cf92eb098ba0b277",
  name: "getSiteSettings",
  filename: "src/lib/site-settings.functions.ts"
}, (opts) => getSiteSettings.__executeServer(opts));
const getSiteSettings = createServerFn({
  method: "GET"
}).handler(getSiteSettings_createServerFn_handler, async () => {
  try {
    const {
      supabaseAdmin
    } = await import("./client.server-CwXH_WTR.mjs");
    const {
      data,
      error
    } = await supabaseAdmin.from("site_settings").select("key, value").in("key", ALLOWED_KEYS);
    if (error) {
      console.error("[getSiteSettings] Database query error:", error);
      return {
        settings: {}
      };
    }
    const map = {};
    for (const row of data ?? []) map[row.key] = row.value;
    return {
      settings: map
    };
  } catch (err) {
    console.error("[getSiteSettings] Failed to fetch settings:", err);
    return {
      settings: {}
    };
  }
});
const UpsertInput = objectType({
  key: enumType(ALLOWED_KEYS),
  value: anyType()
});
const upsertSiteSetting_createServerFn_handler = createServerRpc({
  id: "861cf90c948cc83c2e01b6663178fa5a6aec216f2542fe97d8c03f2989178fdb",
  name: "upsertSiteSetting",
  filename: "src/lib/site-settings.functions.ts"
}, (opts) => upsertSiteSetting.__executeServer(opts));
const upsertSiteSetting = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => UpsertInput.parse(d)).handler(upsertSiteSetting_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: roleRow
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  if (!roleRow) throw new Error("Forbidden: admin only");
  const {
    data: row,
    error
  } = await supabaseAdmin.from("site_settings").upsert({
    key: data.key,
    value: data.value
  }, {
    onConflict: "key"
  }).select().single();
  if (error) throw new Error(error.message);
  return {
    setting: row
  };
});
export {
  getSiteSettings_createServerFn_handler,
  upsertSiteSetting_createServerFn_handler
};

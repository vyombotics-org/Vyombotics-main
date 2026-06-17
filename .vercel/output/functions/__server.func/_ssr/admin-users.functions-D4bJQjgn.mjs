import { c as createServerRpc } from "./createServerRpc-ZYejvlcI.mjs";
import { c as createServerFn } from "./server-CtNwD_lG.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-CZNhPrkM.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "firebase-admin/app";
import "firebase-admin/auth";
import "firebase-admin/firestore";
import "firebase-admin/storage";
import { e as enumType, o as objectType, b as booleanType, s as stringType } from "../_libs/zod.mjs";
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
const RoleEnum = enumType(["admin", "instructor", "student"]);
async function isAdmin(ctx) {
  const {
    data
  } = await ctx.supabase.from("user_roles").select("role").eq("user_id", ctx.userId).eq("role", "admin").maybeSingle();
  return !!data;
}
const claimAdminIfNone_createServerFn_handler = createServerRpc({
  id: "82ab85f3856aff367c771924b3f19a46c93aa368fa2bb2a4ddd66a10699635dc",
  name: "claimAdminIfNone",
  filename: "src/lib/admin-users.functions.ts"
}, (opts) => claimAdminIfNone.__executeServer(opts));
const claimAdminIfNone = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).handler(claimAdminIfNone_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    count,
    error: cErr
  } = await supabaseAdmin.from("user_roles").select("user_id", {
    count: "exact",
    head: true
  }).eq("role", "admin");
  if (cErr) throw new Error(cErr.message);
  if ((count ?? 0) > 0) throw new Error("An admin already exists. Ask the existing admin to grant you access.");
  const {
    error
  } = await supabaseAdmin.from("user_roles").insert({
    user_id: context.userId,
    role: "admin"
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const adminExists_createServerFn_handler = createServerRpc({
  id: "fb11898bcd23ad5f71ed4ede1e0734bc5461e1ff8aac3106bd295cf12a228be0",
  name: "adminExists",
  filename: "src/lib/admin-users.functions.ts"
}, (opts) => adminExists.__executeServer(opts));
const adminExists = createServerFn({
  method: "GET"
}).handler(adminExists_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    count,
    error
  } = await supabaseAdmin.from("user_roles").select("user_id", {
    count: "exact",
    head: true
  }).eq("role", "admin");
  if (error) throw new Error(error.message);
  return {
    exists: (count ?? 0) > 0
  };
});
const listUsersWithRoles_createServerFn_handler = createServerRpc({
  id: "c8bce056c4058e2437e7cff8c66ed47a718b995c993780b7a569a122494bf466",
  name: "listUsersWithRoles",
  filename: "src/lib/admin-users.functions.ts"
}, (opts) => listUsersWithRoles.__executeServer(opts));
const listUsersWithRoles = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).handler(listUsersWithRoles_createServerFn_handler, async ({
  context
}) => {
  if (!await isAdmin(context)) throw new Error("Forbidden: admin only");
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: authUsers,
    error: aErr
  } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 200
  });
  if (aErr || !authUsers) throw new Error(aErr?.message || "Failed to list users");
  const ids = authUsers.users.map((u) => u.id);
  const [{
    data: profiles
  }, {
    data: roles
  }] = await Promise.all([supabaseAdmin.from("profiles").select("id, full_name, avatar_url").in("id", ids), supabaseAdmin.from("user_roles").select("user_id, role").in("user_id", ids)]);
  const roleMap = /* @__PURE__ */ new Map();
  (roles ?? []).forEach((r) => {
    const arr = roleMap.get(r.user_id) ?? [];
    arr.push(r.role);
    roleMap.set(r.user_id, arr);
  });
  const profileMap = /* @__PURE__ */ new Map();
  (profiles ?? []).forEach((p) => profileMap.set(p.id, p));
  const users = authUsers.users.map((u) => ({
    id: u.id,
    email: u.email ?? "",
    full_name: profileMap.get(u.id)?.full_name ?? u.email?.split("@")[0] ?? "",
    avatar_url: profileMap.get(u.id)?.avatar_url ?? null,
    created_at: u.created_at,
    roles: roleMap.get(u.id) ?? []
  }));
  return {
    users
  };
});
const setUserRole_createServerFn_handler = createServerRpc({
  id: "1e217167414b4924fd876e4f13f21b9d69fbcae54912212d8878ffdec680c99c",
  name: "setUserRole",
  filename: "src/lib/admin-users.functions.ts"
}, (opts) => setUserRole.__executeServer(opts));
const setUserRole = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  user_id: stringType().uuid(),
  role: RoleEnum,
  enabled: booleanType()
}).parse(d)).handler(setUserRole_createServerFn_handler, async ({
  data,
  context
}) => {
  if (!await isAdmin(context)) throw new Error("Forbidden: admin only");
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  if (data.role === "admin" && !data.enabled) {
    const {
      count
    } = await supabaseAdmin.from("user_roles").select("user_id", {
      count: "exact",
      head: true
    }).eq("role", "admin");
    if ((count ?? 0) <= 1 && data.user_id === context.userId) {
      throw new Error("You are the only admin — assign another admin first.");
    }
  }
  if (data.enabled) {
    const {
      error
    } = await supabaseAdmin.from("user_roles").upsert({
      user_id: data.user_id,
      role: data.role
    }, {
      onConflict: "user_id,role"
    });
    if (error) throw new Error(error.message);
  } else {
    const {
      error
    } = await supabaseAdmin.from("user_roles").delete().eq("user_id", data.user_id).eq("role", data.role);
    if (error) throw new Error(error.message);
  }
  return {
    ok: true
  };
});
export {
  adminExists_createServerFn_handler,
  claimAdminIfNone_createServerFn_handler,
  listUsersWithRoles_createServerFn_handler,
  setUserRole_createServerFn_handler
};

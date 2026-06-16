import { c as createServerRpc } from "./createServerRpc-2SypsCzz.mjs";
import { c as createServerFn } from "./server-DNxV6PqS.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-55884gS2.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/firebase-admin.mjs";
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
import "http";
import "http2";
import "zlib";
import "https";
import "events";
import "../_libs/@fastify/busboy.mjs";
import "node:events";
import "node:util";
import "node:crypto";
import "../_libs/jsonwebtoken.mjs";
import "../_libs/jws.mjs";
import "../_libs/safe-buffer.mjs";
import "buffer";
import "../_libs/jwa.mjs";
import "../_libs/ecdsa-sig-formatter.mjs";
import "../_libs/buffer-equal-constant-time.mjs";
import "../_libs/ms.mjs";
import "../_libs/semver.mjs";
import "../_libs/lodash.includes.mjs";
import "../_libs/lodash.isboolean.mjs";
import "../_libs/lodash.isinteger.mjs";
import "../_libs/lodash.isnumber.mjs";
import "../_libs/lodash.isplainobject.mjs";
import "../_libs/lodash.isstring.mjs";
import "../_libs/lodash.once.mjs";
import "../_libs/jwks-rsa.mjs";
import "../_libs/debug.mjs";
import "tty";
import "../_libs/supports-color.mjs";
import "os";
import "../_libs/has-flag.mjs";
import "../_libs/jose.mjs";
import "../_libs/lru-memoizer.mjs";
import "../_libs/lru-cache.mjs";
import "node:diagnostics_channel";
import "../_libs/lodash.clonedeep.mjs";
import "../_libs/limiter.mjs";
import "../_libs/@google-cloud/firestore.mjs";
import "assert";
import "url";
import "../_libs/google-gax.mjs";
import "../_libs/@grpc/grpc-js.mjs";
import "tls";
import "net";
import "dns";
import "process";
import "fs";
import "../_libs/js-sdsl__ordered-map.mjs";
import "../_libs/grpc__proto-loader.mjs";
import "../_libs/lodash.camelcase.mjs";
import "../_libs/protobufjs.mjs";
import "../_libs/protobufjs__aspromise.mjs";
import "../_libs/protobufjs__base64.mjs";
import "../_libs/protobufjs__eventemitter.mjs";
import "../_libs/protobufjs__float.mjs";
import "../_libs/protobufjs__utf8.mjs";
import "../_libs/protobufjs__pool.mjs";
import "../_libs/long.mjs";
import "../_libs/protobufjs__codegen.mjs";
import "../_libs/protobufjs__fetch.mjs";
import "../_libs/protobufjs__path.mjs";
import "path";
import "child_process";
import "../_libs/google-auth-library.mjs";
import "querystring";
import "../_libs/gaxios.mjs";
import "../_libs/extend.mjs";
import "../_libs/node-fetch.mjs";
import "../_libs/whatwg-url.mjs";
import "../_libs/webidl-conversions.mjs";
import "punycode";
import "../_libs/tr46.mjs";
import "node:http";
import "node:https";
import "node:zlib";
import "node:buffer";
import "../_libs/data-uri-to-buffer.mjs";
import "../_libs/fetch-blob.mjs";
import "node:fs";
import "../_libs/node-domexception.mjs";
import "../_libs/web-streams-polyfill.mjs";
import "../_libs/formdata-polyfill.mjs";
import "node:url";
import "node:net";
import "../_libs/is-stream.mjs";
import "../_libs/uuid.mjs";
import "../_libs/https-proxy-agent.mjs";
import "../_libs/agent-base.mjs";
import "../_libs/gcp-metadata.mjs";
import "../_libs/json-bigint.mjs";
import "../_libs/bignumber.js.mjs";
import "../_libs/google-logging-utils.mjs";
import "node:process";
import "../_libs/base64-js.mjs";
import "../_libs/gtoken.mjs";
import "../_libs/object-hash.mjs";
import "../_libs/proto3-json-serializer.mjs";
import "../_libs/duplexify.mjs";
import "../_libs/readable-stream.mjs";
import "node:string_decoder";
import "../_libs/inherits.mjs";
import "../_libs/util-deprecate.mjs";
import "../_libs/end-of-stream.mjs";
import "../_libs/once.mjs";
import "../_libs/wrappy.mjs";
import "../_libs/stream-shift.mjs";
import "../_libs/retry-request.mjs";
import "../_libs/fast-deep-equal.mjs";
import "../_libs/functional-red-black-tree.mjs";
import "../_libs/opentelemetry__api.mjs";
import "../_libs/google-cloud__storage.mjs";
import "../_libs/google-cloud__projectify.mjs";
import "../_libs/html-entities.mjs";
import "../_libs/teeny-request.mjs";
import "../_libs/http-proxy-agent.mjs";
import "../_libs/tootallnate__once.mjs";
import "../_libs/stream-events.mjs";
import "../_libs/stubs.mjs";
import "../_libs/google-cloud__promisify.mjs";
import "../_libs/google-cloud__paginator.mjs";
import "../_libs/arrify.mjs";
import "../_libs/mime.mjs";
import "../_libs/p-limit.mjs";
import "../_libs/yocto-queue.mjs";
import "../_libs/async-retry.mjs";
import "../_libs/retry.mjs";
import "../_libs/abort-controller.mjs";
import "../_libs/event-target-shim.mjs";
import "../_libs/fast-xml-parser.mjs";
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

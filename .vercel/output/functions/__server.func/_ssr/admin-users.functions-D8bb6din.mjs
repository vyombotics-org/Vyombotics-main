import { c as createSsrRpc } from "./router-C729jqE2.mjs";
import { c as createServerFn } from "./server-DNxV6PqS.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-55884gS2.mjs";
import { o as objectType, b as booleanType, s as stringType, e as enumType } from "../_libs/zod.mjs";
const RoleEnum = enumType(["admin", "instructor", "student"]);
const claimAdminIfNone = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).handler(createSsrRpc("82ab85f3856aff367c771924b3f19a46c93aa368fa2bb2a4ddd66a10699635dc"));
const adminExists = createServerFn({
  method: "GET"
}).handler(createSsrRpc("fb11898bcd23ad5f71ed4ede1e0734bc5461e1ff8aac3106bd295cf12a228be0"));
const listUsersWithRoles = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).handler(createSsrRpc("c8bce056c4058e2437e7cff8c66ed47a718b995c993780b7a569a122494bf466"));
const setUserRole = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  user_id: stringType().uuid(),
  role: RoleEnum,
  enabled: booleanType()
}).parse(d)).handler(createSsrRpc("1e217167414b4924fd876e4f13f21b9d69fbcae54912212d8878ffdec680c99c"));
export {
  adminExists as a,
  claimAdminIfNone as c,
  listUsersWithRoles as l,
  setUserRole as s
};

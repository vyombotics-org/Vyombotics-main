import { c as createServerRpc } from "./createServerRpc-ZYejvlcI.mjs";
import { c as createServerFn } from "./server-CtNwD_lG.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
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
const contactSchema = objectType({
  name: stringType().trim().min(1).max(120),
  email: stringType().trim().email().max(255),
  message: stringType().trim().min(1).max(4e3)
});
const submitContactMessage_createServerFn_handler = createServerRpc({
  id: "6791d96029119711fff64366333434540863937081e92a2093993c6c31f4287b",
  name: "submitContactMessage",
  filename: "src/lib/contact.functions.ts"
}, (opts) => submitContactMessage.__executeServer(opts));
const submitContactMessage = createServerFn({
  method: "POST"
}).inputValidator((d) => contactSchema.parse(d)).handler(submitContactMessage_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    error
  } = await supabaseAdmin.from("contact_messages").insert({
    name: data.name,
    email: data.email,
    message: data.message
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  submitContactMessage_createServerFn_handler
};

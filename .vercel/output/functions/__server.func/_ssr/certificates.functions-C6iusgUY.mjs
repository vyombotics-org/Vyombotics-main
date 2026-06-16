import { c as createSsrRpc } from "./router-C729jqE2.mjs";
import { c as createServerFn } from "./server-DNxV6PqS.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-55884gS2.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
const issueCertificate = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("ac2115698b2515ef279cd7c4819eddf1e114fb3d4c5c047df75101b290f93114"));
const myCertificates = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).handler(createSsrRpc("379ffe35ad68302a48b6fa4e835a1aeda5ab80782ffa2d85a0b1a25bf7c745ce"));
const verifyCertificate = createServerFn({
  method: "GET"
}).inputValidator((d) => objectType({
  serial_no: stringType().min(4).max(64).regex(/^[A-Z0-9-]+$/)
}).parse(d)).handler(createSsrRpc("d2db6178b85398a843aeec148e94a18e889315165724b5888d3e1edd05496bbf"));
export {
  issueCertificate as i,
  myCertificates as m,
  verifyCertificate as v
};

import { c as createSsrRpc } from "./router-8ViFXMOq.mjs";
import { c as createServerFn } from "./server-CtiGMGMU.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-rm7rsgsq.mjs";
import { o as objectType, s as stringType, l as literalType, c as coerce, b as booleanType } from "../_libs/zod.mjs";
const listShopProducts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("f5e654cfa19ee3fc5c55eb2dcd7c354a28c77dd56a40465667ae1beb62fd7012"));
const listAllShopProducts = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).handler(createSsrRpc("6819c3de1e830dfa5211739d983195030ea21d1a46c814abbb8b44e47769999d"));
const ProductInput = objectType({
  id: stringType().uuid().optional(),
  name: stringType().min(1).max(200),
  slug: stringType().min(1).max(200).regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and dashes"),
  description: stringType().max(2e3).optional().nullable(),
  price: coerce.number().min(0).max(1e7),
  compare_at_price: coerce.number().min(0).max(1e7).optional().nullable(),
  currency: stringType().min(3).max(3).default("INR"),
  image_url: stringType().url().optional().nullable().or(literalType("")),
  category: stringType().min(1).max(60),
  stock: coerce.number().int().min(0).max(1e6).default(0),
  badge: stringType().max(40).optional().nullable(),
  is_active: booleanType().default(true),
  sort_order: coerce.number().int().min(0).max(1e5).default(0),
  buy_url: stringType().url().optional().nullable().or(literalType(""))
});
const upsertShopProduct = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => ProductInput.parse(d)).handler(createSsrRpc("dc48cf8ee6b246397226b5f689d8c6be7181db26a4ce5c0b6d2f3e2919a7d745"));
const deleteShopProduct = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("d6af66846e5dd6ba3a2151fb69683cb316b68f000506cbc8027e92f04dfc2668"));
export {
  listAllShopProducts as a,
  deleteShopProduct as d,
  listShopProducts as l,
  upsertShopProduct as u
};

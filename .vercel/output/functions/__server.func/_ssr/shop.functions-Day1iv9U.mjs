import { c as createServerRpc } from "./createServerRpc-ZYejvlcI.mjs";
import { c as createServerFn } from "./server-CtNwD_lG.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-CZNhPrkM.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "firebase-admin/app";
import "firebase-admin/auth";
import "firebase-admin/firestore";
import "firebase-admin/storage";
import { o as objectType, s as stringType, l as literalType, c as coerce, b as booleanType } from "../_libs/zod.mjs";
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
async function assertAdmin(supabaseAdmin, userId) {
  const {
    data
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  if (!data) throw new Error("Forbidden: admin only");
}
const listShopProducts_createServerFn_handler = createServerRpc({
  id: "f5e654cfa19ee3fc5c55eb2dcd7c354a28c77dd56a40465667ae1beb62fd7012",
  name: "listShopProducts",
  filename: "src/lib/shop.functions.ts"
}, (opts) => listShopProducts.__executeServer(opts));
const listShopProducts = createServerFn({
  method: "GET"
}).handler(listShopProducts_createServerFn_handler, async () => {
  try {
    const {
      supabaseAdmin
    } = await import("./client.server-CwXH_WTR.mjs");
    const {
      data,
      error
    } = await supabaseAdmin.from("shop_products").select("*").eq("is_active", true).order("sort_order", {
      ascending: true
    }).order("created_at", {
      ascending: false
    });
    if (error) {
      console.error("[listShopProducts] Database query error:", error);
      return {
        products: []
      };
    }
    return {
      products: data ?? []
    };
  } catch (err) {
    console.error("[listShopProducts] Failed to fetch products:", err);
    return {
      products: []
    };
  }
});
const listAllShopProducts_createServerFn_handler = createServerRpc({
  id: "6819c3de1e830dfa5211739d983195030ea21d1a46c814abbb8b44e47769999d",
  name: "listAllShopProducts",
  filename: "src/lib/shop.functions.ts"
}, (opts) => listAllShopProducts.__executeServer(opts));
const listAllShopProducts = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).handler(listAllShopProducts_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  await assertAdmin(supabaseAdmin, context.userId);
  const {
    data,
    error
  } = await supabaseAdmin.from("shop_products").select("*").order("sort_order", {
    ascending: true
  }).order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return {
    products: data ?? []
  };
});
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
const upsertShopProduct_createServerFn_handler = createServerRpc({
  id: "dc48cf8ee6b246397226b5f689d8c6be7181db26a4ce5c0b6d2f3e2919a7d745",
  name: "upsertShopProduct",
  filename: "src/lib/shop.functions.ts"
}, (opts) => upsertShopProduct.__executeServer(opts));
const upsertShopProduct = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => ProductInput.parse(d)).handler(upsertShopProduct_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  await assertAdmin(supabaseAdmin, context.userId);
  const payload = {
    name: data.name,
    slug: data.slug,
    description: data.description ?? null,
    price: data.price,
    compare_at_price: data.compare_at_price ?? null,
    currency: data.currency || "INR",
    image_url: data.image_url || null,
    category: data.category,
    stock: data.stock,
    badge: data.badge ?? null,
    is_active: data.is_active,
    sort_order: data.sort_order,
    buy_url: data.buy_url || null
  };
  if (data.id) {
    const {
      data: row2,
      error: error2
    } = await supabaseAdmin.from("shop_products").update(payload).eq("id", data.id).select().single();
    if (error2) throw new Error(error2.message);
    return {
      product: row2
    };
  }
  const {
    data: row,
    error
  } = await supabaseAdmin.from("shop_products").insert(payload).select().single();
  if (error) throw new Error(error.message);
  return {
    product: row
  };
});
const deleteShopProduct_createServerFn_handler = createServerRpc({
  id: "d6af66846e5dd6ba3a2151fb69683cb316b68f000506cbc8027e92f04dfc2668",
  name: "deleteShopProduct",
  filename: "src/lib/shop.functions.ts"
}, (opts) => deleteShopProduct.__executeServer(opts));
const deleteShopProduct = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(deleteShopProduct_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  await assertAdmin(supabaseAdmin, context.userId);
  const {
    error
  } = await supabaseAdmin.from("shop_products").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  deleteShopProduct_createServerFn_handler,
  listAllShopProducts_createServerFn_handler,
  listShopProducts_createServerFn_handler,
  upsertShopProduct_createServerFn_handler
};

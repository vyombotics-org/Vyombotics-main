import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

async function assertAdmin(supabaseAdmin: any, userId: string) {
  const { data } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (!data) throw new Error("Forbidden: admin only");
}

/** Public — list active products for the storefront. */
export const listShopProducts = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("shop_products")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[listShopProducts] Database query error:", error);
      return { products: [] };
    }
    return { products: data ?? [] };
  } catch (err) {
    console.error("[listShopProducts] Failed to fetch products:", err);
    return { products: [] };
  }
});

/** Admin — list all (active + inactive). */
export const listAllShopProducts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await assertAdmin(supabaseAdmin, context.userId);
    const { data, error } = await supabaseAdmin
      .from("shop_products")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { products: data ?? [] };
  });

const ProductInput = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and dashes"),
  description: z.string().max(2000).optional().nullable(),
  price: z.coerce.number().min(0).max(10_000_000),
  compare_at_price: z.coerce.number().min(0).max(10_000_000).optional().nullable(),
  currency: z.string().min(3).max(3).default("INR"),
  image_url: z.string().url().optional().nullable().or(z.literal("")),
  category: z.string().min(1).max(60),
  stock: z.coerce.number().int().min(0).max(1_000_000).default(0),
  badge: z.string().max(40).optional().nullable(),
  is_active: z.boolean().default(true),
  sort_order: z.coerce.number().int().min(0).max(100000).default(0),
  buy_url: z.string().url().optional().nullable().or(z.literal("")),
});

export const upsertShopProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => ProductInput.parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
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
      buy_url: data.buy_url || null,
    };
    if (data.id) {
      const { data: row, error } = await supabaseAdmin
        .from("shop_products")
        .update(payload)
        .eq("id", data.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return { product: row };
    }
    const { data: row, error } = await supabaseAdmin
      .from("shop_products")
      .insert(payload)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { product: row };
  });

export const deleteShopProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await assertAdmin(supabaseAdmin, context.userId);
    const { error } = await supabaseAdmin.from("shop_products").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

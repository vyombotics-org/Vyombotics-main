import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const ALLOWED_KEYS = [
  "hero",
  "announcement",
  "floating_video",
  "stem_pillars",
  "batch_announcements",
  "announcements_section",
  "stem_voices",
  "faculty_page",
  "feedback_page",
  "faq_page",
] as const;
type SettingKey = (typeof ALLOWED_KEYS)[number];

export type SiteSettingsMap = Partial<Record<SettingKey, any>>;

/** Public read — no auth required. Returns a key→value map. */
export const getSiteSettings = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .select("key, value")
      .in("key", ALLOWED_KEYS as unknown as string[]);
    if (error) {
      console.error("[getSiteSettings] Database query error:", error);
      return { settings: {} };
    }
    const map: SiteSettingsMap = {};
    for (const row of data ?? []) map[row.key as SettingKey] = row.value;
    return { settings: map };
  } catch (err) {
    console.error("[getSiteSettings] Failed to fetch settings:", err);
    return { settings: {} };
  }
});

const UpsertInput = z.object({
  key: z.enum(ALLOWED_KEYS),
  value: z.any(),
});

export const upsertSiteSetting = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => UpsertInput.parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roleRow } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) throw new Error("Forbidden: admin only");

    const { data: row, error } = await supabaseAdmin
      .from("site_settings")
      .upsert({ key: data.key, value: data.value }, { onConflict: "key" })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { setting: row };
  });

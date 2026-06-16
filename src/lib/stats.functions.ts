import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Aggregated dashboard stats for the signed-in student
export const getStudentStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const userId = context.userId;

    // Active enrollments (paid + not expired)
    const { data: enrollments } = await supabaseAdmin
      .from("enrollments")
      .select("id, batch_id, payment_status, expires_at")
      .eq("user_id", userId)
      .eq("payment_status", "success");
    const active = (enrollments ?? []).filter(
      (e: any) => !e.expires_at || new Date(e.expires_at) > new Date(),
    );

    // Watched seconds → hours learned
    const { data: progress } = await supabaseAdmin
      .from("lecture_progress")
      .select("watched_seconds, completed, updated_at")
      .eq("user_id", userId);
    const watchedSec = (progress ?? []).reduce((s: any, p: any) => s + (p.watched_seconds || 0), 0);
    const hoursLearned = Math.round((watchedSec / 3600) * 10) / 10;

    // Certificates
    const { count: certCount } = await supabaseAdmin
      .from("certificates")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId);

    // Day streak — distinct days of activity in lecture_progress.updated_at, counting back from today
    const days = new Set<string>(
      (progress ?? []).map((p: any) => p.updated_at?.slice(0, 10)).filter(Boolean) as string[],
    );
    let streak = 0;
    const day = new Date();
    // If today not present, streak still starts at yesterday if yesterday present
    while (true) {
      const key = day.toISOString().slice(0, 10);
      if (days.has(key)) {
        streak += 1;
        day.setDate(day.getDate() - 1);
      } else {
        if (streak === 0) {
          // allow skipping today only
          day.setDate(day.getDate() - 1);
          const yk = day.toISOString().slice(0, 10);
          if (!days.has(yk)) break;
        } else break;
      }
      if (streak > 365) break;
    }

    return {
      activeCourses: active.length,
      streak,
      hoursLearned,
      certificates: certCount ?? 0,
    };
  });

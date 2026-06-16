import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getInstructorAnalytics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Determine scope: admins see all; instructors see their own courses
    const { data: roleRow } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    const isAdmin = !!roleRow;

    let coursesQ = supabaseAdmin.from("courses").select("id, title, slug, instructor_id");
    if (!isAdmin) coursesQ = coursesQ.eq("instructor_id", context.userId);
    const { data: courses } = await coursesQ;
    const courseIds = (courses ?? []).map((c: any) => c.id);

    if (courseIds.length === 0) {
      return {
        scope: isAdmin ? "admin" : "instructor",
        totals: { revenue: 0, enrollments: 0, activeStudents: 0, courses: 0, batches: 0 },
        revenueByMonth: [],
        enrollmentsByMonth: [],
        topBatches: [],
        coursesCount: 0,
      };
    }

    const { data: batches } = await supabaseAdmin
      .from("batches")
      .select("id, name, course_id, price_inr, is_active")
      .in("course_id", courseIds);
    const batchIds = (batches ?? []).map((b: any) => b.id);

    const { data: enrollments } = batchIds.length
      ? await supabaseAdmin
          .from("enrollments")
          .select("id, user_id, batch_id, amount_paid, payment_status, purchased_at, expires_at")
          .in("batch_id", batchIds)
      : { data: [] as any[] };

    const paid = (enrollments ?? []).filter((e: any) => e.payment_status === "success");
    const now = Date.now();
    const activeStudents = new Set(
      paid
        .filter((e: any) => !e.expires_at || new Date(e.expires_at).getTime() > now)
        .map((e: any) => e.user_id),
    ).size;
    const totalRevenue = paid.reduce((s: number, e: any) => s + Number(e.amount_paid || 0), 0);

    // Monthly trends (last 6 months)
    const months: { key: string; label: string }[] = [];
    const d = new Date();
    d.setDate(1);
    for (let i = 5; i >= 0; i--) {
      const m = new Date(d.getFullYear(), d.getMonth() - i, 1);
      months.push({
        key: `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, "0")}`,
        label: m.toLocaleString("en-US", { month: "short" }),
      });
    }
    const revByMonth = new Map(months.map((m) => [m.key, 0]));
    const enrByMonth = new Map(months.map((m) => [m.key, 0]));
    for (const e of paid) {
      if (!e.purchased_at) continue;
      const dt = new Date(e.purchased_at);
      const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`;
      if (revByMonth.has(key)) {
        revByMonth.set(key, (revByMonth.get(key) || 0) + Number(e.amount_paid || 0));
        enrByMonth.set(key, (enrByMonth.get(key) || 0) + 1);
      }
    }

    // Top batches by revenue
    const batchMap = new Map((batches ?? []).map((b: any) => [b.id, b]));
    const courseMap = new Map((courses ?? []).map((c: any) => [c.id, c]));
    const perBatch = new Map<string, { revenue: number; enrollments: number }>();
    for (const e of paid) {
      const cur = perBatch.get(e.batch_id) || { revenue: 0, enrollments: 0 };
      cur.revenue += Number(e.amount_paid || 0);
      cur.enrollments += 1;
      perBatch.set(e.batch_id, cur);
    }
    const topBatches = Array.from(perBatch.entries())
      .map(([batchId, stats]) => {
        const b: any = batchMap.get(batchId);
        const c: any = b ? courseMap.get(b.course_id) : null;
        return {
          batch_id: batchId,
          batch_name: b?.name ?? "—",
          course_title: c?.title ?? "—",
          ...stats,
        };
      })
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    return {
      scope: isAdmin ? "admin" : "instructor",
      totals: {
        revenue: totalRevenue,
        enrollments: paid.length,
        activeStudents,
        courses: courses?.length ?? 0,
        batches: batches?.length ?? 0,
      },
      revenueByMonth: months.map((m) => ({ month: m.label, revenue: revByMonth.get(m.key) || 0 })),
      enrollmentsByMonth: months.map((m) => ({
        month: m.label,
        enrollments: enrByMonth.get(m.key) || 0,
      })),
      topBatches,
    };
  });

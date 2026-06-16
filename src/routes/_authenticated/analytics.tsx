import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2, TrendingUp, Users, BookOpen, Layers, IndianRupee } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { getInstructorAnalytics } from "@/lib/analytics.functions";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

export const Route = createFileRoute("/_authenticated/analytics")({
  head: () => ({ meta: [{ title: "Analytics · Vyombotics" }] }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const fn = useServerFn(getInstructorAnalytics);
  const { data, isLoading, error } = useQuery({
    queryKey: ["analytics", "instructor"],
    queryFn: () => fn(),
  });

  if (isLoading)
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  if (error)
    return (
      <div className="grid min-h-screen place-items-center text-destructive">
        {(error as any).message}
      </div>
    );
  if (!data) return null;

  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
  const stats = [
    { icon: IndianRupee, label: "Total Revenue", value: inr(data.totals.revenue) },
    { icon: Users, label: "Paid Enrollments", value: data.totals.enrollments.toLocaleString() },
    {
      icon: TrendingUp,
      label: "Active Students",
      value: data.totals.activeStudents.toLocaleString(),
    },
    { icon: BookOpen, label: "Courses", value: data.totals.courses.toLocaleString() },
    { icon: Layers, label: "Batches", value: data.totals.batches.toLocaleString() },
  ];

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>
        <h1 className="mt-4 font-display text-3xl font-bold">
          {data.scope === "admin" ? "Platform" : "Instructor"}{" "}
          <span className="gradient-text">Analytics</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Revenue, enrollments, and top performing batches.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((s, i) => {
            const I = s.icon;
            return (
              <div key={i} className="card-3d rounded-2xl p-5">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary-glow">
                  <I className="h-5 w-5" />
                </div>
                <div className="mt-3 text-2xl font-bold gradient-text">{s.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="card-3d rounded-2xl p-6">
            <h3 className="font-display text-lg font-semibold">Revenue · last 6 months</h3>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.revenueByMonth}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="hsl(var(--border))" strokeOpacity={0.3} vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(v) => `₹${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                    }}
                    formatter={(v: any) => [inr(Number(v)), "Revenue"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    fill="url(#revGrad)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-3d rounded-2xl p-6">
            <h3 className="font-display text-lg font-semibold">Enrollments · last 6 months</h3>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.enrollmentsByMonth}>
                  <CartesianGrid stroke="hsl(var(--border))" strokeOpacity={0.3} vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                    }}
                  />
                  <Bar dataKey="enrollments" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-8 card-3d rounded-2xl p-6">
          <h3 className="font-display text-lg font-semibold">Top batches by revenue</h3>
          {data.topBatches.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No paid enrollments yet.</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="pb-3">Batch</th>
                    <th className="pb-3">Course</th>
                    <th className="pb-3 text-right">Enrollments</th>
                    <th className="pb-3 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {data.topBatches.map((b) => (
                    <tr key={b.batch_id} className="border-t border-border/30">
                      <td className="py-3 font-medium">{b.batch_name}</td>
                      <td className="py-3 text-muted-foreground">{b.course_title}</td>
                      <td className="py-3 text-right">{b.enrollments}</td>
                      <td className="py-3 text-right font-medium">{inr(b.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

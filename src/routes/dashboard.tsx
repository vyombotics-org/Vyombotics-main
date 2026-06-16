import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import {
  Loader2,
  BookOpen,
  Trophy,
  Flame,
  Clock,
  Sparkles,
  Users,
  BarChart3,
  Mail,
  Crown,
  Palette,
  ShoppingBag,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { SiteNav } from "@/components/SiteNav";
import { adminExists } from "@/lib/admin-users.functions";
import { myActiveBatches } from "@/lib/learn.functions";
import { getStudentStats } from "@/lib/stats.functions";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · Vyombotics" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user, primaryRole, loading } = useAuth();
  const navigate = useNavigate();

  const existsFn = useServerFn(adminExists);
  const { data: existsData } = useQuery({
    queryKey: ["admin", "exists"],
    queryFn: () => existsFn(),
    enabled: !!user,
  });
  const statsFn = useServerFn(getStudentStats);
  const { data: stats } = useQuery({
    queryKey: ["student-stats"],
    queryFn: () => statsFn(),
    enabled: !!user && primaryRole === "student",
  });

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth", search: { mode: "login" } });
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const name = (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "Learner";
  const showClaim = !!user && existsData && !existsData.exists && primaryRole !== "admin";

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-6xl px-6 pt-32 pb-16">
        {showClaim && (
          <div className="mb-6 card-3d gradient-border flex flex-col items-start justify-between gap-3 rounded-2xl p-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <Crown className="h-8 w-8 text-primary-glow" />
              <div>
                <div className="font-display text-lg font-semibold">No admin yet</div>
                <div className="text-sm text-muted-foreground">
                  Claim platform admin to manage users, courses, and settings.
                </div>
              </div>
            </div>
            <Button asChild className="btn-glow text-primary-foreground">
              <Link to="/admin/users">Claim admin →</Link>
            </Button>
          </div>
        )}
        {/* Welcome */}
        <div className="card-3d gradient-border relative overflow-hidden rounded-3xl p-8 animate-fade-up">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative">
            <div className="text-sm text-muted-foreground">
              {primaryRole === "admin"
                ? "Admin Console"
                : primaryRole === "instructor"
                  ? "Instructor Studio"
                  : "Student Dashboard"}
            </div>
            <h1 className="mt-2 font-display text-4xl font-bold">
              Welcome back, <span className="gradient-text">{name}</span> 👋
            </h1>
            <p className="mt-2 text-muted-foreground">
              {primaryRole === "student"
                ? "Pick up where you left off, or explore something new."
                : primaryRole === "instructor"
                  ? "Manage your courses, students, and earnings."
                  : "Full control over the platform."}
            </p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            { icon: BookOpen, label: "Active Courses", value: String(stats?.activeCourses ?? 0) },
            { icon: Flame, label: "Day Streak", value: String(stats?.streak ?? 0) },
            { icon: Clock, label: "Hours Learned", value: String(stats?.hoursLearned ?? 0) },
            { icon: Trophy, label: "Certificates", value: String(stats?.certificates ?? 0) },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="card-3d card-3d-hover rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-3xl font-bold gradient-text">{s.value}</div>
                </div>
                <div className="mt-3 text-sm text-muted-foreground">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Student batches */}
        {primaryRole === "student" && (
          <>
            <div className="mt-6 flex justify-end">
              <Button asChild variant="outline" size="sm">
                <Link to="/certificates">
                  <Trophy className="h-4 w-4" /> My Certificates
                </Link>
              </Button>
            </div>
            <MyBatches />
          </>
        )}

        {/* Instructor tools */}
        {primaryRole === "instructor" && (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "My Courses",
                desc: "Create and manage your published courses.",
                to: "/admin/courses",
              },
              {
                icon: Sparkles,
                title: "Coupons",
                desc: "Create promo codes for your batches.",
                to: "/admin/coupons",
              },
              {
                icon: BarChart3,
                title: "Analytics",
                desc: "Revenue, enrollments, and top batches.",
                to: "/analytics",
              },
              {
                icon: Users,
                title: "Students",
                desc: "Open a batch from your courses to manage enrolled learners.",
                to: "/admin/courses",
              },
            ].map((t, i) => {
              const Icon = t.icon;
              const inner = (
                <>
                  <Icon className="h-8 w-8 text-primary-glow" />
                  <h3 className="mt-4 font-display text-lg font-semibold">{t.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                </>
              );
              return t.to ? (
                <Link key={i} to={t.to} className="card-3d card-3d-hover rounded-2xl p-6 block">
                  {inner}
                </Link>
              ) : (
                <div key={i} className="card-3d card-3d-hover rounded-2xl p-6">
                  {inner}
                </div>
              );
            })}
          </div>
        )}

        {/* Admin tools */}
        {primaryRole === "admin" && (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "Courses & Batches",
                desc: "Create, edit, publish your catalog.",
                to: "/admin/courses",
              },
              {
                icon: Users,
                title: "User Management",
                desc: "Manage students, instructors, and roles.",
                to: "/admin/users",
              },
              {
                icon: Sparkles,
                title: "Coupons",
                desc: "Create and manage promo codes.",
                to: "/admin/coupons",
              },
              {
                icon: BarChart3,
                title: "Analytics",
                desc: "Revenue, growth, and engagement metrics.",
                to: "/analytics",
              },
              {
                icon: Mail,
                title: "Contact Messages",
                desc: "Read and reply to messages from the contact form.",
                to: "/admin/contact",
              },
              {
                icon: Trophy,
                title: "Certificates",
                desc: "Open any batch's Students page to issue certificates manually.",
                to: "/admin/courses",
              },
              {
                icon: Palette,
                title: "Site Settings",
                desc: "Edit hero text, announcement bar and the floating video — no code.",
                to: "/admin/site",
              },
              {
                icon: ShoppingBag,
                title: "Shop Products",
                desc: "Add and manage robotics kits, merch and accessories.",
                to: "/admin/shop",
              },
            ].map((t, i) => {
              const Icon = t.icon;
              const inner = (
                <>
                  <Icon className="h-8 w-8 text-primary-glow" />
                  <h3 className="mt-4 font-display text-lg font-semibold">{t.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                </>
              );
              return t.to ? (
                <Link key={i} to={t.to} className="card-3d card-3d-hover rounded-2xl p-6 block">
                  {inner}
                </Link>
              ) : (
                <div key={i} className="card-3d card-3d-hover rounded-2xl p-6">
                  {inner}
                </div>
              );
            })}
          </div>
        )}

        {/* Continue learning placeholder */}
        <div className="mt-6 card-3d rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Continue Learning</h3>
            <span className="text-xs text-muted-foreground">No active lectures yet</span>
          </div>
          <ProgressBar value={0} className="h-2" />
        </div>
      </div>
    </div>
  );
}

function MyBatches() {
  const fn = useServerFn(myActiveBatches);
  const { user } = useAuth();
  const { data, isLoading } = useQuery({ queryKey: ["my-batches"], queryFn: () => fn() });
  if (isLoading)
    return (
      <div className="mt-6 grid place-items-center py-10">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </div>
    );
  const items = (data?.enrollments ?? []) as any[];
  if (items.length === 0) {
    return (
      <div className="mt-6 card-3d rounded-2xl p-10 text-center">
        <Sparkles className="mx-auto h-10 w-10 text-primary-glow" />
        <h3 className="mt-4 font-display text-xl font-semibold">Start your first course</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You haven't enrolled in any batch yet. Explore courses to begin.
        </p>
        <Button asChild className="btn-glow mt-6 text-primary-foreground">
          <Link to="/courses">Explore Courses</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {items.map((e) => {
        const daysLeft = e.expires_at
          ? Math.max(0, Math.ceil((new Date(e.expires_at).getTime() - Date.now()) / 86_400_000))
          : null;
        const expired = daysLeft === 0;
        const paid = e.payment_status === "success";
        return (
          <div key={e.id} className="card-3d card-3d-hover gradient-border rounded-2xl p-5">
            <Link to="/learn/$batchId" params={{ batchId: e.batches?.id }} className="block">
              <div className="text-xs text-muted-foreground">{e.batches?.courses?.title}</div>
              <div className="mt-1 font-display text-lg font-semibold">{e.batches?.name}</div>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <span
                  className={`rounded-full px-2 py-0.5 ${paid ? "bg-primary/15 text-primary-glow" : "bg-amber-500/15 text-amber-400"}`}
                >
                  {paid ? "Active" : "Pending payment"}
                </span>
                {daysLeft !== null && (
                  <span
                    className={`rounded-full px-2 py-0.5 ${expired ? "bg-destructive/15 text-destructive" : "bg-card/60 text-muted-foreground"}`}
                  >
                    {expired ? "Expired" : `${daysLeft} days left`}
                  </span>
                )}
              </div>
            </Link>
            {paid && user?.id && (
              <div className="mt-3 flex justify-end">
                <Button asChild size="sm" variant="outline">
                  <Link
                    to="/reports/$batchId/$userId"
                    params={{ batchId: e.batches?.id, userId: user.id }}
                  >
                    View Progress Report →
                  </Link>
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

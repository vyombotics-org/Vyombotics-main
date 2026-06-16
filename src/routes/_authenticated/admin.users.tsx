import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Crown,
  GraduationCap,
  Loader2,
  ShieldAlert,
  Sparkles,
  User as UserIcon,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import {
  adminExists,
  claimAdminIfNone,
  listUsersWithRoles,
  setUserRole,
} from "@/lib/admin-users.functions";

export const Route = createFileRoute("/_authenticated/admin/users")({
  head: () => ({ meta: [{ title: "Users & Roles · Admin" }] }),
  component: AdminUsers,
});

function AdminUsers() {
  const { user, primaryRole, loading } = useAuth();
  const qc = useQueryClient();
  const existsFn = useServerFn(adminExists);
  const claimFn = useServerFn(claimAdminIfNone);
  const listFn = useServerFn(listUsersWithRoles);
  const setFn = useServerFn(setUserRole);

  const { data: existsData } = useQuery({
    queryKey: ["admin", "exists"],
    queryFn: () => existsFn(),
  });
  const isAdmin = primaryRole === "admin";

  const usersQ = useQuery({
    queryKey: ["admin", "users"],
    queryFn: () => listFn(),
    enabled: isAdmin,
  });

  const claim = useMutation({
    mutationFn: () => claimFn(),
    onSuccess: () => {
      toast.success("You are now the admin. Reloading...");
      setTimeout(() => window.location.reload(), 600);
    },
    onError: (e: any) => toast.error(e?.message || "Could not claim admin"),
  });

  const setRole = useMutation({
    mutationFn: (v: {
      user_id: string;
      role: "admin" | "instructor" | "student";
      enabled: boolean;
    }) => setFn({ data: v }),
    onSuccess: () => {
      toast.success("Role updated");
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (e: any) => toast.error(e?.message || "Update failed"),
  });

  if (loading)
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );

  // Bootstrap UI: no admin yet → any signed-in user can claim
  if (!isAdmin && existsData && !existsData.exists) {
    return (
      <div className="min-h-screen">
        <SiteNav />
        <div className="mx-auto max-w-md px-6 pt-40 text-center">
          <div className="card-3d gradient-border rounded-2xl p-8">
            <Crown className="mx-auto h-12 w-12 text-primary-glow" />
            <h1 className="mt-4 font-display text-2xl font-bold">Claim platform admin</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              No admin exists yet. As the first user, you can claim admin access.
            </p>
            <Button
              className="btn-glow mt-6 w-full text-primary-foreground"
              disabled={claim.isPending}
              onClick={() => claim.mutate()}
            >
              {claim.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}{" "}
              Make me admin
            </Button>
            <Button asChild variant="ghost" className="mt-2 w-full">
              <Link to="/dashboard">Cancel</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen">
        <SiteNav />
        <div className="mx-auto max-w-md px-6 pt-40 text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-destructive" />
          <h1 className="mt-4 font-display text-2xl font-bold">Admin only</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Ask an existing admin to grant you access.
          </p>
          <Button asChild className="mt-6">
            <Link to="/dashboard">Back to dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

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
          Users &amp; <span className="gradient-text">Roles</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Promote users to instructor or admin. Every user is a student by default.
        </p>

        <div className="mt-6">
          {usersQ.isLoading ? (
            <div className="grid place-items-center py-12">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          ) : (usersQ.data?.users ?? []).length === 0 ? (
            <div className="card-3d rounded-2xl p-10 text-center text-muted-foreground">
              No users yet.
            </div>
          ) : (
            <div className="card-3d overflow-x-auto rounded-2xl">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40 text-left">
                  <tr>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Admin</th>
                    <th className="px-4 py-3">Instructor</th>
                    <th className="px-4 py-3">Student</th>
                  </tr>
                </thead>
                <tbody>
                  {(usersQ.data?.users ?? []).map((u: any) => {
                    const has = (r: string) => u.roles.includes(r);
                    const isMe = u.id === user?.uid;
                    return (
                      <tr key={u.id} className="border-t border-border/40">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="grid h-8 w-8 place-items-center rounded-full bg-[image:var(--gradient-primary)] text-xs font-bold text-background">
                              {(u.full_name || u.email || "?").slice(0, 1).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-medium">
                                {u.full_name || "—"}{" "}
                                {isMe && (
                                  <span className="ml-1 text-xs text-primary-glow">(you)</span>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-1 pt-0.5">
                                {has("admin") && (
                                  <Badge tone="primary">
                                    <Crown className="h-3 w-3" />
                                    Admin
                                  </Badge>
                                )}
                                {has("instructor") && (
                                  <Badge tone="accent">
                                    <GraduationCap className="h-3 w-3" />
                                    Instructor
                                  </Badge>
                                )}
                                {has("student") && (
                                  <Badge tone="muted">
                                    <UserIcon className="h-3 w-3" />
                                    Student
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                        {(["admin", "instructor", "student"] as const).map((r) => (
                          <td key={r} className="px-4 py-3">
                            <input
                              type="checkbox"
                              className="h-4 w-4 cursor-pointer accent-primary"
                              checked={has(r)}
                              disabled={setRole.isPending}
                              onChange={(e) =>
                                setRole.mutate({
                                  user_id: u.id,
                                  role: r,
                                  enabled: e.target.checked,
                                })
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Badge({
  tone,
  children,
}: {
  tone: "primary" | "accent" | "muted";
  children: React.ReactNode;
}) {
  const cls =
    tone === "primary"
      ? "bg-primary/15 text-primary-glow"
      : tone === "accent"
        ? "bg-accent/20 text-accent-foreground"
        : "bg-muted text-muted-foreground";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${cls}`}
    >
      {children}
    </span>
  );
}

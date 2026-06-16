import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiteNav } from "@/components/SiteNav";
import { getBatchAttendance, setAttendance } from "@/lib/learn.functions";

export const Route = createFileRoute("/_authenticated/admin/batches/$id/attendance")({
  head: () => ({ meta: [{ title: "Attendance · Admin" }] }),
  component: AttendancePage,
});

type Status = "present" | "partial" | "absent" | "clear";
const cycle: Record<string, Status> = {
  "": "present",
  present: "absent",
  absent: "partial",
  partial: "clear",
};

function AttendancePage() {
  const { id } = Route.useParams();
  const qc = useQueryClient();
  const fn = useServerFn(getBatchAttendance);
  const setFn = useServerFn(setAttendance);
  const { data, isLoading } = useQuery({
    queryKey: ["att", id],
    queryFn: () => fn({ data: { batch_id: id } }),
  });
  const mark = useMutation({
    mutationFn: (v: { lecture_id: string; user_id: string; status: Status }) =>
      setFn({ data: { batch_id: id, ...v } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["att", id] }),
    onError: (e: any) => toast.error(e.message || "Failed"),
  });

  if (isLoading)
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  const lectures: any[] = data?.lectures ?? [];
  const students: any[] = data?.students ?? [];
  const att: any[] = data?.attendance ?? [];

  const map: Record<string, Record<string, string>> = {};
  att.forEach((a) => {
    map[a.user_id] ??= {};
    map[a.user_id][a.lecture_id] = a.status;
  });

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-16">
        <Link
          to="/admin/courses"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <h1 className="mt-4 font-display text-3xl font-bold">
          Attendance · <span className="gradient-text">{(data?.batch as any)?.name}</span>
        </h1>
        <p className="text-sm text-muted-foreground">{(data?.batch as any)?.courses?.title}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          Tap a cell to cycle: Present → Absent → Partial → Clear
        </p>

        <div className="mt-6 card-3d rounded-2xl overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-card/60">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Student</th>
                {lectures.map((l) => (
                  <th key={l.id} className="px-3 py-3 text-center font-medium" title={l.title}>
                    #{l.order_index}
                  </th>
                ))}
                <th className="px-4 py-3 text-center font-medium">%</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan={lectures.length + 2}
                    className="px-4 py-10 text-center text-muted-foreground"
                  >
                    No paid students yet.
                  </td>
                </tr>
              ) : (
                students.map((s) => {
                  const row = map[s.user_id] ?? {};
                  const present = lectures.filter((l) => row[l.id] === "present").length;
                  const pct = lectures.length ? Math.round((present / lectures.length) * 100) : 0;
                  return (
                    <tr key={s.user_id} className="border-t border-border/40">
                      <td className="px-4 py-3">
                        {s.profiles?.full_name || s.user_id.slice(0, 8)}
                      </td>
                      {lectures.map((l) => {
                        const st = row[l.id] || "";
                        const cls =
                          st === "present"
                            ? "bg-primary/20 text-primary-glow"
                            : st === "partial"
                              ? "bg-amber-500/15 text-amber-400"
                              : st === "absent"
                                ? "bg-destructive/15 text-destructive"
                                : "bg-muted/30 text-muted-foreground";
                        const next = cycle[st] ?? "present";
                        return (
                          <td key={l.id} className="px-2 py-3 text-center">
                            <button
                              disabled={mark.isPending}
                              onClick={() =>
                                mark.mutate({ lecture_id: l.id, user_id: s.user_id, status: next })
                              }
                              className={`inline-block min-w-8 rounded-md px-2 py-0.5 text-xs hover:opacity-80 ${cls}`}
                              title={`Click to set: ${next}`}
                            >
                              {st ? st[0].toUpperCase() : "—"}
                            </button>
                          </td>
                        );
                      })}
                      <td className="px-4 py-3 text-center font-semibold gradient-text">{pct}%</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, FileBarChart, Loader2 } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { listBatchStudentsForReports } from "@/lib/reports.functions";

export const Route = createFileRoute("/_authenticated/admin/batches/$id/reports")({
  head: () => ({ meta: [{ title: "Student Reports · Admin" }] }),
  component: BatchReports,
});

function BatchReports() {
  const { id } = Route.useParams();
  const fn = useServerFn(listBatchStudentsForReports);
  const { data, isLoading } = useQuery({
    queryKey: ["batch-reports", id],
    queryFn: () => fn({ data: { batch_id: id } }),
  });

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-4xl px-6 pt-28 pb-16">
        <Link
          to="/admin/courses"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Courses
        </Link>
        <h1 className="mt-4 font-display text-3xl font-bold flex items-center gap-2">
          <FileBarChart className="h-7 w-7 text-primary-glow" /> Student Reports
        </h1>
        <p className="text-sm text-muted-foreground">
          Generate a detailed progress report for any enrolled student.
        </p>

        <div className="mt-6 card-3d rounded-2xl p-3">
          {isLoading ? (
            <div className="grid place-items-center py-10">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          ) : (data?.students ?? []).length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No enrolled students yet.
            </p>
          ) : (
            <ul className="divide-y divide-border/40">
              {(data?.students ?? []).map((s: any) => (
                <li key={s.id} className="flex items-center justify-between gap-3 p-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-[image:var(--gradient-primary)] text-xs font-bold text-background">
                      {(s.full_name || "?").slice(0, 1).toUpperCase()}
                    </div>
                    <div className="font-medium">{s.full_name || "—"}</div>
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/reports/$batchId/$userId" params={{ batchId: id, userId: s.id }}>
                      View Report →
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

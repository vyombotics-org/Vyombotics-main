import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Download,
  Loader2,
  Trophy,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Sparkles,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getStudentReport } from "@/lib/reports.functions";

function ReportErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-2xl px-6 pt-40 text-center">
        <h1 className="font-display text-3xl font-bold">Can't open report</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Retry
          </Button>
          <Button asChild>
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/_authenticated/reports/$batchId/$userId")({
  head: () => ({ meta: [{ title: "Progress Report · Vyombotics" }] }),
  component: ReportPage,
  errorComponent: ReportErrorComponent,
  notFoundComponent: () => <div className="grid min-h-screen place-items-center">Not found</div>,
});

function ReportPage() {
  const { batchId, userId } = Route.useParams();
  const fn = useServerFn(getStudentReport);
  const { data, isLoading } = useQuery({
    queryKey: ["report", batchId, userId],
    queryFn: () => fn({ data: { batch_id: batchId, user_id: userId } }),
  });

  if (isLoading || !data) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const s = data.summary;
  const studentName = data.student?.full_name || "Student";

  return (
    <div className="min-h-screen">
      <div className="print:hidden">
        <SiteNav />
      </div>
      <div className="mx-auto max-w-5xl px-6 pt-24 pb-16 print:pt-6">
        <div className="flex items-center justify-between print:hidden">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <Button onClick={() => window.print()} className="btn-glow text-primary-foreground">
            <Download className="h-4 w-4" /> Download PDF
          </Button>
        </div>

        <div className="mt-6 card-3d gradient-border rounded-2xl p-8 print:border print:shadow-none">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary-glow" /> Vyombotics · Progress Report
              </div>
              <h1 className="mt-2 font-display text-3xl font-bold">{studentName}</h1>
              <div className="mt-1 text-sm text-muted-foreground">
                {data.batch?.courses?.title} ·{" "}
                <span className="font-medium text-foreground">{data.batch?.name}</span>
              </div>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              <div>Generated: {new Date(data.generated_at).toLocaleString()}</div>
              {data.enrollment?.expires_at && (
                <div>
                  Validity until: {new Date(data.enrollment.expires_at).toLocaleDateString()}
                </div>
              )}
              {s.certificate && (
                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-primary-glow">
                  <Trophy className="h-3 w-3" /> Certified · {s.certificate.serial_no}
                </div>
              )}
            </div>
          </div>

          {/* Summary grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Metric label="Overall Progress" value={`${s.overallPct}%`} bar={s.overallPct} />
            <Metric label="Attendance" value={`${s.attendancePct}%`} bar={s.attendancePct} />
            <Metric label="Avg Quiz Score" value={`${s.avgQuiz}%`} bar={s.avgQuiz} />
            <Metric label="Avg Assignment" value={`${s.avgAssignment}%`} bar={s.avgAssignment} />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 text-sm">
            <Stat
              label="Lectures completed"
              value={`${s.completedLectures} / ${s.totalLectures}`}
            />
            <Stat label="Watch time" value={`${s.watchedMin} / ${s.totalDuration} min`} />
            <Stat label="Quizzes passed" value={`${s.passedQuizzes} / ${s.quizzesCount}`} />
            <Stat
              label="Assignments submitted"
              value={`${s.gradedAssignments} / ${s.assignmentsCount}`}
            />
            <Stat label="Present / Partial" value={`${s.presentCount} / ${s.partialCount}`} />
            <Stat label="Questions · Replies" value={`${s.questionsAsked} · ${s.repliesPosted}`} />
          </div>

          {/* Lectures */}
          <Section title="Lectures">
            <Table headers={["#", "Title", "Type", "Duration", "Watched", "Attendance"]}>
              {data.lectures.map((l: any) => (
                <tr key={l.id} className="border-t border-border/40">
                  <td className="px-3 py-2 text-muted-foreground">{l.order_index}</td>
                  <td className="px-3 py-2">{l.title}</td>
                  <td className="px-3 py-2 capitalize text-muted-foreground">{l.kind}</td>
                  <td className="px-3 py-2 text-muted-foreground">{l.duration_min || 0}m</td>
                  <td className="px-3 py-2">
                    {Math.floor((l.watched_seconds || 0) / 60)}m{" "}
                    {l.completed && <CheckCircle2 className="inline h-3 w-3 text-primary-glow" />}
                  </td>
                  <td className="px-3 py-2">
                    <AttBadge status={l.attendance_status} />
                  </td>
                </tr>
              ))}
            </Table>
          </Section>

          {/* Quizzes */}
          {data.quizzes.length > 0 && (
            <Section title="Quizzes">
              <Table headers={["Quiz", "Attempts", "Best Score", "Pass %", "Result"]}>
                {data.quizzes.map((q: any) => (
                  <tr key={q.id} className="border-t border-border/40">
                    <td className="px-3 py-2">{q.title}</td>
                    <td className="px-3 py-2 text-muted-foreground">{q.attempts}</td>
                    <td className="px-3 py-2">
                      {q.best_score ?? "—"}
                      {q.best_score != null && "%"}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">{q.pass_percent}%</td>
                    <td className="px-3 py-2">
                      {q.passed ? (
                        <span className="text-primary-glow">Passed</span>
                      ) : (
                        <span className="text-amber-400">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </Table>
            </Section>
          )}

          {/* Assignments */}
          {data.assignments.length > 0 && (
            <Section title="Assignments">
              <Table headers={["Title", "Submitted", "Marks", "Feedback"]}>
                {data.assignments.map((a: any) => (
                  <tr key={a.id} className="border-t border-border/40">
                    <td className="px-3 py-2">{a.title}</td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {a.submitted_at ? new Date(a.submitted_at).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-3 py-2">
                      {a.marks_awarded != null ? `${a.marks_awarded} / ${a.max_marks}` : "—"}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground text-xs">{a.feedback || "—"}</td>
                  </tr>
                ))}
              </Table>
            </Section>
          )}

          <div className="mt-10 border-t border-border/40 pt-4 text-center text-xs text-muted-foreground">
            This is an automatically generated report. For any clarifications, contact the
            instructor.
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body { background: white !important; }
          .card-3d { background: white !important; color: black !important; }
          .gradient-text { background: none !important; -webkit-text-fill-color: black !important; color: black !important; }
          .text-muted-foreground { color: #555 !important; }
        }
      `}</style>
    </div>
  );
}

function Metric({ label, value, bar }: { label: string; value: string; bar: number }) {
  return (
    <div className="rounded-xl border border-border/40 p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-bold gradient-text">{value}</div>
      <Progress value={bar} className="mt-3 h-1.5" />
    </div>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-card/40 px-3 py-2">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="text-base font-semibold">{value}</div>
    </div>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h2 className="font-display text-xl font-semibold mb-3">{title}</h2>
      {children}
    </div>
  );
}
function Table({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/40">
      <table className="w-full text-sm">
        <thead className="bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-3 py-2">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
function AttBadge({ status }: { status: string | null }) {
  if (status === "present")
    return (
      <span className="inline-flex items-center gap-1 text-primary-glow">
        <CheckCircle2 className="h-3 w-3" /> Present
      </span>
    );
  if (status === "partial")
    return (
      <span className="inline-flex items-center gap-1 text-amber-400">
        <MinusCircle className="h-3 w-3" /> Partial
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-muted-foreground">
      <XCircle className="h-3 w-3" /> Absent
    </span>
  );
}

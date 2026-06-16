import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Loader2,
  PlayCircle,
  Radio,
  Clock,
  CheckCircle2,
  Calendar,
  Lock,
  BrainCircuit,
  FileText,
  Trophy,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getLearnerBatch, recordWatchProgress, markLiveJoin } from "@/lib/learn.functions";
import { issueCertificate } from "@/lib/certificates.functions";
import { listBatchQuizzes } from "@/lib/quizzes.functions";
import { LectureDiscussions } from "@/components/LectureDiscussions";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

function LearnErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-2xl px-6 pt-40 text-center">
        <h1 className="font-display text-3xl font-bold">Can't open this batch</h1>
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
            <Link to="/dashboard">Back to dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/_authenticated/learn/$batchId")({
  head: () => ({ meta: [{ title: "Learn · Vyombotics" }] }),
  component: LearnPage,
  errorComponent: LearnErrorComponent,
  notFoundComponent: () => <div className="grid min-h-screen place-items-center">Not found</div>,
});

function LearnPage() {
  const { batchId } = Route.useParams();
  const qc = useQueryClient();
  const { user } = useAuth();
  const getFn = useServerFn(getLearnerBatch);
  const recFn = useServerFn(recordWatchProgress);
  const joinFn = useServerFn(markLiveJoin);

  const { data, isLoading } = useQuery({
    queryKey: ["learn", batchId],
    queryFn: () => getFn({ data: { batch_id: batchId } }),
  });
  const [activeId, setActiveId] = useState<string | null>(null);

  const lectures: any[] = data?.lectures ?? [];
  const active = useMemo(
    () => lectures.find((l) => l.id === activeId) ?? lectures[0] ?? null,
    [lectures, activeId],
  );

  useEffect(() => {
    if (!activeId && lectures[0]) setActiveId(lectures[0].id);
  }, [lectures, activeId]);

  const progressMap = useMemo(() => {
    const m: Record<string, { watched_seconds: number; completed: boolean }> = {};
    (data?.progress ?? []).forEach((p: any) => {
      m[p.lecture_id] = p;
    });
    return m;
  }, [data]);
  const attendanceMap = useMemo(() => {
    const m: Record<string, string> = {};
    (data?.attendance ?? []).forEach((a: any) => {
      m[a.lecture_id] = a.status;
    });
    return m;
  }, [data]);

  const totalDuration = lectures.reduce((s, l) => s + (l.duration_min || 0), 0);
  const watchedMin = Object.values(progressMap).reduce(
    (s, p) => s + Math.floor((p.watched_seconds || 0) / 60),
    0,
  );
  const overallPct = totalDuration
    ? Math.min(100, Math.round((watchedMin / totalDuration) * 100))
    : 0;
  const presentCount = Object.values(attendanceMap).filter((s) => s === "present").length;
  const attendancePct = lectures.length ? Math.round((presentCount / lectures.length) * 100) : 0;

  const recordMut = useMutation({
    mutationFn: (v: { lecture_id: string; watched_seconds: number }) => recFn({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["learn", batchId] }),
  });
  const joinMut = useMutation({
    mutationFn: (lecture_id: string) => joinFn({ data: { lecture_id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["learn", batchId] });
      toast.success("Marked as joined");
    },
  });

  // Auto-save watched seconds every 15s for recorded videos
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (!active || active.kind !== "recorded") return;
    const v = videoRef.current;
    if (!v) return;
    // resume from last position
    const saved = progressMap[active.id]?.watched_seconds ?? 0;
    if (saved > 5) {
      try {
        v.currentTime = saved;
      } catch {
        // Ignore video seek errors
      }
    }
    const interval = setInterval(() => {
      if (!v.paused && v.currentTime > 5) {
        recordMut.mutate({ lecture_id: active.id, watched_seconds: Math.floor(v.currentTime) });
      }
    }, 15000);
    const onEnd = () =>
      recordMut.mutate({
        lecture_id: active.id,
        watched_seconds: Math.floor(v.duration || v.currentTime),
      });
    v.addEventListener("ended", onEnd);
    return () => {
      clearInterval(interval);
      v.removeEventListener("ended", onEnd);
    };
  }, [active?.id]);

  if (isLoading)
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );

  const batch: any = data?.batch;
  const expired =
    data?.enrollment?.expires_at && new Date(data.enrollment.expires_at) <= new Date();

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-16">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-sm text-muted-foreground">{batch?.courses?.title}</div>
            <h1 className="font-display text-3xl font-bold">{batch?.name}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                document.getElementById("learn-quizzes")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <BrainCircuit className="h-4 w-4" /> Quizzes
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/learn/$batchId/assignments" params={{ batchId }}>
                <FileText className="h-4 w-4" /> Assignments
              </Link>
            </Button>
            <ClaimCertButton batchId={batchId} />
          </div>
        </div>

        {expired && (
          <div className="mt-4 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
            <Lock className="mr-2 inline h-4 w-4" /> Your access expired on{" "}
            {new Date(data!.enrollment!.expires_at!).toLocaleDateString()}.
          </div>
        )}

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Stat label="Overall progress" value={`${overallPct}%`} bar={overallPct} />
          <Stat label="Attendance" value={`${attendancePct}%`} bar={attendancePct} />
          <Stat
            label="Watched"
            value={`${watchedMin} / ${totalDuration} min`}
            bar={totalDuration ? (watchedMin / totalDuration) * 100 : 0}
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="card-3d gradient-border overflow-hidden rounded-2xl">
            {!active ? (
              <div className="aspect-video grid place-items-center text-muted-foreground">
                No lectures yet.
              </div>
            ) : active.kind === "recorded" ? (
              active.video_url ? (
                <video
                  ref={videoRef}
                  key={active.id}
                  src={active.video_url}
                  controls
                  className="aspect-video w-full bg-black"
                />
              ) : (
                <div className="aspect-video grid place-items-center bg-black text-muted-foreground">
                  Video not uploaded yet
                </div>
              )
            ) : (
              <LivePanel
                lecture={active}
                onJoin={() => joinMut.mutate(active.id)}
                joining={joinMut.isPending}
              />
            )}
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-semibold">{active?.title}</h2>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="capitalize">{active?.kind}</span>
                    {active?.scheduled_at && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(active.scheduled_at).toLocaleString()}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {active?.duration_min || 0} min
                    </span>
                    {attendanceMap[active?.id] && (
                      <span className="rounded-full bg-primary/15 px-2 py-0.5 text-primary-glow capitalize">
                        {attendanceMap[active?.id]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {active?.description && (
                <p className="mt-3 text-sm text-muted-foreground whitespace-pre-wrap">
                  {active.description}
                </p>
              )}
            </div>
          </div>

          <aside className="card-3d rounded-2xl p-3 max-h-[80vh] overflow-y-auto">
            <div className="px-3 py-2 text-xs uppercase tracking-wider text-muted-foreground">
              Lectures · {lectures.length}
            </div>
            <div className="grid gap-1">
              {lectures.map((l) => {
                const isActive = active?.id === l.id;
                const att = attendanceMap[l.id];
                const prog = progressMap[l.id];
                return (
                  <button
                    key={l.id}
                    onClick={() => setActiveId(l.id)}
                    className={`flex items-start gap-3 rounded-xl p-3 text-left transition-all ${isActive ? "bg-primary/10 border border-primary/40" : "hover:bg-card/60"}`}
                  >
                    <div
                      className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg ${l.kind === "live" ? "bg-red-500/15 text-red-400" : "bg-primary/15 text-primary-glow"}`}
                    >
                      {l.kind === "live" ? (
                        <Radio className="h-4 w-4" />
                      ) : (
                        <PlayCircle className="h-4 w-4" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">
                        #{l.order_index} {l.title}
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {l.duration_min || 0}m
                        {prog?.completed && <CheckCircle2 className="h-3 w-3 text-primary-glow" />}
                        {att && <span className="capitalize text-primary-glow">· {att}</span>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>

        <QuizzesSection batchId={batchId} />
        {active && user && <LectureDiscussions lectureId={active.id} currentUserId={user.id} />}
      </div>
    </div>
  );
}

function ClaimCertButton({ batchId }: { batchId: string }) {
  const fn = useServerFn(issueCertificate);
  const mut = useMutation({
    mutationFn: () => fn({ data: { batch_id: batchId } }),
    onSuccess: (r: any) =>
      toast.success(
        r.just_issued
          ? `Certificate issued! ${r.certificate.serial_no}`
          : `Already issued: ${r.certificate.serial_no}`,
      ),
    onError: (e: any) => toast.error(e?.message || "Not eligible yet"),
  });
  return (
    <Button
      size="sm"
      className="btn-glow text-primary-foreground"
      disabled={mut.isPending}
      onClick={() => mut.mutate()}
    >
      {mut.isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trophy className="h-4 w-4" />
      )}{" "}
      Claim Certificate
    </Button>
  );
}

function QuizzesSection({ batchId }: { batchId: string }) {
  const fn = useServerFn(listBatchQuizzes);
  const { data, isLoading } = useQuery({
    queryKey: ["batch-quizzes", batchId],
    queryFn: () => fn({ data: { batch_id: batchId } }),
  });
  if (isLoading) return null;
  const quizzes = (data?.quizzes ?? []) as any[];
  return (
    <section id="learn-quizzes" className="mt-10">
      <h2 className="font-display text-2xl font-semibold flex items-center gap-2">
        <BrainCircuit className="h-5 w-5 text-primary-glow" /> Quizzes
      </h2>
      {quizzes.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">No quizzes published yet.</p>
      ) : (
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {quizzes.map((q) => (
            <li
              key={q.id}
              className="card-3d rounded-2xl p-4 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="font-medium truncate">{q.title}</div>
                <div className="text-xs text-muted-foreground">
                  {q.quiz_questions?.[0]?.count ?? 0} questions · Pass {q.pass_percent}%
                </div>
              </div>
              <Button asChild size="sm" className="btn-glow text-primary-foreground">
                <Link to="/learn/$batchId/quiz/$quizId" params={{ batchId, quizId: q.id }}>
                  Take
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Stat({ label, value, bar }: { label: string; value: string; bar: number }) {
  return (
    <div className="card-3d rounded-2xl p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-bold gradient-text">{value}</div>
      <Progress value={bar} className="mt-3 h-1.5" />
    </div>
  );
}

function LivePanel({
  lecture,
  onJoin,
  joining,
}: {
  lecture: any;
  onJoin: () => void;
  joining: boolean;
}) {
  const start = lecture.scheduled_at ? new Date(lecture.scheduled_at).getTime() : 0;
  const end = start + (lecture.duration_min || 60) * 60 * 1000;
  const now = Date.now();
  const isLive = start && now >= start - 10 * 60 * 1000 && now <= end;
  const upcoming = start && now < start;
  return (
    <div className="aspect-video grid place-items-center bg-black p-6 text-center">
      <div>
        <Radio
          className={`mx-auto h-12 w-12 ${isLive ? "text-red-400 animate-pulse" : "text-muted-foreground"}`}
        />
        <div className="mt-3 font-display text-xl">
          {isLive ? "🔴 Live now" : upcoming ? "Upcoming live class" : "Class ended"}
        </div>
        {lecture.scheduled_at && (
          <div className="mt-1 text-sm text-muted-foreground">
            {new Date(lecture.scheduled_at).toLocaleString()}
          </div>
        )}
        {isLive && lecture.meeting_url && (
          <Button
            className="btn-glow mt-5 text-primary-foreground"
            disabled={joining}
            onClick={() => {
              onJoin();
              window.open(lecture.meeting_url, "_blank");
            }}
          >
            {joining ? <Loader2 className="h-4 w-4 animate-spin" /> : <Radio className="h-4 w-4" />}{" "}
            Join live class
          </Button>
        )}
        {!isLive && upcoming && lecture.meeting_url && (
          <Button
            variant="outline"
            className="mt-5"
            onClick={() => {
              onJoin();
              window.open(lecture.meeting_url, "_blank");
            }}
          >
            Open meeting link
          </Button>
        )}
      </div>
    </div>
  );
}

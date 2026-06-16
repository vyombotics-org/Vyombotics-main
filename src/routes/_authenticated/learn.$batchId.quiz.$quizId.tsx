import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ArrowLeft, Loader2, CheckCircle2, XCircle, BrainCircuit } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getQuizForStudent, submitQuizAttempt } from "@/lib/quizzes.functions";

export const Route = createFileRoute("/_authenticated/learn/$batchId/quiz/$quizId")({
  head: () => ({ meta: [{ title: "Quiz · Vyombotics" }] }),
  component: QuizPage,
});

function QuizPage() {
  const { batchId, quizId } = Route.useParams();
  const navigate = useNavigate();
  const getFn = useServerFn(getQuizForStudent);
  const submitFn = useServerFn(submitQuizAttempt);
  const { data, isLoading, error } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => getFn({ data: { quiz_id: quizId } }),
    retry: false,
  });

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);

  const submit = useMutation({
    mutationFn: () => submitFn({ data: { quiz_id: quizId, answers } }),
    onSuccess: (r) => {
      setResult(r);
      toast.success(r.passed ? "Passed!" : "Submitted");
    },
    onError: (e: any) => toast.error(e?.message || "Failed"),
  });

  const answered = useMemo(() => Object.keys(answers).length, [answers]);
  const total = data?.questions?.length ?? 0;

  if (isLoading)
    return (
      <div className="min-h-screen grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  if (error || !data)
    return (
      <div className="min-h-screen">
        <SiteNav />
        <div className="mx-auto max-w-3xl px-6 pt-28 pb-20">
          <Link
            to="/learn/$batchId"
            params={{ batchId }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to batch
          </Link>
          <div className="mt-6 card-3d rounded-2xl p-8 text-center">
            <XCircle className="mx-auto h-12 w-12 text-destructive" />
            <h2 className="mt-3 font-display text-2xl font-bold">Quiz unavailable</h2>
            <p className="mt-2 text-muted-foreground">
              {(error as any)?.message ||
                "This quiz could not be loaded. Make sure it's published and you're enrolled in the batch."}
            </p>
          </div>
        </div>
      </div>
    );
  if (total === 0)
    return (
      <div className="min-h-screen">
        <SiteNav />
        <div className="mx-auto max-w-3xl px-6 pt-28 pb-20">
          <Link
            to="/learn/$batchId"
            params={{ batchId }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to batch
          </Link>
          <div className="mt-3 flex items-center gap-3">
            <BrainCircuit className="h-7 w-7 text-primary-glow" />
            <h1 className="font-display text-3xl font-bold">{data.quiz.title}</h1>
          </div>
          <div className="mt-6 card-3d rounded-2xl p-8 text-center text-muted-foreground">
            No questions have been added to this quiz yet.
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-3xl px-6 pt-28 pb-20">
        <Link
          to="/learn/$batchId"
          params={{ batchId }}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to batch
        </Link>
        <div className="mt-3 flex items-center gap-3">
          <BrainCircuit className="h-7 w-7 text-primary-glow" />
          <h1 className="font-display text-3xl font-bold">{data.quiz.title}</h1>
        </div>
        {data.quiz.description && (
          <p className="mt-2 text-muted-foreground">{data.quiz.description}</p>
        )}
        <div className="mt-2 text-sm text-muted-foreground">
          Pass: {data.quiz.pass_percent}% · {total} questions
        </div>

        {result ? (
          <div className="mt-8 card-3d rounded-2xl p-8 text-center">
            {result.passed ? (
              <CheckCircle2 className="mx-auto h-16 w-16 text-primary-glow" />
            ) : (
              <XCircle className="mx-auto h-16 w-16 text-destructive" />
            )}
            <h2 className="mt-4 font-display text-3xl font-bold">
              {result.passed ? "Congratulations!" : "Try again"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              Score: {result.score} / {result.max_score} (
              {Math.round((result.score / result.max_score) * 100)}%)
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setResult(null);
                  setAnswers({});
                }}
              >
                Retake
              </Button>
              <Button asChild className="btn-glow text-primary-foreground">
                <Link to="/learn/$batchId" params={{ batchId }}>
                  Back
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            {data.attempts.length > 0 && (
              <div className="mt-4 rounded-xl border border-border/40 bg-card/30 p-3 text-sm">
                Previous best: {Math.max(...data.attempts.map((a: any) => a.score))} /{" "}
                {data.attempts[0].max_score}
              </div>
            )}
            <ol className="mt-6 space-y-5">
              {data.questions.map((q: any, i: number) => (
                <li key={q.id} className="card-3d rounded-2xl p-5">
                  <div className="text-xs text-muted-foreground">
                    Q{i + 1} · {q.marks} mark{q.marks > 1 ? "s" : ""}
                  </div>
                  <p className="mt-1 font-medium">{q.prompt}</p>
                  <div className="mt-3 grid gap-2">
                    {(q.options as any[]).map((opt: any) => (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition ${answers[q.id] === opt.id ? "border-primary bg-primary/10" : "border-border/40 hover:border-border"}`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          checked={answers[q.id] === opt.id}
                          onChange={() => setAnswers((a) => ({ ...a, [q.id]: opt.id }))}
                          className="h-4 w-4"
                        />
                        <span className="text-sm">{opt.text}</span>
                      </label>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {answered} / {total} answered
              </span>
              <Button
                className="btn-glow text-primary-foreground"
                disabled={answered < total || submit.isPending}
                onClick={() => submit.mutate()}
              >
                {submit.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Submit quiz
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

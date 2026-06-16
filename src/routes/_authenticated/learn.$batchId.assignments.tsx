import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Loader2, FileText, CheckCircle2, Send } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { listBatchAssignments, submitAssignment } from "@/lib/assignments.functions";

export const Route = createFileRoute("/_authenticated/learn/$batchId/assignments")({
  head: () => ({ meta: [{ title: "Assignments · Vyombotics" }] }),
  component: AssignmentsPage,
});

function AssignmentsPage() {
  const { batchId } = Route.useParams();
  const qc = useQueryClient();
  const listFn = useServerFn(listBatchAssignments);
  const submitFn = useServerFn(submitAssignment);
  const { data, isLoading } = useQuery({
    queryKey: ["assignments", batchId],
    queryFn: () => listFn({ data: { batch_id: batchId } }),
  });

  const submit = useMutation({
    mutationFn: (p: { assignment_id: string; text_content: string; file_url: string }) =>
      submitFn({
        data: {
          assignment_id: p.assignment_id,
          text_content: p.text_content || null,
          file_url: p.file_url || null,
        } as any,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["assignments", batchId] });
      toast.success("Submitted");
    },
    onError: (e: any) => toast.error(e?.message || "Failed"),
  });

  if (isLoading)
    return (
      <div className="min-h-screen grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  const subsByA: Record<string, any> = {};
  (data?.submissions ?? []).forEach((s: any) => {
    subsByA[s.assignment_id] = s;
  });

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-4xl px-6 pt-28 pb-20">
        <Link
          to="/learn/$batchId"
          params={{ batchId }}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to batch
        </Link>
        <h1 className="mt-3 font-display text-4xl font-bold">Assignments</h1>

        {(data?.assignments ?? []).length === 0 ? (
          <div className="mt-10 card-3d rounded-2xl p-10 text-center">
            <FileText className="mx-auto h-10 w-10 text-primary-glow" />
            <p className="mt-3 text-muted-foreground">No assignments yet.</p>
          </div>
        ) : (
          <ul className="mt-6 space-y-4">
            {(data?.assignments ?? []).map((a: any) => (
              <AssignmentItem
                key={a.id}
                a={a}
                sub={subsByA[a.id]}
                onSubmit={(text: string, url: string) =>
                  submit.mutate({ assignment_id: a.id, text_content: text, file_url: url })
                }
                submitting={submit.isPending}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function AssignmentItem({ a, sub, onSubmit, submitting }: any) {
  const [text, setText] = useState(sub?.text_content || "");
  const [url, setUrl] = useState(sub?.file_url || "");
  const graded = sub?.marks_awarded != null;
  const past = a.due_at && new Date(a.due_at) < new Date();
  return (
    <li className="card-3d rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-xl font-semibold">{a.title}</h3>
          <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span>{a.max_marks} marks</span>
            {a.due_at && (
              <span className={past ? "text-destructive" : ""}>
                · Due {new Date(a.due_at).toLocaleString()}
              </span>
            )}
            {sub && (
              <span className="rounded-full bg-primary/15 px-2 py-0.5 text-primary-glow">
                Submitted
              </span>
            )}
            {graded && (
              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-primary-glow">
                Graded: {sub.marks_awarded}/{a.max_marks}
              </span>
            )}
          </div>
        </div>
      </div>
      {a.description && (
        <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">{a.description}</p>
      )}

      {graded ? (
        <div className="mt-4 rounded-xl border border-primary/40 bg-primary/5 p-4">
          <div className="flex items-center gap-2 text-primary-glow">
            <CheckCircle2 className="h-4 w-4" /> Graded {sub.marks_awarded}/{a.max_marks}
          </div>
          {sub.feedback && <p className="mt-2 text-sm">Feedback: {sub.feedback}</p>}
          {sub.text_content && (
            <p className="mt-2 whitespace-pre-wrap rounded bg-card/40 p-2 text-sm">
              {sub.text_content}
            </p>
          )}
        </div>
      ) : (
        <div className="mt-4 grid gap-2">
          <div>
            <Label>Your answer</Label>
            <Textarea
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your answer..."
            />
          </div>
          <div>
            <Label>Attachment URL (Google Drive, Dropbox, etc.)</Label>
            <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
          </div>
          <Button
            className="btn-glow w-fit text-primary-foreground"
            disabled={(!text && !url) || submitting}
            onClick={() => onSubmit(text, url)}
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}{" "}
            {sub ? "Update submission" : "Submit"}
          </Button>
        </div>
      )}
    </li>
  );
}

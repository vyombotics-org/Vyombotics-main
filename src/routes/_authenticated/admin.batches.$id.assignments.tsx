import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Loader2, FileText, Pencil, CheckCircle2 } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  listBatchAssignments,
  upsertAssignment,
  deleteAssignment,
  gradeSubmission,
} from "@/lib/assignments.functions";
import { getBatchAdmin } from "@/lib/batches.functions";

export const Route = createFileRoute("/_authenticated/admin/batches/$id/assignments")({
  head: () => ({ meta: [{ title: "Manage Assignments · Admin" }] }),
  component: AdminAssignments,
});

function AdminAssignments() {
  const { id: batchId } = Route.useParams();
  const qc = useQueryClient();
  const batchFn = useServerFn(getBatchAdmin);
  const listFn = useServerFn(listBatchAssignments);
  const saveFn = useServerFn(upsertAssignment);
  const delFn = useServerFn(deleteAssignment);
  const gradeFn = useServerFn(gradeSubmission);

  const batchQ = useQuery({
    queryKey: ["admin", "batch", batchId],
    queryFn: () => batchFn({ data: { id: batchId } }),
  });
  const listQ = useQuery({
    queryKey: ["admin", "assignments", batchId],
    queryFn: () => listFn({ data: { batch_id: batchId } }),
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    max_marks: 100,
    due_at: "",
    is_published: false,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [openSubmissions, setOpenSubmissions] = useState<string | null>(null);

  const save = useMutation({
    mutationFn: () =>
      saveFn({
        data: {
          id: editingId ?? undefined,
          batch_id: batchId,
          ...form,
          due_at: form.due_at ? new Date(form.due_at).toISOString() : null,
        } as any,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "assignments", batchId] });
      toast.success(editingId ? "Updated" : "Created");
      setEditingId(null);
      setForm({ title: "", description: "", max_marks: 100, due_at: "", is_published: false });
    },
    onError: (e: any) => toast.error(e?.message || "Failed"),
  });
  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "assignments", batchId] });
      toast.success("Deleted");
    },
  });
  const grade = useMutation({
    mutationFn: (p: { submission_id: string; marks_awarded: number; feedback: string }) =>
      gradeFn({ data: p }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "assignments", batchId] });
      toast.success("Graded");
    },
    onError: (e: any) => toast.error(e?.message || "Failed"),
  });

  const startEdit = (a: any) => {
    setEditingId(a.id);
    setForm({
      title: a.title,
      description: a.description || "",
      max_marks: a.max_marks,
      due_at: a.due_at ? a.due_at.slice(0, 16) : "",
      is_published: a.is_published,
    });
  };

  const subsByAssignment: Record<string, any[]> = {};
  (listQ.data?.submissions ?? []).forEach((s: any) => {
    (subsByAssignment[s.assignment_id] ??= []).push(s);
  });

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-20">
        <Link
          to="/admin/batches/$id/lectures"
          params={{ id: batchId }}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to lectures
        </Link>
        <h1 className="mt-3 font-display text-4xl font-bold">
          Assignments <span className="gradient-text">{batchQ.data?.batch?.name}</span>
        </h1>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="card-3d rounded-2xl p-5">
            <h2 className="font-display text-xl font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary-glow" />
              All assignments
            </h2>
            {listQ.isLoading ? (
              <div className="grid place-items-center py-10">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            ) : (listQ.data?.assignments ?? []).length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">No assignments yet.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {(listQ.data?.assignments ?? []).map((a: any) => {
                  const subs = subsByAssignment[a.id] ?? [];
                  return (
                    <li key={a.id} className="rounded-xl border border-border/40 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="font-medium truncate">{a.title}</div>
                          <div className="mt-1 text-xs text-muted-foreground flex flex-wrap gap-2">
                            <span>{a.max_marks} marks</span>
                            {a.due_at && <span>· Due {new Date(a.due_at).toLocaleString()}</span>}
                            <span
                              className={`rounded-full px-2 py-0.5 ${a.is_published ? "bg-primary/15 text-primary-glow" : "bg-amber-500/15 text-amber-400"}`}
                            >
                              {a.is_published ? "Published" : "Draft"}
                            </span>
                            <span>· {subs.length} submission(s)</span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              setOpenSubmissions(openSubmissions === a.id ? null : a.id)
                            }
                          >
                            {subs.length} ▾
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => startEdit(a)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              if (confirm("Delete?")) del.mutate(a.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      {openSubmissions === a.id && (
                        <div className="mt-4 border-t border-border/40 pt-4 space-y-3">
                          {subs.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No submissions yet.</p>
                          ) : (
                            subs.map((s) => (
                              <SubmissionGrader
                                key={s.id}
                                sub={s}
                                maxMarks={a.max_marks}
                                onGrade={(m, f) =>
                                  grade.mutate({
                                    submission_id: s.id,
                                    marks_awarded: m,
                                    feedback: f,
                                  })
                                }
                              />
                            ))
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="card-3d rounded-2xl p-5 h-fit">
            <h3 className="font-display text-lg font-semibold">
              {editingId ? "Edit assignment" : "New assignment"}
            </h3>
            <div className="mt-3 grid gap-3">
              <div>
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Max marks</Label>
                  <Input
                    type="number"
                    min={1}
                    value={form.max_marks}
                    onChange={(e) => setForm((f) => ({ ...f, max_marks: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label>Due</Label>
                  <Input
                    type="datetime-local"
                    value={form.due_at}
                    onChange={(e) => setForm((f) => ({ ...f, due_at: e.target.value }))}
                  />
                </div>
              </div>
              <label className="flex items-center justify-between rounded-lg border border-border/40 p-3">
                <span className="text-sm">Published</span>
                <Switch
                  checked={form.is_published}
                  onCheckedChange={(v) => setForm((f) => ({ ...f, is_published: v }))}
                />
              </label>
              <div className="flex gap-2">
                <Button
                  className="btn-glow flex-1 text-primary-foreground"
                  disabled={!form.title || save.isPending}
                  onClick={() => save.mutate()}
                >
                  {save.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}{" "}
                  {editingId ? "Save" : "Create"}
                </Button>
                {editingId && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      setForm({
                        title: "",
                        description: "",
                        max_marks: 100,
                        due_at: "",
                        is_published: false,
                      });
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubmissionGrader({
  sub,
  maxMarks,
  onGrade,
}: {
  sub: any;
  maxMarks: number;
  onGrade: (m: number, f: string) => void;
}) {
  const [marks, setMarks] = useState<string>(
    sub.marks_awarded != null ? String(sub.marks_awarded) : "",
  );
  const [feedback, setFeedback] = useState<string>(sub.feedback || "");
  const graded = sub.marks_awarded != null;
  return (
    <div className="rounded-lg border border-border/40 p-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">{sub.profiles?.full_name || "Student"}</div>
        <div className="text-xs text-muted-foreground">
          {new Date(sub.submitted_at).toLocaleString()}
        </div>
      </div>
      {sub.text_content && (
        <p className="mt-2 whitespace-pre-wrap rounded bg-card/40 p-2 text-sm">
          {sub.text_content}
        </p>
      )}
      {sub.file_url && (
        <a
          href={sub.file_url}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block text-sm text-primary-glow underline"
        >
          View attached link
        </a>
      )}
      <div className="mt-3 grid gap-2 sm:grid-cols-[100px_1fr_auto] items-end">
        <div>
          <Label className="text-xs">Marks /{maxMarks}</Label>
          <Input
            type="number"
            min={0}
            max={maxMarks}
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />
        </div>
        <div>
          <Label className="text-xs">Feedback</Label>
          <Input
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Optional comments"
          />
        </div>
        <Button
          size="sm"
          className="btn-glow text-primary-foreground"
          disabled={marks === ""}
          onClick={() => onGrade(Number(marks), feedback)}
        >
          <CheckCircle2 className="h-4 w-4" /> {graded ? "Update" : "Grade"}
        </Button>
      </div>
    </div>
  );
}

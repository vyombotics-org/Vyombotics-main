import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Loader2, BrainCircuit, Pencil, ChevronDown } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  listBatchQuizzes,
  upsertQuiz,
  deleteQuiz,
  getQuizAdmin,
  saveQuizQuestions,
} from "@/lib/quizzes.functions";
import { getBatchAdmin } from "@/lib/batches.functions";

export const Route = createFileRoute("/_authenticated/admin/batches/$id/quizzes")({
  head: () => ({ meta: [{ title: "Manage Quizzes · Admin" }] }),
  component: AdminQuizzes,
});

function AdminQuizzes() {
  const { id: batchId } = Route.useParams();
  const qc = useQueryClient();
  const batchFn = useServerFn(getBatchAdmin);
  const listFn = useServerFn(listBatchQuizzes);
  const saveFn = useServerFn(upsertQuiz);
  const delFn = useServerFn(deleteQuiz);

  const batchQ = useQuery({
    queryKey: ["admin", "batch", batchId],
    queryFn: () => batchFn({ data: { id: batchId } }),
  });
  const listQ = useQuery({
    queryKey: ["admin", "quizzes", batchId],
    queryFn: () => listFn({ data: { batch_id: batchId } }),
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    pass_percent: 60,
    time_limit_min: "",
    is_published: false,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [openQuestions, setOpenQuestions] = useState<string | null>(null);

  const save = useMutation({
    mutationFn: () =>
      saveFn({
        data: {
          id: editingId ?? undefined,
          batch_id: batchId,
          ...form,
          time_limit_min: form.time_limit_min ? Number(form.time_limit_min) : null,
        } as any,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "quizzes", batchId] });
      toast.success(editingId ? "Updated" : "Created");
      setEditingId(null);
      setForm({
        title: "",
        description: "",
        pass_percent: 60,
        time_limit_min: "",
        is_published: false,
      });
    },
    onError: (e: any) => toast.error(e?.message || "Failed"),
  });
  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "quizzes", batchId] });
      toast.success("Deleted");
    },
  });

  const startEdit = (q: any) => {
    setEditingId(q.id);
    setForm({
      title: q.title,
      description: q.description || "",
      pass_percent: q.pass_percent,
      time_limit_min: q.time_limit_min ? String(q.time_limit_min) : "",
      is_published: q.is_published,
    });
  };

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
        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-4xl font-bold">
              Quizzes <span className="gradient-text">{batchQ.data?.batch?.name}</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{batchQ.data?.course?.title}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="card-3d rounded-2xl p-5">
            <h2 className="font-display text-xl font-semibold flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-primary-glow" />
              All quizzes
            </h2>
            {listQ.isLoading ? (
              <div className="grid place-items-center py-10">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            ) : (listQ.data?.quizzes ?? []).length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">No quizzes yet.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {(listQ.data?.quizzes ?? []).map((q: any) => (
                  <li key={q.id} className="rounded-xl border border-border/40 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-medium truncate">{q.title}</div>
                        <div className="mt-1 text-xs text-muted-foreground flex flex-wrap gap-2">
                          <span>{q.quiz_questions?.[0]?.count ?? 0} questions</span>
                          <span>· Pass {q.pass_percent}%</span>
                          {q.time_limit_min && <span>· {q.time_limit_min} min</span>}
                          <span
                            className={`rounded-full px-2 py-0.5 ${q.is_published ? "bg-primary/15 text-primary-glow" : "bg-amber-500/15 text-amber-400"}`}
                          >
                            {q.is_published ? "Published" : "Draft"}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1 items-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setOpenQuestions(openQuestions === q.id ? null : q.id)}
                        >
                          <Plus className="h-3 w-3 mr-1" /> Questions{" "}
                          <ChevronDown
                            className={`h-3 w-3 ml-1 transition ${openQuestions === q.id ? "rotate-180" : ""}`}
                          />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => startEdit(q)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            if (confirm("Delete quiz?")) del.mutate(q.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    {openQuestions === q.id && <QuestionsEditor quizId={q.id} />}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card-3d rounded-2xl p-5 h-fit">
            <h3 className="font-display text-lg font-semibold">
              {editingId ? "Edit quiz" : "New quiz"}
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
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Pass %</Label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={form.pass_percent}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, pass_percent: Number(e.target.value) }))
                    }
                  />
                </div>
                <div>
                  <Label>Time limit (min)</Label>
                  <Input
                    type="number"
                    min={0}
                    value={form.time_limit_min}
                    onChange={(e) => setForm((f) => ({ ...f, time_limit_min: e.target.value }))}
                    placeholder="Optional"
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
                        pass_percent: 60,
                        time_limit_min: "",
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

function QuestionsEditor({ quizId }: { quizId: string }) {
  const qc = useQueryClient();
  const getFn = useServerFn(getQuizAdmin);
  const saveFn = useServerFn(saveQuizQuestions);
  const dataQ = useQuery({
    queryKey: ["admin", "quiz", quizId],
    queryFn: () => getFn({ data: { quiz_id: quizId } }),
  });
  const [rows, setRows] = useState<any[] | null>(null);
  const list = rows ?? dataQ.data?.questions ?? [];

  const update = (i: number, patch: any) =>
    setRows((r) => {
      const base = (r ?? dataQ.data?.questions ?? []).map((x: any) => ({ ...x }));
      base[i] = { ...base[i], ...patch };
      return base;
    });
  const add = () => {
    const base = (rows ?? dataQ.data?.questions ?? []).map((x: any) => ({ ...x }));
    base.push({
      prompt: "",
      options: [
        { id: "a", text: "" },
        { id: "b", text: "" },
        { id: "c", text: "" },
        { id: "d", text: "" },
      ],
      correct_option: "a",
      marks: 1,
      order_index: base.length,
    });
    setRows(base);
  };
  const remove = (i: number) => {
    const base = (rows ?? dataQ.data?.questions ?? []).filter((_: any, idx: number) => idx !== i);
    setRows(base);
  };

  const save = useMutation({
    mutationFn: () =>
      saveFn({
        data: {
          quiz_id: quizId,
          questions: (rows ?? []).map((q: any, i: number) => ({
            id: q.id,
            prompt: q.prompt,
            options: q.options,
            correct_option: q.correct_option,
            marks: q.marks,
            order_index: i,
          })),
        },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "quiz", quizId] });
      qc.invalidateQueries({ queryKey: ["admin", "quizzes"] });
      toast.success("Questions saved");
      setRows(null);
    },
    onError: (e: any) => toast.error(e?.message || "Failed"),
  });

  if (dataQ.isLoading)
    return (
      <div className="mt-3 grid place-items-center py-6">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="mt-4 border-t border-border/40 pt-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Questions</h4>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={add}>
            <Plus className="h-3 w-3" /> Add
          </Button>
          {rows !== null && (
            <Button
              size="sm"
              className="btn-glow text-primary-foreground"
              onClick={() => save.mutate()}
              disabled={save.isPending}
            >
              {save.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : null} Save all
            </Button>
          )}
        </div>
      </div>
      {list.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">No questions. Click Add.</p>
      ) : (
        <ol className="mt-3 space-y-4">
          {list.map((q: any, i: number) => (
            <li key={i} className="rounded-lg border border-border/40 p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">Q{i + 1}</span>
                <div className="flex items-center gap-2">
                  <Input
                    className="w-20"
                    type="number"
                    min={1}
                    value={q.marks}
                    onChange={(e) => update(i, { marks: Number(e.target.value) })}
                    placeholder="Marks"
                  />
                  <Button size="sm" variant="ghost" onClick={() => remove(i)}>
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </div>
              </div>
              <Textarea
                className="mt-2"
                rows={2}
                value={q.prompt}
                onChange={(e) => update(i, { prompt: e.target.value })}
                placeholder="Question..."
              />
              <div className="mt-2 grid gap-2">
                {q.options.map((opt: any, oi: number) => (
                  <div key={opt.id} className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={q.correct_option === opt.id}
                      onChange={() => update(i, { correct_option: opt.id })}
                      className="h-4 w-4"
                    />
                    <Input
                      value={opt.text}
                      onChange={(e) => {
                        const opts = [...q.options];
                        opts[oi] = { ...opt, text: e.target.value };
                        update(i, { options: opts });
                      }}
                      placeholder={`Option ${opt.id.toUpperCase()}`}
                    />
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

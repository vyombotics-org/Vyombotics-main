import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Calendar,
  Radio,
  PlayCircle,
  Clock,
  BrainCircuit,
  FileText,
  BarChart3,
  Upload,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { storage } from "@/integrations/firebase/client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getBatchAdmin,
  listLecturesForBatch,
  upsertLecture,
  deleteLecture,
} from "@/lib/batches.functions";

export const Route = createFileRoute("/_authenticated/admin/batches/$id/lectures")({
  head: () => ({ meta: [{ title: "Manage Lectures · Admin" }] }),
  component: AdminLectures,
});

type Lecture = {
  id?: string;
  batch_id: string;
  title: string;
  description?: string | null;
  kind: "live" | "recorded";
  scheduled_at?: string | null;
  duration_min: number;
  meeting_url?: string | null;
  video_url?: string | null;
  order_index: number;
  is_preview: boolean;
};

function AdminLectures() {
  const { id: batchId } = Route.useParams();
  const qc = useQueryClient();
  const batchFn = useServerFn(getBatchAdmin);
  const listFn = useServerFn(listLecturesForBatch);
  const saveFn = useServerFn(upsertLecture);
  const delFn = useServerFn(deleteLecture);

  const batchQ = useQuery({
    queryKey: ["admin", "batch", batchId],
    queryFn: () => batchFn({ data: { id: batchId } }),
  });
  const lecturesQ = useQuery({
    queryKey: ["admin", "lectures", batchId],
    queryFn: () => listFn({ data: { batch_id: batchId } }),
  });

  const empty = (): Lecture => ({
    batch_id: batchId,
    title: "",
    description: "",
    kind: "recorded",
    scheduled_at: "",
    duration_min: 60,
    meeting_url: "",
    video_url: "",
    order_index: (lecturesQ.data?.lectures?.length ?? 0) + 1,
    is_preview: false,
  });
  const [editing, setEditing] = useState<Lecture | null>(null);
  const [uploading, setUploading] = useState(false);

  async function uploadVideo(file: File) {
    if (!editing) return;
    if (file.size > 500 * 1024 * 1024) {
      toast.error("Max 500 MB");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "mp4";
      const path = `lecture-videos/${batchId}/${crypto.randomUUID()}.${ext}`;
      const storageRef = ref(storage, path);
      const uploadResult = await uploadBytes(storageRef, file, {
        contentType: file.type,
      });
      const downloadUrl = await getDownloadURL(uploadResult.ref);
      setEditing({ ...editing, video_url: downloadUrl });
      toast.success("Video uploaded");
    } catch (e: any) {
      toast.error(e?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const save = useMutation({
    mutationFn: (v: Lecture) => {
      const payload = {
        ...v,
        scheduled_at: v.scheduled_at ? new Date(v.scheduled_at).toISOString() : null,
      };
      return saveFn({ data: payload as any });
    },
    onSuccess: () => {
      toast.success(editing?.id ? "Lecture updated" : "Lecture created");
      qc.invalidateQueries({ queryKey: ["admin", "lectures", batchId] });
      setEditing(null);
    },
    onError: (e: any) => toast.error(e?.message || "Failed"),
  });
  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin", "lectures", batchId] });
    },
    onError: (e: any) => toast.error(e?.message || "Failed"),
  });

  if (batchQ.isLoading)
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );

  const courseSlug = batchQ.data?.course?.slug ?? batchQ.data?.course?.id ?? "";

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-5xl px-6 pt-28 pb-16">
        <Link
          to="/admin/courses/$slug/batches"
          params={{ slug: courseSlug ?? "" }}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to batches
        </Link>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm text-muted-foreground">
              {batchQ.data?.course?.title} · {batchQ.data?.batch?.name}
            </div>
            <h1 className="font-display text-3xl font-bold">
              Manage <span className="gradient-text">Lectures</span>
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/admin/batches/$id/students" params={{ id: batchId }}>
                <BarChart3 className="h-4 w-4" /> Students
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/admin/batches/$id/quizzes" params={{ id: batchId }}>
                <BrainCircuit className="h-4 w-4" /> Quizzes
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/admin/batches/$id/assignments" params={{ id: batchId }}>
                <FileText className="h-4 w-4" /> Assignments
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/admin/batches/$id/attendance" params={{ id: batchId }}>
                <BarChart3 className="h-4 w-4" /> Attendance
              </Link>
            </Button>
            <Button
              className="btn-glow text-primary-foreground"
              onClick={() => setEditing(empty())}
            >
              <Plus className="h-4 w-4" /> Add Lecture
            </Button>
          </div>
        </div>

        {editing && (
          <div className="mt-6 card-3d gradient-border rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">
              {editing.id ? "Edit lecture" : "New lecture"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pehle lecture ka <span className="font-medium text-foreground">type chuno</span> —
              Live class ya Recorded video.
            </p>

            <div className="mt-4">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                Lecture type
              </Label>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                {(["live", "recorded"] as const).map((k) => {
                  const active = editing.kind === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setEditing({ ...editing, kind: k })}
                      className={`group relative flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all ${active ? (k === "live" ? "border-red-500 bg-red-500/10 ring-2 ring-red-500/20" : "border-primary bg-primary/10 ring-2 ring-primary/20") : "border-border/40 hover:border-border"}`}
                    >
                      <div
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${k === "live" ? "bg-red-500/20 text-red-400" : "bg-primary/20 text-primary-glow"}`}
                      >
                        {k === "live" ? (
                          <Radio className="h-5 w-5" />
                        ) : (
                          <PlayCircle className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {k === "live" ? "🔴 Live Class" : "🎬 Recorded Video"}
                          </span>
                          {active && (
                            <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] uppercase">
                              Selected
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {k === "live"
                            ? "Schedule a Zoom / Google Meet / Jitsi session. Students join via meeting link at scheduled time."
                            : "Upload a video file or paste a YouTube / mp4 / HLS URL. Students watch anytime."}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label>Title</Label>
                <Input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  placeholder="Intro to React Hooks"
                />
              </div>
              <div>
                <Label>
                  {editing.kind === "live" ? "Live class date & time" : "Scheduled at (optional)"}
                </Label>
                <Input
                  type="datetime-local"
                  value={editing.scheduled_at ?? ""}
                  onChange={(e) => setEditing({ ...editing, scheduled_at: e.target.value })}
                />
              </div>
              <div>
                <Label>Duration (minutes)</Label>
                <Input
                  type="number"
                  min={0}
                  value={editing.duration_min}
                  onChange={(e) => setEditing({ ...editing, duration_min: Number(e.target.value) })}
                />
              </div>
              {editing.kind === "live" ? (
                <div className="md:col-span-2 rounded-xl border-2 border-red-500/30 bg-red-500/5 p-4">
                  <Label className="flex items-center gap-2 text-red-400">
                    <Radio className="h-4 w-4" /> Meeting URL (required)
                  </Label>
                  <Input
                    className="mt-2"
                    value={editing.meeting_url ?? ""}
                    onChange={(e) => setEditing({ ...editing, meeting_url: e.target.value })}
                    placeholder="https://meet.google.com/abc-defg-hij  or  https://zoom.us/j/123456789"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Zoom, Google Meet, MS Teams, Jitsi — koi bhi meeting link paste karo. Students
                    ko scheduled time pe "Join Live" button milega.
                  </p>
                </div>
              ) : (
                <div className="md:col-span-2 rounded-xl border-2 border-primary/30 bg-primary/5 p-4">
                  <Label className="flex items-center gap-2 text-primary-glow">
                    <PlayCircle className="h-4 w-4" /> Video source (required)
                  </Label>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Input
                      className="flex-1 min-w-[240px]"
                      value={editing.video_url ?? ""}
                      onChange={(e) => setEditing({ ...editing, video_url: e.target.value })}
                      placeholder="Upload below OR paste mp4 / HLS / YouTube URL"
                    />
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-muted">
                      {uploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4" />
                      )}
                      <span>{uploading ? "Uploading…" : "Upload video file"}</span>
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        disabled={uploading}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) uploadVideo(f);
                          e.target.value = "";
                        }}
                      />
                    </label>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Max 500 MB. File privately store hoti hai; students signed URL se stream karte
                    hain.
                  </p>
                </div>
              )}
              <div className="md:col-span-2">
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  value={editing.description ?? ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </div>
              <div>
                <Label>Order index</Label>
                <Input
                  type="number"
                  value={editing.order_index}
                  onChange={(e) => setEditing({ ...editing, order_index: Number(e.target.value) })}
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={editing.is_preview}
                  onCheckedChange={(v) => setEditing({ ...editing, is_preview: v })}
                />
                <Label>Free preview (non-enrolled students)</Label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button
                className="btn-glow text-primary-foreground"
                disabled={save.isPending || !editing.title}
                onClick={() => save.mutate(editing)}
              >
                {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Save lecture
              </Button>
            </div>
          </div>
        )}

        <div className="mt-8 grid gap-3">
          {lecturesQ.isLoading ? (
            <div className="grid place-items-center py-12">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          ) : (lecturesQ.data?.lectures ?? []).length === 0 ? (
            <div className="card-3d rounded-2xl p-10 text-center text-muted-foreground">
              No lectures yet.
            </div>
          ) : (
            (lecturesQ.data?.lectures ?? []).map((l: any) => (
              <div key={l.id} className="card-3d card-3d-hover rounded-2xl p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-xl ${l.kind === "live" ? "bg-red-500/15 text-red-400" : "bg-primary/15 text-primary-glow"}`}
                    >
                      {l.kind === "live" ? (
                        <Radio className="h-5 w-5" />
                      ) : (
                        <PlayCircle className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">
                        #{l.order_index} · {l.title}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="capitalize">{l.kind}</span>
                        {l.scheduled_at && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />{" "}
                            {new Date(l.scheduled_at).toLocaleString()}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {l.duration_min || 0} min
                        </span>
                        {l.is_preview && (
                          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-primary-glow">
                            Free
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        setEditing({
                          ...l,
                          scheduled_at: l.scheduled_at
                            ? new Date(l.scheduled_at).toISOString().slice(0, 16)
                            : "",
                        })
                      }
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (confirm(`Delete "${l.title}"?`)) del.mutate(l.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

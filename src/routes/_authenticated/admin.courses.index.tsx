import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Upload,
  ArrowLeft,
  ShieldAlert,
  Layers,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { storage } from "@/integrations/firebase/client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { adminListCourses, upsertCourse, deleteCourse } from "@/lib/courses.functions";

export const Route = createFileRoute("/_authenticated/admin/courses/")({
  head: () => ({ meta: [{ title: "Manage Courses · Admin" }] }),
  component: AdminCourses,
});

type Course = {
  id?: string;
  title: string;
  slug?: string;
  description?: string;
  thumbnail_url?: string | null;
  category?: string;
  level?: "beginner" | "intermediate" | "advanced";
  price_inr: number;
  duration_hours?: number;
  is_published: boolean;
};

const empty: Course = {
  title: "",
  slug: "",
  description: "",
  category: "",
  level: "beginner",
  price_inr: 0,
  duration_hours: 0,
  is_published: false,
  thumbnail_url: null,
};

function AdminCourses() {
  const { primaryRole, loading } = useAuth();
  const qc = useQueryClient();
  const listFn = useServerFn(adminListCourses);
  const saveFn = useServerFn(upsertCourse);
  const delFn = useServerFn(deleteCourse);
  const [editing, setEditing] = useState<Course | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "courses"],
    queryFn: () => listFn(),
    enabled: primaryRole === "admin" || primaryRole === "instructor",
  });

  const save = useMutation({
    mutationFn: (v: Course) => saveFn({ data: v as any }),
    onSuccess: () => {
      toast.success(editing?.id ? "Course updated" : "Course created");
      qc.invalidateQueries({ queryKey: ["admin", "courses"] });
      qc.invalidateQueries({ queryKey: ["courses", "published"] });
      setEditing(null);
    },
    onError: (e: any) => toast.error(e?.message || "Failed to save"),
  });

  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Course deleted");
      qc.invalidateQueries({ queryKey: ["admin", "courses"] });
    },
    onError: (e: any) => toast.error(e?.message || "Failed to delete"),
  });

  async function uploadThumb(file: File) {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `covers/${crypto.randomUUID()}.${ext}`;
      const storageRef = ref(storage, path);
      const uploadResult = await uploadBytes(storageRef, file, {
        contentType: file.type,
      });
      const downloadUrl = await getDownloadURL(uploadResult.ref);
      setEditing((c) => (c ? { ...c, thumbnail_url: downloadUrl } : c));
      toast.success("Image uploaded");
    } catch (e: any) {
      toast.error(e?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  if (loading)
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );

  if (primaryRole !== "admin" && primaryRole !== "instructor") {
    return (
      <div className="min-h-screen">
        <SiteNav />
        <div className="mx-auto max-w-md px-6 pt-40 text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-destructive" />
          <h1 className="mt-4 font-display text-2xl font-bold">Access denied</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You need admin or instructor role to manage courses.
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

        <div className="mt-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold">
              Manage <span className="gradient-text">Courses</span>
            </h1>
            <p className="text-sm text-muted-foreground">Create, edit and publish your catalog.</p>
          </div>
          <Button
            className="btn-glow text-primary-foreground"
            onClick={() => setEditing({ ...empty })}
          >
            <Plus className="h-4 w-4" /> New Course
          </Button>
        </div>

        {editing && (
          <div className="mt-6 card-3d gradient-border rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">
              {editing.id ? "Edit course" : "New course"}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label>Title</Label>
                <Input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  placeholder="Full-Stack Web Development"
                />
              </div>
              <div>
                <Label>Slug (optional)</Label>
                <Input
                  value={editing.slug ?? ""}
                  onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                  placeholder="auto-generated"
                />
              </div>
              <div>
                <Label>Category</Label>
                <Input
                  value={editing.category ?? ""}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  placeholder="Web Development"
                />
              </div>
              <div>
                <Label>Level</Label>
                <select
                  className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={editing.level}
                  onChange={(e) => setEditing({ ...editing, level: e.target.value as any })}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <Label>Price (₹)</Label>
                <Input
                  type="number"
                  min={0}
                  value={editing.price_inr}
                  onChange={(e) => setEditing({ ...editing, price_inr: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label>Duration (hours)</Label>
                <Input
                  type="number"
                  min={0}
                  value={editing.duration_hours ?? 0}
                  onChange={(e) =>
                    setEditing({ ...editing, duration_hours: Number(e.target.value) })
                  }
                />
              </div>
              <div className="flex items-center gap-3 md:col-span-2">
                <Switch
                  checked={editing.is_published}
                  onCheckedChange={(v) => setEditing({ ...editing, is_published: v })}
                />
                <Label>Published (visible on public site)</Label>
              </div>
              <div className="md:col-span-2">
                <Label>Description</Label>
                <Textarea
                  rows={5}
                  value={editing.description ?? ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  placeholder="What learners will build, achieve, and master..."
                />
              </div>
              <div className="md:col-span-2">
                <Label>Thumbnail</Label>
                <div className="mt-2 flex items-center gap-4">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-input px-4 py-2 text-sm hover:bg-secondary">
                    {uploading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                    {uploading ? "Uploading..." : "Upload image"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && uploadThumb(e.target.files[0])}
                    />
                  </label>
                  {editing.thumbnail_url && (
                    <img
                      src={editing.thumbnail_url}
                      alt="thumb"
                      className="h-16 w-28 rounded-md object-cover"
                    />
                  )}
                </div>
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
                {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Save course
              </Button>
            </div>
          </div>
        )}

        <div className="mt-8">
          {isLoading ? (
            <div className="grid place-items-center py-12">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          ) : (data?.courses ?? []).length === 0 ? (
            <div className="card-3d rounded-2xl p-10 text-center text-muted-foreground">
              No courses yet. Click "New Course" to add one.
            </div>
          ) : (
            <div className="card-3d overflow-hidden rounded-2xl">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40 text-left">
                  <tr>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {(data?.courses ?? []).map((c: any) => (
                    <tr key={c.id} className="border-t border-border/40">
                      <td className="px-4 py-3 font-medium">{c.title}</td>
                      <td className="px-4 py-3 text-muted-foreground">{c.category || "—"}</td>
                      <td className="px-4 py-3">₹{Number(c.price_inr).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs ${c.is_published ? "bg-primary/15 text-primary-glow" : "bg-muted text-muted-foreground"}`}
                        >
                          {c.is_published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Button asChild size="sm" variant="outline">
                            <Link
                              to="/admin/courses/$slug/batches"
                              params={{ slug: c.slug ?? c.id }}
                            >
                              <Layers className="h-4 w-4" /> Batches
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditing({ ...empty, ...c })}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              if (confirm(`Delete "${c.title}"?`)) del.mutate(c.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

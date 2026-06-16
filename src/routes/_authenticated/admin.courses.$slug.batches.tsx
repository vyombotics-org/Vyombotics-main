import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Plus, Pencil, Trash2, Loader2, Calendar, Users, ListVideo } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  getCourseBySlugAdmin,
  listBatchesForCourse,
  upsertBatch,
  deleteBatch,
} from "@/lib/batches.functions";

export const Route = createFileRoute("/_authenticated/admin/courses/$slug/batches")({
  head: () => ({ meta: [{ title: "Manage Batches · Admin" }] }),
  component: AdminBatches,
});

type Batch = {
  id?: string;
  course_id: string;
  name: string;
  start_date: string;
  end_date: string;
  validity_days: number;
  price_inr: number;
  seats: number;
  is_active: boolean;
  buy_url?: string | null;
};
const today = () => new Date().toISOString().slice(0, 10);
const plus = (days: number) => new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);

function AdminBatches() {
  const { slug } = Route.useParams();
  const qc = useQueryClient();
  const courseFn = useServerFn(getCourseBySlugAdmin);
  const listFn = useServerFn(listBatchesForCourse);
  const saveFn = useServerFn(upsertBatch);
  const delFn = useServerFn(deleteBatch);

  const courseQ = useQuery({
    queryKey: ["admin", "course", slug],
    queryFn: () => courseFn({ data: { slug } }),
  });
  const courseId = courseQ.data?.course?.id;

  const empty = (): Batch => ({
    course_id: courseId!,
    name: "",
    start_date: today(),
    end_date: plus(45),
    validity_days: 45,
    price_inr: 0,
    seats: 100,
    is_active: true,
    buy_url: "",
  });
  const [editing, setEditing] = useState<Batch | null>(null);

  const batchesQ = useQuery({
    queryKey: ["admin", "batches", courseId],
    queryFn: () => listFn({ data: { course_id: courseId! } }),
    enabled: !!courseId,
  });

  const save = useMutation({
    mutationFn: (v: Batch) => saveFn({ data: v as any }),
    onSuccess: () => {
      toast.success(editing?.id ? "Batch updated" : "Batch created");
      qc.invalidateQueries({ queryKey: ["admin", "batches", courseId] });
      setEditing(null);
    },
    onError: (e: any) => toast.error(e?.message || "Failed"),
  });
  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Batch deleted");
      qc.invalidateQueries({ queryKey: ["admin", "batches", courseId] });
    },
    onError: (e: any) => toast.error(e?.message || "Failed"),
  });

  if (courseQ.isLoading)
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  if (!courseQ.data?.course)
    return (
      <div className="grid min-h-screen place-items-center text-muted-foreground">
        Course not found
      </div>
    );

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <Link
          to="/admin/courses"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Courses
        </Link>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">{courseQ.data.course.title}</div>
            <h1 className="font-display text-3xl font-bold">
              Manage <span className="gradient-text">Batches</span>
            </h1>
          </div>
          <Button className="btn-glow text-primary-foreground" onClick={() => setEditing(empty())}>
            <Plus className="h-4 w-4" /> New Batch
          </Button>
        </div>

        {editing && (
          <div className="mt-6 card-3d gradient-border rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">
              {editing.id ? "Edit batch" : "New batch"}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label>Batch name</Label>
                <Input
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  placeholder="Batch #5 — Jan 2026"
                />
              </div>
              <div>
                <Label>Start date</Label>
                <Input
                  type="date"
                  value={editing.start_date}
                  onChange={(e) => setEditing({ ...editing, start_date: e.target.value })}
                />
              </div>
              <div>
                <Label>End date</Label>
                <Input
                  type="date"
                  value={editing.end_date}
                  onChange={(e) => setEditing({ ...editing, end_date: e.target.value })}
                />
              </div>
              <div>
                <Label>Validity (days from enrollment)</Label>
                <Input
                  type="number"
                  min={1}
                  value={editing.validity_days}
                  onChange={(e) =>
                    setEditing({ ...editing, validity_days: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <Label>Seats</Label>
                <Input
                  type="number"
                  min={1}
                  value={editing.seats}
                  onChange={(e) => setEditing({ ...editing, seats: Number(e.target.value) })}
                />
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
              <div className="flex items-center gap-3">
                <Switch
                  checked={editing.is_active}
                  onCheckedChange={(v) => setEditing({ ...editing, is_active: v })}
                />
                <Label>Active</Label>
              </div>
              <div className="md:col-span-2">
                <Label>Razorpay / Buy link (optional)</Label>
                <Input
                  type="url"
                  value={editing.buy_url ?? ""}
                  onChange={(e) => setEditing({ ...editing, buy_url: e.target.value })}
                  placeholder="https://rzp.io/l/your-batch"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  If set, students go to this link instead of the built-in checkout. Leave blank to
                  use the demo checkout.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button
                className="btn-glow text-primary-foreground"
                disabled={save.isPending || !editing.name}
                onClick={() => save.mutate(editing)}
              >
                {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Save batch
              </Button>
            </div>
          </div>
        )}

        <div className="mt-8 grid gap-4">
          {batchesQ.isLoading ? (
            <div className="grid place-items-center py-12">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          ) : (batchesQ.data?.batches ?? []).length === 0 ? (
            <div className="card-3d rounded-2xl p-10 text-center text-muted-foreground">
              No batches yet. Click "New Batch" above.
            </div>
          ) : (
            (batchesQ.data?.batches ?? []).map((b: any) => (
              <div key={b.id} className="card-3d card-3d-hover rounded-2xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-semibold">{b.name}</h3>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${b.is_active ? "bg-primary/15 text-primary-glow" : "bg-muted text-muted-foreground"}`}
                      >
                        {b.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {b.start_date} → {b.end_date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" /> {b.seats} seats
                      </span>
                      <span>Validity: {b.validity_days} days</span>
                      <span className="font-medium text-foreground">
                        ₹{Number(b.price_inr).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link to="/admin/batches/$id/lectures" params={{ id: b.id }}>
                        <ListVideo className="h-4 w-4" /> Lectures
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link to="/admin/batches/$id/attendance" params={{ id: b.id }}>
                        Attendance
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link to="/admin/batches/$id/reports" params={{ id: b.id }}>
                        Reports
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link to="/admin/batches/$id/coupons" params={{ id: b.id }}>
                        Coupons
                      </Link>
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditing(b)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (confirm(`Delete "${b.name}"?`)) del.mutate(b.id);
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

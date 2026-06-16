import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowLeft,
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Tag,
  Percent,
  IndianRupee,
  Save,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listCouponsForBatch, upsertCoupon, deleteCoupon } from "@/lib/coupons.functions";

export const Route = createFileRoute("/_authenticated/admin/batches/$id/coupons")({
  head: () => ({ meta: [{ title: "Coupons · Batch · Admin" }] }),
  component: BatchCouponsPage,
});

type Form = {
  id?: string;
  code: string;
  description: string;
  discount_type: "percent" | "flat";
  discount_value: number;
  max_uses: number | null;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
};
const empty = (): Form => ({
  code: "",
  description: "",
  discount_type: "percent",
  discount_value: 10,
  max_uses: null,
  valid_from: "",
  valid_until: "",
  is_active: true,
});

function BatchCouponsPage() {
  const { id } = Route.useParams();
  const qc = useQueryClient();
  const listFn = useServerFn(listCouponsForBatch);
  const saveFn = useServerFn(upsertCoupon);
  const delFn = useServerFn(deleteCoupon);
  const [form, setForm] = useState<Form | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["batch-coupons", id],
    queryFn: () => listFn({ data: { batch_id: id } }),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["batch-coupons", id] });
  const save = useMutation({
    mutationFn: (f: Form) =>
      saveFn({
        data: {
          id: f.id,
          code: f.code.trim().toUpperCase(),
          description: f.description || null,
          discount_type: f.discount_type,
          discount_value: f.discount_value,
          max_uses: f.max_uses ?? null,
          valid_from: f.valid_from || null,
          valid_until: f.valid_until || null,
          batch_id: id,
          course_id: data?.batch?.course_id ?? null,
          is_active: f.is_active,
        } as any,
      }),
    onSuccess: () => {
      toast.success("Saved");
      setForm(null);
      invalidate();
    },
    onError: (e: any) => toast.error(e?.message ?? "Failed to save"),
  });
  const del = useMutation({
    mutationFn: (cid: string) => delFn({ data: { id: cid } }),
    onSuccess: () => {
      toast.success("Deleted");
      invalidate();
    },
    onError: (e: any) => toast.error(e?.message ?? "Failed"),
  });

  if (isLoading)
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  const coupons: any[] = data?.coupons ?? [];
  const batch: any = data?.batch;

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-5xl px-6 pt-28 pb-16">
        <Link
          to="/admin/courses"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-sm text-muted-foreground">{batch?.courses?.title}</div>
            <h1 className="font-display text-3xl font-bold flex items-center gap-2">
              <Tag className="h-7 w-7 text-primary-glow" />
              Coupons · <span className="gradient-text">{batch?.name}</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Promo codes that apply only to this batch.
            </p>
          </div>
          {!form && (
            <Button className="btn-glow" onClick={() => setForm(empty())}>
              <Plus className="mr-2 h-4 w-4" /> New coupon
            </Button>
          )}
        </div>

        {form && (
          <div className="mt-6 card-3d rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur-md">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">
                {form.id ? "Edit coupon" : "New coupon"}
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setForm(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Code</Label>
                <Input
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  placeholder="LAUNCH20"
                />
              </div>
              <div>
                <Label>Discount type</Label>
                <Select
                  value={form.discount_type}
                  onValueChange={(v) => setForm({ ...form, discount_type: v as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percent">
                      <Percent className="mr-2 inline h-3 w-3" /> Percent
                    </SelectItem>
                    <SelectItem value="flat">
                      <IndianRupee className="mr-2 inline h-3 w-3" /> Flat ₹
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Discount value</Label>
                <Input
                  type="number"
                  min={1}
                  value={form.discount_value}
                  onChange={(e) => setForm({ ...form, discount_value: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label>Max uses (blank = unlimited)</Label>
                <Input
                  type="number"
                  min={1}
                  value={form.max_uses ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, max_uses: e.target.value ? Number(e.target.value) : null })
                  }
                />
              </div>
              <div>
                <Label>Valid from</Label>
                <Input
                  type="datetime-local"
                  value={form.valid_from}
                  onChange={(e) => setForm({ ...form, valid_from: e.target.value })}
                />
              </div>
              <div>
                <Label>Valid until</Label>
                <Input
                  type="datetime-local"
                  value={form.valid_until}
                  onChange={(e) => setForm({ ...form, valid_until: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Description (optional)</Label>
                <Textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="md:col-span-2 flex items-center gap-3 rounded-lg border border-border/40 p-3">
                <Switch
                  checked={form.is_active}
                  onCheckedChange={(v) => setForm({ ...form, is_active: v })}
                />
                <span className="text-sm">{form.is_active ? "Active" : "Disabled"}</span>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                className="btn-glow"
                onClick={() => save.mutate(form)}
                disabled={save.isPending}
              >
                {save.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save coupon
              </Button>
              <Button variant="outline" onClick={() => setForm(null)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="mt-6 card-3d rounded-2xl overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-card/60">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">Code</th>
                <th className="px-3 py-3 font-medium">Discount</th>
                <th className="px-3 py-3 font-medium">Used</th>
                <th className="px-3 py-3 font-medium">Validity</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                    No coupons yet for this batch.
                  </td>
                </tr>
              ) : (
                coupons.map((c) => (
                  <tr key={c.id} className="border-t border-border/40">
                    <td className="px-4 py-3 font-mono font-semibold">{c.code}</td>
                    <td className="px-3 py-3">
                      {c.discount_type === "percent"
                        ? `${c.discount_value}%`
                        : `₹${c.discount_value}`}
                    </td>
                    <td className="px-3 py-3 text-muted-foreground">
                      {c.used_count}
                      {c.max_uses ? ` / ${c.max_uses}` : ""}
                    </td>
                    <td className="px-3 py-3 text-xs text-muted-foreground">
                      {c.valid_from ? new Date(c.valid_from).toLocaleDateString() : "—"} →{" "}
                      {c.valid_until ? new Date(c.valid_until).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${c.is_active ? "bg-primary/15 text-primary-glow" : "bg-muted text-muted-foreground"}`}
                      >
                        {c.is_active ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex justify-end gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            setForm({
                              id: c.id,
                              code: c.code,
                              description: c.description ?? "",
                              discount_type: c.discount_type,
                              discount_value: Number(c.discount_value),
                              max_uses: c.max_uses,
                              valid_from: c.valid_from ? c.valid_from.slice(0, 16) : "",
                              valid_until: c.valid_until ? c.valid_until.slice(0, 16) : "",
                              is_active: c.is_active,
                            })
                          }
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            if (confirm(`Delete coupon ${c.code}?`)) del.mutate(c.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

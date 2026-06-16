import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Loader2, Tag, Percent, IndianRupee, Pencil } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { listCoupons, upsertCoupon, deleteCoupon } from "@/lib/coupons.functions";

export const Route = createFileRoute("/_authenticated/admin/coupons")({
  head: () => ({ meta: [{ title: "Coupons · Admin" }] }),
  component: AdminCoupons,
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

function AdminCoupons() {
  const qc = useQueryClient();
  const listFn = useServerFn(listCoupons);
  const saveFn = useServerFn(upsertCoupon);
  const delFn = useServerFn(deleteCoupon);

  const { data, isLoading } = useQuery({ queryKey: ["coupons"], queryFn: () => listFn() });
  const [form, setForm] = useState<Form | null>(null);

  const save = useMutation({
    mutationFn: (v: Form) =>
      saveFn({
        data: {
          id: v.id,
          code: v.code,
          description: v.description || null,
          discount_type: v.discount_type,
          discount_value: v.discount_value,
          max_uses: v.max_uses || null,
          valid_from: v.valid_from || null,
          valid_until: v.valid_until || null,
          is_active: v.is_active,
        } as any,
      }),
    onSuccess: () => {
      toast.success("Coupon saved");
      setForm(null);
      qc.invalidateQueries({ queryKey: ["coupons"] });
    },
    onError: (e: any) => toast.error(e?.message || "Save failed"),
  });
  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["coupons"] });
    },
  });

  const coupons = (data?.coupons ?? []) as any[];

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-5xl px-6 pt-28 pb-16">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold flex items-center gap-2">
              <Tag className="h-7 w-7 text-primary-glow" /> Coupons
            </h1>
            <p className="text-sm text-muted-foreground">
              Promo codes students can apply at checkout.
            </p>
          </div>
          <Button className="btn-glow text-primary-foreground" onClick={() => setForm(empty())}>
            <Plus className="h-4 w-4" /> New coupon
          </Button>
        </div>

        {form && (
          <div className="mt-6 card-3d rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold mb-4">
              {form.id ? "Edit" : "Create"} coupon
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label>Code (uppercase, A-Z 0-9 _ -)</Label>
                <Input
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  placeholder="LAUNCH50"
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Description</Label>
                <Input
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Launch offer — 50% off"
                />
              </div>
              <div>
                <Label>Discount type</Label>
                <select
                  value={form.discount_type}
                  onChange={(e) => setForm({ ...form, discount_type: e.target.value as any })}
                  className="mt-2 block h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="percent">Percent (%)</option>
                  <option value="flat">Flat (₹)</option>
                </select>
              </div>
              <div>
                <Label>Discount value</Label>
                <div className="relative mt-2">
                  {form.discount_type === "percent" ? (
                    <Percent className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  ) : (
                    <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  )}
                  <Input
                    type="number"
                    min={1}
                    value={form.discount_value}
                    onChange={(e) => setForm({ ...form, discount_value: Number(e.target.value) })}
                    className="pl-9"
                  />
                </div>
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
              <div className="flex items-center gap-3 mt-7">
                <Switch
                  checked={form.is_active}
                  onCheckedChange={(v) => setForm({ ...form, is_active: v })}
                />
                <Label>Active</Label>
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
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setForm(null)}>
                Cancel
              </Button>
              <Button
                className="btn-glow text-primary-foreground"
                disabled={save.isPending || !form.code || form.code.length < 3}
                onClick={() => save.mutate(form)}
              >
                {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Save coupon
              </Button>
            </div>
          </div>
        )}

        <div className="mt-6">
          {isLoading ? (
            <div className="grid place-items-center py-12">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          ) : coupons.length === 0 ? (
            <div className="card-3d rounded-2xl p-10 text-center text-muted-foreground">
              No coupons yet.
            </div>
          ) : (
            <div className="card-3d overflow-x-auto rounded-2xl">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Code</th>
                    <th className="px-4 py-3">Discount</th>
                    <th className="px-4 py-3">Used</th>
                    <th className="px-4 py-3">Validity</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((c) => (
                    <tr key={c.id} className="border-t border-border/40">
                      <td className="px-4 py-3">
                        <div className="font-semibold">{c.code}</div>
                        <div className="text-xs text-muted-foreground">{c.description}</div>
                      </td>
                      <td className="px-4 py-3">
                        {c.discount_type === "percent"
                          ? `${c.discount_value}%`
                          : `₹${Number(c.discount_value).toLocaleString()}`}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {c.used_count}
                        {c.max_uses ? ` / ${c.max_uses}` : ""}
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {c.valid_from ? new Date(c.valid_from).toLocaleDateString() : "—"} →{" "}
                        {c.valid_until ? new Date(c.valid_until).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs ${c.is_active ? "bg-primary/15 text-primary-glow" : "bg-muted text-muted-foreground"}`}
                        >
                          {c.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              setForm({
                                id: c.id,
                                code: c.code,
                                description: c.description || "",
                                discount_type: c.discount_type,
                                discount_value: Number(c.discount_value),
                                max_uses: c.max_uses,
                                valid_from: c.valid_from?.slice(0, 16) || "",
                                valid_until: c.valid_until?.slice(0, 16) || "",
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
                              if (confirm(`Delete ${c.code}?`)) del.mutate(c.id);
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

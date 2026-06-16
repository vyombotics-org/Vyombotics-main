import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Loader2, ShoppingBag, Pencil } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { MediaUpload } from "@/components/MediaUpload";
import { listAllShopProducts, upsertShopProduct, deleteShopProduct } from "@/lib/shop.functions";

export const Route = createFileRoute("/_authenticated/admin/shop")({
  head: () => ({ meta: [{ title: "Shop · Admin" }] }),
  component: AdminShop,
});

type Form = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  currency: string;
  image_url: string;
  category: string;
  stock: number;
  badge: string;
  is_active: boolean;
  sort_order: number;
  buy_url: string;
};
const empty = (): Form => ({
  name: "",
  slug: "",
  description: "",
  price: 0,
  compare_at_price: null,
  currency: "INR",
  image_url: "",
  category: "merch",
  stock: 0,
  badge: "",
  is_active: true,
  sort_order: 0,
  buy_url: "",
});

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function AdminShop() {
  const qc = useQueryClient();
  const listFn = useServerFn(listAllShopProducts);
  const saveFn = useServerFn(upsertShopProduct);
  const delFn = useServerFn(deleteShopProduct);

  const { data, isLoading } = useQuery({ queryKey: ["admin", "shop"], queryFn: () => listFn() });
  const [form, setForm] = useState<Form | null>(null);

  const save = useMutation({
    mutationFn: (v: Form) =>
      saveFn({
        data: {
          id: v.id,
          name: v.name,
          slug: v.slug || slugify(v.name),
          description: v.description || null,
          price: v.price,
          compare_at_price: v.compare_at_price || null,
          currency: v.currency || "INR",
          image_url: v.image_url || null,
          category: v.category,
          stock: v.stock,
          badge: v.badge || null,
          is_active: v.is_active,
          sort_order: v.sort_order,
          buy_url: v.buy_url || null,
        } as any,
      }),
    onSuccess: () => {
      toast.success("Product saved");
      setForm(null);
      qc.invalidateQueries({ queryKey: ["admin", "shop"] });
      qc.invalidateQueries({ queryKey: ["shop"] });
    },
    onError: (e: any) => toast.error(e?.message || "Save failed"),
  });
  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin", "shop"] });
      qc.invalidateQueries({ queryKey: ["shop"] });
    },
  });

  const products = (data?.products ?? []) as any[];

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
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold flex items-center gap-2">
              <ShoppingBag className="h-7 w-7 text-primary-glow" /> Shop products
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage robotics kits, merch and accessories shown on the store page.
            </p>
          </div>
          <Button className="btn-glow text-primary-foreground" onClick={() => setForm(empty())}>
            <Plus className="h-4 w-4" /> New product
          </Button>
        </div>

        {form && (
          <div className="mt-6 card-3d rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold mb-4">
              {form.id ? "Edit" : "Create"} product
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                      slug: form.slug || slugify(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label>Slug (URL)</Label>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                  placeholder="auto from name"
                />
              </div>
              <div>
                <Label>Category</Label>
                <Input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="robotics / apparel / merch"
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Image</Label>
                <MediaUpload
                  value={form.image_url}
                  onChange={(url) => setForm({ ...form, image_url: url })}
                  accept="image/*"
                  folder="shop"
                />
              </div>
              <div>
                <Label>Price (₹)</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label>Compare-at price (₹, optional)</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.compare_at_price ?? ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      compare_at_price: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                />
              </div>
              <div>
                <Label>Stock</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label>Badge (optional)</Label>
                <Input
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  placeholder="Bestseller / New"
                />
              </div>
              <div>
                <Label>Sort order</Label>
                <Input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Razorpay / Buy link</Label>
                <Input
                  type="url"
                  value={form.buy_url}
                  onChange={(e) => setForm({ ...form, buy_url: e.target.value })}
                  placeholder="https://rzp.io/l/your-product"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Paste a Razorpay Payment Link (or any checkout URL). Opens in a new tab when a
                  user clicks Buy now.
                </p>
              </div>
              <div className="flex items-center gap-3 mt-7">
                <Switch
                  checked={form.is_active}
                  onCheckedChange={(v) => setForm({ ...form, is_active: v })}
                />
                <Label>Active (visible in store)</Label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setForm(null)}>
                Cancel
              </Button>
              <Button
                className="btn-glow text-primary-foreground"
                disabled={save.isPending || !form.name}
                onClick={() => save.mutate(form)}
              >
                {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Save product
              </Button>
            </div>
          </div>
        )}

        <div className="mt-6">
          {isLoading ? (
            <div className="grid place-items-center py-12">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          ) : products.length === 0 ? (
            <div className="card-3d rounded-2xl p-10 text-center text-muted-foreground">
              No products yet.
            </div>
          ) : (
            <div className="card-3d overflow-x-auto rounded-2xl">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p: any) => (
                    <tr key={p.id} className="border-t border-border/40">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {p.image_url ? (
                            <img
                              src={p.image_url}
                              alt=""
                              className="h-10 w-10 rounded object-cover"
                            />
                          ) : (
                            <div className="grid h-10 w-10 place-items-center rounded bg-muted text-muted-foreground">
                              <ShoppingBag className="h-4 w-4" />
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{p.name}</div>
                            <div className="text-xs text-muted-foreground">{p.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{p.category}</td>
                      <td className="px-4 py-3">₹{Number(p.price).toLocaleString()}</td>
                      <td className="px-4 py-3 text-muted-foreground">{p.stock}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs ${p.is_active ? "bg-primary/15 text-primary-glow" : "bg-muted text-muted-foreground"}`}
                        >
                          {p.is_active ? "Active" : "Hidden"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              setForm({
                                id: p.id,
                                name: p.name,
                                slug: p.slug,
                                description: p.description || "",
                                price: Number(p.price),
                                compare_at_price: p.compare_at_price
                                  ? Number(p.compare_at_price)
                                  : null,
                                currency: p.currency || "INR",
                                image_url: p.image_url || "",
                                category: p.category,
                                stock: p.stock,
                                badge: p.badge || "",
                                is_active: p.is_active,
                                sort_order: p.sort_order,
                                buy_url: p.buy_url || "",
                              })
                            }
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              if (confirm(`Delete ${p.name}?`)) del.mutate(p.id);
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

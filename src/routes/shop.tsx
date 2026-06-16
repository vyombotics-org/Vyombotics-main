import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ShoppingBag, Loader2, Search } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listShopProducts } from "@/lib/shop.functions";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Vyombotics Store" },
      {
        name: "description",
        content:
          "Robotics kits, drones, sensor packs and Vyombotics-branded apparel. Built for makers and learners.",
      },
      { property: "og:title", content: "Vyombotics Store" },
      { property: "og:description", content: "Robotics kits, drones and merch for makers." },
    ],
  }),
  component: ShopPage,
  errorComponent: ({ error }) => <ErrorView message={error.message} />,
  notFoundComponent: () => <ErrorView message="Page not found" />,
});

function ErrorView({ message }: { message: string }) {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-3xl px-6 pt-40 text-center">
        <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">{message}</p>
        <Button asChild className="mt-6">
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}

function ShopPage() {
  const fetcher = useServerFn(listShopProducts);
  const { data, isLoading } = useQuery({ queryKey: ["shop", "all"], queryFn: () => fetcher() });
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const all = data?.products ?? [];
  const categories = useMemo<string[]>(
    () => [
      "all",
      ...(Array.from(new Set(all.map((p: any) => p.category).filter(Boolean))) as string[]),
    ],
    [all],
  );
  const filtered = all.filter((p: any) => {
    const mq =
      !q ||
      p.name?.toLowerCase().includes(q.toLowerCase()) ||
      p.description?.toLowerCase().includes(q.toLowerCase());
    const mc = cat === "all" || p.category === cat;
    return mq && mc;
  });

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-6xl px-6 pt-32 pb-20">
        <div className="text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary-glow">
            <ShoppingBag className="h-3.5 w-3.5" /> Vyombotics Store
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-6xl">
            Shop <span className="gradient-text">Kits & Merch</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Robotics kits, drones, sensors and Vyombotics-branded apparel — built for makers.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search products…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-sm transition ${cat === c ? "border-primary bg-primary/15 text-primary-glow" : "border-border/40 text-muted-foreground hover:text-foreground"}`}
              >
                {c === "all" ? "All" : c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          {isLoading ? (
            <div className="grid place-items-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="card-3d rounded-2xl p-10 text-center text-muted-foreground">
              No products yet.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p: any) => (
                <article key={p.id} className="card-3d group overflow-hidden rounded-2xl">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    {p.image_url ? (
                      <img
                        src={p.image_url}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-muted-foreground">
                        <ShoppingBag className="h-12 w-12" />
                      </div>
                    )}
                    {p.badge && (
                      <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                        {p.badge}
                      </span>
                    )}
                    {p.stock <= 0 && (
                      <span className="absolute right-3 top-3 rounded-full bg-destructive/90 px-2.5 py-1 text-xs font-medium text-destructive-foreground">
                        Out of stock
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      {p.category}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-semibold">{p.name}</h3>
                    {p.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {p.description}
                      </p>
                    )}
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-xl font-bold">₹{Number(p.price).toLocaleString()}</span>
                      {p.compare_at_price && Number(p.compare_at_price) > Number(p.price) && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{Number(p.compare_at_price).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <Button
                      asChild={p.stock > 0}
                      className="mt-4 w-full btn-glow text-primary-foreground"
                      disabled={p.stock <= 0}
                    >
                      {p.stock > 0 ? (
                        <a
                          href={p.buy_url || "https://rzp.io/l/vyombotics-demo"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Buy now
                        </a>
                      ) : (
                        <span>Sold out</span>
                      )}
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

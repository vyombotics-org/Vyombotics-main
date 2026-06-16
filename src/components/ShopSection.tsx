import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { listShopProducts } from "@/lib/shop.functions";

export function ShopSection() {
  const fetcher = useServerFn(listShopProducts);
  const { data } = useQuery({ queryKey: ["shop", "preview"], queryFn: () => fetcher() });
  const products = (data?.products ?? []).slice(0, 4);
  if (products.length === 0) return null;

  return (
    <section id="shop" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary-glow">
              <ShoppingBag className="h-3.5 w-3.5" /> Vyombotics Store
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              Shop <span className="gradient-text">Robotics Kits & Merch</span>
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Robotics kits, drones, sensor packs and Vyombotics-branded apparel — built for
              tinkerers.
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link to="/shop">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p: any) => (
            <Link
              key={p.id}
              to="/shop"
              className="card-3d group overflow-hidden rounded-2xl transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                {p.image_url ? (
                  <img
                    src={p.image_url}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid h-full place-items-center text-muted-foreground">
                    <ShoppingBag className="h-10 w-10" />
                  </div>
                )}
                {p.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {p.category}
                </div>
                <h3 className="mt-1 line-clamp-1 font-display font-semibold">{p.name}</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-lg font-bold">₹{Number(p.price).toLocaleString()}</span>
                  {p.compare_at_price && Number(p.compare_at_price) > Number(p.price) && (
                    <span className="text-xs text-muted-foreground line-through">
                      ₹{Number(p.compare_at_price).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

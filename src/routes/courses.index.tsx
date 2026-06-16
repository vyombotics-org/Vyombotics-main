import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Users, Star, ArrowRight, Loader2, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listPublishedCourses } from "@/lib/courses.functions";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "All Courses — Vyombotics Academy" },
      {
        name: "description",
        content:
          "Browse premium courses in Web Dev, AI, DSA, Cloud and more. Learn from industry experts with real projects and certificates.",
      },
      { property: "og:title", content: "All Courses — Vyombotics" },
      {
        property: "og:description",
        content: "Premium courses with live mentorship and verified certificates.",
      },
    ],
  }),
  component: CoursesPage,
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

function CoursesPage() {
  const fetcher = useServerFn(listPublishedCourses);
  const { data, isLoading } = useQuery({
    queryKey: ["courses", "published"],
    queryFn: () => fetcher(),
  });
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [level, setLevel] = useState<string>("all");
  const [priceMax, setPriceMax] = useState<number>(50000);

  const all = data?.courses ?? [];
  const categories = useMemo(
    () => Array.from(new Set(all.map((c: any) => c.category).filter(Boolean))),
    [all],
  );
  const maxPriceAvailable = useMemo(
    () => Math.max(50000, ...all.map((c: any) => Number(c.price_inr ?? 0))),
    [all],
  );

  const filtered = all.filter((c: any) => {
    const matchQ =
      !q ||
      c.title?.toLowerCase().includes(q.toLowerCase()) ||
      c.description?.toLowerCase().includes(q.toLowerCase());
    const matchC = cat === "all" || c.category === cat;
    const matchL = level === "all" || c.level === level;
    const matchP = Number(c.price_inr ?? 0) <= priceMax;
    return matchQ && matchC && matchL && matchP;
  });

  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="relative pt-28 pb-10 md:pt-32 md:pb-12">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)", opacity: 0.5 }}
        />
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="font-display text-4xl font-bold md:text-6xl">
            Explore <span className="gradient-text">Courses</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Hand-crafted programs by India's top engineers. Live mentorship. Real projects. Lifetime
            skills.
          </p>

          <div className="mx-auto mt-8 max-w-3xl space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search courses..."
                className="pl-9"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="all">All categories</option>
                {categories.map((c) => (
                  <option key={c as string} value={c as string}>
                    {c as string}
                  </option>
                ))}
              </select>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="all">All levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <div className="flex flex-col text-left">
                <label className="mb-1 text-xs text-muted-foreground">
                  Max price: ₹{priceMax.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={0}
                  max={maxPriceAvailable}
                  step={500}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="accent-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          {isLoading ? (
            <div className="grid place-items-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="card-3d mx-auto max-w-md rounded-2xl p-10 text-center">
              <BookOpen className="mx-auto h-10 w-10 text-primary-glow" />
              <h3 className="mt-4 font-display text-xl font-semibold">No courses yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                New courses are coming soon. Check back shortly.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c: any) => (
                <article
                  key={c.id}
                  className="card-3d gradient-border group overflow-hidden rounded-2xl"
                >
                  <Link to="/courses/$slug" params={{ slug: c.slug }} className="block">
                    <div className="relative aspect-video w-full overflow-hidden bg-[image:var(--gradient-primary)]">
                      {c.thumbnail_url ? (
                        <img
                          src={c.thumbnail_url}
                          alt={c.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="grid h-full w-full place-items-center text-background/70">
                          <BookOpen className="h-12 w-12" />
                        </div>
                      )}
                      {c.category && (
                        <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-primary-glow backdrop-blur">
                          {c.category}
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="p-5">
                    <Link to="/courses/$slug" params={{ slug: c.slug }} className="block">
                      <h3 className="line-clamp-2 font-display text-lg font-semibold">{c.title}</h3>
                      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />{" "}
                          {Number(c.students_count ?? 0).toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current text-primary-glow" />{" "}
                          {Number(c.rating ?? 0).toFixed(1)}
                        </span>
                        {c.level && <span className="capitalize">{c.level}</span>}
                      </div>
                    </Link>
                    <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-4">
                      <div className="text-xl font-bold gradient-text">
                        ₹{Number(c.price_inr ?? 0).toLocaleString()}
                      </div>
                      <Button asChild size="sm" className="btn-glow text-primary-foreground">
                        <Link to="/courses/$slug" params={{ slug: c.slug }}>
                          Enroll <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Rocket,
  Sparkles,
  Trophy,
  GraduationCap,
  ChevronRight,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { LABS_BY_SLUG, STEM_LABS } from "@/data/stemLabs";
import { LabDemo } from "@/components/labs/LabDemo";

export const Route = createFileRoute("/labs/$slug")({
  head: ({ params }) => {
    const lab = LABS_BY_SLUG[params.slug];
    const title = lab ? `${lab.title} — STEM Lab` : "STEM Lab";
    const desc = lab?.description ?? "Interactive STEM lab.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  loader: ({ params }) => {
    const lab = LABS_BY_SLUG[params.slug];
    if (!lab) throw notFound();
    return { lab };
  },
  component: LabPage,
  notFoundComponent: () => (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-2xl px-6 pt-40 text-center">
        <h1 className="font-display text-3xl font-bold">Lab not found</h1>
        <p className="mt-3 text-muted-foreground">We couldn't find that STEM lab.</p>
        <Button asChild className="mt-6">
          <Link to="/labs">Browse all labs</Link>
        </Button>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-2xl px-6 pt-40 text-center">
        <h1 className="font-display text-3xl font-bold">Lab unavailable</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
        <Button asChild className="mt-6">
          <Link to="/labs">Back to labs</Link>
        </Button>
      </div>
    </div>
  ),
});

function LabPage() {
  const { slug } = Route.useParams();
  const lab = LABS_BY_SLUG[slug]!;
  const Pillar = lab.pillarIcon;
  const related = STEM_LABS.filter((l) => l.pillar === lab.pillar && l.slug !== lab.slug).slice(
    0,
    3,
  );

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-20">
        <Link
          to="/labs"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All STEM labs
        </Link>

        {/* HERO */}
        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div className="animate-fade-in">
            <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs">
              <Pillar className="h-3.5 w-3.5" style={{ color: lab.accent }} />
              <span className="text-muted-foreground">{lab.pillarTitle}</span>
              <span className="text-muted-foreground/40">·</span>
              <span style={{ color: lab.accent }}>{lab.level}</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
              {lab.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{lab.tagline}</p>
            <p className="mt-3 text-muted-foreground">{lab.description}</p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              <Stat icon={Clock} label={lab.duration} />
              <Stat icon={Layers} label={`${lab.modules.length} modules`} />
              <Stat icon={Trophy} label={`${lab.projects} projects`} />
              <Stat icon={GraduationCap} label="Certificate" />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="btn-glow text-primary-foreground">
                <Link to="/auth" search={{ mode: "signup" } as any}>
                  Enroll free <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/courses">See full courses</Link>
              </Button>
            </div>
          </div>

          <LabDemo kind={lab.demo} accent={lab.accent} />
        </div>

        {/* WHAT YOU'LL LEARN */}
        <section className="mt-20">
          <div className="mb-8 flex items-center gap-3">
            <Sparkles className="h-5 w-5" style={{ color: lab.accent }} />
            <h2 className="font-display text-3xl font-bold">What you'll learn</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {lab.learn.map((l, i) => (
              <div
                key={l}
                className="card-3d card-3d-hover flex items-start gap-3 rounded-2xl p-5 animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: lab.accent }} />
                <span className="text-sm">{l}</span>
              </div>
            ))}
          </div>
        </section>

        {/* MODULES */}
        <section className="mt-20">
          <div className="mb-8 flex items-center gap-3">
            <BookOpen className="h-5 w-5" style={{ color: lab.accent }} />
            <h2 className="font-display text-3xl font-bold">Course modules</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {lab.modules.map((m, i) => (
              <div
                key={m.title}
                className="card-3d gradient-border rounded-2xl p-6 animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="grid h-9 w-9 place-items-center rounded-xl text-sm font-bold text-background"
                    style={{ background: lab.accent }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="font-semibold">{m.title}</h3>
                </div>
                <ul className="mt-4 space-y-2">
                  {m.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="h-3.5 w-3.5" style={{ color: lab.accent }} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 card-3d gradient-border overflow-hidden rounded-3xl p-10 text-center">
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-30"
            style={{
              background: `radial-gradient(circle at 50% 30%, ${lab.accent}, transparent 60%)`,
            }}
          />
          <Rocket className="mx-auto h-10 w-10" style={{ color: lab.accent }} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            Ready to start <span className="gradient-text">{lab.title}</span>?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Join thousands of young innovators building real STEM skills — live mentorship, weekly
            projects, and a verified certificate.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="btn-glow text-primary-foreground">
              <Link to="/auth" search={{ mode: "signup" } as any}>
                Enroll now
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Talk to a mentor</Link>
            </Button>
          </div>
        </section>

        {/* RELATED */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-6 font-display text-2xl font-bold">
              More in <span style={{ color: lab.accent }}>{lab.pillarTitle}</span>
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/labs/$slug"
                  params={{ slug: r.slug }}
                  className="card-3d card-3d-hover group rounded-2xl p-5"
                >
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {r.pillarTitle}
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold group-hover:gradient-text">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.tagline}</p>
                  <span
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium"
                    style={{ color: r.accent }}
                  >
                    Explore <ChevronRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, FlaskConical, Rocket, Sparkles } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { STEM_LABS, LABS_BY_PILLAR } from "@/data/stemLabs";

const PILLAR_ORDER: { key: string; title: string; tagline: string }[] = [
  { key: "science", title: "Science", tagline: "Discover how nature works." },
  { key: "tech", title: "Technology", tagline: "Code the future." },
  { key: "eng", title: "Engineering", tagline: "Design, build, innovate." },
  { key: "math", title: "Mathematics", tagline: "The language of patterns and proof." },
];

export const Route = createFileRoute("/labs/")({
  head: () => ({
    meta: [
      { title: "STEM Labs — Interactive Courses" },
      {
        name: "description",
        content:
          "Explore 16 interactive STEM labs across Science, Technology, Engineering and Mathematics — animated, hands-on, project-based.",
      },
      { property: "og:title", content: "STEM Labs — Interactive Courses" },
      {
        property: "og:description",
        content: "Animated, hands-on STEM courses for the next generation of innovators.",
      },
    ],
  }),
  component: LabsIndex,
});

function LabsIndex() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-20">
        <div className="text-center">
          <div className="glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-primary-glow" /> 16 interactive labs
          </div>
          <h1 className="mt-4 font-display text-5xl font-bold md:text-6xl">
            STEM <span className="gradient-text">Labs</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Tap any course to enter a live, animated lab. Drag, click, simulate — learn STEM the way
            it was meant to be taught.
          </p>
        </div>

        {PILLAR_ORDER.map((p) => {
          const labs = LABS_BY_PILLAR[p.key] ?? [];
          if (!labs.length) return null;
          const Icon = labs[0].pillarIcon;
          return (
            <section key={p.key} className="mt-16">
              <div className="mb-6 flex items-center gap-3">
                <div
                  className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${labs[0].gradient} text-white shadow-xl`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold">{p.title}</h2>
                  <p className="text-xs text-muted-foreground">{p.tagline}</p>
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {labs.map((l, i) => (
                  <Link
                    key={l.slug}
                    to="/labs/$slug"
                    params={{ slug: l.slug }}
                    className="card-3d card-3d-hover group relative overflow-hidden rounded-2xl p-5 animate-fade-in"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div
                      className={`absolute inset-0 -z-10 bg-gradient-to-br ${l.gradient} opacity-[0.08] transition-opacity duration-500 group-hover:opacity-20`}
                    />
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${l.gradient} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
                    >
                      <FlaskConical className="h-4 w-4" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold leading-tight">{l.title}</h3>
                    <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">{l.tagline}</p>
                    <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>
                        {l.level} · {l.duration}
                      </span>
                      <span
                        className="inline-flex items-center gap-1 font-medium"
                        style={{ color: l.accent }}
                      >
                        Enter <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <div className="mt-20 card-3d gradient-border rounded-3xl p-10 text-center">
          <Rocket className="mx-auto h-10 w-10 text-primary-glow" />
          <h2 className="mt-3 font-display text-3xl font-bold">
            All {STEM_LABS.length} labs · one academy
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            From physics to robotics, every lab is interactive, mentor-led and project-based.
          </p>
        </div>
      </div>
    </div>
  );
}

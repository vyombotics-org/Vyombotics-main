import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Trophy, Zap } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { useSiteSettings, type FacultyMember } from "@/hooks/useSiteSettings";

const DEFAULT_FACULTY: FacultyMember[] = [
  {
    name: "Aman Verma",
    role: "Lead Instructor · Full-Stack",
    company: "Ex-Razorpay, Flipkart",
    exp: "9+ yrs",
    expertise: ["React", "Node.js", "System Design"],
  },
  {
    name: "Priya Singh",
    role: "AI / ML Mentor",
    company: "Ex-Google, Microsoft",
    exp: "11+ yrs",
    expertise: ["Deep Learning", "NLP", "PyTorch"],
  },
  {
    name: "Rohit Sharma",
    role: "DSA Coach",
    company: "Ex-Amazon SDE-3",
    exp: "8+ yrs",
    expertise: ["DSA", "Java", "Competitive"],
  },
];

export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: "Faculty — Vyombotics Academy" },
      {
        name: "description",
        content:
          "Meet the industry mentors and instructors at Vyombotics — engineers from Google, Amazon, Razorpay, Flipkart and more.",
      },
      { property: "og:title", content: "Our Faculty — Vyombotics" },
      { property: "og:description", content: "Mentors and instructors who teach at Vyombotics." },
    ],
  }),
  component: FacultyPage,
});

function FacultyPage() {
  const { facultyPage } = useSiteSettings();
  const members =
    facultyPage.members && facultyPage.members.length > 0 ? facultyPage.members : DEFAULT_FACULTY;
  const heading = facultyPage.heading ?? "Featured Faculty";
  const subheading =
    facultyPage.subheading ?? "Industry mentors who code with you, not just lecture.";
  const badge = facultyPage.badge ?? "Our Mentors";

  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="relative pt-32 pb-20">
        <div className="absolute left-1/2 top-10 -z-10 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <div className="glass mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary-glow" /> {badge}
            </div>
            <h1 className="font-display text-4xl font-bold md:text-5xl">{heading}</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{subheading}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {members.map((m, i) => {
              const initials = (m.name || "?")
                .split(/\s+/)
                .map((s) => s[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();
              return (
                <div
                  key={i}
                  className="card-3d card-3d-hover gradient-border group relative overflow-hidden rounded-2xl p-6"
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[image:var(--gradient-primary)] opacity-20 blur-2xl transition-opacity group-hover:opacity-40" />
                  <div className="flex items-center gap-4">
                    {m.image ? (
                      <img
                        src={m.image}
                        alt={m.name}
                        className="h-16 w-16 rounded-2xl object-cover glow-primary"
                      />
                    ) : (
                      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] font-display text-xl font-bold text-background glow-primary">
                        {initials}
                      </div>
                    )}
                    <div>
                      <h3 className="font-display text-lg font-semibold">{m.name}</h3>
                      {m.role && <p className="text-sm text-primary-glow">{m.role}</p>}
                    </div>
                  </div>
                  {(m.company || m.exp) && (
                    <div className="mt-5 space-y-1 text-sm text-muted-foreground">
                      {m.company && (
                        <div className="flex items-center gap-2">
                          <Trophy className="h-3.5 w-3.5 text-primary-glow" /> {m.company}
                        </div>
                      )}
                      {m.exp && (
                        <div className="flex items-center gap-2">
                          <Zap className="h-3.5 w-3.5 text-primary-glow" /> {m.exp}
                        </div>
                      )}
                    </div>
                  )}
                  {m.bio && <p className="mt-4 text-sm text-muted-foreground">{m.bio}</p>}
                  {m.expertise && m.expertise.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-border/40 pt-4">
                      {m.expertise.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary-glow"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

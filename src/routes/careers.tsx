import logo from "@/assets/logo.png";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, MapPin, Briefcase, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Vyombotics Academy" },
      {
        name: "description",
        content:
          "Join Vyombotics Academy and help millions of learners build careers in tech. Open roles in engineering, content, and growth.",
      },
      { property: "og:title", content: "Careers at Vyombotics" },
      {
        property: "og:description",
        content: "Open roles across engineering, content, design, and operations.",
      },
    ],
  }),
  component: CareersPage,
});

const ROLES = [
  {
    title: "Senior Full-Stack Engineer",
    team: "Engineering",
    location: "Bengaluru / Remote",
    type: "Full-time",
  },
  {
    title: "Curriculum Lead — AI/ML",
    team: "Content",
    location: "Remote, India",
    type: "Full-time",
  },
  { title: "Product Designer", team: "Design", location: "Bengaluru", type: "Full-time" },
  { title: "Placement Manager", team: "Operations", location: "Pune", type: "Full-time" },
  { title: "Community Manager", team: "Growth", location: "Remote, India", type: "Contract" },
  {
    title: "Teaching Assistant (Web Dev)",
    team: "Mentorship",
    location: "Remote",
    type: "Part-time",
  },
];

function CareersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-2" aria-label="Vyombotics">
            <img
              src={logo}
              alt="Vyombotics Academy of Future Education"
              className="h-10 w-auto"
            />
          </Link>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-foreground">
              About
            </Link>
            <Link to="/courses" className="hover:text-foreground">
              Courses
            </Link>
            <Link to="/contact" className="hover:text-foreground">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-sm uppercase tracking-widest text-primary">Careers</p>
        <h1 className="mt-3 font-display text-5xl font-bold leading-tight">
          Help us build the <span className="gradient-text">future of learning</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          We're a fully-remote-first team of builders, educators, and operators who care deeply
          about learner outcomes. If you want your work to change someone's career, you'll feel at
          home here.
        </p>
      </section>

      <section className="border-t border-border/40 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl font-bold">Why Vyombotics</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Real impact",
                d: "Every shipped feature, every lesson — directly touches thousands of learners within a week.",
              },
              {
                t: "Remote-first",
                d: "Work from anywhere in India. Quarterly offsites in Goa, Bengaluru and the hills.",
              },
              {
                t: "Top-of-market pay",
                d: "Competitive salary + meaningful ESOPs. We share the upside with the people who build it.",
              },
            ].map((b) => (
              <div key={b.t} className="rounded-2xl border border-border/40 p-6">
                <h3 className="font-display text-lg font-semibold">{b.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/40 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl font-bold">Open roles</h2>
          <div className="mt-8 space-y-3">
            {ROLES.map((r) => (
              <div
                key={r.title}
                className="flex flex-col gap-3 rounded-2xl border border-border/40 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-semibold">{r.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {r.team}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {r.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {r.type}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Apply
                </Button>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Don't see your role? Email{" "}
            <a href="mailto:careers@vyombotics.example" className="text-primary hover:underline">
              careers@vyombotics.example
            </a>{" "}
            with what you'd build here.
          </p>
        </div>
      </section>
    </div>
  );
}

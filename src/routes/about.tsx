import vyomboticsLogo from "@/assets/vyombotics-logo.png.asset.json";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  GraduationCap,
  Users,
  Bot,
  Code2,
  Brain,
  Cpu,
  Lightbulb,
  BookOpen,
  Rocket,
  Award,
  School,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Quote,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Vyombotics — Shaping Future Innovators & Educators" },
      {
        name: "description",
        content:
          "Vyombotics Academy of Future Education empowers both students and teachers with Robotics, AI, Coding, IoT and modern teaching methodologies.",
      },
      { property: "og:title", content: "Vyombotics — Future Education & Teacher Training" },
      {
        property: "og:description",
        content:
          "Training students and educators in Robotics, AI, Coding, Electronics & IoT for the future of learning.",
      },
    ],
  }),
  component: AboutPage,
});

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-6xl px-6 ${className}`}>{children}</section>;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
      {children}
    </span>
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="group rounded-2xl border border-border/40 bg-card/30 p-6 backdrop-blur transition hover:border-primary/40 hover:bg-card/50">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-[image:var(--gradient-primary)]">
        <Icon className="h-5 w-5 text-background" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}

function AboutPage() {
  const studentSkills = [
    "Coding Skills",
    "Robotics Knowledge",
    "AI Understanding",
    "Problem-Solving Ability",
    "Creativity & Innovation",
    "Future Career Readiness",
  ];
  const teacherSkills = [
    "Integrate STEM & Technology into classrooms",
    "Learn Robotics and AI fundamentals",
    "Conduct hands-on technology activities",
    "Build innovation-driven learning environments",
    "Upgrade teaching methodologies for the digital age",
    "Earn professional development certifications",
  ];
  const studentWhy = [
    {
      icon: Rocket,
      title: "Project-Based Learning",
      desc: "Real builds, not just theory — every concept ends in a working project.",
    },
    {
      icon: Brain,
      title: "Industry-Relevant Skills",
      desc: "Curriculum aligned with what modern tech employers actually need.",
    },
    {
      icon: Lightbulb,
      title: "Innovation Challenges",
      desc: "Hackathons, robotics meets and AI challenges to push your limits.",
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      desc: "1-on-1 guidance from engineers, researchers and educators.",
    },
    {
      icon: Award,
      title: "Future Career Preparation",
      desc: "Portfolios, interviews and pathways into STEM careers.",
    },
  ];
  const teacherWhy = [
    {
      icon: BookOpen,
      title: "Professional Development",
      desc: "Structured programs that count toward your professional growth.",
    },
    {
      icon: Cpu,
      title: "Classroom Tech Integration",
      desc: "Practical playbooks to bring tech into any subject area.",
    },
    {
      icon: Bot,
      title: "Robotics & AI Workshops",
      desc: "Hands-on workshops to demystify robotics and AI for educators.",
    },
    {
      icon: Wrench,
      title: "Curriculum Support",
      desc: "Ready-to-use lesson plans, activities and assessments.",
    },
    {
      icon: Award,
      title: "Certification Programs",
      desc: "Recognized certifications for Future-Ready Educators.",
    },
    {
      icon: GraduationCap,
      title: "Teaching Resources",
      desc: "Kits, slide decks and project libraries for every grade.",
    },
  ];
  const trainingAreas = [
    {
      icon: Bot,
      title: "Robotics for Educators",
      desc: "Introduce robotics concepts and practical activities in schools.",
    },
    {
      icon: Code2,
      title: "Coding for Teachers",
      desc: "Build confidence in programming fundamentals and digital literacy.",
    },
    {
      icon: Brain,
      title: "AI in Education",
      desc: "Understand AI tools and their role in modern teaching.",
    },
    {
      icon: Cpu,
      title: "Electronics & IoT",
      desc: "Practical projects that can be implemented inside classrooms.",
    },
    {
      icon: Lightbulb,
      title: "Project-Based Learning",
      desc: "Engage students through hands-on, experiential learning.",
    },
    {
      icon: BookOpen,
      title: "Tech-Integrated Teaching",
      desc: "Use digital tools effectively to improve learning outcomes.",
    },
  ];
  const impact = [
    { k: "5000+", v: "Students Empowered" },
    { k: "1000+", v: "Teachers Trained" },
    { k: "100+", v: "Schools & Institutions" },
    { k: "50+", v: "Expert Trainers" },
    { k: "95%", v: "Satisfaction Rate" },
  ];
  const partnerships = [
    "Teacher Training Workshops",
    "Robotics Labs Setup Guidance",
    "AI & Coding Curriculum Support",
    "Innovation Clubs",
    "STEM Events & Competitions",
    "Student Skill Development Programs",
  ];
  const learningPath = [
    "Register",
    "Technology Foundations",
    "Hands-On Workshops",
    "Classroom Implementation",
    "Project-Based Learning",
    "Certification",
    "Future-Ready Educator",
  ];

  return (
    <div className="min-h-screen text-foreground">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-2" aria-label="Vyombotics">
            <img
              src={vyomboticsLogo.url}
              alt="Vyombotics Academy of Future Education"
              className="h-10 w-auto"
            />
          </Link>
          <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
            <Link to="/courses" className="hover:text-foreground">
              Programs
            </Link>
            <Link to="/labs" className="hover:text-foreground">
              Labs
            </Link>
            <Link to="/contact" className="hover:text-foreground">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <Section className="py-20">
        <Pill>
          <Sparkles className="h-3.5 w-3.5" /> Future Education & Teacher Training
        </Pill>
        <h1 className="mt-4 font-display text-5xl font-bold leading-tight md:text-6xl">
          Shaping <span className="gradient-text">Future Innovators</span>
          <br />
          and <span className="gradient-text">Future Educators</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          Vyombotics Academy of Future Education is a next-generation learning platform dedicated to
          empowering both students and educators with future-ready skills. Innovation begins in the
          classroom — so we train students and equip teachers with modern technology knowledge and
          practical teaching methodologies.
        </p>
        <p className="mt-4 max-w-3xl text-base text-muted-foreground">
          Through hands-on experiences in Robotics, Artificial Intelligence, Coding, Electronics,
          IoT and emerging technologies, we help learners and educators confidently embrace the
          future of education.
        </p>
      </Section>

      {/* Who We Serve */}
      <Section className="py-16">
        <h2 className="font-display text-3xl font-bold">Who We Serve</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border/40 bg-card/30 p-8 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-primary)]">
                <GraduationCap className="h-6 w-6 text-background" />
              </div>
              <h3 className="font-display text-2xl font-semibold">Students</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">We help students develop:</p>
            <ul className="mt-4 space-y-2">
              {studentSkills.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border/40 bg-card/30 p-8 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-primary)]">
                <Users className="h-6 w-6 text-background" />
              </div>
              <h3 className="font-display text-2xl font-semibold">Teachers & Educators</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">We help teachers:</p>
            <ul className="mt-4 space-y-2">
              {teacherSkills.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Why Choose */}
      <Section className="py-16">
        <h2 className="font-display text-3xl font-bold">Why Choose Vyombotics?</h2>

        <h3 className="mt-8 font-display text-xl font-semibold text-muted-foreground">
          For Students
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {studentWhy.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>

        <h3 className="mt-12 font-display text-xl font-semibold text-muted-foreground">
          For Teachers
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teacherWhy.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </Section>

      {/* Teacher Training */}
      <Section className="py-16">
        <Pill>
          <GraduationCap className="h-3.5 w-3.5" /> Future-Ready Educator Program
        </Pill>
        <h2 className="mt-4 font-display text-3xl font-bold">Teacher Training Programs</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Designed for teachers who want to bring innovation and technology into their classrooms.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trainingAreas.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </Section>

      {/* Impact */}
      <Section className="py-16">
        <h2 className="font-display text-3xl font-bold">Our Impact</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {impact.map((s) => (
            <div
              key={s.v}
              className="rounded-2xl border border-border/40 bg-card/30 p-6 text-center backdrop-blur"
            >
              <p className="font-display text-3xl font-bold gradient-text">{s.k}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Partnerships */}
      <Section className="py-16">
        <div className="rounded-3xl border border-border/40 bg-card/30 p-8 backdrop-blur md:p-12">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-primary)]">
              <School className="h-6 w-6 text-background" />
            </div>
            <h2 className="font-display text-3xl font-bold">School & Institutional Partnerships</h2>
          </div>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Vyombotics collaborates with schools, educational institutions and learning centers to
            introduce future-focused technology education programs.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {partnerships.map((p) => (
              <div
                key={p}
                className="flex items-center gap-2 rounded-xl border border-border/40 px-4 py-3 text-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-primary" /> {p}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Learning Path */}
      <Section className="py-16">
        <h2 className="font-display text-3xl font-bold">Learning Path for Teachers</h2>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {learningPath.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                {step}
              </div>
              {i < learningPath.length - 1 && (
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="py-16">
        <h2 className="font-display text-3xl font-bold">What They Say</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            {
              q: "The Vyombotics training program transformed the way I teach technology. The hands-on approach made it easy to introduce robotics and coding activities in my classroom.",
              a: "School Educator",
            },
            {
              q: "Vyombotics helped our teachers adopt modern teaching practices and inspired students to explore innovation and technology.",
              a: "School Principal",
            },
          ].map((t) => (
            <div
              key={t.a}
              className="rounded-3xl border border-border/40 bg-card/30 p-8 backdrop-blur"
            >
              <Quote className="h-6 w-6 text-primary" />
              <p className="mt-4 text-base italic leading-relaxed text-foreground/90">"{t.q}"</p>
              <p className="mt-4 text-sm font-medium text-muted-foreground">— {t.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-20">
        <div className="rounded-3xl border border-primary/30 bg-[image:var(--gradient-primary)]/10 p-10 text-center backdrop-blur md:p-16">
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Empowering Students. <span className="gradient-text">Transforming Educators.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Whether you're a student eager to explore technology or a teacher looking to bring
            innovation into your classroom, Vyombotics provides the tools, training and mentorship
            needed to succeed.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/courses"
              className="rounded-xl bg-[image:var(--gradient-primary)] px-6 py-3 text-sm font-semibold text-background transition hover:opacity-90"
            >
              Explore Programs
            </Link>
            <Link
              to="/courses"
              className="rounded-xl border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/20"
            >
              Teacher Training Programs
            </Link>
            <Link
              to="/contact"
              className="rounded-xl border border-border/60 px-6 py-3 text-sm font-semibold transition hover:bg-card/40"
            >
              Book Free Demo
            </Link>
            <Link
              to="/contact"
              className="rounded-xl border border-border/60 px-6 py-3 text-sm font-semibold transition hover:bg-card/40"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

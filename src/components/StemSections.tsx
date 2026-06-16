import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import {
  FlaskConical,
  Cpu,
  Cog,
  Bot,
  Sigma,
  Rocket,
  GraduationCap,
  Lightbulb,
  Wrench,
  Award,
  Briefcase,
  ChevronRight,
} from "lucide-react";

type Course = { name: string; slug: string };
const c = (name: string, slug: string): Course => ({ name, slug });

const PILLARS = [
  {
    key: "science",
    title: "Science",
    icon: FlaskConical,
    tagline: "Discover the principles of nature through experiments and observation.",
    gradient: "from-emerald-500 to-lime-400",
    glow: "shadow-[0_20px_60px_-20px_rgba(34,197,94,0.6)]",
    courses: [
      c("Physics Fundamentals", "physics-fundamentals"),
      c("Chemistry Lab", "chemistry-lab"),
      c("Environmental Science", "environmental-science"),
      c("Biology Explorations", "biology-explorations"),
    ],
  },
  {
    key: "tech",
    title: "Technology",
    icon: Cpu,
    tagline: "Learn programming, AI, and the digital tools shaping tomorrow.",
    gradient: "from-sky-500 to-cyan-400",
    glow: "shadow-[0_20px_60px_-20px_rgba(59,130,246,0.6)]",
    courses: [
      c("Web Development", "web-development"),
      c("Python Programming", "python-programming"),
      c("Artificial Intelligence", "artificial-intelligence"),
      c("App Development", "app-development"),
    ],
  },
  {
    key: "eng",
    title: "Engineering",
    icon: Cog,
    tagline: "Design, build, and innovate with real engineering concepts.",
    gradient: "from-violet-500 to-pink-500",
    glow: "shadow-[0_20px_60px_-20px_rgba(139,92,246,0.6)]",
    courses: [
      c("Robotics", "robotics"),
      c("Electronics", "electronics"),
      c("Arduino Projects", "arduino-projects"),
      c("IoT Systems", "iot-systems"),
    ],
  },
  {
    key: "math",
    title: "Mathematics",
    icon: Sigma,
    tagline: "Master the language of patterns, logic and proof.",
    gradient: "from-orange-500 to-yellow-400",
    glow: "shadow-[0_20px_60px_-20px_rgba(249,115,22,0.6)]",
    courses: [
      c("Algebra Foundations", "algebra-foundations"),
      c("Geometry Explorations", "geometry-explorations"),
      c("Calculus Intro", "calculus-intro"),
      c("Statistics & Data", "statistics-data"),
    ],
  },
];

const JOURNEY = [
  { icon: GraduationCap, title: "Enroll", desc: "Pick a STEM track that matches your curiosity." },
  {
    icon: Lightbulb,
    title: "Learn Fundamentals",
    desc: "Core concepts taught with visualizations & demos.",
  },
  {
    icon: Wrench,
    title: "Hands-On Projects",
    desc: "Build robots, apps, experiments — real outputs.",
  },
  { icon: Bot, title: "Mentorship", desc: "1-on-1 guidance from STEM experts and engineers." },
  {
    icon: Award,
    title: "Certification",
    desc: "Earn verified credentials parents & schools trust.",
  },
  {
    icon: Briefcase,
    title: "Career Ready",
    desc: "Olympiad, hackathon, internship & innovation paths.",
  },
];

export function StemPillars() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="stem" className="relative py-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <div className="glass mx-auto mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground">
            <Rocket className="h-3 w-3 text-primary-glow" /> The four pillars
          </div>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            What is <span className="gradient-text">STEM?</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Science, Technology, Engineering & Mathematics — an integrated way of thinking that
            builds tomorrow's innovators.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            const isOpen = open === p.key;
            return (
              <div
                key={p.key}
                role="button"
                tabIndex={0}
                onClick={() => setOpen(isOpen ? null : p.key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpen(isOpen ? null : p.key);
                  }
                }}
                className={`card-3d card-3d-hover group relative cursor-pointer overflow-hidden rounded-2xl p-6 text-left transition-all duration-500 ${
                  isOpen ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : ""
                } ${p.glow}`}
                style={{ perspective: "1000px" }}
              >
                <div
                  className={`absolute inset-0 -z-10 bg-gradient-to-br ${p.gradient} opacity-10 transition-opacity duration-500 group-hover:opacity-20`}
                />
                <div
                  className={`mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${p.gradient} text-white shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
                  style={{ transform: "rotateX(8deg) rotateY(-8deg)" }}
                >
                  <Icon className="h-7 w-7" strokeWidth={2} />
                </div>
                <h3 className="font-display text-2xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>

                <div
                  className={`grid transition-all duration-500 ${
                    isOpen ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Courses
                    </div>
                    <ul className="mt-3 space-y-2">
                      {p.courses.map((course) => (
                        <li key={course.slug}>
                          <Link
                            to="/labs/$slug"
                            params={{ slug: course.slug }}
                            onClick={(e) => e.stopPropagation()}
                            className="group/link flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-white/5 hover:text-primary-glow"
                          >
                            <ChevronRight className="h-3.5 w-3.5 text-primary-glow transition-transform group-hover/link:translate-x-1" />
                            <span className="underline-offset-4 group-hover/link:underline">
                              {course.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-primary-glow">
                  {isOpen ? "Hide details" : "Explore courses"} <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function LearningJourney() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14 text-center">
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Your <span className="gradient-text">Learning Journey</span>
          </h2>
          <p className="mt-3 text-muted-foreground">From curiosity to career — one guided path.</p>
        </div>

        <div className="relative">
          {/* Vertical animated line */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-primary to-transparent md:left-1/2 md:-translate-x-1/2 md:block" />
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary to-transparent md:hidden" />

          <ul className="space-y-10">
            {JOURNEY.map((step, i) => {
              const Icon = step.icon;
              const left = i % 2 === 0;
              return (
                <li
                  key={step.title}
                  className={`relative grid items-center gap-6 md:grid-cols-2 ${left ? "" : "md:[direction:rtl]"}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {/* Node */}
                  <div className="absolute left-6 -translate-x-1/2 md:left-1/2">
                    <div className="relative grid h-12 w-12 place-items-center rounded-full bg-[image:var(--gradient-primary)] shadow-lg glow-primary">
                      <Icon className="h-5 w-5 text-background" />
                      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/40" />
                    </div>
                  </div>

                  <div
                    className={`pl-16 md:pl-0 ${left ? "md:pr-20 md:text-right" : "md:pl-20 md:[direction:ltr]"}`}
                  >
                    <div className="text-xs uppercase tracking-[0.2em] text-primary-glow">
                      Step {i + 1}
                    </div>
                    <h3 className="mt-1 font-display text-2xl font-bold">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                  <div />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function StemWheel() {
  const [active, setActive] = useState<string>("tech");
  const [rotation, setRotation] = useState(0); // degrees
  const [dragging, setDragging] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ startAngle: number; startRotation: number; moved: boolean } | null>(
    null,
  );
  const items = PILLARS;

  // Auto-rotate (paused while dragging or hovering)
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || dragging) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = t - last;
      last = t;
      setRotation((r) => r + dt * 0.012); // ~4.3°/s
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, dragging]);

  const angleFromCenter = (clientX: number, clientY: number) => {
    const el = wheelRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setDragging(true);
    dragState.current = {
      startAngle: angleFromCenter(e.clientX, e.clientY),
      startRotation: rotation,
      moved: false,
    };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current) return;
    const a = angleFromCenter(e.clientX, e.clientY);
    const delta = a - dragState.current.startAngle;
    if (Math.abs(delta) > 2) dragState.current.moved = true;
    setRotation(dragState.current.startRotation + delta);
  };
  const onPointerUp = () => {
    setDragging(false);
    dragState.current = null;
  };

  const handleSelect = useCallback((key: string, baseAngle: number) => {
    if (dragState.current?.moved) return; // it was a drag, not a tap
    setActive(key);
    // snap so the clicked pillar lands at top (-90°)
    const target = -90 - baseAngle;
    setRotation((r) => {
      const diff = ((((target - r) % 360) + 540) % 360) - 180;
      return r + diff;
    });
  }, []);

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            <span className="gradient-text">STEM</span> Explorer
          </h2>
          <p className="mt-3 text-muted-foreground">Drag to spin · tap a pillar to explore.</p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Wheel */}
          <div
            ref={wheelRef}
            className="relative mx-auto aspect-square w-full max-w-md touch-none select-none [perspective:1200px]"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{ cursor: dragging ? "grabbing" : "grab" }}
          >
            {/* Rings */}
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-glow-pulse" />
            <div className="absolute inset-6 rounded-full border border-accent/20" />
            <div className="absolute inset-12 rounded-full border border-primary/10" />
            <div
              className="absolute inset-0 rounded-full opacity-30 blur-3xl"
              style={{ background: "var(--gradient-primary)" }}
            />

            {/* Center (does NOT rotate) */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[image:var(--gradient-primary)] text-background shadow-2xl glow-primary">
              <div className="text-center">
                <div className="font-display text-xl font-bold">STEM</div>
                <div className="text-[10px] uppercase tracking-widest opacity-80">Explorer</div>
              </div>
            </div>

            {/* Rotating orbit layer */}
            <div
              className="absolute inset-0"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: dragging ? "none" : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {items.map((p, i) => {
                const baseAngle = (i / items.length) * 360 - 90; // degrees
                const rad = (baseAngle * Math.PI) / 180;
                const r = 42;
                const x = 50 + Math.cos(rad) * r;
                const y = 50 + Math.sin(rad) * r;
                const Icon = p.icon;
                const isActive = active === p.key;
                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => handleSelect(p.key, baseAngle)}
                    className="absolute"
                    style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                    aria-label={p.title}
                  >
                    {/* Counter-rotate so icon stays upright */}
                    <div
                      style={{
                        transform: `rotate(${-rotation}deg)`,
                        transition: dragging
                          ? "none"
                          : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    >
                      <div
                        className={`grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br ${p.gradient} text-white transition-all duration-500 ${
                          isActive
                            ? "scale-110 ring-4 ring-white/30"
                            : "opacity-80 hover:opacity-100 hover:scale-105"
                        }`}
                        style={{
                          boxShadow: isActive
                            ? `0 25px 60px -15px oklch(0.6 0.25 295 / 0.7)`
                            : `0 15px 40px -10px oklch(0.6 0.25 295 / 0.4)`,
                        }}
                      >
                        <Icon className="h-8 w-8" />
                      </div>
                      <div className="mt-2 text-center text-xs font-medium">{p.title}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div className="card-3d gradient-border rounded-3xl p-8">
            {items
              .filter((p) => p.key === active)
              .map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.key} className="animate-fade-up">
                    <div
                      className={`mb-4 inline-grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${p.gradient} text-white shadow-xl`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-display text-3xl font-bold">{p.title}</h3>
                    <p className="mt-2 text-muted-foreground">{p.tagline}</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {p.courses.map((course) => (
                        <Link
                          key={course.slug}
                          to="/labs/$slug"
                          params={{ slug: course.slug }}
                          className="glass group/link flex items-center gap-2 rounded-xl px-4 py-3 text-sm transition-all hover:scale-[1.02] hover:text-primary-glow"
                        >
                          <ChevronRight className="h-4 w-4 text-primary-glow transition-transform group-hover/link:translate-x-1" />
                          <span className="underline-offset-4 group-hover/link:underline">
                            {course.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}

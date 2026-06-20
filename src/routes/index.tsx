import logo from "@/assets/logo.png";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  Play,
  Users,
  BookOpen,
  Trophy,
  Zap,
  Shield,
  Globe,
  Code2,
  Brain,
  Database,
  Star,
  Linkedin,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteNav } from "@/components/SiteNav";
import { Floating3DScene } from "@/components/Floating3DScene";
import { VideoHero } from "@/components/VideoHero";
import { StemPillars, LearningJourney, StemWheel } from "@/components/StemSections";
import { BatchAnnouncements } from "@/components/BatchAnnouncements";
import { AnnouncementsSection } from "@/components/AnnouncementsSection";
import { ShopSection } from "@/components/ShopSection";
import { StemVoices } from "@/components/StemVoices";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listPublishedCourses } from "@/lib/courses.functions";
import spaceHero from "@/assets/space-hero.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vyombotics Academy — Learn Skills That Build Careers" },
      {
        name: "description",
        content:
          "Master Web Development, AI, DSA, and real industry projects. Premium courses with live mentorship, projects, and verified certificates.",
      },
      { property: "og:title", content: "Vyombotics Academy" },
      {
        property: "og:description",
        content: "Premium EdTech platform for ambitious learners. Web Dev, AI, DSA, real projects.",
      },
    ],
  }),
  component: Landing,
});

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1800;
    const step = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.floor(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end]);
  return (
    <span>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

const courses = [
  {
    titleKey: "Full-Stack Web Dev",
    instructor: "Aman Verma",
    weeks: 32,
    students: 4820,
    price: 4999,
    rating: 4.9,
    icon: Code2,
    tag: "Bestseller",
  },
  {
    titleKey: "AI & Machine Learning",
    instructor: "Priya Singh",
    weeks: 24,
    students: 3210,
    price: 6499,
    rating: 4.8,
    icon: Brain,
    tag: "Trending",
  },
  {
    titleKey: "DSA Mastery in Java",
    instructor: "Rohit Sharma",
    weeks: 20,
    students: 6740,
    price: 3499,
    rating: 4.9,
    icon: Database,
    tag: "Popular",
  },
];

const featureIcons = [Zap, Shield, Globe, Trophy];
const featureKeys = ["liveMentorship", "certificates", "projects", "placement"] as const;

const testimonials = [
  {
    name: "Ananya R.",
    role: "Software Engineer at Razorpay",
    text: "Went from college dropout to ₹18 LPA in 9 months. The DSA + projects combo was unbeatable.",
  },
  {
    name: "Karan M.",
    role: "ML Engineer at Swiggy",
    text: "Best decision of my career. The mentors actually code with you, not just lecture.",
  },
  {
    name: "Sneha P.",
    role: "Full-Stack Dev at Zomato",
    text: "The 3D learning interface and instant doubts on Discord made it feel like a real college.",
  },
];

const faculty = [
  {
    name: "Neeraj Singh",
    role: "Founder & Academic Head",
    focus: "Academic vision, curriculum quality, student learning outcomes, and innovation-led education.",
    initials: "NS",
    gradient: "from-blue-600 to-cyan-400",
    image: "https://res.cloudinary.com/drc0gwhz9/image/upload/v1779813647/neerajsingh_xkcimx.jpg",
    linkedin: "https://www.linkedin.com/in/neeraj-singh-04b6b4244?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    company: "",
    exp: "",
    expertise: [],
  },
  {
    name: "Neeraj Kumar",
    role: "Director & Cofounder",
    focus: "Operations, school partnerships, growth strategy, and program execution.",
    initials: "NK",
    gradient: "from-violet-600 to-blue-500",
    image: "https://res.cloudinary.com/drc0gwhz9/image/upload/v1779813178/neerajkumar_ztbthu.jpg",
    linkedin: "https://www.linkedin.com/in/neeraj-kumar-48593a257?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    company: "",
    exp: "",
    expertise: [],
  },
  {
    name: "Aanchal Chaurasiya",
    role: "Full Stack Web Developer",
    focus: "Frontend, backend, React projects, APIs, deployments, and production-ready web development.",
    initials: "AC",
    gradient: "from-fuchsia-500 to-pink-500",
    image: "https://res.cloudinary.com/drc0gwhz9/image/upload/v1779813752/anchal_t5n3ze.jpg",
    linkedin: "https://www.linkedin.com/in/anchal-chaurasiya-693b53257?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    company: "",
    exp: "",
    expertise: [],
  },
  {
    name: "Rishabh Yadav",
    role: "Python and AI/ML Programmer",
    focus: "Python programming, machine learning workflows, AI projects, and data-driven student builds.",
    initials: "RY",
    gradient: "from-emerald-400 to-cyan-500",
    image: "https://res.cloudinary.com/drc0gwhz9/image/upload/v1779813792/rishabh_oozhz2.jpg",
    linkedin: "https://www.linkedin.com/in/rishabh-yadav17?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    company: "",
    exp: "",
    expertise: [],
  },
  {
    name: "Anmol Verma",
    role: "3D CAD Designing Lead",
    focus: "3D modeling, CAD design, prototype planning, and product visualization for robotics projects.",
    initials: "AV",
    gradient: "from-cyan-500 to-blue-600",
    image: "https://res.cloudinary.com/drc0gwhz9/image/upload/v1779813861/anmol_jihmwg.jpg",
    linkedin: "https://www.linkedin.com/in/anmol-verma-here?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    company: "",
    exp: "",
    expertise: [],
  },
  {
    name: "Abhimanyu Singh",
    role: "App Developer Lead",
    focus: "Mobile app development, Firebase workflows, UI systems, and app-based student product builds.",
    initials: "AS",
    gradient: "from-indigo-500 to-violet-600",
    image: "https://res.cloudinary.com/drc0gwhz9/image/upload/v1779814535/abhimanyu_fo5rkl.jpg",
    linkedin: "https://www.linkedin.com/in/abhimanyu-singh-95a55s/",
    company: "",
    exp: "",
    expertise: [],
  },
  {
    name: "Aman Kumar",
    role: "Drone Technology Lead",
    focus: "Drone systems, flight fundamentals, aerial robotics, and applied drone technology education.",
    initials: "AK",
    gradient: "from-orange-400 to-rose-500",
    image: "https://res.cloudinary.com/drc0gwhz9/image/upload/v1779814143/aman_hbjt6y.jpg",
    linkedin: "https://www.linkedin.com/in/aman-kumar-8b14ab2a5?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    company: "",
    exp: "",
    expertise: [],
  },
];

function Landing() {
  const { t } = useTranslation();
  const { hero, facultyPage } = useSiteSettings();

  const fetcher = useServerFn(listPublishedCourses);
  const { data: coursesData } = useQuery({
    queryKey: ["courses", "published"],
    queryFn: () => fetcher(),
  });

  const coursesList = coursesData?.courses && coursesData.courses.length > 0
    ? coursesData.courses.map((c: any) => {
        let Icon = BookOpen;
        if (c.category?.toLowerCase().includes("web") || c.category?.toLowerCase().includes("code")) {
          Icon = Code2;
        } else if (c.category?.toLowerCase().includes("ai") || c.category?.toLowerCase().includes("ml") || c.category?.toLowerCase().includes("intelligence")) {
          Icon = Brain;
        } else if (c.category?.toLowerCase().includes("data") || c.category?.toLowerCase().includes("dsa") || c.category?.toLowerCase().includes("db")) {
          Icon = Database;
        }
        return {
          title: c.title,
          instructor: "Vyombotics Faculty",
          weeks: c.duration_hours ? Math.ceil(c.duration_hours / 4) : 12,
          students: c.students_count || 120,
          price: c.price_inr || 0,
          rating: c.rating || 4.8,
          category: c.category || "Tech",
          tag: c.level ? c.level.charAt(0).toUpperCase() + c.level.slice(1) : "Premium",
          thumbnail_url: c.thumbnail_url,
          slug: c.slug,
          icon: Icon,
        };
      })
    : courses.map((c) => ({
        title: c.titleKey,
        instructor: c.instructor,
        weeks: c.weeks,
        students: c.students,
        price: c.price,
        rating: c.rating,
        category: "Tech",
        tag: c.tag,
        thumbnail_url: null,
        slug: undefined,
        icon: c.icon,
      }));

  const facultyList = facultyPage.members && facultyPage.members.length > 0
    ? facultyPage.members.map((m: any) => {
        const initials = m.name
          ? m.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()
          : "FI";
        return {
          name: m.name,
          role: m.role || "Instructor",
          company: m.company || "Industry Expert",
          exp: m.exp || "5+ yrs",
          expertise: m.expertise || [],
          initials,
          image: m.image,
        };
      })
    : faculty;

  return (
    <div className="min-h-screen overflow-x-hidden">
      <SiteNav />

      {/* NEW BATCH ANNOUNCEMENTS (admin-controlled) */}
      <BatchAnnouncements />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-44 md:pb-32">
        {/* Cinematic background video (optional) */}
        {hero.video_url ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            poster={hero.video_poster}
          >
            <source src={hero.video_url} type="video/mp4" />
          </video>
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            aria-hidden
          >
            <source src={spaceHero.url} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 -z-10 bg-background/70 backdrop-blur-[3px]" aria-hidden />
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)", opacity: 0.55 }}
        />
        <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-glow-pulse" />
        <div
          className="absolute right-1/4 top-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-glow-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Floating 3D STEM icons across whole hero */}
        <Floating3DScene className="-z-10" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            {/* Video column (left on desktop) */}
            <div className="relative animate-float [perspective:1000px] order-2 md:order-1">
              <div className="absolute -inset-6 rounded-3xl bg-[image:var(--gradient-primary)] opacity-30 blur-3xl" />
              <div
                className="card-3d gradient-border relative aspect-video overflow-hidden rounded-3xl"
                style={{ transform: "rotateY(6deg) rotateX(4deg)" }}
              >
                <VideoHero src={hero.video_url} poster={hero.video_poster} />
              </div>
            </div>

            {/* Text column (right on desktop) */}
            <div className="animate-fade-up order-1 md:order-2">
              <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary-glow" />
                {hero.badge ?? t("home.badge")}
              </div>
              {hero.title ? (
                <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl gradient-text">
                  {hero.title}
                </h1>
              ) : (
                <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
                  {t("home.heroTitle1")} <br />
                  {t("home.heroTitle2")}{" "}
                  <span className="gradient-text">{t("home.heroHighlight")}</span>
                </h1>
              )}
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                {hero.subtitle ?? t("home.heroDesc")}
              </p>
              <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-background bg-[image:var(--gradient-primary)]"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex text-primary-glow">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <div>{t("home.lovedBy")}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Centered CTA Buttons */}
          <div className="mt-12 flex flex-wrap justify-center gap-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Button asChild size="lg" className="btn-glow text-primary-foreground">
              <a href={hero.cta_href ?? "/auth?mode=signup"}>
                {hero.cta_text ?? t("home.startLearning")} <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="glass">
              <a href="#courses">
                <Play className="h-4 w-4" /> {t("home.exploreCourses")}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border/40 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {[
            { n: 10000, s: "+", l: t("home.stats.students") },
            { n: 500, s: "+", l: t("home.stats.lessons") },
            { n: 100, s: "+", l: t("home.stats.projects") },
            { n: 95, s: "%", l: t("home.stats.success") },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-4xl font-bold gradient-text md:text-5xl">
                <AnimatedCounter end={s.n} suffix={s.s} />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STEM PILLARS */}
      <StemPillars />

      {/* LEARNING JOURNEY */}
      <LearningJourney />

      {/* STEM WHEEL */}
      <StemWheel />

      {/* STEM VOICES */}
      <StemVoices />

      <AnnouncementsSection />

      <ShopSection />

      {/* COURSES */}
      <section id="courses" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              {t("home.featuredCourses")}{" "}
              <span className="gradient-text">{t("home.coursesWord")}</span>
            </h2>
            <p className="mt-3 text-muted-foreground">{t("home.featuredDesc")}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {coursesList.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="card-3d card-3d-hover gradient-border group rounded-2xl p-6"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="grid h-12 w-12 overflow-hidden place-items-center rounded-xl bg-[image:var(--gradient-primary)] glow-primary">
                      {c.thumbnail_url ? (
                        <img src={c.thumbnail_url} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <Icon className="h-6 w-6 text-background" />
                      )}
                    </div>
                    <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary-glow">
                      {c.tag && t(`home.tags.${c.tag}`) !== `home.tags.${c.tag}` ? t(`home.tags.${c.tag}`) : (c.tag || "Course")}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("common.by")} {c.instructor}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" /> {c.weeks} {t("home.courseDuration.weeks")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {c.students.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current text-primary-glow" /> {c.rating}
                    </span>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4">
                    <div>
                      <div className="text-2xl font-bold gradient-text">
                        ₹{c.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground line-through">
                        ₹{(c.price * 2).toLocaleString()}
                      </div>
                    </div>
                    <Button asChild size="sm" className="btn-glow text-primary-foreground">
                      <Link to={c.slug ? "/courses/$slug" : "/courses"} params={c.slug ? { slug: c.slug } : undefined}>
                        {t("home.enroll")} <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              {t("home.whyTitle")} <span className="gradient-text">Vyombotics</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featureKeys.map((key, i) => {
              const Icon = featureIcons[i];
              return (
                <div key={key} className="card-3d card-3d-hover rounded-2xl p-6">
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary-glow">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">
                    {t(`home.features.${key}`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t(`home.features.${key}Desc`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FACULTY */}
      <section id="faculty" className="relative py-24">
        <div className="absolute left-1/2 top-10 -z-10 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <div className="glass mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary-glow" /> {t("home.facultyBadge")}
            </div>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              {t("home.facultyTitle")}{" "}
              <span className="gradient-text">{t("home.facultyHighlight")}</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{t("home.facultyDesc")}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {facultyList.map((m, i) => (
              <div
                key={i}
                className="card-3d card-3d-hover gradient-border group relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[image:var(--gradient-primary)] opacity-20 blur-2xl transition-opacity group-hover:opacity-40" />
                <div>
                  <div className="flex items-center gap-4">
                    {m.image ? (
                      <img src={m.image} alt={m.name} className="h-16 w-16 rounded-2xl object-cover border border-white/10" />
                    ) : (
                      <div className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${m.gradient || "from-blue-600 to-cyan-400"} font-display text-xl font-bold text-white glow-primary`}>
                        {m.initials}
                      </div>
                    )}
                    <div>
                      <h3 className="font-display text-lg font-semibold">{m.name}</h3>
                      <p className="text-sm text-primary-glow">{m.role}</p>
                    </div>
                  </div>

                  {m.focus ? (
                    <p className="mt-4 text-sm text-muted-foreground/95 leading-relaxed min-h-[4.5rem]">
                      {m.focus}
                    </p>
                  ) : (
                    <div className="mt-5 space-y-1 text-sm text-muted-foreground">
                      {m.company && (
                        <div className="flex items-center gap-2">
                          <Trophy className="h-3.5 w-3.5 text-primary-glow" /> {m.company}
                        </div>
                      )}
                      {m.exp && (
                        <div className="flex items-center gap-2">
                          <Zap className="h-3.5 w-3.5 text-primary-glow" /> {m.exp} {t("home.experience")}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {((m.expertise && m.expertise.length > 0) || m.linkedin) && (
                  <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4 flex-wrap gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {m.expertise?.map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary-glow"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {m.linkedin && (
                      <a
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-muted-foreground hover:bg-primary/20 hover:text-primary-glow transition-all"
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              {t("home.testimonialsTitle")}{" "}
              <span className="gradient-text">{t("home.testimonialsHighlight")}</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((tm, i) => (
              <div key={i} className="card-3d gradient-border rounded-2xl p-6">
                <div className="mb-3 flex text-primary-glow">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-foreground/90">"{tm.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[image:var(--gradient-primary)]" />
                  <div>
                    <div className="font-semibold">{tm.name}</div>
                    <div className="text-xs text-muted-foreground">{tm.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              {t("home.faqTitle")} <span className="gradient-text">{t("home.faqHighlight")}</span>
            </h2>
          </div>
          <Accordion type="single" collapsible className="card-3d rounded-2xl px-6">
            {[1, 2, 3, 4, 5].map((n, i) => (
              <AccordionItem key={i} value={`${i}`} className="border-border/40">
                <AccordionTrigger className="text-left font-display text-lg">
                  {t(`home.faq.q${n}`)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t(`home.faq.a${n}`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="card-3d gradient-border relative overflow-hidden rounded-3xl p-12 text-center">
            <div className="absolute -inset-32 -z-10 bg-[image:var(--gradient-primary)] opacity-20 blur-3xl" />
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              {t("home.ctaTitle1")} <span className="gradient-text">{t("home.ctaHighlight")}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t("home.ctaDesc")}</p>
            <Button asChild size="lg" className="btn-glow mt-8 text-primary-foreground">
              <Link to="/auth" search={{ mode: "signup" } as any}>
                {t("home.createAccount")} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/40 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="Vyombotics Academy of Future Education"
                className="h-10 w-auto"
              />
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">{t("home.footerTagline")}</p>
          </div>
          <div>
            <h4 className="mb-3 font-semibold">{t("home.platform")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#courses" className="hover:text-foreground">
                  {t("nav.courses")}
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-foreground">
                  {t("nav.features")}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-foreground">
                  {t("nav.faq")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold">{t("home.company")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground">
                  {t("home.about")}
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-foreground">
                  {t("home.careers")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground">
                  {t("home.contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl border-t border-border/40 px-6 pt-6 text-center text-xs text-muted-foreground">
          {t("home.copyright")}
        </div>
      </footer>
    </div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Quote, Sparkles } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

type Voice = {
  name: string;
  role: string;
  quote: string;
  thumb: string;
  youtubeId: string;
  videoUrl?: string;
  accent: string;
};

const DEFAULT_VOICES: Voice[] = [
  {
    name: "Sundar Pichai",
    role: "CEO, Google · Technology Visionary",
    quote: "AI is one of the most profound things we're working on as humanity.",
    thumb: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    youtubeId: "Unzc731iCUY",
    accent: "from-blue-500 to-cyan-400",
  },
  {
    name: "Sal Khan",
    role: "Founder, Khan Academy · Education Leader",
    quote: "Let's teach for mastery — not for test scores.",
    thumb: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    youtubeId: "-MTRxRO5SRA",
    accent: "from-emerald-500 to-teal-400",
  },
  {
    name: "Elon Musk",
    role: "Founder, SpaceX · Innovator",
    quote: "When something is important enough, you do it even if the odds are not in your favor.",
    thumb: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    youtubeId: "cdZZpaB2kDM",
    accent: "from-orange-500 to-amber-400",
  },
  {
    name: "Fei-Fei Li",
    role: "AI Scientist, Stanford · Researcher",
    quote: "AI is not just a tool — it's a new way of thinking about the world.",
    thumb: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80",
    youtubeId: "40riCqvRoMs",
    accent: "from-pink-500 to-rose-400",
  },
  {
    name: "Tim Berners-Lee",
    role: "Inventor of the Web · Pioneer",
    quote: "The web is for everyone — and collectively we hold the power to change it.",
    thumb: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    youtubeId: "ovZxgGLAevc",
    accent: "from-indigo-500 to-violet-400",
  },
  {
    name: "Reshma Saujani",
    role: "Founder, Girls Who Code · Advocate",
    quote: "We need to socialize our girls to be brave, not perfect.",
    thumb: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    youtubeId: "fC9da6eqaqg",
    accent: "from-fuchsia-500 to-pink-400",
  },
];

function youtubeIdFromUrl(input: string): string {
  if (!input) return "";
  const s = input.trim();
  // Already an ID
  if (/^[\w-]{11}$/.test(s)) return s;
  try {
    const u = new URL(s);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    const v = u.searchParams.get("v");
    if (v) return v;
    const parts = u.pathname.split("/").filter(Boolean);
    const i = parts.findIndex((p) => p === "embed" || p === "shorts");
    if (i >= 0 && parts[i + 1]) return parts[i + 1];
  } catch {
    // Ignore invalid URL parsing errors
  }
  return s;
}

export function StemVoices() {
  const [active, setActive] = useState<Voice | null>(null);
  const { stemVoices } = useSiteSettings();

  if (stemVoices.enabled === false) return null;

  const heading = stemVoices.heading?.trim();
  const subheading = stemVoices.subheading?.trim();
  const badge = stemVoices.badge?.trim() || "Inspiration · Watch & Learn";

  const items: Voice[] =
    stemVoices.items && stemVoices.items.length > 0
      ? stemVoices.items.map((v, i) => {
          const yid = youtubeIdFromUrl(v.youtubeId || "");
          return {
            name: v.name || "Untitled",
            role: v.role || "",
            quote: v.quote || "",
            thumb:
              v.thumb ||
              (yid
                ? `https://i.ytimg.com/vi/${yid}/hqdefault.jpg`
                : "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"),
            youtubeId: yid,
            videoUrl: v.videoUrl || "",
            accent: v.accent || DEFAULT_VOICES[i % DEFAULT_VOICES.length].accent,
          };
        })
      : DEFAULT_VOICES;

  return (
    <section id="stem-voices" className="relative py-24">
      <div className="absolute left-1/2 top-10 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <div className="glass mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary-glow" /> {badge}
          </div>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            {heading ? (
              heading
            ) : (
              <>
                STEM <span className="gradient-text">Voices</span>
              </>
            )}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {subheading ||
              "Inspiring talks from education leaders, innovators and technology visionaries shaping tomorrow."}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((v, i) => (
            <motion.button
              key={v.name}
              onClick={() => setActive(v)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/40 text-left shadow-xl backdrop-blur-xl"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={v.thumb}
                  alt={v.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${v.accent} opacity-0 mix-blend-overlay transition-opacity group-hover:opacity-60`}
                />
                <div className="absolute inset-0 grid place-items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br ${v.accent} shadow-2xl ring-4 ring-white/20`}
                  >
                    <Play className="h-6 w-6 translate-x-0.5 fill-white text-white" />
                  </motion.div>
                </div>
              </div>
              <div className="p-5">
                <Quote className="h-4 w-4 text-primary-glow" />
                <p className="mt-2 line-clamp-2 text-sm text-foreground/90">"{v.quote}"</p>
                <div className="mt-4 border-t border-border/40 pt-3">
                  <div className="font-display text-base font-semibold text-foreground">
                    {v.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{v.role}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] grid place-items-center bg-black/80 px-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: "spring", damping: 24, stiffness: 240 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-background/80 shadow-2xl backdrop-blur-2xl"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-red-500/80"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="aspect-video w-full bg-black">
                {active.videoUrl ? (
                  <video
                    src={active.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <iframe
                    src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1&rel=0`}
                    title={active.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                )}
              </div>
              <div className="p-5">
                <div className="font-display text-xl font-semibold">{active.name}</div>
                <div className="text-sm text-primary-glow">{active.role}</div>
                <p className="mt-3 flex gap-2 text-sm text-muted-foreground">
                  <Quote className="h-4 w-4 shrink-0 text-primary-glow" />
                  {active.quote}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

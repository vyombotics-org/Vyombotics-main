import { motion } from "framer-motion";
import { Megaphone, ArrowRight } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function AnnouncementsSection() {
  const { announcementsSection } = useSiteSettings();
  if (!announcementsSection.enabled) return null;
  const items = announcementsSection.items ?? [];
  if (items.length === 0) return null;

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-12">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/60 bg-slate-900 px-3 py-1 text-xs font-semibold text-white shadow-md ring-1 ring-primary/40">
          <Megaphone className="h-3.5 w-3.5" /> Announcements
        </div>
        <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
          {announcementsSection.heading ?? "What's new at Vyombotics"}
        </h2>
        {announcementsSection.subheading && (
          <p className="mt-1 text-sm text-muted-foreground">{announcementsSection.subheading}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((it, i) => {
          const href = it.cta_href || undefined;
          const Wrapper: any = href ? motion.a : motion.div;
          return (
            <Wrapper
              key={i}
              {...(href ? { href } : {})}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05 }}
              className={`group relative block overflow-hidden rounded-2xl border border-border/40 bg-card/40 p-5 backdrop-blur-md transition-all hover:border-accent/40 ${href ? "cursor-pointer hover:shadow-[0_20px_60px_-15px_hsl(var(--accent)/0.3)]" : ""}`}
            >
              <div className="flex items-start gap-4">
                {it.image && (
                  <img
                    src={it.image}
                    alt={it.title}
                    className="h-16 w-16 flex-none rounded-lg object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {it.tag && (
                      <span className="rounded-full bg-gradient-to-r from-accent to-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                        {it.tag}
                      </span>
                    )}
                    {it.date && (
                      <span className="text-[11px] text-muted-foreground">{it.date}</span>
                    )}
                  </div>
                  <h3 className="mt-1 font-semibold text-foreground">{it.title}</h3>
                  {it.body && <p className="mt-1 text-sm text-muted-foreground">{it.body}</p>}
                  {it.cta_text && href && (
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-glow">
                      {it.cta_text}{" "}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  )}
                </div>
              </div>
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Sparkles, CalendarDays, ArrowRight } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function BatchAnnouncements() {
  const { batchAnnouncements } = useSiteSettings();
  if (!batchAnnouncements.enabled) return null;
  const items = batchAnnouncements.items ?? [];
  if (items.length === 0) return null;

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-2 sm:pt-28">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-glow">
            <Sparkles className="h-3.5 w-3.5" /> New Batch Announcements
          </div>
          <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
            {batchAnnouncements.heading ?? "Fresh batches starting soon"}
          </h2>
          {batchAnnouncements.subheading && (
            <p className="mt-1 text-sm text-muted-foreground">{batchAnnouncements.subheading}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.a
            key={i}
            href={it.cta_href ?? "#"}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/40 backdrop-blur-md transition-all hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.35)]"
          >
            {it.image && (
              <div className="aspect-[16/9] w-full overflow-hidden bg-muted/20">
                <img
                  src={it.image}
                  alt={it.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center gap-2">
                {it.badge && (
                  <span className="rounded-full bg-gradient-to-r from-primary to-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    {it.badge}
                  </span>
                )}
                {it.starts_at && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                    <CalendarDays className="h-3 w-3" /> {it.starts_at}
                  </span>
                )}
              </div>
              <h3 className="mt-2 font-semibold text-foreground">{it.title}</h3>
              {it.description && (
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{it.description}</p>
              )}
              {it.cta_text && it.cta_href && (
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-glow">
                  {it.cta_text}{" "}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              )}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

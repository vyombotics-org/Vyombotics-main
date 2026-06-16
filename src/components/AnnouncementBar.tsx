import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function AnnouncementBar() {
  const { announcement } = useSiteSettings();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = `ann_dismissed:${announcement.message ?? ""}`;
    if (sessionStorage.getItem(key)) setDismissed(true);
  }, [announcement.message]);

  if (!announcement.enabled || !announcement.message || dismissed) return null;

  const variant = announcement.variant ?? "primary";
  const variantClass =
    variant === "destructive"
      ? "from-red-500/90 to-rose-500/90"
      : variant === "warning"
        ? "from-amber-500/90 to-orange-500/90"
        : variant === "accent"
          ? "from-accent/90 to-primary/90"
          : "from-primary/90 to-accent/90";

  return (
    <div className={`relative z-50 w-full bg-gradient-to-r ${variantClass} text-white shadow`}>
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-6 py-2 text-sm">
        <span className="text-center">{announcement.message}</span>
        {announcement.link_href && announcement.link_text && (
          <a
            href={announcement.link_href}
            className="rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold hover:bg-white/30"
          >
            {announcement.link_text}
          </a>
        )}
        <button
          onClick={() => {
            setDismissed(true);
            if (typeof window !== "undefined") {
              sessionStorage.setItem(`ann_dismissed:${announcement.message ?? ""}`, "1");
            }
          }}
          aria-label="Dismiss"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

import { queryOptions, useQuery } from "@tanstack/react-query";
import { getSiteSettings, type SiteSettingsMap } from "@/lib/site-settings.functions";

export const siteSettingsQueryOptions = queryOptions({
  queryKey: ["site_settings"],
  queryFn: () => getSiteSettings(),
  staleTime: 60_000,
});

export type HeroSettings = {
  title?: string;
  subtitle?: string;
  badge?: string;
  cta_text?: string;
  cta_href?: string;
  video_url?: string;
  video_poster?: string;
};
export type AnnouncementSettings = {
  enabled?: boolean;
  message?: string;
  link_text?: string;
  link_href?: string;
  variant?: "primary" | "accent" | "warning" | "destructive";
};
export type FloatingVideoClip = { title: string; subtitle: string; src: string };
export type FloatingVideoSettings = {
  enabled?: boolean;
  delay_seconds?: number;
  title?: string;
  playlist?: FloatingVideoClip[];
};
export type BatchAnnouncementItem = {
  title: string;
  description?: string;
  image?: string;
  badge?: string;
  starts_at?: string;
  cta_text?: string;
  cta_href?: string;
};
export type BatchAnnouncementsSettings = {
  enabled?: boolean;
  heading?: string;
  subheading?: string;
  items?: BatchAnnouncementItem[];
};
export type AnnouncementItem = {
  title: string;
  body?: string;
  tag?: string;
  date?: string;
  image?: string;
  cta_text?: string;
  cta_href?: string;
};
export type AnnouncementsSectionSettings = {
  enabled?: boolean;
  heading?: string;
  subheading?: string;
  items?: AnnouncementItem[];
};
export type StemVoiceItem = {
  name: string;
  role?: string;
  quote?: string;
  thumb?: string;
  youtubeId?: string;
  videoUrl?: string;
  accent?: string;
};
export type StemVoicesSettings = {
  enabled?: boolean;
  heading?: string;
  subheading?: string;
  badge?: string;
  items?: StemVoiceItem[];
};

export type FacultyMember = {
  name: string;
  role?: string;
  company?: string;
  exp?: string;
  bio?: string;
  image?: string;
  expertise?: string[];
};
export type FacultyPageSettings = {
  heading?: string;
  subheading?: string;
  badge?: string;
  members?: FacultyMember[];
};

export type FeedbackItem = {
  name: string;
  role?: string;
  text: string;
  rating?: number;
  image?: string;
};
export type FeedbackPageSettings = {
  heading?: string;
  subheading?: string;
  badge?: string;
  items?: FeedbackItem[];
};

export type FaqItem = { q: string; a: string };
export type FaqPageSettings = {
  heading?: string;
  subheading?: string;
  badge?: string;
  items?: FaqItem[];
};

export function useSiteSettings() {
  const q = useQuery(siteSettingsQueryOptions);
  const map: SiteSettingsMap = q.data?.settings ?? {};
  return {
    isLoading: q.isLoading,
    hero: (map.hero ?? {}) as HeroSettings,
    announcement: (map.announcement ?? {}) as AnnouncementSettings,
    floatingVideo: (map.floating_video ?? {}) as FloatingVideoSettings,
    batchAnnouncements: (map.batch_announcements ?? {}) as BatchAnnouncementsSettings,
    announcementsSection: (map.announcements_section ?? {}) as AnnouncementsSectionSettings,
    stemVoices: (map.stem_voices ?? {}) as StemVoicesSettings,
    facultyPage: (map.faculty_page ?? {}) as FacultyPageSettings,
    feedbackPage: (map.feedback_page ?? {}) as FeedbackPageSettings,
    faqPage: (map.faq_page ?? {}) as FaqPageSettings,
  };
}

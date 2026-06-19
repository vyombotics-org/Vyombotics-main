import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Loader2,
  Plus,
  Trash2,
  Save,
  Megaphone,
  Film,
  Palette,
  Rocket,
  Newspaper,
  Mic,
  Users,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MediaUpload } from "@/components/MediaUpload";
import { getSiteSettings, upsertSiteSetting } from "@/lib/site-settings.functions";
import type {
  AnnouncementItem,
  AnnouncementSettings,
  AnnouncementsSectionSettings,
  BatchAnnouncementItem,
  BatchAnnouncementsSettings,
  FacultyMember,
  FacultyPageSettings,
  FaqItem,
  FaqPageSettings,
  FeedbackItem,
  FeedbackPageSettings,
  FloatingVideoClip,
  FloatingVideoSettings,
  HeroSettings,
  StemVoiceItem,
  StemVoicesSettings,
} from "@/hooks/useSiteSettings";

export const Route = createFileRoute("/_authenticated/admin/site")({
  head: () => ({ meta: [{ title: "Site Settings · Admin" }] }),
  component: AdminSitePage,
});

function AdminSitePage() {
  const qc = useQueryClient();
  const loadFn = useServerFn(getSiteSettings);
  const saveFn = useServerFn(upsertSiteSetting);

  const { data, isLoading } = useQuery({
    queryKey: ["site_settings"],
    queryFn: () => loadFn(),
  });
  const settings = data?.settings ?? {};

  const saveMut = useMutation({
    mutationFn: (input: {
      key:
        | "hero"
        | "announcement"
        | "floating_video"
        | "batch_announcements"
        | "announcements_section"
        | "stem_voices"
        | "faculty_page"
        | "feedback_page"
        | "faq_page";
      value: any;
    }) => saveFn({ data: input }),
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["site_settings"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Failed to save"),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <SiteNav />
        <div className="mx-auto max-w-5xl px-6 pt-28 pb-16">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary-glow" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-5xl px-6 pt-28 pb-16">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>
        <div className="mt-4 mb-8">
          <h1 className="font-display text-3xl font-bold">Site Settings</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage homepage content, the announcement bar, the floating video, and new batch
            announcements. Upload images and videos directly or paste a public URL.
          </p>
        </div>

        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-3 sm:grid-cols-9">
            <TabsTrigger value="hero">
              <Palette className="mr-2 h-4 w-4" /> Hero
            </TabsTrigger>
            <TabsTrigger value="announcement">
              <Megaphone className="mr-2 h-4 w-4" /> Bar
            </TabsTrigger>
            <TabsTrigger value="announcements">
              <Newspaper className="mr-2 h-4 w-4" /> News
            </TabsTrigger>
            <TabsTrigger value="batches">
              <Rocket className="mr-2 h-4 w-4" /> Batches
            </TabsTrigger>
            <TabsTrigger value="voices">
              <Mic className="mr-2 h-4 w-4" /> Voices
            </TabsTrigger>
            <TabsTrigger value="video">
              <Film className="mr-2 h-4 w-4" /> Video
            </TabsTrigger>
            <TabsTrigger value="faculty">
              <Users className="mr-2 h-4 w-4" /> Faculty
            </TabsTrigger>
            <TabsTrigger value="feedback">
              <MessageSquare className="mr-2 h-4 w-4" /> Feedback
            </TabsTrigger>
            <TabsTrigger value="faq">
              <HelpCircle className="mr-2 h-4 w-4" /> FAQ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <HeroEditor
              initial={(settings.hero ?? {}) as HeroSettings}
              onSave={(value) => saveMut.mutate({ key: "hero", value })}
              saving={saveMut.isPending}
            />
          </TabsContent>

          <TabsContent value="announcement">
            <AnnouncementEditor
              initial={(settings.announcement ?? {}) as AnnouncementSettings}
              onSave={(value) => saveMut.mutate({ key: "announcement", value })}
              saving={saveMut.isPending}
            />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementsSectionEditor
              initial={(settings.announcements_section ?? {}) as AnnouncementsSectionSettings}
              onSave={(value) => saveMut.mutate({ key: "announcements_section", value })}
              saving={saveMut.isPending}
            />
          </TabsContent>

          <TabsContent value="batches">
            <BatchAnnouncementsEditor
              initial={(settings.batch_announcements ?? {}) as BatchAnnouncementsSettings}
              onSave={(value) => saveMut.mutate({ key: "batch_announcements", value })}
              saving={saveMut.isPending}
            />
          </TabsContent>

          <TabsContent value="voices">
            <StemVoicesEditor
              initial={(settings.stem_voices ?? {}) as StemVoicesSettings}
              onSave={(value) => saveMut.mutate({ key: "stem_voices", value })}
              saving={saveMut.isPending}
            />
          </TabsContent>

          <TabsContent value="video">
            <FloatingVideoEditor
              initial={(settings.floating_video ?? {}) as FloatingVideoSettings}
              onSave={(value) => saveMut.mutate({ key: "floating_video", value })}
              saving={saveMut.isPending}
            />
          </TabsContent>

          <TabsContent value="faculty">
            <FacultyPageEditor
              initial={(settings.faculty_page ?? {}) as FacultyPageSettings}
              onSave={(value) => saveMut.mutate({ key: "faculty_page", value })}
              saving={saveMut.isPending}
            />
          </TabsContent>

          <TabsContent value="feedback">
            <FeedbackPageEditor
              initial={(settings.feedback_page ?? {}) as FeedbackPageSettings}
              onSave={(value) => saveMut.mutate({ key: "feedback_page", value })}
              saving={saveMut.isPending}
            />
          </TabsContent>

          <TabsContent value="faq">
            <FaqPageEditor
              initial={(settings.faq_page ?? {}) as FaqPageSettings}
              onSave={(value) => saveMut.mutate({ key: "faq_page", value })}
              saving={saveMut.isPending}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="card-3d rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur-md">
      {children}
    </div>
  );
}

function HeroEditor({
  initial,
  onSave,
  saving,
}: {
  initial: HeroSettings;
  onSave: (v: HeroSettings) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<HeroSettings>(initial);
  useEffect(() => setForm(initial), [initial]);

  return (
    <Card>
      <div className="grid gap-4">
        <div>
          <Label>Badge text (top pill)</Label>
          <Input
            value={form.badge ?? ""}
            onChange={(e) => setForm({ ...form, badge: e.target.value })}
            placeholder="Built for the next generation of makers"
          />
        </div>
        <div>
          <Label>Hero title</Label>
          <Textarea
            rows={2}
            value={form.title ?? ""}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Future-ready STEM education"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Leave empty to use the translated default.
          </p>
        </div>
        <div>
          <Label>Subtitle</Label>
          <Textarea
            rows={3}
            value={form.subtitle ?? ""}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            placeholder="Code, build and ship real projects…"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Primary button text</Label>
            <Input
              value={form.cta_text ?? ""}
              onChange={(e) => setForm({ ...form, cta_text: e.target.value })}
              placeholder="Start learning"
            />
          </div>
          <div>
            <Label>Primary button link</Label>
            <Input
              value={form.cta_href ?? ""}
              onChange={(e) => setForm({ ...form, cta_href: e.target.value })}
              placeholder="/auth?mode=signup"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Hero video (mp4/webm)</Label>
            <MediaUpload
              value={form.video_url ?? ""}
              onChange={(url) => setForm({ ...form, video_url: url })}
              accept="video/*"
              folder="hero-video"
              placeholder="Upload or paste video URL"
              useCloudinary={true}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Shown in the hero card on the home page. Leave empty for the gradient placeholder.
            </p>
          </div>
          <div>
            <Label>Video poster (image, optional)</Label>
            <MediaUpload
              value={form.video_poster ?? ""}
              onChange={(url) => setForm({ ...form, video_poster: url })}
              accept="image/*"
              folder="hero-video"
              placeholder="Upload or paste image URL"
              useCloudinary={true}
            />
          </div>
        </div>
        <div className="pt-2">
          <Button onClick={() => onSave(form)} disabled={saving} className="btn-glow">
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}{" "}
            Save hero
          </Button>
        </div>
      </div>
    </Card>
  );
}

function AnnouncementEditor({
  initial,
  onSave,
  saving,
}: {
  initial: AnnouncementSettings;
  onSave: (v: AnnouncementSettings) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<AnnouncementSettings>({
    enabled: false,
    message: "",
    link_text: "",
    link_href: "",
    variant: "primary",
    ...initial,
  });
  useEffect(
    () =>
      setForm({
        enabled: false,
        message: "",
        link_text: "",
        link_href: "",
        variant: "primary",
        ...initial,
      }),
    [initial],
  );

  return (
    <Card>
      <div className="grid gap-4">
        <div className="flex items-center justify-between rounded-lg border border-border/40 p-3">
          <div>
            <div className="font-medium">Show announcement bar</div>
            <div className="text-xs text-muted-foreground">
              A dismissable banner at the top of every page.
            </div>
          </div>
          <Switch
            checked={!!form.enabled}
            onCheckedChange={(v) => setForm({ ...form, enabled: v })}
          />
        </div>
        <div>
          <Label>Message</Label>
          <Textarea
            rows={2}
            value={form.message ?? ""}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="New batch starts next Monday — limited seats!"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Button text (optional)</Label>
            <Input
              value={form.link_text ?? ""}
              onChange={(e) => setForm({ ...form, link_text: e.target.value })}
              placeholder="Enroll now"
            />
          </div>
          <div>
            <Label>Button link (optional)</Label>
            <Input
              value={form.link_href ?? ""}
              onChange={(e) => setForm({ ...form, link_href: e.target.value })}
              placeholder="/courses"
            />
          </div>
        </div>
        <div>
          <Label>Color</Label>
          <Select
            value={form.variant ?? "primary"}
            onValueChange={(v) => setForm({ ...form, variant: v as any })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">Primary (brand)</SelectItem>
              <SelectItem value="accent">Accent</SelectItem>
              <SelectItem value="warning">Warning (amber)</SelectItem>
              <SelectItem value="destructive">Alert (red)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="pt-2">
          <Button onClick={() => onSave(form)} disabled={saving} className="btn-glow">
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}{" "}
            Save announcement
          </Button>
        </div>
      </div>
    </Card>
  );
}

function AnnouncementsSectionEditor({
  initial,
  onSave,
  saving,
}: {
  initial: AnnouncementsSectionSettings;
  onSave: (v: AnnouncementsSectionSettings) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<AnnouncementsSectionSettings>({
    enabled: true,
    heading: "What's new at Vyombotics",
    subheading: "",
    items: [],
    ...initial,
  });
  useEffect(
    () =>
      setForm({
        enabled: true,
        heading: "What's new at Vyombotics",
        subheading: "",
        items: [],
        ...initial,
      }),
    [initial],
  );

  const updateItem = (i: number, patch: Partial<AnnouncementItem>) => {
    const next = [...(form.items ?? [])];
    next[i] = { ...next[i], ...patch };
    setForm({ ...form, items: next });
  };
  const addItem = () => setForm({ ...form, items: [...(form.items ?? []), { title: "" }] });
  const removeItem = (i: number) =>
    setForm({ ...form, items: (form.items ?? []).filter((_, j) => j !== i) });

  return (
    <Card>
      <div className="grid gap-4">
        <div className="flex items-center justify-between rounded-lg border border-border/40 p-3">
          <div>
            <div className="font-medium">Show announcements section</div>
            <div className="text-xs text-muted-foreground">
              A news/updates block on the home page.
            </div>
          </div>
          <Switch
            checked={form.enabled !== false}
            onCheckedChange={(v) => setForm({ ...form, enabled: v })}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Section heading</Label>
            <Input
              value={form.heading ?? ""}
              onChange={(e) => setForm({ ...form, heading: e.target.value })}
            />
          </div>
          <div>
            <Label>Subheading (optional)</Label>
            <Input
              value={form.subheading ?? ""}
              onChange={(e) => setForm({ ...form, subheading: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-2">
          <div className="mb-2 flex items-center justify-between">
            <Label className="text-base">Announcements</Label>
            <Button variant="outline" size="sm" onClick={addItem}>
              <Plus className="mr-1 h-4 w-4" /> Add announcement
            </Button>
          </div>
          <div className="space-y-4">
            {(form.items ?? []).map((it, i) => (
              <div key={i} className="rounded-lg border border-border/40 p-3 space-y-2">
                <div className="grid gap-2 md:grid-cols-2">
                  <Input
                    value={it.title}
                    onChange={(e) => updateItem(i, { title: e.target.value })}
                    placeholder="Title"
                  />
                  <Input
                    value={it.tag ?? ""}
                    onChange={(e) => updateItem(i, { tag: e.target.value })}
                    placeholder="Tag (e.g. News, Update)"
                  />
                </div>
                <Textarea
                  rows={2}
                  value={it.body ?? ""}
                  onChange={(e) => updateItem(i, { body: e.target.value })}
                  placeholder="Body"
                />
                <div className="grid gap-2 md:grid-cols-2">
                  <Input
                    value={it.date ?? ""}
                    onChange={(e) => updateItem(i, { date: e.target.value })}
                    placeholder="Date (e.g. 13 Jun 2026)"
                  />
                  <Input
                    value={it.cta_text ?? ""}
                    onChange={(e) => updateItem(i, { cta_text: e.target.value })}
                    placeholder="Button text"
                  />
                </div>
                <Input
                  value={it.cta_href ?? ""}
                  onChange={(e) => updateItem(i, { cta_href: e.target.value })}
                  placeholder="Button link"
                />
                <div>
                  <Label className="text-xs text-muted-foreground">Thumbnail (optional)</Label>
                  <MediaUpload
                    value={it.image ?? ""}
                    onChange={(url) => updateItem(i, { image: url })}
                    accept="image/*"
                    folder="announcements"
                    useCloudinary={true}
                  />
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" onClick={() => removeItem(i)}>
                    <Trash2 className="mr-1 h-4 w-4" /> Remove
                  </Button>
                </div>
              </div>
            ))}
            {(form.items ?? []).length === 0 && (
              <p className="text-sm text-muted-foreground">No announcements yet.</p>
            )}
          </div>
        </div>

        <div className="pt-2">
          <Button onClick={() => onSave(form)} disabled={saving} className="btn-glow">
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}{" "}
            Save announcements
          </Button>
        </div>
      </div>
    </Card>
  );
}

function BatchAnnouncementsEditor({
  initial,
  onSave,
  saving,
}: {
  initial: BatchAnnouncementsSettings;
  onSave: (v: BatchAnnouncementsSettings) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<BatchAnnouncementsSettings>({
    enabled: true,
    heading: "Fresh batches starting soon",
    subheading: "",
    items: [],
    ...initial,
  });
  useEffect(
    () =>
      setForm({
        enabled: true,
        heading: "Fresh batches starting soon",
        subheading: "",
        items: [],
        ...initial,
      }),
    [initial],
  );

  const updateItem = (i: number, patch: Partial<BatchAnnouncementItem>) => {
    const next = [...(form.items ?? [])];
    next[i] = { ...next[i], ...patch };
    setForm({ ...form, items: next });
  };
  const addItem = () => setForm({ ...form, items: [...(form.items ?? []), { title: "" }] });
  const removeItem = (i: number) =>
    setForm({ ...form, items: (form.items ?? []).filter((_, j) => j !== i) });

  return (
    <Card>
      <div className="grid gap-4">
        <div className="flex items-center justify-between rounded-lg border border-border/40 p-3">
          <div>
            <div className="font-medium">Show batch announcements section</div>
            <div className="text-xs text-muted-foreground">
              A new-batch showcase at the top of the home page.
            </div>
          </div>
          <Switch
            checked={form.enabled !== false}
            onCheckedChange={(v) => setForm({ ...form, enabled: v })}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Section heading</Label>
            <Input
              value={form.heading ?? ""}
              onChange={(e) => setForm({ ...form, heading: e.target.value })}
            />
          </div>
          <div>
            <Label>Subheading (optional)</Label>
            <Input
              value={form.subheading ?? ""}
              onChange={(e) => setForm({ ...form, subheading: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-2">
          <div className="mb-2 flex items-center justify-between">
            <Label className="text-base">Batches</Label>
            <Button variant="outline" size="sm" onClick={addItem}>
              <Plus className="mr-1 h-4 w-4" /> Add batch
            </Button>
          </div>
          <div className="space-y-4">
            {(form.items ?? []).map((it, i) => (
              <div key={i} className="rounded-lg border border-border/40 p-3 space-y-2">
                <div className="grid gap-2 md:grid-cols-2">
                  <Input
                    value={it.title}
                    onChange={(e) => updateItem(i, { title: e.target.value })}
                    placeholder="Batch title (e.g. AI & ML – Cohort 7)"
                  />
                  <Input
                    value={it.badge ?? ""}
                    onChange={(e) => updateItem(i, { badge: e.target.value })}
                    placeholder="Badge (e.g. New, Limited)"
                  />
                </div>
                <Textarea
                  rows={2}
                  value={it.description ?? ""}
                  onChange={(e) => updateItem(i, { description: e.target.value })}
                  placeholder="Short pitch shown on the card"
                />
                <div className="grid gap-2 md:grid-cols-2">
                  <Input
                    value={it.starts_at ?? ""}
                    onChange={(e) => updateItem(i, { starts_at: e.target.value })}
                    placeholder="Starts (e.g. 1 Jul 2026)"
                  />
                  <Input
                    value={it.cta_text ?? ""}
                    onChange={(e) => updateItem(i, { cta_text: e.target.value })}
                    placeholder="Button text (e.g. Enroll)"
                  />
                </div>
                <Input
                  value={it.cta_href ?? ""}
                  onChange={(e) => updateItem(i, { cta_href: e.target.value })}
                  placeholder="Button link (e.g. /courses/ai-ml)"
                />
                <div>
                  <Label className="text-xs text-muted-foreground">Cover image</Label>
                  <MediaUpload
                    value={it.image ?? ""}
                    onChange={(url) => updateItem(i, { image: url })}
                    accept="image/*"
                    folder="batch-announcements"
                    useCloudinary={true}
                  />
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" onClick={() => removeItem(i)}>
                    <Trash2 className="mr-1 h-4 w-4" /> Remove batch
                  </Button>
                </div>
              </div>
            ))}
            {(form.items ?? []).length === 0 && (
              <p className="text-sm text-muted-foreground">
                No batches yet. Add one to populate the section.
              </p>
            )}
          </div>
        </div>

        <div className="pt-2">
          <Button onClick={() => onSave(form)} disabled={saving} className="btn-glow">
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}{" "}
            Save batches
          </Button>
        </div>
      </div>
    </Card>
  );
}

function FloatingVideoEditor({
  initial,
  onSave,
  saving,
}: {
  initial: FloatingVideoSettings;
  onSave: (v: FloatingVideoSettings) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<FloatingVideoSettings>({
    enabled: true,
    delay_seconds: 8,
    title: "Vyom AI Insights",
    playlist: [],
    ...initial,
  });
  useEffect(
    () =>
      setForm({
        enabled: true,
        delay_seconds: 8,
        title: "Vyom AI Insights",
        playlist: [],
        ...initial,
      }),
    [initial],
  );

  const updateClip = (i: number, patch: Partial<FloatingVideoClip>) => {
    const next = [...(form.playlist ?? [])];
    next[i] = { ...next[i], ...patch };
    setForm({ ...form, playlist: next });
  };
  const addClip = () =>
    setForm({
      ...form,
      playlist: [...(form.playlist ?? []), { title: "", subtitle: "", src: "" }],
    });
  const removeClip = (i: number) =>
    setForm({ ...form, playlist: (form.playlist ?? []).filter((_, j) => j !== i) });

  return (
    <Card>
      <div className="grid gap-4">
        <div className="flex items-center justify-between rounded-lg border border-border/40 p-3">
          <div>
            <div className="font-medium">Show floating video widget</div>
            <div className="text-xs text-muted-foreground">
              The draggable video that pops up while users browse.
            </div>
          </div>
          <Switch
            checked={form.enabled !== false}
            onCheckedChange={(v) => setForm({ ...form, enabled: v })}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Header title</Label>
            <Input
              value={form.title ?? ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Vyom AI Insights"
            />
          </div>
          <div>
            <Label>Open after (seconds)</Label>
            <Input
              type="number"
              min={0}
              max={300}
              value={form.delay_seconds ?? 8}
              onChange={(e) => setForm({ ...form, delay_seconds: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="mt-2">
          <div className="mb-2 flex items-center justify-between">
            <Label className="text-base">Playlist</Label>
            <Button variant="outline" size="sm" onClick={addClip}>
              <Plus className="mr-1 h-4 w-4" /> Add clip
            </Button>
          </div>
          <div className="space-y-3">
            {(form.playlist ?? []).map((clip, i) => (
              <div key={i} className="rounded-lg border border-border/40 p-3 space-y-2">
                <div className="grid gap-2 md:grid-cols-2">
                  <Input
                    value={clip.title}
                    onChange={(e) => updateClip(i, { title: e.target.value })}
                    placeholder="Clip title"
                  />
                  <Input
                    value={clip.subtitle}
                    onChange={(e) => updateClip(i, { subtitle: e.target.value })}
                    placeholder="Subtitle / category · duration"
                  />
                </div>
                <MediaUpload
                  value={clip.src}
                  onChange={(url) => updateClip(i, { src: url })}
                  accept="video/*"
                  folder="floating-video"
                  placeholder="Paste video URL (.mp4/.webm) or upload"
                  useCloudinary={true}
                />
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" onClick={() => removeClip(i)}>
                    <Trash2 className="mr-1 h-4 w-4" /> Remove clip
                  </Button>
                </div>
              </div>
            ))}
            {(form.playlist ?? []).length === 0 && (
              <p className="text-sm text-muted-foreground">
                No clips yet. Add at least one to show the widget.
              </p>
            )}
          </div>
        </div>

        <div className="pt-2">
          <Button onClick={() => onSave(form)} disabled={saving} className="btn-glow">
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}{" "}
            Save video widget
          </Button>
        </div>
      </div>
    </Card>
  );
}

const DEFAULT_VOICES: StemVoiceItem[] = [
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

function StemVoicesEditor({
  initial,
  onSave,
  saving,
}: {
  initial: StemVoicesSettings;
  onSave: (v: StemVoicesSettings) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<StemVoicesSettings>({
    enabled: true,
    heading: "",
    subheading: "",
    badge: "",
    items: initial?.items && initial.items.length > 0 ? initial.items : DEFAULT_VOICES,
    ...initial,
  });
  useEffect(
    () => setForm({ enabled: true, heading: "", subheading: "", badge: "", items: initial?.items && initial.items.length > 0 ? initial.items : DEFAULT_VOICES, ...initial }),
    [initial],
  );

  const updateItem = (i: number, patch: Partial<StemVoiceItem>) => {
    const next = [...(form.items ?? [])];
    next[i] = { ...next[i], ...patch };
    setForm({ ...form, items: next });
  };
  const addItem = () =>
    setForm({
      ...form,
      items: [
        ...(form.items ?? []),
        {
          name: "",
          role: "",
          quote: "",
          youtubeId: "",
          videoUrl: "",
          thumb: "",
          accent: "from-blue-500 to-cyan-400",
        },
      ],
    });
  const removeItem = (i: number) =>
    setForm({ ...form, items: (form.items ?? []).filter((_, j) => j !== i) });

  return (
    <Card>
      <div className="grid gap-4">
        <div className="flex items-center justify-between rounded-lg border border-border/40 p-3">
          <div>
            <div className="font-medium">Show STEM Voices section</div>
            <div className="text-xs text-muted-foreground">
              Inspiring video cards on the home page.
            </div>
          </div>
          <Switch
            checked={form.enabled !== false}
            onCheckedChange={(v) => setForm({ ...form, enabled: v })}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Badge text</Label>
            <Input
              value={form.badge ?? ""}
              onChange={(e) => setForm({ ...form, badge: e.target.value })}
              placeholder="Inspiration · Watch & Learn"
            />
          </div>
          <div>
            <Label>Section heading</Label>
            <Input
              value={form.heading ?? ""}
              onChange={(e) => setForm({ ...form, heading: e.target.value })}
              placeholder="STEM Voices"
            />
          </div>
        </div>
        <div>
          <Label>Subheading</Label>
          <Textarea
            rows={2}
            value={form.subheading ?? ""}
            onChange={(e) => setForm({ ...form, subheading: e.target.value })}
            placeholder="Inspiring talks from education leaders…"
          />
        </div>

        <div className="mt-2">
          <div className="mb-2 flex items-center justify-between">
            <Label className="text-base">Voices</Label>
            <Button variant="outline" size="sm" onClick={addItem}>
              <Plus className="mr-1 h-4 w-4" /> Add voice
            </Button>
          </div>
          <div className="space-y-4">
            {(form.items ?? []).map((it, i) => (
              <div key={i} className="rounded-lg border border-border/40 p-3 space-y-2">
                <div className="grid gap-2 md:grid-cols-2">
                  <Input
                    value={it.name}
                    onChange={(e) => updateItem(i, { name: e.target.value })}
                    placeholder="Name (e.g. Sundar Pichai)"
                  />
                  <Input
                    value={it.role ?? ""}
                    onChange={(e) => updateItem(i, { role: e.target.value })}
                    placeholder="Role (e.g. CEO, Google · Visionary)"
                  />
                </div>
                <Textarea
                  rows={2}
                  value={it.quote ?? ""}
                  onChange={(e) => updateItem(i, { quote: e.target.value })}
                  placeholder="Inspiring quote"
                />
                <div>
                  <Label className="text-xs text-muted-foreground">
                    YouTube URL or Video ID
                  </Label>
                  <Input
                    value={it.youtubeId ?? ""}
                    onChange={(e) => {
                      updateItem(i, { youtubeId: e.target.value, videoUrl: "" });
                    }}
                    placeholder="https://www.youtube.com/watch?v=Unzc731iCUY or Unzc731iCUY"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Thumbnail image (optional — leave empty to use YouTube thumb)
                  </Label>
                  <MediaUpload
                    value={it.thumb ?? ""}
                    onChange={(url) => updateItem(i, { thumb: url })}
                    accept="image/*"
                    folder="stem-voices"
                    useCloudinary={true}
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Accent gradient (Tailwind)
                  </Label>
                  <Select
                    value={it.accent ?? "from-blue-500 to-cyan-400"}
                    onValueChange={(v) => updateItem(i, { accent: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="from-blue-500 to-cyan-400">Blue → Cyan</SelectItem>
                      <SelectItem value="from-emerald-500 to-teal-400">Emerald → Teal</SelectItem>
                      <SelectItem value="from-orange-500 to-amber-400">Orange → Amber</SelectItem>
                      <SelectItem value="from-pink-500 to-rose-400">Pink → Rose</SelectItem>
                      <SelectItem value="from-indigo-500 to-violet-400">Indigo → Violet</SelectItem>
                      <SelectItem value="from-fuchsia-500 to-pink-400">Fuchsia → Pink</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" onClick={() => removeItem(i)}>
                    <Trash2 className="mr-1 h-4 w-4" /> Remove voice
                  </Button>
                </div>
              </div>
            ))}
            {(form.items ?? []).length === 0 && (
              <p className="text-sm text-muted-foreground">
                No voices yet. Defaults will be shown on the site until you add some.
              </p>
            )}
          </div>
        </div>

        <div className="pt-2">
          <Button onClick={() => onSave(form)} disabled={saving} className="btn-glow">
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}{" "}
            Save voices
          </Button>
        </div>
      </div>
    </Card>
  );
}

function SectionHeaderFields({
  form,
  setForm,
  defaultBadge,
}: {
  form: { heading?: string; subheading?: string; badge?: string };
  setForm: (v: any) => void;
  defaultBadge: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div>
        <Label>Badge</Label>
        <Input
          value={form.badge ?? ""}
          onChange={(e) => setForm({ ...form, badge: e.target.value })}
          placeholder={defaultBadge}
        />
      </div>
      <div className="md:col-span-2">
        <Label>Heading</Label>
        <Input
          value={form.heading ?? ""}
          onChange={(e) => setForm({ ...form, heading: e.target.value })}
        />
      </div>
      <div className="md:col-span-3">
        <Label>Subheading (optional)</Label>
        <Input
          value={form.subheading ?? ""}
          onChange={(e) => setForm({ ...form, subheading: e.target.value })}
        />
      </div>
    </div>
  );
}

const DEFAULT_FACULTY: FacultyMember[] = [
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

function FacultyPageEditor({
  initial,
  onSave,
  saving,
}: {
  initial: FacultyPageSettings;
  onSave: (v: FacultyPageSettings) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<FacultyPageSettings>({
    heading: "Featured Faculty",
    subheading: "",
    badge: "Our Mentors",
    members: initial?.members && initial.members.length > 0 ? initial.members : DEFAULT_FACULTY,
    ...initial,
  });
  useEffect(
    () =>
      setForm({
        heading: "Featured Faculty",
        subheading: "",
        badge: "Our Mentors",
        members: initial?.members && initial.members.length > 0 ? initial.members : DEFAULT_FACULTY,
        ...initial,
      }),
    [initial],
  );

  const updateMember = (i: number, patch: Partial<FacultyMember>) => {
    const next = [...(form.members ?? [])];
    next[i] = { ...next[i], ...patch };
    setForm({ ...form, members: next });
  };
  const addMember = () => setForm({ ...form, members: [...(form.members ?? []), { name: "" }] });
  const removeMember = (i: number) =>
    setForm({ ...form, members: (form.members ?? []).filter((_, j) => j !== i) });

  return (
    <Card>
      <div className="grid gap-4">
        <SectionHeaderFields form={form} setForm={setForm} defaultBadge="Our Mentors" />
        <div className="mt-2">
          <div className="mb-2 flex items-center justify-between">
            <Label className="text-base">Faculty members</Label>
            <Button variant="outline" size="sm" onClick={addMember}>
              <Plus className="mr-1 h-4 w-4" /> Add member
            </Button>
          </div>
          <div className="space-y-4">
            {(form.members ?? []).map((m, i) => (
              <div key={i} className="rounded-lg border border-border/40 p-3 space-y-2">
                <div className="grid gap-2 md:grid-cols-2">
                  <Input
                    value={m.name}
                    onChange={(e) => updateMember(i, { name: e.target.value })}
                    placeholder="Full name"
                  />
                  <Input
                    value={m.role ?? ""}
                    onChange={(e) => updateMember(i, { role: e.target.value })}
                    placeholder="Role (e.g. AI / ML Mentor)"
                  />
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  <Input
                    value={m.company ?? ""}
                    onChange={(e) => updateMember(i, { company: e.target.value })}
                    placeholder="Company (e.g. Ex-Google)"
                  />
                  <Input
                    value={m.exp ?? ""}
                    onChange={(e) => updateMember(i, { exp: e.target.value })}
                    placeholder="Experience (e.g. 9+ yrs)"
                  />
                </div>
                <Textarea
                  rows={2}
                  value={m.bio ?? ""}
                  onChange={(e) => updateMember(i, { bio: e.target.value })}
                  placeholder="Short bio (optional)"
                />
                <Textarea
                  rows={2}
                  value={m.focus ?? ""}
                  onChange={(e) => updateMember(i, { focus: e.target.value })}
                  placeholder="Focus (e.g. Operations, growth strategy...)"
                />
                <Input
                  value={m.linkedin ?? ""}
                  onChange={(e) => updateMember(i, { linkedin: e.target.value })}
                  placeholder="LinkedIn Profile URL (optional)"
                />
                <div className="grid gap-2 md:grid-cols-2">
                  <Input
                    value={(m.expertise ?? []).join(", ")}
                    onChange={(e) =>
                      updateMember(i, {
                        expertise: e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="Expertise tags, comma-separated"
                  />
                  <Select
                    value={m.gradient ?? "from-blue-600 to-cyan-400"}
                    onValueChange={(v) => updateMember(i, { gradient: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gradient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="from-blue-600 to-cyan-400">Blue → Cyan</SelectItem>
                      <SelectItem value="from-violet-600 to-blue-500">Violet → Blue</SelectItem>
                      <SelectItem value="from-fuchsia-500 to-pink-500">Fuchsia → Pink</SelectItem>
                      <SelectItem value="from-emerald-400 to-cyan-500">Emerald → Cyan</SelectItem>
                      <SelectItem value="from-cyan-500 to-blue-600">Cyan → Blue</SelectItem>
                      <SelectItem value="from-indigo-500 to-violet-600">Indigo → Violet</SelectItem>
                      <SelectItem value="from-orange-400 to-rose-500">Orange → Rose</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Photo (optional)</Label>
                  <MediaUpload
                    value={m.image ?? ""}
                    onChange={(url) => updateMember(i, { image: url })}
                    accept="image/*"
                    folder="faculty"
                    useCloudinary={true}
                  />
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" onClick={() => removeMember(i)}>
                    <Trash2 className="mr-1 h-4 w-4" /> Remove
                  </Button>
                </div>
              </div>
            ))}
            {(form.members ?? []).length === 0 && (
              <p className="text-sm text-muted-foreground">
                No members yet. Defaults will be shown until you add some.
              </p>
            )}
          </div>
        </div>
        <div className="pt-2">
          <Button onClick={() => onSave(form)} disabled={saving} className="btn-glow">
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}{" "}
            Save faculty
          </Button>
        </div>
      </div>
    </Card>
  );
}

function FeedbackPageEditor({
  initial,
  onSave,
  saving,
}: {
  initial: FeedbackPageSettings;
  onSave: (v: FeedbackPageSettings) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<FeedbackPageSettings>({
    heading: "What Our Students Say",
    subheading: "",
    badge: "Student Stories",
    items: [],
    ...initial,
  });
  useEffect(
    () =>
      setForm({
        heading: "What Our Students Say",
        subheading: "",
        badge: "Student Stories",
        items: [],
        ...initial,
      }),
    [initial],
  );

  const updateItem = (i: number, patch: Partial<FeedbackItem>) => {
    const next = [...(form.items ?? [])];
    next[i] = { ...next[i], ...patch };
    setForm({ ...form, items: next });
  };
  const addItem = () =>
    setForm({ ...form, items: [...(form.items ?? []), { name: "", text: "" }] });
  const removeItem = (i: number) =>
    setForm({ ...form, items: (form.items ?? []).filter((_, j) => j !== i) });

  return (
    <Card>
      <div className="grid gap-4">
        <SectionHeaderFields form={form} setForm={setForm} defaultBadge="Student Stories" />
        <div className="mt-2">
          <div className="mb-2 flex items-center justify-between">
            <Label className="text-base">Feedback / testimonials</Label>
            <Button variant="outline" size="sm" onClick={addItem}>
              <Plus className="mr-1 h-4 w-4" /> Add feedback
            </Button>
          </div>
          <div className="space-y-4">
            {(form.items ?? []).map((it, i) => (
              <div key={i} className="rounded-lg border border-border/40 p-3 space-y-2">
                <div className="grid gap-2 md:grid-cols-2">
                  <Input
                    value={it.name}
                    onChange={(e) => updateItem(i, { name: e.target.value })}
                    placeholder="Name"
                  />
                  <Input
                    value={it.role ?? ""}
                    onChange={(e) => updateItem(i, { role: e.target.value })}
                    placeholder="Role (e.g. SDE at Razorpay)"
                  />
                </div>
                <Textarea
                  rows={3}
                  value={it.text}
                  onChange={(e) => updateItem(i, { text: e.target.value })}
                  placeholder="Their feedback…"
                />
                <div className="grid gap-2 md:grid-cols-2">
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    value={it.rating ?? 5}
                    onChange={(e) =>
                      updateItem(i, {
                        rating: Math.max(1, Math.min(5, Number(e.target.value) || 5)),
                      })
                    }
                    placeholder="Rating (1-5)"
                  />
                  <div>
                    <Label className="text-xs text-muted-foreground">Avatar (optional)</Label>
                    <MediaUpload
                      value={it.image ?? ""}
                      onChange={(url) => updateItem(i, { image: url })}
                      accept="image/*"
                      folder="feedback"
                      useCloudinary={true}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" onClick={() => removeItem(i)}>
                    <Trash2 className="mr-1 h-4 w-4" /> Remove
                  </Button>
                </div>
              </div>
            ))}
            {(form.items ?? []).length === 0 && (
              <p className="text-sm text-muted-foreground">
                No feedback yet. Defaults will be shown until you add some.
              </p>
            )}
          </div>
        </div>
        <div className="pt-2">
          <Button onClick={() => onSave(form)} disabled={saving} className="btn-glow">
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}{" "}
            Save feedback
          </Button>
        </div>
      </div>
    </Card>
  );
}

function FaqPageEditor({
  initial,
  onSave,
  saving,
}: {
  initial: FaqPageSettings;
  onSave: (v: FaqPageSettings) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<FaqPageSettings>({
    heading: "Frequently Asked Questions",
    subheading: "",
    badge: "Help Center",
    items: [],
    ...initial,
  });
  useEffect(
    () =>
      setForm({
        heading: "Frequently Asked Questions",
        subheading: "",
        badge: "Help Center",
        items: [],
        ...initial,
      }),
    [initial],
  );

  const updateItem = (i: number, patch: Partial<FaqItem>) => {
    const next = [...(form.items ?? [])];
    next[i] = { ...next[i], ...patch };
    setForm({ ...form, items: next });
  };
  const addItem = () => setForm({ ...form, items: [...(form.items ?? []), { q: "", a: "" }] });
  const removeItem = (i: number) =>
    setForm({ ...form, items: (form.items ?? []).filter((_, j) => j !== i) });

  return (
    <Card>
      <div className="grid gap-4">
        <SectionHeaderFields form={form} setForm={setForm} defaultBadge="Help Center" />
        <div className="mt-2">
          <div className="mb-2 flex items-center justify-between">
            <Label className="text-base">Questions</Label>
            <Button variant="outline" size="sm" onClick={addItem}>
              <Plus className="mr-1 h-4 w-4" /> Add question
            </Button>
          </div>
          <div className="space-y-4">
            {(form.items ?? []).map((it, i) => (
              <div key={i} className="rounded-lg border border-border/40 p-3 space-y-2">
                <Input
                  value={it.q}
                  onChange={(e) => updateItem(i, { q: e.target.value })}
                  placeholder="Question"
                />
                <Textarea
                  rows={3}
                  value={it.a}
                  onChange={(e) => updateItem(i, { a: e.target.value })}
                  placeholder="Answer"
                />
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" onClick={() => removeItem(i)}>
                    <Trash2 className="mr-1 h-4 w-4" /> Remove
                  </Button>
                </div>
              </div>
            ))}
            {(form.items ?? []).length === 0 && (
              <p className="text-sm text-muted-foreground">
                No questions yet. Defaults will be shown until you add some.
              </p>
            )}
          </div>
        </div>
        <div className="pt-2">
          <Button onClick={() => onSave(form)} disabled={saving} className="btn-glow">
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}{" "}
            Save FAQ
          </Button>
        </div>
      </div>
    </Card>
  );
}

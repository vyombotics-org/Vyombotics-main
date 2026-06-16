
-- Site settings: key/value JSON store editable by admins, readable by all
CREATE TABLE IF NOT EXISTS public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site settings"
  ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Admins insert site settings"
  ON public.site_settings FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update site settings"
  ON public.site_settings FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete site settings"
  ON public.site_settings FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed defaults
INSERT INTO public.site_settings (key, value) VALUES
  ('hero', jsonb_build_object(
    'title', 'Future-ready STEM education',
    'subtitle', 'Code, build and ship real projects with mentor-led labs and verified certificates.',
    'badge', 'Built for the next generation of makers',
    'cta_text', 'Start learning',
    'cta_href', '/auth?mode=signup'
  )),
  ('announcement', jsonb_build_object(
    'enabled', false,
    'message', 'New batch starts next Monday — limited seats!',
    'link_text', 'Enroll now',
    'link_href', '/courses',
    'variant', 'primary'
  )),
  ('floating_video', jsonb_build_object(
    'enabled', true,
    'delay_seconds', 8,
    'title', 'Vyom AI Insights',
    'playlist', jsonb_build_array(
      jsonb_build_object('title','Why STEM matters','subtitle','AI Insights · 30s','src','https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'),
      jsonb_build_object('title','Building first robot','subtitle','Maker Lab · 45s','src','https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'),
      jsonb_build_object('title','AI for students','subtitle','Future Skills · 1m','src','https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4')
    )
  ))
ON CONFLICT (key) DO NOTHING;

-- Storage policies for site-media bucket (bucket is created via storage tool)
CREATE POLICY "site-media public read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-media');

CREATE POLICY "site-media admin insert"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "site-media admin update"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "site-media admin delete"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'));

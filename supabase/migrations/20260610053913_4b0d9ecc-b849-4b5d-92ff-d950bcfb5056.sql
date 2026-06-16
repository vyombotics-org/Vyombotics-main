
-- Storage policies for course thumbnails
CREATE POLICY "Anyone authenticated can view course thumbnails"
ON storage.objects FOR SELECT TO authenticated, anon
USING (bucket_id = 'course-thumbnails');

CREATE POLICY "Admins and instructors can upload course thumbnails"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'course-thumbnails'
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'instructor'))
);

CREATE POLICY "Admins and instructors can update course thumbnails"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'course-thumbnails'
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'instructor'))
);

CREATE POLICY "Admins and instructors can delete course thumbnails"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'course-thumbnails'
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'instructor'))
);

-- Allow anonymous + authenticated to read published courses for public listing
GRANT SELECT ON public.courses TO anon;

CREATE POLICY "Anyone can view published courses"
ON public.courses FOR SELECT
TO anon, authenticated
USING (is_published = true);

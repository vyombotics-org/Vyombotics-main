
-- Policies for lecture-videos bucket
CREATE POLICY "Instructors and admins can upload lecture videos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'lecture-videos' AND (
    public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'instructor')
  )
);

CREATE POLICY "Instructors and admins can read lecture videos"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'lecture-videos' AND (
    public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'instructor')
  )
);

CREATE POLICY "Instructors and admins can delete lecture videos"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'lecture-videos' AND (
    public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'instructor')
  )
);

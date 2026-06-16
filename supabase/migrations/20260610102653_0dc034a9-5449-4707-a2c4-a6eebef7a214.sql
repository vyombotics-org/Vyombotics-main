
-- 1. Tighten enrollments INSERT: force pending status and zero amount
DROP POLICY IF EXISTS "Create own enrollments" ON public.enrollments;
CREATE POLICY "Create own enrollments" ON public.enrollments
  FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND payment_status = 'pending'
    AND COALESCE(amount_paid, 0) = 0
  );

-- 2. Allow enrolled students to read lecture videos from private bucket
CREATE POLICY "Enrolled members can read lecture videos"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'lecture-videos'
    AND EXISTS (
      SELECT 1 FROM public.lectures l
      WHERE l.video_url LIKE '%' || storage.objects.name || '%'
        AND l.batch_id IS NOT NULL
        AND public.is_active_batch_member(l.batch_id, auth.uid())
    )
  );

-- 3. Revoke EXECUTE on internal trigger functions (not meant for API callers)
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, PUBLIC;

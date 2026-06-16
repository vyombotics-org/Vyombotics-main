
CREATE OR REPLACE FUNCTION public.is_active_batch_member(_batch_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.enrollments
    WHERE batch_id = _batch_id
      AND user_id = _user_id
      AND payment_status = 'success'
      AND (expires_at IS NULL OR expires_at > now())
  )
$$;

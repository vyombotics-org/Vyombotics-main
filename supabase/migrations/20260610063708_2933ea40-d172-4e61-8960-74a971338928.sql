
-- DISCUSSIONS
CREATE TABLE public.discussions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lecture_id uuid NOT NULL REFERENCES public.lectures(id) ON DELETE CASCADE,
  batch_id uuid NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES public.discussions(id) ON DELETE CASCADE,
  body text NOT NULL CHECK (length(body) BETWEEN 1 AND 5000),
  is_resolved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_discussions_lecture ON public.discussions(lecture_id, created_at);
CREATE INDEX idx_discussions_parent ON public.discussions(parent_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.discussions TO authenticated;
GRANT ALL ON public.discussions TO service_role;

ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view discussions"
ON public.discussions FOR SELECT TO authenticated
USING (
  public.is_active_batch_member(batch_id, auth.uid())
  OR public.is_batch_owner(batch_id, auth.uid())
  OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Members can post discussions"
ON public.discussions FOR INSERT TO authenticated
WITH CHECK (
  user_id = auth.uid() AND (
    public.is_active_batch_member(batch_id, auth.uid())
    OR public.is_batch_owner(batch_id, auth.uid())
    OR public.has_role(auth.uid(), 'admin')
  )
);

CREATE POLICY "Authors or staff can update"
ON public.discussions FOR UPDATE TO authenticated
USING (
  user_id = auth.uid()
  OR public.is_batch_owner(batch_id, auth.uid())
  OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Authors or staff can delete"
ON public.discussions FOR DELETE TO authenticated
USING (
  user_id = auth.uid()
  OR public.is_batch_owner(batch_id, auth.uid())
  OR public.has_role(auth.uid(), 'admin')
);

CREATE TRIGGER discussions_updated_at BEFORE UPDATE ON public.discussions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- NOTIFICATIONS
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  body text,
  link text,
  is_read boolean NOT NULL DEFAULT false,
  email_sent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_notifications_user ON public.notifications(user_id, created_at DESC);

GRANT SELECT, UPDATE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view their notifications"
ON public.notifications FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users mark own notifications read"
ON public.notifications FOR UPDATE TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

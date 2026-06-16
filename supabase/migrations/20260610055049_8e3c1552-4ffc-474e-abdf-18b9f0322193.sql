
-- 1) Lecture kind enum + columns
DO $$ BEGIN
  CREATE TYPE public.lecture_kind AS ENUM ('live', 'recorded');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE public.lectures
  ADD COLUMN IF NOT EXISTS kind public.lecture_kind NOT NULL DEFAULT 'recorded',
  ADD COLUMN IF NOT EXISTS batch_id uuid REFERENCES public.batches(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS scheduled_at timestamptz,
  ADD COLUMN IF NOT EXISTS duration_min integer DEFAULT 60,
  ADD COLUMN IF NOT EXISTS meeting_url text,
  ADD COLUMN IF NOT EXISTS description text;

-- Make module_id optional now that lectures can hang off a batch directly
ALTER TABLE public.lectures ALTER COLUMN module_id DROP NOT NULL;

CREATE INDEX IF NOT EXISTS lectures_batch_id_idx ON public.lectures(batch_id);
CREATE INDEX IF NOT EXISTS lectures_scheduled_at_idx ON public.lectures(scheduled_at);

-- 2) Helper: is the current user an active member of this batch?
CREATE OR REPLACE FUNCTION public.is_active_batch_member(_batch_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.enrollments
    WHERE batch_id = _batch_id
      AND user_id = _user_id
      AND payment_status = 'paid'
      AND (expires_at IS NULL OR expires_at > now())
  )
$$;

REVOKE EXECUTE ON FUNCTION public.is_active_batch_member(uuid, uuid) FROM public;
GRANT EXECUTE ON FUNCTION public.is_active_batch_member(uuid, uuid) TO authenticated;

-- 3) Helper: is current user the instructor of the course owning this batch?
CREATE OR REPLACE FUNCTION public.is_batch_owner(_batch_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.batches b
    JOIN public.courses c ON c.id = b.course_id
    WHERE b.id = _batch_id AND c.instructor_id = _user_id
  )
$$;

REVOKE EXECUTE ON FUNCTION public.is_batch_owner(uuid, uuid) FROM public;
GRANT EXECUTE ON FUNCTION public.is_batch_owner(uuid, uuid) TO authenticated;

-- 4) Lecture RLS — drop old policies and create batch-aware ones
DO $$ DECLARE p record; BEGIN
  FOR p IN SELECT polname FROM pg_policy WHERE polrelid = 'public.lectures'::regclass LOOP
    EXECUTE format('DROP POLICY %I ON public.lectures', p.polname);
  END LOOP;
END $$;

CREATE POLICY "Batch members and managers can view lectures"
ON public.lectures FOR SELECT TO authenticated
USING (
  is_preview = true
  OR public.has_role(auth.uid(), 'admin')
  OR (batch_id IS NOT NULL AND public.is_batch_owner(batch_id, auth.uid()))
  OR (batch_id IS NOT NULL AND public.is_active_batch_member(batch_id, auth.uid()))
);

CREATE POLICY "Admins and batch owners can insert lectures"
ON public.lectures FOR INSERT TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin')
  OR (batch_id IS NOT NULL AND public.is_batch_owner(batch_id, auth.uid()))
);

CREATE POLICY "Admins and batch owners can update lectures"
ON public.lectures FOR UPDATE TO authenticated
USING (
  public.has_role(auth.uid(), 'admin')
  OR (batch_id IS NOT NULL AND public.is_batch_owner(batch_id, auth.uid()))
);

CREATE POLICY "Admins and batch owners can delete lectures"
ON public.lectures FOR DELETE TO authenticated
USING (
  public.has_role(auth.uid(), 'admin')
  OR (batch_id IS NOT NULL AND public.is_batch_owner(batch_id, auth.uid()))
);

-- 5) Attendance table
DO $$ BEGIN
  CREATE TYPE public.attendance_status AS ENUM ('present', 'partial', 'absent');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lecture_id uuid NOT NULL REFERENCES public.lectures(id) ON DELETE CASCADE,
  batch_id uuid NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  joined_at timestamptz NOT NULL DEFAULT now(),
  watched_seconds integer NOT NULL DEFAULT 0,
  status public.attendance_status NOT NULL DEFAULT 'present',
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, lecture_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.attendance TO authenticated;
GRANT ALL ON public.attendance TO service_role;

ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own attendance"
ON public.attendance FOR SELECT TO authenticated
USING (
  user_id = auth.uid()
  OR public.has_role(auth.uid(), 'admin')
  OR public.is_batch_owner(batch_id, auth.uid())
);

CREATE POLICY "Users can insert their own attendance for their batch"
ON public.attendance FOR INSERT TO authenticated
WITH CHECK (
  user_id = auth.uid()
  AND public.is_active_batch_member(batch_id, auth.uid())
);

CREATE POLICY "Users can update their own attendance"
ON public.attendance FOR UPDATE TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins and batch owners can delete attendance"
ON public.attendance FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.is_batch_owner(batch_id, auth.uid()));

CREATE TRIGGER attendance_set_updated_at
BEFORE UPDATE ON public.attendance
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 6) Allow active batch members (and owners/admins) to read batch info for their enrolled batch
DO $$ DECLARE p record; BEGIN
  FOR p IN SELECT polname FROM pg_policy WHERE polrelid = 'public.batches'::regclass LOOP
    EXECUTE format('DROP POLICY %I ON public.batches', p.polname);
  END LOOP;
END $$;

GRANT SELECT ON public.batches TO anon;

CREATE POLICY "Anyone can view active batches of published courses"
ON public.batches FOR SELECT TO anon, authenticated
USING (
  is_active = true
  AND EXISTS (SELECT 1 FROM public.courses c WHERE c.id = course_id AND c.is_published = true)
);

CREATE POLICY "Admins and instructors can manage batches"
ON public.batches FOR ALL TO authenticated
USING (
  public.has_role(auth.uid(), 'admin')
  OR EXISTS (SELECT 1 FROM public.courses c WHERE c.id = course_id AND c.instructor_id = auth.uid())
)
WITH CHECK (
  public.has_role(auth.uid(), 'admin')
  OR EXISTS (SELECT 1 FROM public.courses c WHERE c.id = course_id AND c.instructor_id = auth.uid())
);

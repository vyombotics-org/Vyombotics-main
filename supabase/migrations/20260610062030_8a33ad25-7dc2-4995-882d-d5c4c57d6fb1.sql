
-- ============ QUIZZES ============
CREATE TABLE public.quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  lecture_id UUID REFERENCES public.lectures(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  pass_percent INTEGER NOT NULL DEFAULT 60 CHECK (pass_percent BETWEEN 0 AND 100),
  time_limit_min INTEGER,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quizzes TO authenticated;
GRANT ALL ON public.quizzes TO service_role;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members can view published quizzes" ON public.quizzes FOR SELECT TO authenticated
  USING (is_published AND public.is_active_batch_member(batch_id, auth.uid()));
CREATE POLICY "Owners/admins manage quizzes" ON public.quizzes FOR ALL TO authenticated
  USING (public.is_batch_owner(batch_id, auth.uid()) OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.is_batch_owner(batch_id, auth.uid()) OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_quizzes_updated_at BEFORE UPDATE ON public.quizzes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  options JSONB NOT NULL,        -- array of {id,text}
  correct_option TEXT NOT NULL,  -- option id
  marks INTEGER NOT NULL DEFAULT 1,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quiz_questions TO authenticated;
GRANT ALL ON public.quiz_questions TO service_role;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
-- Students should NOT see correct_option directly via RLS; we expose via server fn that strips it.
CREATE POLICY "Owners/admins manage questions" ON public.quiz_questions FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.quizzes q WHERE q.id=quiz_id AND (public.is_batch_owner(q.batch_id, auth.uid()) OR public.has_role(auth.uid(),'admin'))))
  WITH CHECK (EXISTS (SELECT 1 FROM public.quizzes q WHERE q.id=quiz_id AND (public.is_batch_owner(q.batch_id, auth.uid()) OR public.has_role(auth.uid(),'admin'))));

CREATE TABLE public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb, -- {question_id: option_id}
  score INTEGER NOT NULL DEFAULT 0,
  max_score INTEGER NOT NULL DEFAULT 0,
  passed BOOLEAN NOT NULL DEFAULT false,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  submitted_at TIMESTAMPTZ
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quiz_attempts TO authenticated;
GRANT ALL ON public.quiz_attempts TO service_role;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own attempts" ON public.quiz_attempts FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.quizzes q WHERE q.id=quiz_id AND (public.is_batch_owner(q.batch_id, auth.uid()) OR public.has_role(auth.uid(),'admin'))));
CREATE POLICY "Users create own attempts" ON public.quiz_attempts FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users update own pending attempts" ON public.quiz_attempts FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- ============ ASSIGNMENTS ============
CREATE TABLE public.assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  max_marks INTEGER NOT NULL DEFAULT 100,
  due_at TIMESTAMPTZ,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.assignments TO authenticated;
GRANT ALL ON public.assignments TO service_role;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members view assignments" ON public.assignments FOR SELECT TO authenticated
  USING (is_published AND public.is_active_batch_member(batch_id, auth.uid()));
CREATE POLICY "Owners/admins manage assignments" ON public.assignments FOR ALL TO authenticated
  USING (public.is_batch_owner(batch_id, auth.uid()) OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.is_batch_owner(batch_id, auth.uid()) OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_assignments_updated_at BEFORE UPDATE ON public.assignments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.assignment_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  text_content TEXT,
  file_url TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  marks_awarded INTEGER,
  feedback TEXT,
  graded_by UUID,
  graded_at TIMESTAMPTZ,
  UNIQUE(assignment_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.assignment_submissions TO authenticated;
GRANT ALL ON public.assignment_submissions TO service_role;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User sees own submission; instructor sees all" ON public.assignment_submissions FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.assignments a WHERE a.id=assignment_id AND (public.is_batch_owner(a.batch_id, auth.uid()) OR public.has_role(auth.uid(),'admin'))));
CREATE POLICY "User creates own submission" ON public.assignment_submissions FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "User updates own ungraded; instructor grades" ON public.assignment_submissions FOR UPDATE TO authenticated
  USING (
    (user_id = auth.uid() AND marks_awarded IS NULL)
    OR EXISTS (SELECT 1 FROM public.assignments a WHERE a.id=assignment_id AND (public.is_batch_owner(a.batch_id, auth.uid()) OR public.has_role(auth.uid(),'admin')))
  )
  WITH CHECK (
    user_id = auth.uid()
    OR EXISTS (SELECT 1 FROM public.assignments a WHERE a.id=assignment_id AND (public.is_batch_owner(a.batch_id, auth.uid()) OR public.has_role(auth.uid(),'admin')))
  );

-- ============ CERTIFICATES ============
CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  serial_no TEXT NOT NULL UNIQUE,        -- public verify code
  issued_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, batch_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.certificates TO authenticated;
GRANT SELECT ON public.certificates TO anon;  -- public verify by serial_no via server fn
GRANT ALL ON public.certificates TO service_role;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own certs; owners/admins see batch" ON public.certificates FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_batch_owner(batch_id, auth.uid()) OR public.has_role(auth.uid(),'admin'));
-- Note: anon read intentionally NOT enabled via policy; verification goes through server fn using supabaseAdmin.

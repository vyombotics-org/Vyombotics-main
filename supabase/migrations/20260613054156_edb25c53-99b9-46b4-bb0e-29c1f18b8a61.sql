DROP POLICY IF EXISTS "User updates own ungraded; instructor grades" ON public.assignment_submissions;

CREATE POLICY "User updates own ungraded; instructor grades"
ON public.assignment_submissions
FOR UPDATE
USING (
  ((user_id = auth.uid()) AND (marks_awarded IS NULL))
  OR (EXISTS (SELECT 1 FROM assignments a
       WHERE a.id = assignment_submissions.assignment_id
         AND (is_batch_owner(a.batch_id, auth.uid()) OR has_role(auth.uid(), 'admin'::app_role))))
)
WITH CHECK (
  (
    user_id = auth.uid()
    AND marks_awarded IS NULL
    AND graded_by IS NULL
    AND graded_at IS NULL
    AND feedback IS NULL
  )
  OR (EXISTS (SELECT 1 FROM assignments a
       WHERE a.id = assignment_submissions.assignment_id
         AND (is_batch_owner(a.batch_id, auth.uid()) OR has_role(auth.uid(), 'admin'::app_role))))
);
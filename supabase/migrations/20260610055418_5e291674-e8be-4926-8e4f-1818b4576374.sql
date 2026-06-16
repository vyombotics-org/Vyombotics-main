
ALTER TABLE public.lectures ADD COLUMN IF NOT EXISTS is_preview boolean NOT NULL DEFAULT false;

-- Allow public read of preview lectures
DROP POLICY IF EXISTS "Preview lectures are public" ON public.lectures;
CREATE POLICY "Preview lectures are public"
ON public.lectures
FOR SELECT
TO anon, authenticated
USING (is_preview = true);

GRANT SELECT ON public.lectures TO anon;

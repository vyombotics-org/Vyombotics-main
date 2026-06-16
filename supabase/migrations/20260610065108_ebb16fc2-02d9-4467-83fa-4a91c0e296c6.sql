
CREATE TABLE public.coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE CHECK (length(code) BETWEEN 3 AND 40),
  description text,
  discount_type text NOT NULL CHECK (discount_type IN ('percent','flat')),
  discount_value numeric NOT NULL CHECK (discount_value > 0),
  max_uses integer,
  used_count integer NOT NULL DEFAULT 0,
  valid_from timestamptz,
  valid_until timestamptz,
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE,
  batch_id uuid REFERENCES public.batches(id) ON DELETE CASCADE,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_coupons_code ON public.coupons(code);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.coupons TO authenticated;
GRANT ALL ON public.coupons TO service_role;

ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can read active coupons"
ON public.coupons FOR SELECT TO authenticated
USING (is_active = true OR public.has_role(auth.uid(),'admin') OR created_by = auth.uid());

CREATE POLICY "Admins and creators manage coupons (insert)"
ON public.coupons FOR INSERT TO authenticated
WITH CHECK (
  public.has_role(auth.uid(),'admin') OR
  public.has_role(auth.uid(),'instructor')
);

CREATE POLICY "Admins and creators manage coupons (update)"
ON public.coupons FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(),'admin') OR created_by = auth.uid());

CREATE POLICY "Admins and creators manage coupons (delete)"
ON public.coupons FOR DELETE TO authenticated
USING (public.has_role(auth.uid(),'admin') OR created_by = auth.uid());

CREATE TRIGGER coupons_updated_at BEFORE UPDATE ON public.coupons
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.coupon_redemptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id uuid NOT NULL REFERENCES public.coupons(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  enrollment_id uuid REFERENCES public.enrollments(id) ON DELETE SET NULL,
  discount_amount numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (coupon_id, user_id)
);

GRANT SELECT ON public.coupon_redemptions TO authenticated;
GRANT ALL ON public.coupon_redemptions TO service_role;

ALTER TABLE public.coupon_redemptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see their redemptions"
ON public.coupon_redemptions FOR SELECT TO authenticated
USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

-- Add level + sort_order to courses if not present (for filter improvements)
-- level already exists
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS short_tagline text;

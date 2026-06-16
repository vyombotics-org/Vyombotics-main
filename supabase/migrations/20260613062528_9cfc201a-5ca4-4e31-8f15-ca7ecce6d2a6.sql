
CREATE TABLE public.shop_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  compare_at_price NUMERIC(10,2),
  currency TEXT NOT NULL DEFAULT 'INR',
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'merch',
  stock INTEGER NOT NULL DEFAULT 0,
  badge TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.shop_products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.shop_products TO authenticated;
GRANT ALL ON public.shop_products TO service_role;

ALTER TABLE public.shop_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active products"
  ON public.shop_products FOR SELECT
  USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage products"
  ON public.shop_products FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER shop_products_updated_at
  BEFORE UPDATE ON public.shop_products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX shop_products_active_sort_idx ON public.shop_products (is_active, sort_order, created_at DESC);
CREATE INDEX shop_products_category_idx ON public.shop_products (category);

INSERT INTO public.shop_products (name, slug, description, price, compare_at_price, image_url, category, stock, badge, sort_order) VALUES
('Vyombotics Starter Robotics Kit', 'starter-robotics-kit', 'Beginner-friendly robotics kit with sensors, motors, and a microcontroller. Perfect for ages 10+.', 2499, 2999, 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', 'robotics', 25, 'Bestseller', 1),
('Advanced Drone Building Kit', 'advanced-drone-kit', 'Build your own quadcopter from scratch. Includes flight controller, ESCs, and propellers.', 5999, 6999, 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80', 'robotics', 12, 'New', 2),
('Vyombotics Logo T-Shirt', 'logo-tshirt', '100% cotton premium t-shirt with the Vyombotics logo. Unisex fit.', 599, 799, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', 'apparel', 80, NULL, 3),
('Astronaut Water Bottle', 'astronaut-bottle', 'Insulated stainless-steel bottle, 750ml, space-themed.', 449, 599, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80', 'merch', 60, NULL, 4),
('STEM Explorer Backpack', 'stem-backpack', 'Durable laptop backpack with dedicated kit pockets.', 1299, 1599, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', 'merch', 35, NULL, 5),
('Arduino IoT Sensor Pack', 'iot-sensor-pack', '15+ sensors compatible with Arduino & ESP32. Build IoT projects fast.', 1899, 2199, 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80', 'robotics', 40, NULL, 6);

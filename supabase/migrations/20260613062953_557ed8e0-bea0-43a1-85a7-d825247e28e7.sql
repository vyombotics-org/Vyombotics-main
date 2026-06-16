
ALTER TABLE public.shop_products ADD COLUMN IF NOT EXISTS buy_url TEXT;
UPDATE public.shop_products SET buy_url = 'https://rzp.io/l/vyombotics-demo' WHERE buy_url IS NULL;

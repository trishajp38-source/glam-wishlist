-- Create fashion_wishlist table
CREATE TABLE public.fashion_wishlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  item_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Dress', 'Shoes', 'Accessories', 'Other')),
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.fashion_wishlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view all fashion items (public wishlist)
CREATE POLICY "Allow public read access"
  ON public.fashion_wishlist
  FOR SELECT
  USING (true);

-- Create policy to allow anyone to insert fashion items (public wishlist)
CREATE POLICY "Allow public insert access"
  ON public.fashion_wishlist
  FOR INSERT
  WITH CHECK (true);

-- Create index on created_at for faster queries when fetching latest item
CREATE INDEX idx_fashion_wishlist_created_at ON public.fashion_wishlist (created_at DESC);
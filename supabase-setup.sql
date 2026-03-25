-- ============================================================
-- 1. Products table
-- ============================================================
create table products (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  price       text,
  contact     text,
  link        text,
  images      text[],
  sold        boolean default false,
  created_at  timestamp with time zone default now(),
  position    integer
);

-- ============================================================
-- 2. Row Level Security
-- ============================================================
alter table products enable row level security;

create policy "Public can view products"
  on products for select
  using (true);

create policy "Authenticated users can insert products"
  on products for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update products"
  on products for update
  to authenticated
  using (true);

create policy "Authenticated users can delete products"
  on products for delete
  to authenticated
  using (true);

-- ============================================================
-- 3. Storage policies
-- Run these AFTER creating the "product-images" bucket manually
-- in Supabase → Storage → New bucket (set to Public)
-- ============================================================
create policy "Public can view product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Authenticated users can upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "Authenticated users can delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');

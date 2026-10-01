-- Run this in Supabase Dashboard -> SQL Editor
-- Adds image support to About Us and Facilities, so admin can upload photos
-- for them the same way Gallery already works.

-- New columns to hold the uploaded image URL
alter table about_content add column if not exists image_url text;
alter table facilities add column if not exists image_url text;

-- Storage bucket to hold these uploads (separate from the "gallery" bucket)
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

-- Public can view the images; only logged-in admin can upload/delete
create policy "Public can view site images"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'site-images');

create policy "Admin can upload site images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'site-images');

create policy "Admin can delete site images"
on storage.objects for delete
to authenticated
using (bucket_id = 'site-images');

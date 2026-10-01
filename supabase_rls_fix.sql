-- Run this in Supabase Dashboard -> SQL Editor
-- Fixes: (1) contact form can't submit enquiries, (2) fees table editable by anyone without admin login

-- ENQUIRIES: public (website visitors) can submit, only logged-in admin can view/delete
alter table enquiries enable row level security;

create policy "Public can submit enquiries"
on enquiries for insert
to anon
with check (true);

create policy "Admin can view enquiries"
on enquiries for select
to authenticated
using (true);

create policy "Admin can delete enquiries"
on enquiries for delete
to authenticated
using (true);

-- FEES: everyone can read (for the website), only logged-in admin can change
alter table fees enable row level security;

create policy "Public can view fees"
on fees for select
to anon, authenticated
using (true);

create policy "Admin can update fees"
on fees for update
to authenticated
using (true)
with check (true);

create policy "Admin can insert fees"
on fees for insert
to authenticated
with check (true);

create policy "Admin can delete fees"
on fees for delete
to authenticated
using (true);

-- GALLERY (table): everyone can read, only admin can add/remove
alter table gallery enable row level security;

create policy "Public can view gallery rows"
on gallery for select
to anon, authenticated
using (true);

create policy "Admin can insert gallery rows"
on gallery for insert
to authenticated
with check (true);

create policy "Admin can delete gallery rows"
on gallery for delete
to authenticated
using (true);

-- GALLERY (storage bucket): everyone can view images, only admin can upload/delete
create policy "Public can view gallery images"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'gallery');

create policy "Admin can upload gallery images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'gallery');

create policy "Admin can delete gallery images"
on storage.objects for delete
to authenticated
using (bucket_id = 'gallery');

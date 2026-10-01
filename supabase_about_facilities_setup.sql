-- Run this in Supabase Dashboard -> SQL Editor
-- Creates the about_content and facilities tables used by the About Us and
-- Facilities sections, seeds them with the current website copy, and sets up
-- RLS so everyone can read them but only logged-in admin can change them.

-- ABOUT CONTENT (single row)
create table if not exists about_content (
  id text primary key,
  heading text not null,
  description text not null,
  bullet_1 text,
  bullet_2 text,
  bullet_3 text
);

insert into about_content (id, heading, description, bullet_1, bullet_2, bullet_3)
values (
  'main',
  'A place where children grow with joy, curiosity & confidence',
  'Dev Public School has been shaping bright futures since 1998. With experienced educators, modern classrooms, and a balanced focus on academics, sports, and the arts, we help every child discover their true potential in a safe and caring environment.',
  'Experienced & caring faculty',
  'Smart classrooms & digital learning',
  'Sports, arts & extracurricular activities'
)
on conflict (id) do nothing;

alter table about_content enable row level security;

create policy "Public can view about content"
on about_content for select
to anon, authenticated
using (true);

create policy "Admin can update about content"
on about_content for update
to authenticated
using (true)
with check (true);

-- FACILITIES (list)
create table if not exists facilities (
  id uuid primary key default gen_random_uuid(),
  icon text not null,
  title text not null,
  sort_order int not null default 0
);

insert into facilities (icon, title, sort_order) values
('🏛️', 'Smart Library', 1),
('🔬', 'Science Labs', 2),
('💻', 'Computer Lab', 3),
('⚽', 'Sports Ground', 4),
('🎭', 'Auditorium', 5),
('🚌', 'Transport Facility', 6)
on conflict do nothing;

alter table facilities enable row level security;

create policy "Public can view facilities"
on facilities for select
to anon, authenticated
using (true);

create policy "Admin can insert facilities"
on facilities for insert
to authenticated
with check (true);

create policy "Admin can update facilities"
on facilities for update
to authenticated
using (true)
with check (true);

create policy "Admin can delete facilities"
on facilities for delete
to authenticated
using (true);

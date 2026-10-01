-- Run this in Supabase Dashboard -> SQL Editor
-- Adds a "student_name" field to enquiries, used by the contact form and admin Enquiries tab.

alter table enquiries add column if not exists student_name text;

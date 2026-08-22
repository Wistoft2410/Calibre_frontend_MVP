-- Calibre: partner venues for the meetup map.
-- Seeded from "Small experience businesses in Copenhagen" (first table).
-- Run in the Supabase Dashboard -> SQL Editor -> New query -> paste -> Run.
-- Safe to re-run: it re-seeds the partner rows from scratch.

-- ============================================================
-- 1. Table
-- ============================================================
create table if not exists public.venues (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    address text,
    latitude double precision,
    longitude double precision,
    category text,
    interests text[] not null default '{}',
    -- 0 = free entry, 1-3 = $ tiers, null = not researched yet
    price smallint,
    -- Mirrors the status dictionary in the source document:
    -- not_contacted (red), interview_agreed (yellow), in_progress (green), committed (check)
    partner_status text not null default 'not_contacted',
    is_seed boolean not null default false,
    created_at timestamptz not null default now()
);

alter table public.venues enable row level security;

-- ============================================================
-- 2. Row Level Security
-- Read-only for the app; partners are managed from the dashboard.
-- ============================================================
drop policy if exists "venues are readable" on public.venues;
create policy "venues are readable"
    on public.venues for select
    to anon, authenticated
    using (true);

-- ============================================================
-- 3. Seed the partner list (re-runnable)
-- ============================================================
delete from public.venues where is_seed = true;

-- is_seed = true marks these as coming from the source document. Partners added
-- later (dashboard, or your own inserts) default to false and are never touched
-- by a re-run of this script.
insert into public.venues (name, address, latitude, longitude, category, interests, price, partner_status, is_seed) values
    ('Brændt', 'Gentoftegade 56, 2820 Gentofte, Denmark', 55.7468601, 12.5408761, 'Art Center', array['Painting', 'DIY'], null, 'not_contacted', true),
    ('Bastard Cafe', 'Rådhusstræde 13, 1466 København, Denmark', 55.6764665, 12.5747686, 'Cafe', array['Board Games', 'Coffee'], null, 'not_contacted', true),
    ('Limitless Virtual Reality', 'Nørregade 36, 1165 København, Denmark', 55.6820658, 12.5711875, 'Amusement center', array['Gaming', 'Tech'], null, 'not_contacted', true),
    ('Copenhagen Contemporary', 'Refshalevej 173A, 1432 København, Denmark', 55.6929583, 12.6133485, 'Art Center', array['Painting', 'Photography'], null, 'not_contacted', true),
    ('Christiania Art Gallery', 'Fabriksområdet 94A, 1440 København, Denmark', 55.67341889999999, 12.6023084, 'Art Gallery', array['Painting'], null, 'not_contacted', true),
    ('Art Escape Studios & Cafe', 'Blegdamsvej 68, 2100 København, Denmark', 55.6948067, 12.5690726, 'Art Cafe', array['Painting', 'Coffee'], null, 'not_contacted', true),
    -- Source table lists "Cycling"; corrected to Jazz — it's a live music bar.
    ('Blågård''s Pharmacy', 'Blågårds Pl. 2, 2200 København, Denmark', 55.68647490000001, 12.5579095, 'Live Music Bar', array['Coffee', 'Jazz'], null, 'not_contacted', true),
    ('Escape Copenhagen', 'Nørre Farimagsgade 7, 1364 København, Denmark', 55.6805293, 12.5645641, 'Amusement center', array['Board Games'], null, 'not_contacted', true),
    ('Copenhagen Cablepark', 'Kraftværksvej 24, 2300 København, Denmark', 55.6808315, 12.6205469, 'Amusement center', array['Watersports'], null, 'not_contacted', true),
    ('Bip Bip Bar', 'Fælledvej 7, 2200 København, Denmark', 55.6889198, 12.5596987, 'Bar', array['Gaming', 'Tech'], null, 'not_contacted', true),
    ('Books And Company', 'Sofievej 1, 2900 Hellerup, Denmark', 55.7327185, 12.575055, 'Book store', array['Reading', 'Coffee'], 0, 'interview_agreed', true),
    ('Airtrix Klatre & Trampolinpark', 'Kattegatvej 4, 2150 København, Denmark', 55.71697229999999, 12.6071812, 'Sports complex', array['Gymnastics'], null, 'not_contacted', true),
    ('Svanemøllehallen', 'Østerbrogade 240, 2100 København, Denmark', 55.7138378, 12.5787902, 'Sports complex', '{}', null, 'not_contacted', true),
    ('Københavns Trampolinklub', 'Hvidkildevej 64, 2400 København, Denmark', 55.70064310000001, 12.5154866, 'Sports club', array['Gymnastics'], null, 'not_contacted', true),
    ('Paludan Bogcafe', 'Fiolstræde 10, 1171 København, Denmark', 55.6803434, 12.5732666, 'Cafe', array['Reading', 'Coffee'], null, 'not_contacted', true),
    ('Woolstock', 'Jagtvej 183, 2100 København, Denmark', 55.7071935, 12.5661844, 'Yarn shop & cafe', array['DIY', 'Coffee'], 3, 'not_contacted', true),
    ('Mayhem', 'Ragnhildgade 1, 2100 København, Denmark', 55.7076399, 12.5535437, 'Art venue', array['Painting'], null, 'not_contacted', true),
    ('Smykbar', null, null, null, null, array['Coffee', 'DIY'], null, 'not_contacted', true),
    ('Creative Space', null, null, null, null, array['Coffee', 'DIY'], null, 'not_contacted', true),
    ('Sort Kaffe & Vinyl', null, null, null, null, array['Coffee', 'Music'], null, 'not_contacted', true);

-- Sanity check: 20 partners, 17 with coordinates (3 have no address in the source).
select name, category, interests, partner_status,
       (latitude is not null) as mappable
from public.venues
order by mappable desc, name;

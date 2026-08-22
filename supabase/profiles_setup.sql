-- Calibre: profiles table, auto-create trigger, and fake seed profiles.
-- Run this in the Supabase Dashboard -> SQL Editor -> New query -> paste -> Run.
-- Safe to re-run: it drops and recreates its own objects, and re-seeds the
-- fake profiles from scratch (real user profiles are never deleted).

-- ============================================================
-- 1. Table
-- ============================================================
create table if not exists public.profiles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid unique references auth.users (id) on delete cascade,
    email text,
    first_name text,
    last_name text,
    bday date,
    gender text,
    phone text,
    city text,
    city_lat double precision,
    city_lng double precision,
    country text,
    language text,
    description text,
    profile_image_url text,
    interests text[] default '{}',
    is_fake boolean not null default false,
    created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- ============================================================
-- 2. Row Level Security
-- NOTE (MVP): read access includes anon so the app works before the
-- session wiring is complete everywhere. Tighten to `to authenticated`
-- before launch.
-- ============================================================
drop policy if exists "profiles are readable" on public.profiles;
create policy "profiles are readable"
    on public.profiles for select
    to anon, authenticated
    using (true);

drop policy if exists "users can insert own profile" on public.profiles;
create policy "users can insert own profile"
    on public.profiles for insert
    to authenticated
    with check (auth.uid() = user_id);

drop policy if exists "users can update own profile" on public.profiles;
create policy "users can update own profile"
    on public.profiles for update
    to authenticated
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- ============================================================
-- 3. Auto-create a profile row when a user signs up.
-- Pulls the fields App.js stashes in user_metadata during signUp().
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.profiles (
        user_id, email, first_name, last_name, bday, city, city_lat, city_lng,
        country, language, interests
    )
    values (
        new.id,
        new.email,
        new.raw_user_meta_data ->> 'firstname',
        new.raw_user_meta_data ->> 'lastname',
        case
            when new.raw_user_meta_data ->> 'bday' ~ '^\d{4}-\d{2}-\d{2}'
            then (new.raw_user_meta_data ->> 'bday')::date
            else null
        end,
        new.raw_user_meta_data ->> 'city',
        nullif(new.raw_user_meta_data ->> 'cityLat', '')::double precision,
        nullif(new.raw_user_meta_data ->> 'cityLng', '')::double precision,
        new.raw_user_meta_data ->> 'country',
        new.raw_user_meta_data ->> 'language',
        coalesce(
            (select array_agg(value) from jsonb_array_elements_text(
                case when jsonb_typeof(new.raw_user_meta_data -> 'interests') = 'array'
                     then new.raw_user_meta_data -> 'interests'
                     else '[]'::jsonb end
            )),
            '{}'
        )
    )
    on conflict (user_id) do nothing;
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

-- ============================================================
-- 4. Backfill profiles for users who signed up before this trigger existed.
-- ============================================================
insert into public.profiles (user_id, email, first_name, last_name, bday, city, city_lat, city_lng, country, language, interests)
select
    u.id,
    u.email,
    u.raw_user_meta_data ->> 'firstname',
    u.raw_user_meta_data ->> 'lastname',
    case
        when u.raw_user_meta_data ->> 'bday' ~ '^\d{4}-\d{2}-\d{2}'
        then (u.raw_user_meta_data ->> 'bday')::date
        else null
    end,
    u.raw_user_meta_data ->> 'city',
    nullif(u.raw_user_meta_data ->> 'cityLat', '')::double precision,
    nullif(u.raw_user_meta_data ->> 'cityLng', '')::double precision,
    u.raw_user_meta_data ->> 'country',
    u.raw_user_meta_data ->> 'language',
    coalesce(
        (select array_agg(value) from jsonb_array_elements_text(
            case when jsonb_typeof(u.raw_user_meta_data -> 'interests') = 'array'
                 then u.raw_user_meta_data -> 'interests'
                 else '[]'::jsonb end
        )),
        '{}'
    )
from auth.users u
where not exists (select 1 from public.profiles p where p.user_id = u.id);

-- ============================================================
-- 5. Seed fake profiles (Discover People content).
-- Interests must match names in utils/passions.js.
-- Re-runnable: clears previous fakes first.
-- ============================================================
delete from public.profiles where is_fake = true;

insert into public.profiles
    (first_name, last_name, bday, gender, city, city_lat, city_lng, country, language, description, profile_image_url, interests, is_fake)
values
    ('Freja', 'Nielsen', '2001-04-12', 'Female', 'Copenhagen', 55.6761, 12.5683, 'Denmark', 'dansk',
     'Coffee-fueled art student who never says no to a gallery night.',
     'https://i.pravatar.cc/400?img=47', array['Painting','Coffee','Photography'], true),
    ('Mikkel', 'Jensen', '1998-09-03', 'Male', 'Aarhus', 56.1629, 10.2039, 'Denmark', 'dansk',
     'Weekend footballer, weekday developer. Always up for a kickabout.',
     'https://i.pravatar.cc/400?img=12', array['Soccer','Coding','Gaming'], true),
    ('Sofie', 'Hansen', '2000-01-27', 'Female', 'Frederiksberg', 55.6786, 12.5316, 'Denmark', 'dansk',
     'Bookworm with a yoga mat. Ask me about my current read.',
     'https://i.pravatar.cc/400?img=32', array['Reading','Yoga','Nature'], true),
    ('Emil', 'Pedersen', '1997-06-18', 'Male', 'Copenhagen', 55.6761, 12.5683, 'Denmark', 'dansk',
     'Basketball, beats, and bad cooking experiments.',
     'https://i.pravatar.cc/400?img=59', array['Basket','Music','Cooking'], true),
    ('Ida', 'Andersen', '2002-11-08', 'Female', 'Gentofte', 55.7484, 12.5486, 'Denmark', 'dansk',
     'Documenting the world one photo at a time.',
     'https://i.pravatar.cc/400?img=44', array['Photography','Travel','Hiking'], true),
    ('Oliver', 'Larsen', '1999-03-22', 'Male', 'Lyngby', 55.7704, 12.5038, 'Denmark', 'dansk',
     'Film nights, game nights, any nights really.',
     'https://i.pravatar.cc/400?img=68', array['Movies','Gaming','Fitness'], true),
    ('Clara', 'Christensen', '2001-08-30', 'Female', 'Copenhagen', 55.6761, 12.5683, 'Denmark', 'dansk',
     'Dancer at heart, singer in the shower.',
     'https://i.pravatar.cc/400?img=25', array['Dancing','Singing','Music'], true),
    ('Noah', 'Rasmussen', '1998-12-14', 'Male', 'Hellerup', 55.7326, 12.5716, 'Denmark', 'dansk',
     'Ski season is the best season. Fight me.',
     'https://i.pravatar.cc/400?img=15', array['Skiing','Fitness','Travel'], true);

-- Sanity check: should list the 8 fake profiles + one row per real user.
select first_name, last_name, city, is_fake, user_id is not null as has_account
from public.profiles
order by is_fake, created_at;

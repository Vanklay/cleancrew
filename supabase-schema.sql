-- ============================================================
-- CleanCrew booking schema (Supabase / Postgres)
-- ============================================================

-- Availability slots the crew opens for booking
create table if not exists public.slots (
  id          uuid primary key default gen_random_uuid(),
  slot_date   date    not null,
  start_time  time    not null,
  end_time    time    not null,
  service     text    not null check (service in ('clearance','windows','entrances','any')),
  capacity    int     not null default 1,
  is_open     boolean not null default true,
  created_at  timestamptz default now(),
  unique (slot_date, start_time, service)
);

-- Booking requests submitted from the site
create table if not exists public.bookings (
  id          uuid primary key default gen_random_uuid(),
  slot_id     uuid references public.slots(id) on delete set null,
  service     text not null check (service in ('clearance','windows','entrances')),
  req_date    date not null,
  name        text not null,
  email       text not null,
  phone       text,
  message     text,
  lang        text not null default 'fr',
  status      text not null default 'pending' check (status in ('pending','confirmed','declined','done')),
  created_at  timestamptz default now()
);

create index if not exists bookings_status_idx on public.bookings(status);
create index if not exists slots_date_idx on public.slots(slot_date) where is_open;

-- Remaining capacity per slot (open future slots only)
create or replace view public.available_slots as
select s.id, s.slot_date, s.start_time, s.end_time, s.service, s.capacity,
       s.capacity - coalesce(count(b.id) filter (where b.status in ('pending','confirmed')),0) as remaining
from public.slots s
left join public.bookings b on b.slot_id = s.id
where s.is_open and s.slot_date >= current_date
group by s.id
having s.capacity - coalesce(count(b.id) filter (where b.status in ('pending','confirmed')),0) > 0;

-- RLS
alter table public.slots    enable row level security;
alter table public.bookings enable row level security;

-- Public can read open slots
create policy "public reads open slots" on public.slots
  for select using (is_open = true and slot_date >= current_date);

-- Public (anon) can create a booking request, nothing else
create policy "public inserts bookings" on public.bookings
  for insert with check (true);

-- No public read/update/delete on bookings — handled by service role / admin only

-- RallyCut Supabase Schema
-- Run this in Supabase SQL Editor

-- Users table (extends Supabase auth)
create table if not exists public.users (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text default 'inactive', -- active, inactive, trial
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Videos table
create table if not exists public.videos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  file_name text not null,
  file_size bigint not null,
  storage_path text not null,
  status text default 'uploaded', -- uploaded, processing, ready, error
  youtube_url text,
  download_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Rallies table (detected segments)
create table if not exists public.rallies (
  id uuid default gen_random_uuid() primary key,
  video_id uuid references public.videos(id) on delete cascade not null,
  start_time float not null, -- seconds
  end_time float not null,   -- seconds
  confidence float,          -- ML confidence score
  approved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Processing jobs table
create table if not exists public.processing_jobs (
  id uuid default gen_random_uuid() primary key,
  video_id uuid references public.videos(id) on delete cascade not null,
  status text default 'queued', -- queued, processing, completed, failed
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  error_message text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security
alter table public.users enable row level security;
alter table public.videos enable row level security;
alter table public.rallies enable row level security;
alter table public.processing_jobs enable row level security;

-- RLS Policies for users
create policy "Users can view own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

-- RLS Policies for videos
create policy "Users can view own videos"
  on public.videos for select
  using (auth.uid() = user_id);

create policy "Users can insert own videos"
  on public.videos for insert
  with check (auth.uid() = user_id);

create policy "Users can update own videos"
  on public.videos for update
  using (auth.uid() = user_id);

create policy "Users can delete own videos"
  on public.videos for delete
  using (auth.uid() = user_id);

-- RLS Policies for rallies
create policy "Users can view rallies for their videos"
  on public.rallies for select
  using (
    video_id in (
      select id from public.videos where user_id = auth.uid()
    )
  );

create policy "Admin can update rallies"
  on public.rallies for update
  using (true); -- Restrict to admin in app logic

-- RLS Policies for processing jobs
create policy "Users can view jobs for their videos"
  on public.processing_jobs for select
  using (
    video_id in (
      select id from public.videos where user_id = auth.uid()
    )
  );

-- Storage bucket for videos
insert into storage.buckets (id, name, public)
values ('videos', 'videos', false)
on conflict (id) do nothing;

-- Storage policy: Users can upload to their own folder
create policy "Users can upload videos"
  on storage.objects for insert
  with check (
    bucket_id = 'videos' and
    (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can view own videos"
  on storage.objects for select
  using (
    bucket_id = 'videos' and
    (storage.foldername(name))[1] = auth.uid()::text
  );

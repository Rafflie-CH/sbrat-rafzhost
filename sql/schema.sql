create table users (
  id text primary key,
  username text unique,
  password text,
  verified boolean default false,
  role text default 'user',
  followers int default 0
);

create table stickers (
  id bigint generated always as identity primary key,
  slug text unique,
  url text,
  owner text,
  is_public boolean default false,
  likes int default 0,
  downloads int default 0,
  comments int default 0,
  views int default 0,
  created_at timestamp default now()
);

create table comments (
  id text primary key,
  slug text,
  user text,
  text text,
  created_at timestamp default now()
);

create table follows (
  id bigint generated always as identity primary key,
  follower text,
  following text
);

create table notifications (
  id bigint generated always as identity primary key,
  user text,
  text text,
  created_at timestamp default now()
);

create table rooms (
  id text primary key,
  members text[]
);

create table messages (
  id bigint generated always as identity primary key,
  room text,
  sender text,
  text text,
  created_at timestamp default now()
);
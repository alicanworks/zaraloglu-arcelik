-- Zaraloğlu Arçelik — admin panel şeması (kampanyalar, ürünleri, blog, banner)
-- Supabase SQL Editor'de (Dashboard > SQL Editor) çalıştırın.
-- Mevcut `src/data/campaigns.ts` / `src/data/banners.ts` modelleriyle birebir eşleşir;
-- ileride veri katmanı buraya bağlanınca component'lerde değişiklik gerekmez.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- campaigns
-- ---------------------------------------------------------------------
create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null check (
    category in ('Beyaz Eşya', 'Klima', 'Televizyon', 'Küçük Ev Aletleri', 'Ankastre')
  ),
  description text not null,           -- kartlarda görünen kısa açıklama
  long_description text,                -- (artık kullanılmıyor ama ileride lazım olursa)
  image text not null,                  -- kart/liste görseli (storage path veya tam URL)
  hero_image text,                      -- yedek/gelecekte kullanım için
  benefit text not null,                -- örn. "Ücretsiz standart montaj + 12 taksit"
  tag text,
  start_date date not null,
  end_date date not null,
  featured boolean not null default false,
  price numeric,
  old_price numeric,
  terms text[] not null default '{}',
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists campaigns_category_idx on public.campaigns (category);
create index if not exists campaigns_published_idx on public.campaigns (published);

-- ---------------------------------------------------------------------
-- campaign_products — bir kampanyaya bağlı, o kampanyaya özel ürünler
-- ---------------------------------------------------------------------
create table if not exists public.campaign_products (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns (id) on delete cascade,
  name text not null,
  image text,
  description text,
  old_price numeric,
  campaign_price numeric,
  highlights text[] not null default '{}',
  sort_order int not null default 0
);

create index if not exists campaign_products_campaign_id_idx
  on public.campaign_products (campaign_id);

-- ---------------------------------------------------------------------
-- banners — anasayfa hero afişleri (opsiyonel, admin'den yönetilebilir)
-- ---------------------------------------------------------------------
create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  image text not null,
  alt text not null default '',
  href text,
  heading text,
  description text,
  cta_label text,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- blog_posts
-- ---------------------------------------------------------------------
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,                 -- markdown
  cover_image text,
  author text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_published_idx on public.blog_posts (published, published_at desc);

-- ---------------------------------------------------------------------
-- updated_at otomatik güncelleme
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_updated_at on public.campaigns;
create trigger set_updated_at before update on public.campaigns
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.blog_posts;
create trigger set_updated_at before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- Row Level Security
-- Herkes yayınlanmış içeriği okuyabilir; yazma sadece giriş yapmış
-- (admin panele Supabase Auth ile giriş yapan) kullanıcıya açık.
-- Tek-admin bir mağaza sitesi için "authenticated = admin" yeterli;
-- daha ileride rol bazlı kısıtlama eklenebilir.
-- ---------------------------------------------------------------------
alter table public.campaigns enable row level security;
alter table public.campaign_products enable row level security;
alter table public.banners enable row level security;
alter table public.blog_posts enable row level security;

create policy "campaigns_public_read" on public.campaigns
  for select using (published = true);
create policy "campaigns_admin_write" on public.campaigns
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

create policy "campaign_products_public_read" on public.campaign_products
  for select using (
    exists (
      select 1 from public.campaigns c
      where c.id = campaign_id and c.published = true
    )
  );
create policy "campaign_products_admin_write" on public.campaign_products
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

create policy "banners_public_read" on public.banners
  for select using (active = true);
create policy "banners_admin_write" on public.banners
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

create policy "blog_posts_public_read" on public.blog_posts
  for select using (published = true);
create policy "blog_posts_admin_write" on public.blog_posts
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

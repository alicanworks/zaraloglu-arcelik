-- Kampanyalara admin panelden sürükle-bırak sıralama eklemek için.
-- Supabase SQL Editor'de bir kez çalıştırın.

alter table public.campaigns
  add column if not exists sort_order int not null default 0;

create index if not exists campaigns_sort_order_idx
  on public.campaigns (sort_order);

-- Mevcut kampanyalara, başlangıç tarihine göre baştan bir sıra numarası ver
-- (yeni sütun herkes için 0 olduğundan, ilk açılışta liste karışık
-- görünmesin diye).
with ranked as (
  select id, row_number() over (order by start_date desc) - 1 as rn
  from public.campaigns
)
update public.campaigns c
set sort_order = ranked.rn
from ranked
where c.id = ranked.id;

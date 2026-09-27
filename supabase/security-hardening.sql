-- Zaraloğlu Arçelik — ek güvenlik sıkılaştırması
-- Supabase SQL Editor'de bir kez çalıştırın (schema.sql'den sonra).
-- Mevcut tabloları/politikaları BOZMAZ, yalnızca `media` storage bucket'ına
-- yüklenebilecek dosya türünü ve boyutunu sunucu tarafında da sınırlar
-- (uygulama tarafında zaten aynı kontroller var — bu, ikinci savunma
-- katmanı: birisi admin oturumuyla API'yi doğrudan çağırsa bile devrede
-- kalır).

-- Sadece resim MIME tipleri yüklenebilsin.
update storage.buckets
set allowed_mime_types = array[
  'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'
]
where id = 'media';

-- Tek dosya için üst sınır: 8 MB.
update storage.buckets
set file_size_limit = 8388608
where id = 'media';

-- Not: `allowed_mime_types` / `file_size_limit` Supabase Storage
-- tarafından bucket seviyesinde uygulanır; eski projelerde bu kolonlar
-- yoksa (Supabase panelini güncelleyin) hata alırsanız Dashboard >
-- Storage > media > Edit bucket ekranından aynı ayarları elle girebilirsiniz.

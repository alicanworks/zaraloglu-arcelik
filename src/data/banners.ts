/**
 * Hero banner content.
 *
 * Each entry is a full-bleed photograph. Text/CTA are optional — if the
 * artwork already has text baked in (Arçelik style), leave them out and the
 * banner renders as pure image. If provided, `heading`/`description`/`cta`
 * render as a text overlay on top of the photo.
 *
 * With a single entry the hero is a static banner (no dots/arrows). Add more
 * entries to turn it back into a slider.
 *
 * Recommended size: ~1920×1080 (16:9), yüksek çözünürlük, JPG/WebP.
 * `href` opsiyoneldir; verilirse afişin tamamı o adrese link olur.
 */
export interface Banner {
  id: string;
  image: string;
  /** Görme engelliler ve SEO için kısa açıklama (ekranda görünmez). */
  alt: string;
  href?: string;
  /** Verilirse fotoğrafın üzerine yazı katmanı eklenir. */
  heading?: string;
  description?: string;
  ctaLabel?: string;
}

export const banners: Banner[] = [
  {
    id: "mutfak-buzdolabi",
    image: "/images/banners/mutfak-buzdolabi.webp",
    alt: "Modern mutfakta Arçelik buzdolabı",
    href: "/kampanyalar",
    heading: "Eviniz İçin Doğru Adres: Arçelik Güvencesi",
    description:
      "Yetkili Arçelik bayisi olarak, evinizin ihtiyaç duyduğu her üründe güvenilir hizmet ve mağazamıza özel fiyatlar sunuyoruz.",
    ctaLabel: "Kampanyaları İncele",
  },
];

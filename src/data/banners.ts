/**
 * Hero banner type definition.
 *
 * Actual banner content lives in Supabase (see `src/lib/public/banners.ts`
 * for the public read path and `src/lib/admin/banners.ts` for admin CRUD).
 *
 * Each entry is a full-bleed photograph. Text/CTA are optional — if the
 * artwork already has text baked in, leave them out and the banner renders
 * as pure image. If provided, `heading`/`description`/`ctaLabel` render as a
 * text overlay on top of the photo.
 *
 * With a single active banner the hero is a static banner (no dots/arrows).
 * More than one active banner turns it back into a slider.
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

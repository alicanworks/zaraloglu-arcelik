import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Banner } from "@/data/banners";

export async function getPublicBanners(): Promise<Banner[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    image: row.image,
    alt: row.alt,
    href: row.href ?? undefined,
    heading: row.heading ?? undefined,
    description: row.description ?? undefined,
    ctaLabel: row.cta_label ?? undefined,
  }));
}

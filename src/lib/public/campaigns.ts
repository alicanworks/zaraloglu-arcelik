import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Campaign } from "@/data/campaigns";

export async function getPublicCampaigns(): Promise<Campaign[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category as Campaign["category"],
    description: row.description,
    longDescription: row.long_description ?? "",
    image: row.image,
    heroImage: row.hero_image ?? row.image,
    benefit: row.benefit,
    tag: row.tag ?? "",
    startDate: row.start_date,
    endDate: row.end_date,
    featured: row.featured,
    price: row.price ?? undefined,
    oldPrice: row.old_price ?? undefined,
    terms: row.terms ?? [],
    products: [],
  }));
}

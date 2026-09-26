import "server-only";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

export type CampaignRow = Database["public"]["Tables"]["campaigns"]["Row"];
export type CampaignProductRow =
  Database["public"]["Tables"]["campaign_products"]["Row"];

export interface CampaignWithProducts extends CampaignRow {
  campaign_products: CampaignProductRow[];
}

export async function listCampaigns() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .order("start_date", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getCampaign(id: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("campaigns")
    .select("*, campaign_products(*)")
    .eq("id", id)
    .order("sort_order", {
      foreignTable: "campaign_products",
      ascending: true,
    })
    .single();
  if (error) throw error;
  return data as CampaignWithProducts;
}

export interface CampaignFormValues {
  slug: string;
  title: string;
  category: string;
  description: string;
  benefit: string;
  tag: string | null;
  image: string;
  start_date: string;
  end_date: string;
  featured: boolean;
  published: boolean;
  price: number | null;
  old_price: number | null;
  terms: string[];
  products: {
    id?: string;
    name: string;
    image: string | null;
    description: string | null;
    old_price: number | null;
    campaign_price: number | null;
    highlights: string[];
  }[];
}

export async function createCampaign(values: CampaignFormValues) {
  const supabase = await createServerSupabaseClient();
  const { products, ...campaign } = values;

  const { data: inserted, error } = await supabase
    .from("campaigns")
    .insert(campaign)
    .select("id")
    .single();
  if (error) throw error;

  if (products.length > 0) {
    const { error: productsError } = await supabase
      .from("campaign_products")
      .insert(
        products.map((p, i) => ({
          campaign_id: inserted.id,
          name: p.name,
          image: p.image,
          description: p.description,
          old_price: p.old_price,
          campaign_price: p.campaign_price,
          highlights: p.highlights,
          sort_order: i,
        }))
      );
    if (productsError) throw productsError;
  }

  return inserted.id as string;
}

export async function updateCampaign(id: string, values: CampaignFormValues) {
  const supabase = await createServerSupabaseClient();
  const { products, ...campaign } = values;

  const { error } = await supabase
    .from("campaigns")
    .update(campaign)
    .eq("id", id);
  if (error) throw error;

  // Basit yaklaşım: ürünleri silip yeniden ekle (küçük diziler için sorunsuz).
  const { error: deleteError } = await supabase
    .from("campaign_products")
    .delete()
    .eq("campaign_id", id);
  if (deleteError) throw deleteError;

  if (products.length > 0) {
    const { error: productsError } = await supabase
      .from("campaign_products")
      .insert(
        products.map((p, i) => ({
          campaign_id: id,
          name: p.name,
          image: p.image,
          description: p.description,
          old_price: p.old_price,
          campaign_price: p.campaign_price,
          highlights: p.highlights,
          sort_order: i,
        }))
      );
    if (productsError) throw productsError;
  }
}

export async function deleteCampaign(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("campaigns").delete().eq("id", id);
  if (error) throw error;
}

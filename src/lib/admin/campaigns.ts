import "server-only";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

export type CampaignRow = Database["public"]["Tables"]["campaigns"]["Row"];

export async function listCampaigns() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getCampaign(id: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
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
}

export async function createCampaign(values: CampaignFormValues) {
  const supabase = await createServerSupabaseClient();

  const { count } = await supabase
    .from("campaigns")
    .select("*", { count: "exact", head: true });

  const { data: inserted, error } = await supabase
    .from("campaigns")
    .insert({ ...values, sort_order: count ?? 0 })
    .select("id")
    .single();
  if (error) throw error;

  return inserted.id as string;
}

export async function updateCampaign(id: string, values: CampaignFormValues) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("campaigns")
    .update(values)
    .eq("id", id);
  if (error) throw error;
}

export async function deleteCampaign(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("campaigns").delete().eq("id", id);
  if (error) throw error;
}

/** Sürükle-bırakla yeniden sıralanan kampanya id listesini kalıcı hale getirir. */
export async function reorderCampaigns(orderedIds: string[]) {
  const supabase = await createServerSupabaseClient();
  const results = await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("campaigns").update({ sort_order: index }).eq("id", id)
    )
  );
  const failed = results.find((r) => r.error);
  if (failed?.error) throw failed.error;
}

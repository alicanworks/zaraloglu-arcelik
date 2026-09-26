import "server-only";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

export type BannerRow = Database["public"]["Tables"]["banners"]["Row"];

export async function listBanners() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getBanner(id: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export interface BannerFormValues {
  image: string;
  alt: string;
  href: string | null;
  heading: string | null;
  description: string | null;
  cta_label: string | null;
  sort_order: number;
  active: boolean;
}

export async function createBanner(values: BannerFormValues) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("banners")
    .insert(values)
    .select("id")
    .single();
  if (error) throw error;
  return data.id as string;
}

export async function updateBanner(id: string, values: BannerFormValues) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("banners").update(values).eq("id", id);
  if (error) throw error;
}

export async function deleteBanner(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("banners").delete().eq("id", id);
  if (error) throw error;
}

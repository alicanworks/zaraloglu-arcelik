import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

export type PublicBlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];

export async function getPublishedPosts(): Promise<PublicBlogPost[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getPublishedPostBySlug(
  slug: string
): Promise<PublicBlogPost | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw error;
  return data;
}

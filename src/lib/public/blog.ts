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

export const BLOG_PAGE_SIZE = 12;

export async function getPublishedPostsPage(page: number): Promise<{
  posts: PublicBlogPost[];
  totalPages: number;
  page: number;
}> {
  const supabase = await createServerSupabaseClient();

  const { count, error: countError } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true })
    .eq("published", true);
  if (countError) throw countError;

  const totalPages = Math.max(1, Math.ceil((count ?? 0) / BLOG_PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const from = (safePage - 1) * BLOG_PAGE_SIZE;
  const to = from + BLOG_PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .range(from, to);
  if (error) throw error;

  return { posts: data ?? [], totalPages, page: safePage };
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

import "server-only";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

export type BlogPostRow = Database["public"]["Tables"]["blog_posts"]["Row"];

export async function listPosts() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getPost(id: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export interface BlogFormValues {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  author: string | null;
  published: boolean;
  published_at: string | null;
}

export async function createPost(values: BlogFormValues) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .insert(values)
    .select("id")
    .single();
  if (error) throw error;
  return data.id as string;
}

export async function updatePost(id: string, values: BlogFormValues) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("blog_posts")
    .update(values)
    .eq("id", id);
  if (error) throw error;
}

export async function deletePost(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
}

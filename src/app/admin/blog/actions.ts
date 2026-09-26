"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createPost,
  deletePost,
  updatePost,
  type BlogFormValues,
} from "@/lib/admin/blog";

export async function createPostAction(values: BlogFormValues) {
  const id = await createPost(values);
  revalidatePath("/admin/blog");
  redirect(`/admin/blog/${id}`);
}

export async function updatePostAction(id: string, values: BlogFormValues) {
  await updatePost(id, values);
  revalidatePath("/admin/blog");
  revalidatePath(`/admin/blog/${id}`);
}

export async function deletePostAction(id: string) {
  await deletePost(id);
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

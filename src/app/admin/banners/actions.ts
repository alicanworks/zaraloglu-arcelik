"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createBanner,
  deleteBanner,
  updateBanner,
  type BannerFormValues,
} from "@/lib/admin/banners";

export async function createBannerAction(values: BannerFormValues) {
  const id = await createBanner(values);
  revalidatePath("/admin/banners");
  redirect(`/admin/banners/${id}`);
}

export async function updateBannerAction(
  id: string,
  values: BannerFormValues
) {
  await updateBanner(id, values);
  revalidatePath("/admin/banners");
  revalidatePath(`/admin/banners/${id}`);
}

export async function deleteBannerAction(id: string) {
  await deleteBanner(id);
  revalidatePath("/admin/banners");
  redirect("/admin/banners");
}

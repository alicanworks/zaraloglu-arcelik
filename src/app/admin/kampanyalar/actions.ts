"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createCampaign,
  deleteCampaign,
  reorderCampaigns,
  updateCampaign,
  type CampaignFormValues,
} from "@/lib/admin/campaigns";

export async function createCampaignAction(values: CampaignFormValues) {
  const id = await createCampaign(values);
  revalidatePath("/admin/kampanyalar");
  redirect(`/admin/kampanyalar/${id}`);
}

export async function updateCampaignAction(
  id: string,
  values: CampaignFormValues
) {
  await updateCampaign(id, values);
  revalidatePath("/admin/kampanyalar");
  revalidatePath(`/admin/kampanyalar/${id}`);
}

export async function deleteCampaignAction(id: string) {
  await deleteCampaign(id);
  revalidatePath("/admin/kampanyalar");
  redirect("/admin/kampanyalar");
}

export async function reorderCampaignsAction(orderedIds: string[]) {
  await reorderCampaigns(orderedIds);
  revalidatePath("/admin/kampanyalar");
  revalidatePath("/");
  revalidatePath("/kampanyalar");
}

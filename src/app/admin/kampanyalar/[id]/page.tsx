import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCampaign } from "@/lib/admin/campaigns";
import { CampaignForm } from "../CampaignForm";

export const metadata = { title: "Kampanyayı Düzenle" };

export default async function EditCampaignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const campaign = await getCampaign(id);

  return (
    <div>
      <Link
        href="/admin/kampanyalar"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#767676] hover:text-[#222]"
      >
        <ArrowLeft className="h-4 w-4" />
        Kampanyalar
      </Link>
      <h1 className="mt-3 text-xl font-black">{campaign.title}</h1>

      <div className="mt-6">
        <CampaignForm initial={campaign} />
      </div>
    </div>
  );
}

import Link from "next/link";
import { Plus } from "lucide-react";
import { listCampaigns } from "@/lib/admin/campaigns";
import { CampaignSortableList } from "./CampaignSortableList";

export const dynamic = "force-dynamic";

export default async function AdminCampaignsPage() {
  const campaigns = await listCampaigns();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black">Kampanyalar</h1>
          <p className="mt-1 text-[13px] text-[#767676]">
            {campaigns.length} kampanya — sürükleyerek sırala
          </p>
        </div>
        <Link
          href="/admin/kampanyalar/yeni"
          className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#e4032e] px-5 text-[12px] font-black uppercase tracking-wide text-white hover:bg-[#c10228]"
        >
          <Plus className="h-4 w-4" />
          Yeni Kampanya
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-[6px] border border-[#e6e6e6] bg-white">
        <CampaignSortableList initialCampaigns={campaigns} />
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CampaignForm } from "../CampaignForm";

export const metadata = { title: "Yeni Kampanya" };

export default function NewCampaignPage() {
  return (
    <div>
      <Link
        href="/admin/kampanyalar"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#767676] hover:text-[#222]"
      >
        <ArrowLeft className="h-4 w-4" />
        Kampanyalar
      </Link>
      <h1 className="mt-3 text-xl font-black">Yeni Kampanya</h1>

      <div className="mt-6">
        <CampaignForm />
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BannerForm } from "../BannerForm";

export const metadata = { title: "Yeni Afiş" };

export default function NewBannerPage() {
  return (
    <div>
      <Link
        href="/admin/banners"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#767676] hover:text-[#222]"
      >
        <ArrowLeft className="h-4 w-4" />
        Afişler
      </Link>
      <h1 className="mt-3 text-xl font-black">Yeni Afiş</h1>

      <div className="mt-6">
        <BannerForm />
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBanner } from "@/lib/admin/banners";
import { BannerForm } from "../BannerForm";

export const metadata = { title: "Afişi Düzenle" };

export default async function EditBannerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const banner = await getBanner(id);

  return (
    <div>
      <Link
        href="/admin/banners"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#767676] hover:text-[#222]"
      >
        <ArrowLeft className="h-4 w-4" />
        Afişler
      </Link>
      <h1 className="mt-3 text-xl font-black">
        {banner.heading || banner.alt || "Afiş"}
      </h1>

      <div className="mt-6">
        <BannerForm initial={banner} />
      </div>
    </div>
  );
}

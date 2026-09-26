import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { listBanners } from "@/lib/admin/banners";

export const dynamic = "force-dynamic";

export default async function AdminBannersPage() {
  const banners = await listBanners();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black">Anasayfa Afişleri</h1>
          <p className="mt-1 text-[13px] text-[#767676]">
            {banners.length} afiş — sıralama numarasına göre gösterilir
          </p>
        </div>
        <Link
          href="/admin/banners/yeni"
          className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#e4032e] px-5 text-[12px] font-black uppercase tracking-wide text-white hover:bg-[#c10228]"
        >
          <Plus className="h-4 w-4" />
          Yeni Afiş
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {banners.length === 0 ? (
          <p className="rounded-[6px] border border-[#e6e6e6] bg-white p-8 text-center text-sm text-[#767676]">
            Henüz afiş eklenmedi.
          </p>
        ) : (
          banners.map((b) => (
            <Link
              key={b.id}
              href={`/admin/banners/${b.id}`}
              className="flex items-center gap-4 rounded-[6px] border border-[#e6e6e6] bg-white p-4 hover:border-[#222]"
            >
              <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-[4px] bg-[#f5f5f5]">
                {b.image ? (
                  <Image
                    src={b.image}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-[#222]">
                  {b.heading || b.alt || "(başlıksız afiş)"}
                </p>
                <p className="truncate text-[12px] text-[#767676]">
                  Sıra: {b.sort_order} · {b.href || "link yok"}
                </p>
              </div>
              <span
                className={
                  b.active
                    ? "shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-bold text-green-700"
                    : "shrink-0 rounded-full bg-[#f0f0f0] px-2.5 py-1 text-[11px] font-bold text-[#767676]"
                }
              >
                {b.active ? "Aktif" : "Pasif"}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

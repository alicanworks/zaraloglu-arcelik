import Image from "next/image";
import Link from "next/link";
import { campaignCategories } from "@/data/campaigns";

const categoryImage: Record<string, string> = {
  "Beyaz Eşya": "/images/campaign-buzdolabi.svg",
  Klima: "/images/campaign-klima.svg",
  Televizyon: "/images/campaign-televizyon.svg",
  "Küçük Ev Aletleri": "/images/campaign-kucukev.svg",
  Ankastre: "/images/campaign-ankastre.svg",
};

export function CategoryStrip() {
  return (
    <div className="border-b border-line bg-surface">
      <div className="container-page">
        <div className="scrollbar-none flex gap-2.5 overflow-x-auto py-2 md:justify-center">
          <Link
            href="/kampanyalar"
            className="group flex h-[52px] shrink-0 items-center gap-2.5 rounded-[4px] border border-line bg-surface px-3 transition-colors hover:border-ink"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-[3px] bg-brand text-base font-black leading-none text-white">
              %
            </span>
            <span className="whitespace-nowrap text-[13px] font-bold text-ink">
              Tüm Kampanyalar
            </span>
          </Link>

          {campaignCategories.map((cat) => (
            <Link
              key={cat}
              href={{ pathname: "/kampanyalar", query: { kategori: cat } }}
              className="group flex h-[52px] shrink-0 items-center gap-2.5 rounded-[4px] border border-line bg-surface px-2.5 pr-3.5 transition-colors hover:border-ink"
            >
              <span className="relative h-9 w-12 overflow-hidden rounded-[2px] bg-surface-sunken">
                <Image
                  src={categoryImage[cat]}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <span className="whitespace-nowrap text-[13px] font-normal text-ink group-hover:font-bold">
                {cat}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

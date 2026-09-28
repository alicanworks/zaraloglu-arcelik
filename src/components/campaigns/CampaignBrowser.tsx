"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { campaignCategories, type Campaign } from "@/data/campaigns";
import { cn } from "@/lib/utils";
import { campaignAccents } from "@/lib/campaign-colors";
import { CampaignListRow } from "./CampaignListRow";

type Filter = "Tümü" | (typeof campaignCategories)[number];
type Sort = "start" | "end";

export function CampaignBrowser({ campaigns }: { campaigns: Campaign[] }) {
  const searchParams = useSearchParams();
  const [active, setActive] = useState<Filter>("Tümü");
  const [sort, setSort] = useState<Sort>("start");

  useEffect(() => {
    const q = searchParams.get("kategori");
    const match = campaignCategories.find((c) => c === q);
    setActive(match ?? "Tümü");
  }, [searchParams]);

  const tabs = useMemo<Filter[]>(
    () => ["Tümü", ...campaignCategories],
    []
  );

  const filtered = useMemo(
    () =>
      active === "Tümü"
        ? campaigns
        : campaigns.filter((c) => c.category === active),
    [campaigns, active]
  );

  const sorted = useMemo(() => {
    const key = sort === "start" ? "startDate" : "endDate";
    return [...filtered].sort((a, b) => a[key].localeCompare(b[key]));
  }, [filtered, sort]);

  const accents = useMemo(
    () => campaignAccents(sorted.map((c) => c.category)),
    [sorted]
  );

  return (
    <div>
      {/* Category tabs */}
      <div className="scrollbar-none flex gap-6 overflow-x-auto border-b border-line">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={cn(
              "relative shrink-0 whitespace-nowrap pb-4 text-[15px] transition-colors",
              active === tab
                ? "font-black text-ink"
                : "font-normal text-muted hover:text-ink"
            )}
          >
            {tab}
            <span
              className={cn(
                "absolute inset-x-0 -bottom-px h-[3px] bg-brand transition-transform duration-200",
                active === tab ? "scale-x-100" : "scale-x-0"
              )}
            />
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex items-center justify-between py-5">
        <span className="text-[13px] font-bold text-muted">
          {sorted.length} kampanya
        </span>
        <label className="relative inline-flex items-center">
          <span className="sr-only">Sırala</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="appearance-none rounded-[4px] border border-line-strong bg-surface py-2 pl-4 pr-9 text-[13px] font-bold text-ink outline-none hover:border-ink"
          >
            <option value="start">Başlangıç Tarihine Göre</option>
            <option value="end">Bitiş Tarihine Göre</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-muted" />
        </label>
      </div>

      {/* List */}
      {sorted.length > 0 ? (
        <div className="flex flex-col gap-4 md:gap-5">
          {sorted.map((campaign, i) => (
            <CampaignListRow
              key={campaign.id}
              campaign={campaign}
              accent={accents[i]}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-[6px] border border-dashed border-line-strong bg-surface-muted p-12 text-center">
          <p className="text-[15px] font-black text-ink">
            Bu kategoride şu an aktif kampanya bulunmuyor.
          </p>
          <p className="mt-1 text-[14px] text-muted">
            Diğer kategorilere göz atın veya güncel fiyatlar için bizimle
            iletişime geçin.
          </p>
        </div>
      )}
    </div>
  );
}

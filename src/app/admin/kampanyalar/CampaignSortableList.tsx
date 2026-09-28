"use client";

import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { GripVertical } from "lucide-react";
import { formatDateRange } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { CampaignRow } from "@/lib/admin/campaigns";
import { reorderCampaignsAction } from "./actions";

export function CampaignSortableList({
  initialCampaigns,
}: {
  initialCampaigns: CampaignRow[];
}) {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [pending, startTransition] = useTransition();
  const dragIndex = useRef<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const handleDrop = (dropIndex: number) => {
    const from = dragIndex.current;
    dragIndex.current = null;
    setOverIndex(null);
    if (from === null || from === dropIndex) return;

    const next = [...campaigns];
    const [moved] = next.splice(from, 1);
    next.splice(dropIndex, 0, moved);
    setCampaigns(next);

    startTransition(async () => {
      await reorderCampaignsAction(next.map((c) => c.id));
    });
  };

  if (campaigns.length === 0) {
    return (
      <p className="p-8 text-center text-sm text-[#767676]">
        Henüz kampanya eklenmedi.
      </p>
    );
  }

  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-[#e6e6e6] text-[12px] uppercase tracking-wide text-[#767676]">
          <th className="w-8 px-3 py-3" aria-hidden />
          <th className="px-5 py-3 font-bold">Başlık</th>
          <th className="px-5 py-3 font-bold">Kategori</th>
          <th className="px-5 py-3 font-bold">Tarih</th>
          <th className="px-5 py-3 font-bold">Durum</th>
        </tr>
      </thead>
      <tbody>
        {campaigns.map((c, i) => (
          <tr
            key={c.id}
            draggable
            onDragStart={() => {
              dragIndex.current = i;
            }}
            onDragOver={(e) => {
              e.preventDefault();
              if (overIndex !== i) setOverIndex(i);
            }}
            onDragEnd={() => {
              dragIndex.current = null;
              setOverIndex(null);
            }}
            onDrop={(e) => {
              e.preventDefault();
              handleDrop(i);
            }}
            className={cn(
              "border-b border-[#eee] last:border-0 hover:bg-[#f9f9f9]",
              overIndex === i && "bg-[#fdf0f1]",
              pending && "opacity-70"
            )}
          >
            <td className="px-3 py-3 text-[#c9c9c9]">
              <GripVertical className="h-4 w-4 cursor-grab active:cursor-grabbing" />
            </td>
            <td className="px-5 py-3">
              <Link
                href={`/admin/kampanyalar/${c.id}`}
                className="font-semibold text-[#222] hover:text-[#e4032e]"
              >
                {c.title}
              </Link>
            </td>
            <td className="px-5 py-3 text-[#4a4a4a]">{c.category}</td>
            <td className="px-5 py-3 text-[#4a4a4a]">
              {formatDateRange(c.start_date, c.end_date)}
            </td>
            <td className="px-5 py-3">
              <span
                className={
                  c.published
                    ? "rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-bold text-green-700"
                    : "rounded-full bg-[#f0f0f0] px-2.5 py-1 text-[11px] font-bold text-[#767676]"
                }
              >
                {c.published ? "Yayında" : "Taslak"}
              </span>
              {c.featured ? (
                <span className="ml-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-700">
                  Öne çıkan
                </span>
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

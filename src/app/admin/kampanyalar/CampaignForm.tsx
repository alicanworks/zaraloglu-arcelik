"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { campaignCategories } from "@/data/campaigns";
import type { CampaignRow } from "@/lib/admin/campaigns";
import {
  createCampaignAction,
  deleteCampaignAction,
  updateCampaignAction,
} from "./actions";

function slugify(input: string) {
  const map: Record<string, string> = {
    ç: "c",
    ğ: "g",
    ı: "i",
    ö: "o",
    ş: "s",
    ü: "u",
    İ: "i",
  };
  return input
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function CampaignForm({ initial }: { initial?: CampaignRow }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [category, setCategory] = useState(
    initial?.category ?? campaignCategories[0]
  );
  const [description, setDescription] = useState(initial?.description ?? "");
  const [tag, setTag] = useState(initial?.tag ?? "");
  const [image, setImage] = useState(initial?.image ?? "");
  const [startDate, setStartDate] = useState(initial?.start_date ?? "");
  const [endDate, setEndDate] = useState(initial?.end_date ?? "");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [published, setPublished] = useState(initial?.published ?? true);
  const [price, setPrice] = useState(initial?.price?.toString() ?? "");
  const [oldPrice, setOldPrice] = useState(
    initial?.old_price?.toString() ?? ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const values = {
      slug,
      title,
      category,
      description,
      benefit: "",
      tag: tag || null,
      image,
      start_date: startDate,
      end_date: endDate,
      featured,
      published,
      price: price ? Number(price) : null,
      old_price: oldPrice ? Number(oldPrice) : null,
      terms: [],
    };

    startTransition(async () => {
      try {
        if (initial) {
          await updateCampaignAction(initial.id, values);
          router.refresh();
        } else {
          await createCampaignAction(values);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Kaydedilirken bir hata oluştu."
        );
      }
    });
  };

  const handleDelete = () => {
    if (!initial) return;
    if (!confirm("Bu kampanyayı silmek istediğinize emin misiniz?")) return;
    startTransition(async () => {
      try {
        await deleteCampaignAction(initial.id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Silinemedi.");
      }
    });
  };

  const inputClass =
    "mt-1.5 h-10 w-full rounded-[4px] border border-[#d6d6d6] px-3 text-sm outline-none focus:border-[#222]";
  const labelClass = "block text-[13px] font-semibold text-[#222]";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="rounded-[6px] border border-[#e6e6e6] bg-white p-6">
        <h2 className="text-[15px] font-black">Genel Bilgiler</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>Başlık</label>
            <input
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Slug (URL)</label>
            <input
              required
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              {campaignCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Taksit Badge (opsiyonel)</label>
            <input
              value={tag ?? ""}
              onChange={(e) => setTag(e.target.value)}
              placeholder="örn. 12 Taksit"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Başlangıç Tarihi</label>
            <input
              required
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Bitiş Tarihi</label>
            <input
              required
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className={labelClass}>Kısa Açıklama</label>
          <textarea
            required
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1.5 w-full rounded-[4px] border border-[#d6d6d6] px-3 py-2 text-sm outline-none focus:border-[#222]"
          />
        </div>

        <div className="mt-4">
          <ImageUploadField label="Kart Görseli" value={image} onChange={setImage} />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>Kampanya Fiyatı (opsiyonel)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Eski Fiyat (opsiyonel)</label>
            <input
              type="number"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-[13px] font-semibold">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4"
            />
            Ana sayfada öne çıkar
          </label>
          <label className="flex items-center gap-2 text-[13px] font-semibold">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4"
            />
            Yayında
          </label>
        </div>
      </section>

      {error ? (
        <p className="rounded-[4px] bg-red-50 px-4 py-3 text-[13px] text-[#c10228]">
          {error}
        </p>
      ) : null}

      <div className="flex items-center justify-between">
        <div>
          {initial ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={pending}
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#c10228] px-4 text-[12px] font-black uppercase tracking-wide text-[#c10228] hover:bg-red-50 disabled:opacity-60"
            >
              <Trash2 className="h-4 w-4" />
              Kampanyayı Sil
            </button>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-[#e4032e] px-8 text-[12px] font-black uppercase tracking-wide text-white hover:bg-[#c10228] disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {initial ? "Değişiklikleri Kaydet" : "Kampanyayı Oluştur"}
        </button>
      </div>
    </form>
  );
}

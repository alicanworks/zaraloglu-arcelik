"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { BannerRow } from "@/lib/admin/banners";
import {
  createBannerAction,
  deleteBannerAction,
  updateBannerAction,
} from "./actions";

export function BannerForm({ initial }: { initial?: BannerRow }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [image, setImage] = useState(initial?.image ?? "");
  const [alt, setAlt] = useState(initial?.alt ?? "");
  const [href, setHref] = useState(initial?.href ?? "");
  const [heading, setHeading] = useState(initial?.heading ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [ctaLabel, setCtaLabel] = useState(initial?.cta_label ?? "");
  const [sortOrder, setSortOrder] = useState(
    initial?.sort_order?.toString() ?? "0"
  );
  const [active, setActive] = useState(initial?.active ?? true);

  const inputClass =
    "mt-1.5 h-10 w-full rounded-[4px] border border-[#d6d6d6] px-3 text-sm outline-none focus:border-[#222]";
  const labelClass = "block text-[13px] font-semibold text-[#222]";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const values = {
      image,
      alt: alt || "",
      href: href || null,
      heading: heading || null,
      description: description || null,
      cta_label: ctaLabel || null,
      sort_order: Number(sortOrder) || 0,
      active,
    };

    startTransition(async () => {
      try {
        if (initial) {
          await updateBannerAction(initial.id, values);
          router.refresh();
        } else {
          await createBannerAction(values);
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
    if (!confirm("Bu afişi silmek istediğinize emin misiniz?")) return;
    startTransition(async () => {
      try {
        await deleteBannerAction(initial.id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Silinemedi.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="rounded-[6px] border border-[#e6e6e6] bg-white p-6">
        <ImageUploadField label="Afiş Görseli (16:9 önerilir)" value={image} onChange={setImage} />

        <div className="mt-4">
          <label className={labelClass}>Alt Metin (erişilebilirlik)</label>
          <input value={alt} onChange={(e) => setAlt(e.target.value)} className={inputClass} />
        </div>

        <div className="mt-4">
          <label className={labelClass}>Link (opsiyonel)</label>
          <input
            value={href ?? ""}
            onChange={(e) => setHref(e.target.value)}
            placeholder="/kampanyalar veya https://..."
            className={inputClass}
          />
        </div>

        <p className="mt-4 text-[12px] text-[#767676]">
          Aşağıdaki başlık/açıklama/buton alanları doldurulursa fotoğrafın
          üzerine yazı katmanı eklenir. Görselin kendi içinde yazı varsa
          bunları boş bırakın.
        </p>

        <div className="mt-2">
          <label className={labelClass}>Başlık (opsiyonel)</label>
          <input
            value={heading ?? ""}
            onChange={(e) => setHeading(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="mt-4">
          <label className={labelClass}>Açıklama (opsiyonel)</label>
          <textarea
            rows={2}
            value={description ?? ""}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1.5 w-full rounded-[4px] border border-[#d6d6d6] px-3 py-2 text-sm outline-none focus:border-[#222]"
          />
        </div>
        <div className="mt-4">
          <label className={labelClass}>Buton Metni (opsiyonel)</label>
          <input
            value={ctaLabel ?? ""}
            onChange={(e) => setCtaLabel(e.target.value)}
            placeholder="Kampanyayı İncele"
            className={inputClass}
          />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>Sıra</label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className={inputClass}
            />
          </div>
          <label className="mt-6 flex items-center gap-2 text-[13px] font-semibold">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="h-4 w-4"
            />
            Aktif (sitede göster)
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
              Afişi Sil
            </button>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-[#e4032e] px-8 text-[12px] font-black uppercase tracking-wide text-white hover:bg-[#c10228] disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {initial ? "Değişiklikleri Kaydet" : "Afişi Oluştur"}
        </button>
      </div>
    </form>
  );
}

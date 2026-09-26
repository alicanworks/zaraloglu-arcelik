"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { campaignCategories } from "@/data/campaigns";
import type { CampaignWithProducts } from "@/lib/admin/campaigns";
import {
  createCampaignAction,
  deleteCampaignAction,
  updateCampaignAction,
} from "./actions";

interface ProductDraft {
  id?: string;
  name: string;
  image: string;
  description: string;
  old_price: string;
  campaign_price: string;
  highlights: string;
}

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

export function CampaignForm({
  initial,
}: {
  initial?: CampaignWithProducts;
}) {
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
  const [benefit, setBenefit] = useState(initial?.benefit ?? "");
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
  const [terms, setTerms] = useState(initial?.terms?.join("\n") ?? "");
  const [products, setProducts] = useState<ProductDraft[]>(
    initial?.campaign_products.map((p) => ({
      id: p.id,
      name: p.name,
      image: p.image ?? "",
      description: p.description ?? "",
      old_price: p.old_price?.toString() ?? "",
      campaign_price: p.campaign_price?.toString() ?? "",
      highlights: p.highlights?.join(", ") ?? "",
    })) ?? []
  );

  const addProduct = () =>
    setProducts((prev) => [
      ...prev,
      {
        name: "",
        image: "",
        description: "",
        old_price: "",
        campaign_price: "",
        highlights: "",
      },
    ]);

  const updateProduct = (i: number, patch: Partial<ProductDraft>) =>
    setProducts((prev) =>
      prev.map((p, idx) => (idx === i ? { ...p, ...patch } : p))
    );

  const removeProduct = (i: number) =>
    setProducts((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const values = {
      slug,
      title,
      category,
      description,
      benefit,
      tag: tag || null,
      image,
      start_date: startDate,
      end_date: endDate,
      featured,
      published,
      price: price ? Number(price) : null,
      old_price: oldPrice ? Number(oldPrice) : null,
      terms: terms
        .split("\n")
        .map((t) => t.trim())
        .filter(Boolean),
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        image: p.image || null,
        description: p.description || null,
        old_price: p.old_price ? Number(p.old_price) : null,
        campaign_price: p.campaign_price ? Number(p.campaign_price) : null,
        highlights: p.highlights
          .split(",")
          .map((h) => h.trim())
          .filter(Boolean),
      })),
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
            <label className={labelClass}>Rozet / Etiket (opsiyonel)</label>
            <input
              value={tag ?? ""}
              onChange={(e) => setTag(e.target.value)}
              placeholder="örn. Yaz Kampanyası"
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
          <label className={labelClass}>Fayda / Avantaj Metni</label>
          <input
            required
            value={benefit}
            onChange={(e) => setBenefit(e.target.value)}
            placeholder="örn. Ücretsiz standart montaj + 12 taksit"
            className={inputClass}
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

      <section className="rounded-[6px] border border-[#e6e6e6] bg-white p-6">
        <h2 className="text-[15px] font-black">Katılım Koşulları</h2>
        <p className="mt-1 text-[12px] text-[#767676]">
          Her satıra bir madde yazın.
        </p>
        <textarea
          rows={5}
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
          className="mt-2 w-full rounded-[4px] border border-[#d6d6d6] px-3 py-2 text-sm outline-none focus:border-[#222]"
        />
      </section>

      <section className="rounded-[6px] border border-[#e6e6e6] bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-black">Kampanyaya Dahil Ürünler</h2>
          <button
            type="button"
            onClick={addProduct}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#d6d6d6] px-3 text-[12px] font-semibold hover:border-[#222]"
          >
            <Plus className="h-3.5 w-3.5" />
            Ürün Ekle
          </button>
        </div>

        <div className="mt-4 space-y-5">
          {products.map((p, i) => (
            <div
              key={i}
              className="rounded-[4px] border border-[#eee] p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-[#767676]">
                  Ürün {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeProduct(i)}
                  className="text-[#767676] hover:text-[#c10228]"
                  aria-label="Ürünü kaldır"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Ürün Adı</label>
                  <input
                    value={p.name}
                    onChange={(e) => updateProduct(i, { name: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Özellikler (virgülle)</label>
                  <input
                    value={p.highlights}
                    onChange={(e) =>
                      updateProduct(i, { highlights: e.target.value })
                    }
                    placeholder="A++ Enerji, WiFi Kontrol"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Eski Fiyat</label>
                  <input
                    type="number"
                    value={p.old_price}
                    onChange={(e) =>
                      updateProduct(i, { old_price: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Kampanya Fiyatı</label>
                  <input
                    type="number"
                    value={p.campaign_price}
                    onChange={(e) =>
                      updateProduct(i, { campaign_price: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className={labelClass}>Açıklama</label>
                <input
                  value={p.description}
                  onChange={(e) =>
                    updateProduct(i, { description: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div className="mt-3">
                <ImageUploadField
                  label="Ürün Görseli"
                  value={p.image}
                  onChange={(url) => updateProduct(i, { image: url })}
                />
              </div>
            </div>
          ))}
          {products.length === 0 ? (
            <p className="text-[13px] text-[#767676]">
              Henüz ürün eklenmedi.
            </p>
          ) : null}
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

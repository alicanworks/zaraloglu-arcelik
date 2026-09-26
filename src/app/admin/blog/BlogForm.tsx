"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { BlogPostRow } from "@/lib/admin/blog";
import { createPostAction, deletePostAction, updatePostAction } from "./actions";

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

export function BlogForm({ initial }: { initial?: BlogPostRow }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [coverImage, setCoverImage] = useState(initial?.cover_image ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);

  const inputClass =
    "mt-1.5 h-10 w-full rounded-[4px] border border-[#d6d6d6] px-3 text-sm outline-none focus:border-[#222]";
  const labelClass = "block text-[13px] font-semibold text-[#222]";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const values = {
      slug,
      title,
      excerpt: excerpt || null,
      content: content || null,
      cover_image: coverImage || null,
      author: author || null,
      published,
      published_at: published
        ? initial?.published_at ?? new Date().toISOString()
        : null,
    };

    startTransition(async () => {
      try {
        if (initial) {
          await updatePostAction(initial.id, values);
          router.refresh();
        } else {
          await createPostAction(values);
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
    if (!confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return;
    startTransition(async () => {
      try {
        await deletePostAction(initial.id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Silinemedi.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="rounded-[6px] border border-[#e6e6e6] bg-white p-6">
        <div className="grid gap-4 md:grid-cols-2">
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
            <label className={labelClass}>Yazar (opsiyonel)</label>
            <input
              value={author ?? ""}
              onChange={(e) => setAuthor(e.target.value)}
              className={inputClass}
            />
          </div>
          <label className="mt-6 flex items-center gap-2 text-[13px] font-semibold">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4"
            />
            Yayında
          </label>
        </div>

        <div className="mt-4">
          <label className={labelClass}>Özet</label>
          <textarea
            rows={2}
            value={excerpt ?? ""}
            onChange={(e) => setExcerpt(e.target.value)}
            className="mt-1.5 w-full rounded-[4px] border border-[#d6d6d6] px-3 py-2 text-sm outline-none focus:border-[#222]"
          />
        </div>

        <div className="mt-4">
          <ImageUploadField
            label="Kapak Görseli"
            value={coverImage ?? ""}
            onChange={setCoverImage}
          />
        </div>

        <div className="mt-4">
          <label className={labelClass}>İçerik (Markdown)</label>
          <textarea
            rows={14}
            value={content ?? ""}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1.5 w-full rounded-[4px] border border-[#d6d6d6] px-3 py-2 font-mono text-[13px] outline-none focus:border-[#222]"
          />
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
              Yazıyı Sil
            </button>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-[#e4032e] px-8 text-[12px] font-black uppercase tracking-wide text-white hover:bg-[#c10228] disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {initial ? "Değişiklikleri Kaydet" : "Yazıyı Oluştur"}
        </button>
      </div>
    </form>
  );
}

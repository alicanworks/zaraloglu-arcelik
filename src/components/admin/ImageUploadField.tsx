"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImageUp, Loader2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

/**
 * Görsel yükleme alanı: dosya seçilince Supabase Storage'daki `media`
 * bucket'ına yükler, dönen genel (public) URL'i `value`'ya yazar. URL'i
 * elle de yapıştırabilirsiniz (ör. başka bir yerde barındırılan görsel).
 */
export function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Yükleme başarısız oldu.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-[13px] font-semibold text-[#222]">
        {label}
      </label>

      <div className="mt-1.5 flex items-start gap-3">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[4px] border border-[#d6d6d6] bg-[#f5f5f5]">
          {value ? (
            <Image src={value} alt="" fill sizes="80px" className="object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-[#9a9a9a]">
              <ImageUp className="h-5 w-5" />
            </span>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/... veya https://..."
            className="h-9 w-full rounded-[4px] border border-[#d6d6d6] px-3 text-[13px] outline-none focus:border-[#222]"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex h-8 items-center gap-1.5 rounded-[4px] border border-[#d6d6d6] px-3 text-[12px] font-semibold text-[#4a4a4a] hover:border-[#222] hover:text-[#222] disabled:opacity-60"
            >
              {uploading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <ImageUp className="h-3.5 w-3.5" />
              )}
              {uploading ? "Yükleniyor…" : "Bilgisayardan Yükle"}
            </button>
            {value ? (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex h-8 items-center gap-1 rounded-[4px] px-2 text-[12px] font-semibold text-[#767676] hover:text-[#c10228]"
              >
                <X className="h-3.5 w-3.5" />
                Kaldır
              </button>
            ) : null}
          </div>
          {error ? (
            <p className="text-[12px] text-[#c10228]">{error}</p>
          ) : null}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
        </div>
      </div>
    </div>
  );
}

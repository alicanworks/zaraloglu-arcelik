"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface GalleryPhoto {
  src: string;
  alt: string;
}

const PHOTOS: GalleryPhoto[] = [
  { src: "/images/magaza-galeri/magaza-1.webp", alt: "Beyaz eşya reyonu" },
  { src: "/images/magaza-galeri/magaza-2.webp", alt: "Küçük ev aletleri ve televizyon vitrini" },
  { src: "/images/magaza-galeri/magaza-3.webp", alt: "Ankastre ve mutfak reyonu" },
  { src: "/images/magaza-galeri/magaza-4.webp", alt: "Televizyon ve elektronik vitrini" },
  { src: "/images/magaza-galeri/magaza-5.webp", alt: "Kasa ve dinlenme alanı" },
  { src: "/images/magaza-galeri/magaza-6.webp", alt: "Mağaza dış cephesi" },
];

export function StoreGallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + PHOTOS.length) % PHOTOS.length)),
    []
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % PHOTOS.length)),
    []
  );

  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, prev, next]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {PHOTOS.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActive(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-[6px] border border-line bg-surface-sunken"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/20" />
            <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              <ZoomIn className="h-4 w-4" />
            </span>
          </button>
        ))}
      </div>

      {active !== null ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 md:p-10"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Mağaza fotoğrafı"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Kapat"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Önceki fotoğraf"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Sonraki fotoğraf"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className="relative h-full max-h-[80vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={PHOTOS[active].src}
              alt={PHOTOS[active].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-white">
            {active + 1} / {PHOTOS.length}
          </span>
        </div>
      ) : null}
    </>
  );
}

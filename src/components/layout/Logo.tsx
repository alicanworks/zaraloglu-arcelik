"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { store } from "@/data/store";

/**
 * Mağaza logosu. `public/images/logo.png` (veya .svg) dosyası varsa onu
 * gösterir; dosya yoksa / yüklenemezse yazı tabanlı yedek lockup'a düşer.
 * Farklı dosya adı/uzantısı için LOGO_SRC'yi güncelleyin.
 */
const LOGO_SRC = "/images/zaraloglu-logo.png";

export function Logo({
  className,
  imgClassName = "h-12 w-auto md:h-14",
}: {
  className?: string;
  imgClassName?: string;
}) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center", className)}
      aria-label={`${store.shortName} ana sayfa`}
    >
      {imgOk ? (
        <Image
          src={LOGO_SRC}
          alt={store.shortName}
          width={320}
          height={220}
          priority
          className={imgClassName}
          onError={() => setImgOk(false)}
        />
      ) : (
        <span className="inline-flex items-center gap-2.5">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-sm bg-brand text-white"
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path
                d="M4 15.5 12 5l8 10.5"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 19h9"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-black tracking-tight text-ink">
              Zaraloğlu
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
              Arçelik Yetkili Satış
            </span>
          </span>
        </span>
      )}
    </Link>
  );
}

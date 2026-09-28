"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Banner } from "@/data/banners";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 6500;

/**
 * Image-only banner slider. Each slide is a single full-bleed artwork
 * (headline / price / CTA are baked into the image, supplied by the store).
 * If a slide has an `href`, the whole slide links there.
 * Banners are managed in `src/data/banners.ts`.
 *
 * Dayanıklılık: bir afişin görseli yüklenemezse (ör. hotlink verilen Arçelik
 * URL'i kampanya bitince kırılırsa) o afiş otomatik olarak rotasyondan düşer;
 * kalan afişlerle slider çalışmaya devam eder.
 */
export function HeroCampaignSlider({ banners }: { banners: Banner[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState<Record<string, true>>({});
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const visible = useMemo(
    () => banners.filter((b) => !failed[b.id]),
    [banners, failed]
  );
  const count = visible.length;

  // Bir afiş düşünce index taşarsa başa sar
  useEffect(() => {
    if (index > count - 1) setIndex(0);
  }, [count, index]);

  const go = useCallback(
    (next: number) => count > 0 && setIndex((next + count) % count),
    [count]
  );

  useEffect(() => {
    if (paused || count <= 1) return;
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % count),
      AUTOPLAY_MS
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, count]);

  if (count === 0) return null;

  const current = Math.min(index, count - 1);

  return (
    <section
      className="relative isolate overflow-hidden bg-brand"
      aria-roledescription="carousel"
      aria-label="Kampanya afişleri"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto min-h-[460px] w-full max-w-[1920px] sm:aspect-[16/9] sm:min-h-0 md:max-h-[480px] lg:max-h-[560px]">
        {visible.map((banner, i) => {
          const active = i === current;
          const hasText = Boolean(banner.heading);
          const image = (
            <Image
              src={banner.image}
              alt={banner.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
              onError={() =>
                setFailed((prev) => ({ ...prev, [banner.id]: true }))
              }
            />
          );
          const classes = cn(
            "absolute inset-0 transition-opacity duration-500 ease-out",
            active ? "opacity-100" : "pointer-events-none opacity-0"
          );

          const [headingLead, ...headingRest] = (banner.heading ?? "").split(
            ": "
          );
          const headingTail = headingRest.join(": ");

          if (hasText) {
            return (
              <div key={banner.id} className={cn(classes, "block")} aria-hidden={!active}>
                {image}
                <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/35 to-transparent" />
                <div className="container-page relative flex h-full items-center">
                  <div className="max-w-lg">
                    <h1 className="text-[28px] font-black leading-[1.12] text-white md:text-[42px]">
                      {headingTail ? (
                        <>
                          {headingLead}
                          <br />
                          {headingTail}
                        </>
                      ) : (
                        banner.heading
                      )}
                    </h1>
                    {banner.description ? (
                      <p className="mt-3 text-[15px] leading-relaxed text-white/85 md:text-[16px]">
                        {banner.description}
                      </p>
                    ) : null}
                    {banner.ctaLabel && banner.href ? (
                      <Link
                        href={banner.href}
                        className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-brand px-8 text-[12px] font-black uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
                      >
                        {banner.ctaLabel}
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          }

          return banner.href ? (
            <Link
              key={banner.id}
              href={banner.href}
              className={cn(classes, "block")}
              aria-hidden={!active}
              tabIndex={active ? undefined : -1}
            >
              {image}
            </Link>
          ) : (
            <div key={banner.id} className={cn(classes, "block")} aria-hidden={!active}>
              {image}
            </div>
          );
        })}
      </div>

      {count > 1 ? (
        <div className="container-page pointer-events-none absolute inset-x-0 bottom-5 flex items-center justify-between">
          <div className="pointer-events-auto flex gap-2">
            {visible.map((b, i) => (
              <button
                key={b.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`${i + 1}. afişe git`}
                aria-current={i === current}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === current
                    ? "w-8 bg-brand"
                    : "w-2.5 bg-white/70 shadow-sm hover:bg-white"
                )}
              />
            ))}
          </div>

          <div className="pointer-events-auto hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => go(current - 1)}
              aria-label="Önceki afiş"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(current + 1)}
              aria-label="Sonraki afiş"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

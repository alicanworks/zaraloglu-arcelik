"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { instagramProfile, reels, type ReelVideo } from "@/data/instagram";
import { Button } from "@/components/ui/button";
import { InstagramIcon as IgGlyph } from "@/components/ui/instagram-icon";

export function InstagramSection() {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({
    down: false,
    startX: 0,
    startLeft: 0,
    lastX: 0,
    lastT: 0,
    v: 0,
    moved: false,
  });
  const raf = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [failed, setFailed] = useState<Record<string, true>>({});

  const visible = reels.filter((r) => !failed[r.id]);

  const stopMomentum = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = 0;
  };

  useEffect(() => stopMomentum, []);

  const scrollByDir = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    stopMomentum();
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  // Fare ile "tutup bırak" — bırakınca ivmeyle (momentum) süzülür.
  // Dokunmatik/kalem zaten doğal ataletle kayar.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = scroller.current;
    if (!el) return;
    stopMomentum();
    const now = performance.now();
    drag.current = {
      down: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      lastX: e.clientX,
      lastT: now,
      v: 0,
      moved: false,
    };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.down) return;
    const el = scroller.current;
    if (!el) return;
    const now = performance.now();
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
    const dt = now - drag.current.lastT || 16;
    // px/ms — pencereli yumuşatma ile daha az titrek
    drag.current.v = 0.8 * ((e.clientX - drag.current.lastX) / dt) + 0.2 * drag.current.v;
    drag.current.lastX = e.clientX;
    drag.current.lastT = now;
  };

  const endDrag = () => {
    if (!drag.current.down) return;
    drag.current.down = false;
    setDragging(false);
    const el = scroller.current;
    if (!el) return;
    let v = -drag.current.v * 16; // kare başına piksel, yön ters
    if (Math.abs(v) < 0.6) return;
    v = Math.max(-40, Math.min(40, v)); // aşırı hız sınırı
    const step = () => {
      el.scrollLeft += v;
      v *= 0.93; // sürtünme → yumuşak duruş
      if (Math.abs(v) < 0.3) {
        raf.current = 0;
        return;
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section className="border-t border-line py-12 md:py-[3.75rem]">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Instagram</span>
            <h2 className="mt-2.5 text-[22px] font-black leading-[1.15] lg:text-[32px]">
              Bizi Instagram&apos;da takip edin
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-muted md:text-[15px]">
              Güncel kampanyalar, ürün tanıtımları ve mağazamızdan kareler için{" "}
              <span className="font-bold text-ink">{instagramProfile.handle}</span>{" "}
              hesabımızı takip edin.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden gap-2 md:flex">
              <button
                type="button"
                onClick={() => scrollByDir(-1)}
                aria-label="Önceki videolar"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink hover:border-ink"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollByDir(1)}
                aria-label="Sonraki videolar"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink hover:border-ink"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <Button href={instagramProfile.url} variant="primary">
              <IgGlyph className="h-4 w-4" />
              Takip Et
            </Button>
          </div>
        </div>

        {visible.length > 0 ? (
          <div
            ref={scroller}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onClickCapture={onClickCapture}
            className={cn(
              "scrollbar-none -mx-4 mt-8 flex gap-4 overflow-x-auto px-4 select-none [&_a]:select-none [&_img]:pointer-events-none [&_video]:pointer-events-none",
              dragging
                ? "cursor-grabbing [&>a]:opacity-90"
                : "cursor-grab snap-x snap-proximity [&>a]:transition-opacity"
            )}
          >
            {visible.map((reel) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                onFail={() =>
                  setFailed((prev) => ({ ...prev, [reel.id]: true }))
                }
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ReelCard({
  reel,
  onFail,
}: {
  reel: ReelVideo;
  onFail: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoBroken, setVideoBroken] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const showVideo = Boolean(reel.src) && !videoBroken;

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !showVideo) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (v.readyState < 3) setBuffering(true);
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [showVideo]);

  const card = (
    <div className="relative aspect-[9/16] w-[220px] shrink-0 snap-start overflow-hidden rounded-[6px] border border-line bg-surface-sunken md:w-[264px] lg:w-[300px]">
      {reel.poster ? (
        <Image
          src={reel.poster}
          alt={reel.caption ?? "Instagram videosu"}
          fill
          sizes="240px"
          className="object-cover"
        />
      ) : null}

      {showVideo ? (
        <video
          ref={videoRef}
          src={reel.src}
          poster={reel.poster}
          muted
          loop
          playsInline
          preload="metadata"
          onPlaying={() => setBuffering(false)}
          onWaiting={() => setBuffering(true)}
          onError={() => {
            setVideoBroken(true);
            onFail();
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}

      {buffering ? (
        <div className="absolute inset-0 flex items-center justify-center bg-ink/25">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/10" />
      <IgGlyph className="absolute right-3 top-3 h-5 w-5 text-white drop-shadow" />
      {reel.caption ? (
        <p className="absolute inset-x-3 bottom-3 line-clamp-2 text-[12px] font-bold leading-snug text-white drop-shadow">
          {reel.caption}
        </p>
      ) : null}
    </div>
  );

  return reel.href ? (
    <a
      href={reel.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
      aria-label={reel.caption ?? "Instagram gönderisini aç"}
    >
      {card}
    </a>
  ) : (
    card
  );
}

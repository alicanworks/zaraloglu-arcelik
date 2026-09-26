"use client";

import { useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

/**
 * Mağazamız bölümü tanıtım videosu. Görsel + ortada başlatma ikonuyla durur;
 * videonun herhangi bir yerine tıklamak oynat/duraklat arasında geçiş yapar
 * (duraklatınca ses de anında kesilir). Sağ altta ayrı bir ses aç/kapat
 * düğmesi bulunur.
 */
export function StoreVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [broken, setBroken] = useState(false);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  if (broken && poster) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={poster} alt="Mağazamız" className={className} />
    );
  }

  return (
    <div className="group relative h-full w-full">
      <div
        role="button"
        tabIndex={0}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        aria-label={playing ? "Videoyu duraklat" : "Videoyu oynat"}
        className="absolute inset-0 h-full w-full cursor-pointer"
      >
        <video
          ref={ref}
          src={src}
          poster={poster}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setBroken(true)}
          className={className}
        />

        <span
          className={
            playing
              ? "pointer-events-none absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/20"
              : "pointer-events-none absolute inset-0 bg-ink/30 transition-colors group-hover:bg-ink/40"
          }
        />

        <span
          className={
            playing
              ? "pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
              : "pointer-events-none absolute inset-0 flex items-center justify-center"
          }
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-pop transition-transform duration-200 group-hover:scale-105 md:h-20 md:w-20">
            {playing ? (
              <Pause className="h-7 w-7 fill-current md:h-8 md:w-8" />
            ) : (
              <Play className="ml-1 h-7 w-7 fill-current md:h-8 md:w-8" />
            )}
          </span>
        </span>
      </div>

      {playing ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            const v = ref.current;
            if (!v) return;
            v.muted = !v.muted;
            setMuted(v.muted);
          }}
          aria-label={muted ? "Sesi aç" : "Sesi kapat"}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 text-white backdrop-blur transition-colors hover:bg-ink"
        >
          {muted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </button>
      ) : null}
    </div>
  );
}

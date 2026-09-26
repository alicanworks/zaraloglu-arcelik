import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <Image
        src="/images/sayfa-arkaplan.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-ink/25" aria-hidden />

      <div className="container-page relative py-14 md:py-16">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex flex-wrap items-center gap-1.5 text-[13px] font-medium text-white/75"
        >
          <Link href="/" className="hover:text-white">
            Ana Sayfa
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-bold text-white">{eyebrow}</span>
        </nav>

        <h1 className="max-w-3xl text-[26px] font-black leading-[1.12] text-white lg:text-[36px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-white/80 md:text-[15px]">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}

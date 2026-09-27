import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PromoBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Image
        src="/images/promo-banner.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-50"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-brand-dark/60" />

      <div className="container-page relative flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <div className="max-w-2xl">
          <Badge variant="brand" size="md">
            Mağazaya Özel
          </Badge>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-[2.5rem]">
            Sezon sonu fırsatları mağazamızda devam ediyor
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/70 md:text-lg">
            Seçili beyaz eşya, klima ve televizyon modellerinde peşin fiyatına
            taksit ve mağazamıza özel indirimli fiyatlar. Detaylar için kampanya
            sayfamızı inceleyin.
          </p>
        </div>
        <Button href="/kampanyalar" variant="primary" size="lg" className="shrink-0">
          Tüm Kampanyalar
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}

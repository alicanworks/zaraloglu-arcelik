import Image from "next/image";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { store } from "@/data/store";
import { Button } from "@/components/ui/button";

export function ContactCTA({
  headline = "Aradığınız ürünü bulamadınız mı?",
  description = "Aradığınız ürün ve güncel mağaza fiyatları için bizimle iletişime geçin. Danışmanlarımız en uygun kampanyayı sizin için değerlendirsin.",
}: {
  headline?: string;
  description?: string;
}) {
  return (
    <section className="py-12 md:py-[3.75rem]">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-lg border border-line px-6 py-14 text-center md:px-16 md:py-20">
          <Image
            src="/images/sayfa-arkaplan.webp"
            alt=""
            fill
            sizes="(max-width: 1328px) 100vw, 1328px"
            className="object-cover"
            aria-hidden
          />
          <div className="absolute inset-0 bg-ink/20" aria-hidden />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold leading-tight text-white md:text-[2.5rem]">
              {headline}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/85 md:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                href={store.whatsappHref}
                variant="dark"
                size="lg"
                className="bg-white text-brand hover:bg-white/90"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp&apos;tan Sor
              </Button>
              <Button
                href={store.phoneHref}
                size="lg"
                className="border border-white/40 bg-transparent text-white hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                Mağazayı Ara
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

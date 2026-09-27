import type { Metadata } from "next";
import Image from "next/image";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCTA } from "@/components/home/ContactCTA";
import { TrustSection } from "@/components/home/TrustSection";
import { Button } from "@/components/ui/button";
import { StoreGallery } from "@/components/store/StoreGallery";
import { store } from "@/data/store";

export const metadata: Metadata = {
  title: "Ümraniye Arçelik Mağazası",
  description:
    "Ümraniye Arçelik mağazası Zaraloğlu Arçelik adresi, çalışma saatleri, telefon ve yol tarifi bilgileri.",
};

export default function MagazamizPage() {
  return (
    <>
      <PageHero
        eyebrow="Mağazamız"
        title="Ümraniye Arçelik Mağazamız"
        description={store.description}
      />

      <section className="py-14 md:py-16">
        <div className="container-page">
          <span className="eyebrow">Galeri</span>
          <h2 className="mt-2.5 text-[22px] font-black leading-[1.15] lg:text-[32px]">
            Mağazamızdan kareler
          </h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-muted md:text-[15px]">
            Ürünleri yerinde görmek, danışmanlarımızla tanışmak ve mağaza
            deneyimimizi keşfetmek için fotoğraflara göz atın.
          </p>
          <div className="mt-8">
            <StoreGallery />
          </div>
        </div>
      </section>

      <section className="border-t border-line py-14 md:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[5/4] overflow-hidden rounded-lg border border-line bg-surface-sunken">
            <Image
              src="/images/magaza-galeri/magaza-6.webp"
              alt={`${store.shortName} Ümraniye mağaza dış cephesi`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-[20px] font-black lg:text-[24px]">Ziyaret bilgileri</h2>
            <dl className="mt-6 space-y-5">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <dt className="text-[13px] font-semibold text-ink">Adres</dt>
                  <dd className="mt-0.5 text-sm text-muted">{store.address.full}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <dt className="text-[13px] font-semibold text-ink">
                    Çalışma Saatleri
                  </dt>
                  <dd className="mt-0.5 text-sm text-muted">
                    {store.openingHours.map((o) => (
                      <span key={o.days} className="block">
                        {o.days}: {o.hours}
                      </span>
                    ))}
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <dt className="text-[13px] font-semibold text-ink">Telefon</dt>
                  <dd className="mt-0.5 text-sm text-muted">
                    <a href={store.phoneHref} className="hover:text-brand">
                      {store.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={store.mapsDirectionsUrl} variant="dark">
                <Navigation className="h-4 w-4" />
                Yol Tarifi Al
              </Button>
              <Button href={store.whatsappHref} variant="whatsapp">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp&apos;tan Yaz
              </Button>
            </div>
          </div>
        </div>

        <div className="container-page mt-12">
          <div className="overflow-hidden rounded-lg border border-line">
            <iframe
              src={store.mapsEmbedUrl}
              title="Mağaza konumu"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full"
            />
          </div>
        </div>
      </section>

      <TrustSection />
      <ContactCTA />
    </>
  );
}

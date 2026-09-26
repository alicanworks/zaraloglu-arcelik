import type { Metadata } from "next";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { store } from "@/data/store";
import { instagramProfile } from "@/data/instagram";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Zaraloğlu Arçelik ile iletişime geçin: telefon, WhatsApp, e-posta, adres ve çalışma saatleri.",
};

export default function IletisimPage() {
  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title="Bize ulaşın"
        description="Güncel kampanya fiyatları, stok durumu ve ürün danışmanlığı için en hızlı yol WhatsApp veya telefon."
      />

      <section className="py-14 md:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-[20px] font-black lg:text-[24px]">İletişim bilgileri</h2>
            <dl className="mt-6 space-y-5">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <dt className="text-[13px] font-semibold text-ink">Adres</dt>
                  <dd className="mt-0.5 text-sm text-muted">{store.address.full}</dd>
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
              <div className="flex gap-3">
                <WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <dt className="text-[13px] font-semibold text-ink">WhatsApp</dt>
                  <dd className="mt-0.5 text-sm text-muted">
                    <a
                      href={store.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand"
                    >
                      {store.whatsappDisplay}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <dt className="text-[13px] font-semibold text-ink">E-posta</dt>
                  <dd className="mt-0.5 text-sm text-muted">
                    <a href={`mailto:${store.email}`} className="hover:text-brand">
                      {store.email}
                    </a>
                  </dd>
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
                <InstagramIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <dt className="text-[13px] font-semibold text-ink">
                    Instagram
                  </dt>
                  <dd className="mt-0.5 text-sm text-muted">
                    <a
                      href={instagramProfile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand"
                    >
                      {instagramProfile.handle}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={store.whatsappHref} variant="whatsapp">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp&apos;tan Sor
              </Button>
              <Button href={store.phoneHref} variant="dark">
                <Phone className="h-4 w-4" />
                Mağazayı Ara
              </Button>
              <Button href={store.mapsDirectionsUrl} variant="outline">
                <Navigation className="h-4 w-4" />
                Yol Tarifi Al
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-line">
            <iframe
              src={store.mapsEmbedUrl}
              title="Mağaza konumu"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[420px] w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}

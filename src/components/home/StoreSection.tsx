import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { store } from "@/data/store";
import { Button } from "@/components/ui/button";
import { StoreVideo } from "./StoreVideo";

export function StoreSection() {
  return (
    <section id="magaza" className="py-12 md:py-[3.75rem]">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-last aspect-[4/5] overflow-hidden rounded-lg border border-line bg-ink lg:order-first">
            <StoreVideo
              src="/videos/magaza-tanitim-genel.mp4"
              poster="/images/magaza-galeri/magaza-6.webp"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div>
            <span className="eyebrow">Mağazamız</span>
            <h2 className="mt-3 text-[22px] font-black leading-[1.15] lg:text-[32px]">
              Arçelik dünyasını mağazamızda keşfedin.
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-muted md:text-[15px]">
              {store.description}
            </p>

            <dl className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <dt className="text-[13px] font-semibold text-ink">Adres</dt>
                  <dd className="mt-0.5 text-sm text-muted">
                    {store.address.full}
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
              <Button href={store.phoneHref} variant="outline">
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

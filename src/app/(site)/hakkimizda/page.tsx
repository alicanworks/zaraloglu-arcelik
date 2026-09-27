import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { TrustSection } from "@/components/home/TrustSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { store } from "@/data/store";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Zaraloğlu Arçelik yetkili satış mağazası hakkında: vizyonumuz, hizmet anlayışımız ve mağaza deneyimimiz.",
};

const stats = [
  { value: "20+", label: "Yıllık deneyim" },
  { value: "5.000+", label: "Mutlu müşteri" },
  { value: "7/24", label: "Satış sonrası destek" },
];

export default function HakkimizdaPage() {
  return (
    <>
      <PageHero
        eyebrow="Hakkımızda"
        title="Yetkili Arçelik bayisi olarak yanınızdayız"
        description="Zaraloğlu Arçelik, uzun yıllardır aynı mahallede hizmet veren, ürünü satın almadan önce deneyimlemenin önemine inanan bir yetkili satış mağazasıdır."
      />

      <section className="py-14 md:py-16">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-[26px] font-black leading-snug text-ink md:text-[34px]">
              Ürünü elinizle görün, kararınızı güvenle verin.
            </h2>
            <div className="mt-4 space-y-5 text-base leading-relaxed text-ink-soft md:text-lg">
              <p>{store.description}</p>
              <p>
                Amacımız, geniş ürün yelpazesini karmaşık bir kataloğa
                dönüştürmeden; yalnızca gerçekten avantajlı olan güncel
                kampanyaları sizinle paylaşmak. Böylece doğru ürüne, doğru
                fiyata ve gereksiz zaman kaybı yaşamadan ulaşırsınız.
              </p>
              <p>
                Mağazamızda beyaz eşyadan ankastre setlere, klimadan
                televizyona kadar tüm ürün gruplarını yerinde inceleyebilir;
                uzman danışmanlarımızdan ihtiyaçlarınıza özel öneriler
                alabilirsiniz. Satış sonrasında teslimat, kurulum ve yetkili
                servis süreçlerinde de yanınızdayız.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-line bg-surface-muted p-4 md:p-6"
                >
                  <div className="text-2xl font-bold text-brand md:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[13px] leading-snug text-muted md:text-sm">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-surface-sunken">
              <Image
                src="/images/magaza-ekibi.jpg"
                alt={`${store.shortName} mağaza ekibi`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-lg border border-line bg-surface p-4 shadow-card sm:flex">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-tint text-brand">
                <BadgeCheck className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold leading-snug text-ink">
                Yetkili Arçelik Bayisi
                <span className="block text-[13px] font-normal text-muted">
                  Arçelik güvencesiyle
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <TrustSection />
      <ContactCTA />
    </>
  );
}

import Image from "next/image";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { store } from "@/data/store";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "20+", label: "Yıllık deneyim" },
  { value: "5.000+", label: "Mutlu müşteri" },
  { value: "%100", label: "Orijinal & faturalı ürün" },
];

export function AboutSection() {
  return (
    <section id="hakkimizda" className="border-y border-line bg-surface-muted py-12 md:py-[3.75rem]">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow">Hakkımızda</span>
            <h2 className="mt-3 text-[22px] font-black leading-[1.15] lg:text-[32px]">
              Yılların deneyimiyle, {store.address.district}&apos;de yetkili Arçelik bayisi
            </h2>
            <div className="mt-4 space-y-4 text-[14px] leading-relaxed text-muted md:text-[15px]">
              <p>
                {store.shortName}, ürünü satın almadan önce yerinde görmenin ve
                denemenin önemine inanan bir yetkili satış mağazasıdır. Beyaz
                eşyadan ankastre setlere, klimadan televizyona kadar tüm ürün
                gruplarını mağazamızda inceleyebilirsiniz.
              </p>
              <p>
                Amacımız geniş ürün yelpazesini karmaşık bir kataloğa
                dönüştürmeden; yalnızca gerçekten avantajlı olan güncel
                kampanyaları sizinle paylaşmak. Satış sonrasında teslimat,
                kurulum ve yetkili servis süreçlerinde de yanınızdayız.
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-line bg-surface p-4"
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block text-2xl font-bold text-brand">
                      {s.value}
                    </span>
                    <span className="mt-1 block text-[13px] leading-snug text-muted">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <Button href="/hakkimizda" variant="dark">
                Hakkımızda
                <ArrowRight className="h-4 w-4" />
              </Button>
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
      </div>
    </section>
  );
}

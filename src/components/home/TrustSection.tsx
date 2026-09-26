import { BadgeCheck, Headset, Tag, Wrench } from "lucide-react";

const points = [
  {
    icon: BadgeCheck,
    title: "Yetkili Arçelik Bayisi",
    description:
      "Tüm ürünler Arçelik güvencesiyle, orijinal ve faturalı olarak teslim edilir.",
  },
  {
    icon: Tag,
    title: "Mağazaya Özel Kampanyalar",
    description:
      "Yalnızca mağazamızda geçerli indirim, taksit ve set avantajlarından yararlanın.",
  },
  {
    icon: Headset,
    title: "Uzman Ürün Danışmanlığı",
    description:
      "İhtiyacınıza en uygun modeli deneyimli danışmanlarımızla birlikte belirleyin.",
  },
  {
    icon: Wrench,
    title: "Satış Sonrası Destek",
    description:
      "Teslimat, kurulum ve yetkili servis süreçlerinde yanınızdayız.",
  },
];

export function TrustSection() {
  return (
    <section className="border-y border-line bg-surface-muted py-12 md:py-[3.75rem]">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Neden Zaraloğlu Arçelik?</span>
          <h2 className="mt-3 text-[22px] font-black leading-[1.15] lg:text-[32px]">
            Doğru ürün, doğru fiyat ve güvenilir hizmet
          </h2>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p) => (
            <div key={p.title} className="flex flex-col bg-surface p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-tint text-brand">
                <p.icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <h3 className="mt-4 text-[15px] font-bold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

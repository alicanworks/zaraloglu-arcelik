import { PageHero } from "./PageHero";

export interface LegalSection {
  heading: string;
  body: string[];
}

export function LegalPage({
  title,
  intro,
  sections,
  updated = "Eylül 2026",
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
  updated?: string;
}) {
  return (
    <>
      <PageHero eyebrow="Yasal" title={title} description={intro} />
      <section className="py-14 md:py-16">
        <div className="container-page max-w-3xl">
          <p className="text-sm text-muted">Son güncelleme: {updated}</p>
          <div className="mt-8 space-y-10">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-[18px] font-black lg:text-[22px]">{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p
                    key={i}
                    className="mt-3 text-[15px] leading-relaxed text-ink-soft"
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <p className="mt-12 rounded-md bg-surface-muted p-4 text-[13px] leading-relaxed text-muted">
            Bu metin bilgilendirme amaçlıdır ve örnek içerik barındırır. Yayına
            almadan önce mağazanızın gerçek ticari ve hukuki bilgileriyle
            güncellenmelidir.
          </p>
        </div>
      </section>
    </>
  );
}

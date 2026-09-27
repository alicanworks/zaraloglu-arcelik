import type { Metadata } from "next";
import { Suspense } from "react";
import { CampaignBrowser } from "@/components/campaigns/CampaignBrowser";
import { ContactCTA } from "@/components/home/ContactCTA";
import { getPublicCampaigns } from "@/lib/public/campaigns";

export const metadata: Metadata = {
  title: "Kampanyalar",
  description:
    "Ümraniye Arçelik mağazası Zaraloğlu Arçelik'teki güncel kampanyalar: beyaz eşya, klima, televizyon, küçük ev aletleri ve ankastre fırsatları.",
};

export default async function KampanyalarPage() {
  const campaigns = await getPublicCampaigns();

  return (
    <>
      <section className="bg-surface">
        <div className="container-page pb-2 pt-10 md:pt-14">
          <h1 className="text-[26px] font-black leading-[1.12] md:text-[36px]">
            Kampanyalar
          </h1>
        </div>
      </section>

      <section className="pb-14 pt-6 md:pb-16">
        <div className="container-page">
          <Suspense fallback={null}>
            <CampaignBrowser campaigns={campaigns} />
          </Suspense>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}

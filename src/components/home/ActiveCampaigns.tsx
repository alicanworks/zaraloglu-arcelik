import { ArrowRight } from "lucide-react";
import type { Campaign } from "@/data/campaigns";
import { CampaignListRow } from "@/components/campaigns/CampaignListRow";
import { campaignAccents } from "@/lib/campaign-colors";
import { SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function ActiveCampaigns({ campaigns }: { campaigns: Campaign[] }) {
  const featured = campaigns.filter((c) => c.featured);
  const shown = featured.length > 0 ? featured : campaigns.slice(0, 3);
  const accents = campaignAccents(shown.map((c) => c.category));

  return (
    <section id="kampanyalar" className="py-12 md:py-[3.75rem]">
      <div className="container-page">
        <SectionHeader
          eyebrow="Güncel Kampanyalar"
          title="Mağazamızdaki aktif fırsatlar"
          description="Sadece kampanya kapsamındaki ürünler listelenir. Detaylar ve güncel stok durumu için kampanyayı inceleyin veya bize ulaşın."
          action={
            <Button href="/kampanyalar" variant="outline">
              Tümünü Gör
              <ArrowRight className="h-4 w-4" />
            </Button>
          }
        />
        <div className="mt-10 flex flex-col gap-4 md:gap-5">
          {shown.map((campaign, i) => (
            <CampaignListRow
              key={campaign.id}
              campaign={campaign}
              priority={i === 0}
              accent={accents[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

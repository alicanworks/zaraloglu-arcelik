import { HeroCampaignSlider } from "@/components/home/HeroCampaignSlider";
import { ActiveCampaigns } from "@/components/home/ActiveCampaigns";
import { PromoBanner } from "@/components/home/PromoBanner";
import { AboutSection } from "@/components/home/AboutSection";
import { StoreSection } from "@/components/home/StoreSection";
import { TrustSection } from "@/components/home/TrustSection";
import { InstagramSection } from "@/components/home/InstagramSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { getPublicCampaigns } from "@/lib/public/campaigns";
import { getPublicBanners } from "@/lib/public/banners";

export default async function HomePage() {
  const [campaigns, banners] = await Promise.all([
    getPublicCampaigns(),
    getPublicBanners(),
  ]);

  return (
    <>
      <HeroCampaignSlider banners={banners} />
      <ActiveCampaigns campaigns={campaigns} />
      <PromoBanner />
      <AboutSection />
      <StoreSection />
      <TrustSection />
      <InstagramSection />
      <ContactCTA />
    </>
  );
}

import { HeroCampaignSlider } from "@/components/home/HeroCampaignSlider";
import { ActiveCampaigns } from "@/components/home/ActiveCampaigns";
import { PromoBanner } from "@/components/home/PromoBanner";
import { AboutSection } from "@/components/home/AboutSection";
import { StoreSection } from "@/components/home/StoreSection";
import { TrustSection } from "@/components/home/TrustSection";
import { InstagramSection } from "@/components/home/InstagramSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { campaigns } from "@/data/campaigns";
import { banners } from "@/data/banners";

export default function HomePage() {
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

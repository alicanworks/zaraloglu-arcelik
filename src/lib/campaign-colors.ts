import type { CampaignCategory } from "@/data/campaigns";

/**
 * A campaign's accent color is derived from its category so the same
 * campaign always renders the same tone everywhere it appears (homepage
 * teaser, /kampanyalar list, campaign detail hero).
 */
const CAMPAIGN_ACCENT: Record<CampaignCategory, string> = {
  "Beyaz Eşya": "#e4032e",
  Klima: "#454c5b",
  Televizyon: "#23262f",
  "Küçük Ev Aletleri": "#37524a",
  Ankastre: "#5a4632",
};

export function campaignAccent(category: CampaignCategory): string {
  return CAMPAIGN_ACCENT[category] ?? "#454c5b";
}

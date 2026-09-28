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

const ACCENT_PALETTE = Object.values(CAMPAIGN_ACCENT);

/**
 * Bir kampanya listesi için, art arda gelen kartların aynı renkte
 * olmasını engelleyen bir renk dizisi üretir (ör. iki "Küçük Ev
 * Aletleri" kampanyası yan yana geldiğinde ikisi de yeşilimsi tonda
 * olmasın). Kategori rengi bir öncekiyle çakışırsa paletten farklı
 * bir tona geçilir.
 */
export function campaignAccents(categories: CampaignCategory[]): string[] {
  const result: string[] = [];
  let previous: string | null = null;

  for (const category of categories) {
    let color = campaignAccent(category);
    if (color === previous) {
      color = ACCENT_PALETTE.find((c) => c !== previous) ?? color;
    }
    result.push(color);
    previous = color;
  }

  return result;
}

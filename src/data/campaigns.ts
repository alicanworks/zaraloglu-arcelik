/**
 * Campaign type definitions.
 *
 * Actual campaign content lives in Supabase (see `src/lib/public/campaigns.ts`
 * for the public read path and `src/lib/admin/campaigns.ts` for admin CRUD).
 * This file only holds the shared shape so UI components stay decoupled from
 * the data source.
 */

export type CampaignCategory =
  | "Beyaz Eşya"
  | "Klima"
  | "Televizyon"
  | "Küçük Ev Aletleri"
  | "Ankastre";

export const campaignCategories: CampaignCategory[] = [
  "Beyaz Eşya",
  "Klima",
  "Televizyon",
  "Küçük Ev Aletleri",
  "Ankastre",
];

export interface CampaignProduct {
  name: string;
  image: string;
  description: string;
  oldPrice?: number;
  campaignPrice?: number;
  /** Optional short spec chips shown on the detail page. */
  highlights?: string[];
}

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  category: CampaignCategory;
  /** One line shown on cards. */
  description: string;
  /** Longer editorial paragraph shown on the detail page. */
  longDescription: string;
  /** Card / grid image (portrait-ish). */
  image: string;
  /** Wide hero image for the detail page and slider. */
  heroImage: string;
  /** Short benefit line, e.g. "24 Aya Varan Taksit". */
  benefit: string;
  /** Tag shown above the headline in the hero slider. */
  tag: string;
  startDate: string; // ISO
  endDate: string; // ISO
  featured: boolean;
  /** Optional headline price for the campaign as a whole. */
  price?: number;
  oldPrice?: number;
  terms: string[];
  products: CampaignProduct[];
}

import Image from "next/image";
import { ArrowRight, CreditCard } from "lucide-react";
import type { Campaign } from "@/data/campaigns";
import { formatDateRange, formatPrice } from "@/lib/utils";
import { campaignAccent } from "@/lib/campaign-colors";
import { store } from "@/data/store";

/**
 * Full-width campaign banner row (arcelik.com.tr/kampanyalar pattern):
 * a solid brand-toned text panel with a white date flag hanging off the top
 * edge, bold headline + short copy, a small translucent pill CTA, and a
 * square photo tile on the right (stacks on top on mobile).
 */
export function CampaignListRow({
  campaign,
  priority = false,
}: {
  campaign: Campaign;
  priority?: boolean;
}) {
  const bg = campaignAccent(campaign.category);

  return (
    <a
      href={store.phoneHref}
      className="group flex flex-col overflow-hidden rounded-[6px] transition-opacity hover:opacity-95 md:flex-row-reverse md:min-h-[300px] lg:min-h-[340px]"
    >
      <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-surface-sunken md:aspect-auto md:w-[300px] lg:w-[360px]">
        <Image
          src={campaign.image}
          alt={campaign.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 360px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        {campaign.price ? (
          <span className="absolute bottom-3 right-3 flex flex-col items-end gap-0.5 rounded-[6px] bg-white px-4 py-2.5 shadow-card md:bottom-4 md:right-4 md:px-5 md:py-3">
            {campaign.oldPrice ? (
              <span className="text-[15px] font-bold text-[#c10228] line-through decoration-2 md:text-[17px]">
                {formatPrice(campaign.oldPrice)}
              </span>
            ) : null}
            <span className="text-[22px] font-black leading-tight text-ink md:text-[26px]">
              {formatPrice(campaign.price)}
            </span>
          </span>
        ) : null}
      </div>

      <div
        className="relative flex flex-1 flex-col justify-center gap-3.5 px-6 pb-8 pt-16 md:px-10 md:pb-10 md:pt-20"
        style={{ backgroundColor: bg }}
      >
        <span className="absolute left-6 top-0 rounded-b-[4px] bg-white px-4 py-2.5 text-[13px] font-black text-ink md:left-10 md:px-5 md:text-[14px]">
          {formatDateRange(campaign.startDate, campaign.endDate)}
        </span>

        {campaign.tag ? (
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-black uppercase tracking-wide text-[#e4032e] shadow-card">
            <CreditCard className="h-3.5 w-3.5" />
            {campaign.tag}
          </span>
        ) : null}

        <h3 className="text-[19px] font-black leading-snug text-white md:text-[28px]">
          {campaign.title}
        </h3>
        <p className="max-w-md text-[14px] leading-relaxed text-white/80 md:text-[15px]">
          {campaign.description}
        </p>
        <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/25 bg-ink/40 px-7 py-2.5 text-[12px] font-black uppercase tracking-wide text-white backdrop-blur transition-colors group-hover:bg-ink/60">
          Mağazadan Bilgi Al
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}

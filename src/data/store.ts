export interface StoreInfo {
  legalName: string;
  shortName: string;
  dealerLine: string;
  description: string;
  address: {
    line1: string;
    district: string;
    city: string;
    full: string;
  };
  phoneDisplay: string;
  phoneHref: string;
  whatsappDisplay: string;
  /** wa.me link, digits only with country code */
  whatsappHref: string;
  email: string;
  mapsDirectionsUrl: string;
  mapsEmbedUrl: string;
  openingHours: { days: string; hours: string }[];
  social: { label: string; href: string }[];
}

const WHATSAPP_NUMBER = "905386958835";
const WHATSAPP_TEXT = encodeURIComponent(
  "Merhaba, güncel mağaza kampanyaları hakkında bilgi almak istiyorum."
);

export const store: StoreInfo = {
  legalName: "Zaraloğlu Dayanıklı Tüketim Malları Tic. Ltd. Şti.",
  shortName: "Zaraloğlu Arçelik",
  dealerLine: "Yetkili Arçelik Satış Mağazası",
  description:
    "Zaraloğlu Arçelik yetkili satış mağazası olarak beyaz eşyadan klimaya, televizyondan ankastre ürünlere kadar geniş bir yelpazede güncel kampanya fiyatlarını sizin için bir araya getiriyoruz. Ürünleri mağazamızda deneyimleyin, uzman danışmanlarımızdan destek alın.",
  address: {
    line1: "Mehmet Akif Mah. Tavukçuyolu Cd. No: 168A",
    district: "Ümraniye",
    city: "İstanbul",
    full: "Mehmet Akif Mah. Tavukçuyolu Cd. No: 168A, 34774 Ümraniye / İstanbul",
  },
  phoneDisplay: "0538 695 88 35",
  phoneHref: "tel:+905386958835",
  whatsappDisplay: "0538 695 88 35",
  whatsappHref: `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`,
  email: "zaralogluarcelik@gmail.com",
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(
      "Tavukçuyolu Cd. No:168A, Mehmet Akif, 34774 Ümraniye/İstanbul"
    ),
  mapsEmbedUrl:
    "https://www.google.com/maps?q=" +
    encodeURIComponent(
      "Tavukçuyolu Cd. No:168A, Mehmet Akif, 34774 Ümraniye/İstanbul"
    ) +
    "&output=embed",
  openingHours: [
    { days: "Pazartesi – Cumartesi", hours: "09:00 – 20:00" },
    { days: "Pazar", hours: "11:00 – 18:00" },
  ],
  social: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/zaralogluarcelik/",
    },
  ],
};

/** Build a prefilled WhatsApp link for a specific campaign. */
export function whatsappForCampaign(campaignTitle: string): string {
  const text = encodeURIComponent(
    `Merhaba, "${campaignTitle}" kampanyası hakkında bilgi almak istiyorum.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

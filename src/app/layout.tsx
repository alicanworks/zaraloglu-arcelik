import type { Metadata } from "next";
import { Sofia_Sans } from "next/font/google";
import "./globals.css";
import { store } from "@/data/store";
import { jsonLdScript } from "@/lib/utils";

const sofiaSans = Sofia_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zaralogluarcelik.com.tr"),
  title: {
    default: `${store.shortName} | Ümraniye Arçelik Mağazası`,
    template: `%s | ${store.shortName}`,
  },
  description: store.description,
  keywords: [
    "Ümraniye Arçelik",
    "Ümraniye Arçelik mağazası",
    "Ümraniye Arçelik bayisi",
    "Arçelik bayi",
    "Arçelik kampanya",
    "beyaz eşya kampanya",
    "klima kampanya",
    "İstanbul Arçelik bayi",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: store.shortName,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ElectronicsStore",
  name: store.shortName,
  alternateName: "Ümraniye Arçelik Mağazası",
  description: store.description,
  areaServed: {
    "@type": "City",
    name: "Ümraniye, İstanbul",
  },
  telephone: store.phoneDisplay,
  email: store.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: store.address.line1,
    addressLocality: store.address.district,
    addressRegion: store.address.city,
    postalCode: "34774",
    addressCountry: "TR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "11:00",
      closes: "18:00",
    },
  ],
  sameAs: store.social.map((s) => s.href),
};

/**
 * Gerçek kök layout — sadece html/body kabuğu, font ve global metadata.
 * Mağaza sitesinin header/footer'ı `(site)/layout.tsx`'te; admin panelin
 * kendi chrome'u `admin/layout.tsx`'te. Böylece admin panel public site
 * header/footer'ını miras almaz.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${sofiaSans.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-surface text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

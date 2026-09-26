import type { Metadata } from "next";
import { Sofia_Sans } from "next/font/google";
import "./globals.css";
import { store } from "@/data/store";

const sofiaSans = Sofia_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zaralogluarcelik.com.tr"),
  title: {
    default: `${store.shortName} | ${store.dealerLine}`,
    template: `%s | ${store.shortName}`,
  },
  description:
    "Zaraloğlu Arçelik yetkili satış mağazası. Güncel beyaz eşya, klima, televizyon, küçük ev aletleri ve ankastre kampanyalarını keşfedin. Mağazamızı ziyaret edin veya WhatsApp'tan yazın.",
  keywords: [
    "Arçelik bayi",
    "Arçelik kampanya",
    "beyaz eşya kampanya",
    "klima kampanya",
    "Ankara Arçelik",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: store.shortName,
  },
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
        {children}
      </body>
    </html>
  );
}

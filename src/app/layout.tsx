import type { Metadata } from "next";
import { Sofia_Sans } from "next/font/google";
import "./globals.css";
import { store } from "@/data/store";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${sofiaSans.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-surface text-ink antialiased">
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          İçeriğe geç
        </a>
        <AnnouncementBar />
        <Header />
        <main id="icerik" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

/**
 * Instagram "bizi takip edin" bölümü içeriği.
 *
 * Videoları `public/videos/reels/` içine koyun (dikey, 9:16, MP4/WebM).
 * İsteğe bağlı kapak görselini `public/images/reels/` içine koyun.
 * `href` verilirse karta tıklayınca ilgili Instagram gönderisi açılır.
 */
export interface ReelVideo {
  id: string;
  /** /videos/reels/xxx.mp4 — henüz yoksa yalnızca kapak (poster) gösterilir. */
  src?: string;
  poster?: string;
  href?: string;
  caption?: string;
}

export const instagramProfile = {
  handle: "@zaralogluarcelik",
  url: "https://www.instagram.com/zaralogluarcelik/",
};

export const reels: ReelVideo[] = [
  {
    id: "hos-geldiniz",
    src: "/videos/reels/hos-geldiniz.mp4",
    poster: "/images/reels/reel-1.svg",
    href: instagramProfile.url,
    caption: "Zaraloğlu Arçelik'e hoş geldiniz!",
  },
  {
    id: "klima-16-agustos-indirim",
    src: "/videos/reels/klima-16-agustos-indirim.mp4",
    poster: "/images/reels/reel-2.svg",
    href: instagramProfile.url,
    caption: "16 Ağustos'a kadar klimada dev indirim",
  },
  {
    id: "klima-temmuz-kampanya",
    src: "/videos/reels/klima-temmuz-kampanya.mp4",
    poster: "/images/reels/reel-3.svg",
    href: instagramProfile.url,
    caption: "Temmuz'a özel dev klima kampanyası",
  },
  {
    id: "klima-yaz-sicaklari",
    src: "/videos/reels/klima-yaz-sicaklari.mp4",
    poster: "/images/reels/reel-4.svg",
    href: instagramProfile.url,
    caption: "Yaz sıcaklarına karşı en avantajlı serinlik",
  },
  {
    id: "cay-icip-cikacaktim",
    src: "/videos/reels/cay-icip-cikacaktim.mp4",
    poster: "/images/reels/reel-5.svg",
    href: instagramProfile.url,
    caption: "“Bir çay içip çıkacağım” diye girdi…",
  },
  {
    id: "cekilis-sonuclari",
    src: "/videos/reels/cekilis-sonuclari.mp4",
    poster: "/images/reels/reel-6.svg",
    href: instagramProfile.url,
    caption: "Çekiliş sonuçları açıklandı!",
  },
];

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local, first-party placeholder artwork is authored as SVG.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      // Yetkili bayi kampanya görselleri (hotlink). Not: kampanya bitince
      // bu URL'ler kırılabilir — mümkünse görseli indirip public/ altına koyun.
      { protocol: "https", hostname: "**.arcelik.com.tr" },
      { protocol: "https", hostname: "**.arcelik.com" },
      { protocol: "https", hostname: "arcelik.com.tr" },
      // Supabase Storage'a yüklenen admin panel görselleri.
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
};

export default nextConfig;

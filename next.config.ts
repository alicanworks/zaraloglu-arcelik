import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  // Next.js hydration + kendi JSON-LD <script> etiketlerimiz için inline'a izin
  // veriyoruz; harici script kaynağı yok, bu yüzden 3. parti script enjeksiyonu
  // yine de engellenir. 'unsafe-eval' sadece dev modunda (React DevTools),
  // production build'te hiç eklenmez.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co",
  // İletişim/mağazamız sayfalarındaki Google Haritalar gömülü konum haritası.
  "frame-src https://www.google.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // cPanel'in "Setup Node.js App" (Passenger) ortamında minimal bağımlılıkla
  // çalışacak bağımsız bir server.js üretir — deploy talimatları için
  // /Users/alican/.claude/plans/immutable-scribbling-crystal.md'ye bakın.
  output: "standalone",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
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

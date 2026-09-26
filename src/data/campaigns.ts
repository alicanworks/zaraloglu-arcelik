/**
 * Campaign data layer.
 *
 * Campaigns are intentionally decoupled from UI components so this file can
 * later be replaced by a CMS / Supabase query or an admin panel without
 * touching the presentation layer. Every consumer imports from here only.
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

export const campaigns: Campaign[] = [
  {
    id: "klima-yaz-firsati",
    slug: "klimalarda-buyuk-yaz-firsati",
    title: "Klimalarda Büyük Yaz Fırsatı",
    category: "Klima",
    description:
      "Seçili inverter klima modellerinde mağazamıza özel indirim ve ücretsiz standart montaj.",
    longDescription:
      "Yaz sıcakları bastırmadan evinizi serinletin. Kampanya kapsamındaki A++ ve A+++ enerji sınıfı inverter klimalarda mağazamıza özel peşin fiyatına 12 aya varan taksit, seçili modellerde ücretsiz standart montaj avantajı sizi bekliyor. Stoklarla sınırlıdır.",
    image: "/images/kampanyalar/klima-kampanya.webp",
    heroImage: "/images/hero-campaign-klima.svg",
    benefit: "Ücretsiz standart montaj + 12 taksit",
    tag: "Yaz Kampanyası",
    startDate: "2026-05-15",
    endDate: "2026-09-30",
    featured: true,
    price: 29999,
    oldPrice: 37999,
    terms: [
      "Kampanya 15 Mayıs – 30 Eylül 2026 tarihleri arasında geçerlidir.",
      "İndirimli fiyatlar yalnızca mağazamızdan yapılan alışverişlerde ve stoklarla sınırlı olarak uygulanır.",
      "Ücretsiz montaj yalnızca standart montaj işlemlerini kapsar; ek malzeme ve işçilik ücrete tabidir.",
      "Taksit seçenekleri anlaşmalı banka kredi kartları için geçerlidir.",
      "Zaraloğlu Arçelik kampanya koşullarında değişiklik yapma hakkını saklı tutar.",
    ],
    products: [
      {
        name: "12.000 BTU Inverter Klima",
        image: "/images/product-ac.svg",
        description: "A++ enerji sınıfı, WiFi kontrol, 25 m²'ye kadar alanlar için ideal.",
        oldPrice: 37999,
        campaignPrice: 29999,
        highlights: ["A++ Enerji", "WiFi Kontrol", "Sessiz Mod"],
      },
      {
        name: "18.000 BTU Inverter Klima",
        image: "/images/product-ac.svg",
        description: "A+++ enerji sınıfı, 35 m²'ye kadar alanlar için yüksek performans.",
        oldPrice: 49999,
        campaignPrice: 41999,
        highlights: ["A+++ Enerji", "Hızlı Soğutma", "Kendini Temizleme"],
      },
      {
        name: "24.000 BTU Salon Tipi Klima",
        image: "/images/product-ac.svg",
        description: "Geniş yaşam alanları için güçlü soğutma ve ısıtma performansı.",
        oldPrice: 64999,
        campaignPrice: 56999,
        highlights: ["A++ Enerji", "Geniş Alan", "4 Yönlü Üfleme"],
      },
    ],
  },
  {
    id: "buzdolabi-degisim",
    slug: "buzdolabinda-degisim-zamani",
    title: "Buzdolabında Değişim Zamanı",
    category: "Beyaz Eşya",
    description:
      "No-Frost gardırop tipi buzdolaplarında eski cihazınıza ek takas desteği.",
    longDescription:
      "Eski buzdolabınızı getirin, yenisine geçerken ek takas desteğinden yararlanın. Kampanya kapsamındaki No-Frost ve gardırop tipi buzdolaplarında geniş iç hacim, düşük enerji tüketimi ve mağazamıza özel fiyatlar bir arada. Teslimat ve eski ürün kurulumu bizden.",
    image: "/images/campaign-buzdolabi.svg",
    heroImage: "/images/hero-campaign-buzdolabi.svg",
    benefit: "Eski ürüne takas desteği + ücretsiz teslimat",
    tag: "Takas Kampanyası",
    startDate: "2026-06-01",
    endDate: "2026-10-31",
    featured: true,
    price: 44999,
    oldPrice: 52999,
    terms: [
      "Kampanya 1 Haziran – 31 Ekim 2026 tarihleri arasında geçerlidir.",
      "Takas desteği yalnızca çalışır durumdaki buzdolapları için geçerlidir ve model bazında değişir.",
      "Ücretsiz teslimat mağazamızın hizmet bölgesi ile sınırlıdır.",
      "Kampanya diğer indirim ve kuponlarla birleştirilemez.",
    ],
    products: [
      {
        name: "No-Frost Gardırop Tipi Buzdolabı",
        image: "/images/product-fridge.svg",
        description: "634 L brüt hacim, çift soğutma sistemi, LED iç aydınlatma.",
        oldPrice: 52999,
        campaignPrice: 44999,
        highlights: ["634 L Hacim", "No-Frost", "A+ Enerji"],
      },
      {
        name: "Alttan Donduruculu No-Frost Buzdolabı",
        image: "/images/product-fridge.svg",
        description: "Nem kontrollü sebzelik, geniş raf düzeni, sessiz kompresör.",
        oldPrice: 39999,
        campaignPrice: 33999,
        highlights: ["Nem Kontrolü", "Sessiz", "A++ Enerji"],
      },
    ],
  },
  {
    id: "camasir-kurutma-set",
    slug: "camasir-ve-kurutma-set-avantaji",
    title: "Çamaşır + Kurutma Set Avantajı",
    category: "Beyaz Eşya",
    description:
      "Çamaşır makinesi ve kurutma makinesini birlikte alana set indirimi.",
    longDescription:
      "Çamaşır makinesi ve kurutma makinesini birlikte alın, set indiriminden yararlanın. Kampanya kapsamındaki modellerde yüksek devir, buhar destekli programlar ve düşük enerji tüketimi ile hem zamandan hem faturadan tasarruf edin.",
    image: "/images/campaign-camasir.svg",
    heroImage: "/images/hero-campaign-camasir.svg",
    benefit: "Set alana %15'e varan ek indirim",
    tag: "Set Kampanyası",
    startDate: "2026-04-01",
    endDate: "2026-12-31",
    featured: false,
    price: 47999,
    oldPrice: 56999,
    terms: [
      "Set indirimi yalnızca çamaşır ve kurutma makinesinin birlikte alınması durumunda geçerlidir.",
      "Kampanya stoklarla sınırlıdır.",
      "Ürünler ayrı ayrı alındığında kampanya fiyatı uygulanmaz.",
    ],
    products: [
      {
        name: "9 kg 1400 Devir Çamaşır Makinesi",
        image: "/images/product-washer.svg",
        description: "Buhar destekli hijyen programı, yarı yükte otomatik tasarruf.",
        oldPrice: 27999,
        campaignPrice: 23999,
        highlights: ["9 kg", "1400 Devir", "Buhar Destekli"],
      },
      {
        name: "9 kg Isı Pompalı Kurutma Makinesi",
        image: "/images/product-washer.svg",
        description: "A+++ enerji sınıfı, kırışık önleyici ve yün koruma programı.",
        oldPrice: 32999,
        campaignPrice: 27999,
        highlights: ["Isı Pompalı", "A+++ Enerji", "Kırışık Önleme"],
      },
    ],
  },
  {
    id: "televizyon-4k-firsat",
    slug: "4k-televizyonlarda-buyuk-ekran-keyfi",
    title: "4K Televizyonlarda Büyük Ekran Keyfi",
    category: "Televizyon",
    description:
      "55\" ve üzeri 4K Google TV modellerinde mağazamıza özel fiyat ve hediye askı aparatı.",
    longDescription:
      "Sinema keyfini evinize taşıyın. Kampanya kapsamındaki 55 inç ve üzeri 4K UHD Google TV modellerinde canlı renkler, yüksek kontrast ve akıcı görüntü teknolojileri mağazamıza özel fiyatlarla. Seçili modellerde duvar askı aparatı hediye.",
    image: "/images/campaign-televizyon.svg",
    heroImage: "/images/hero-campaign-televizyon.svg",
    benefit: "Hediye askı aparatı + 9 taksit",
    tag: "Teknoloji Fırsatı",
    startDate: "2026-05-01",
    endDate: "2026-09-15",
    featured: true,
    price: 34999,
    oldPrice: 42999,
    terms: [
      "Kampanya 1 Mayıs – 15 Eylül 2026 tarihleri arasında geçerlidir.",
      "Hediye duvar askı aparatı seçili modellerde ve stoklarla sınırlıdır.",
      "Taksit seçenekleri anlaşmalı banka kredi kartları için geçerlidir.",
    ],
    products: [
      {
        name: "55\" 4K UHD Google TV",
        image: "/images/product-tv.svg",
        description: "Dolby Vision & Atmos, 4K yükseltme işlemcisi, uzaktan kumandada mikrofon.",
        oldPrice: 42999,
        campaignPrice: 34999,
        highlights: ["4K UHD", "Google TV", "Dolby Vision"],
      },
      {
        name: "65\" 4K UHD Google TV",
        image: "/images/product-tv.svg",
        description: "Geniş ekran deneyimi, 4 HDMI girişi, oyun modu düşük gecikme.",
        oldPrice: 54999,
        campaignPrice: 45999,
        highlights: ["65 inç", "Oyun Modu", "4 HDMI"],
      },
      {
        name: "75\" 4K UHD Google TV",
        image: "/images/product-tv.svg",
        description: "Salonlar için maksimum ekran, gelişmiş yerel karartma teknolojisi.",
        oldPrice: 79999,
        campaignPrice: 67999,
        highlights: ["75 inç", "Yerel Karartma", "Hands-free"],
      },
    ],
  },
  {
    id: "ankastre-set-kampanya",
    slug: "ankastre-set-kampanyasi",
    title: "Ankastre Set Kampanyası",
    category: "Ankastre",
    description:
      "Fırın, ocak ve davlumbazdan oluşan ankastre setlerde birlikte alana özel fiyat.",
    longDescription:
      "Mutfağınızı yenileyin. Fırın, ocak ve davlumbazdan oluşan uyumlu ankastre setlerde mağazamıza özel set fiyatı ve ücretsiz keşif hizmeti. Ürünler tasarım bütünlüğü için birlikte seçilir; uzman danışmanlarımız mutfağınıza en uygun kombinasyonu birlikte belirler.",
    image: "/images/campaign-ankastre.svg",
    heroImage: "/images/hero-campaign-ankastre.svg",
    benefit: "3'lü set alana özel fiyat + ücretsiz keşif",
    tag: "Mutfak Yenileme",
    startDate: "2026-03-01",
    endDate: "2026-11-30",
    featured: false,
    price: 32999,
    oldPrice: 39999,
    terms: [
      "Set fiyatı yalnızca fırın, ocak ve davlumbazın birlikte alınması durumunda geçerlidir.",
      "Ücretsiz keşif hizmeti mağazamızın hizmet bölgesi ile sınırlıdır.",
      "Montaj hizmeti anlaşmalı yetkili servis tarafından ücretli olarak sağlanır.",
    ],
    products: [
      {
        name: "Ankastre Multifonksiyon Fırın",
        image: "/images/product-oven.svg",
        description: "8 pişirme programı, katalitik temizlik, çift camlı kapak.",
        oldPrice: 18999,
        campaignPrice: 15999,
        highlights: ["8 Program", "Katalitik", "A Enerji"],
      },
      {
        name: "Ankastre Cam Seramik Ocak",
        image: "/images/product-oven.svg",
        description: "4 gözlü, dokunmatik kontrol, çocuk kilidi ve zamanlayıcı.",
        oldPrice: 12999,
        campaignPrice: 10499,
        highlights: ["Dokunmatik", "Çocuk Kilidi", "Zamanlayıcı"],
      },
      {
        name: "Ankastre Duvar Tipi Davlumbaz",
        image: "/images/product-oven.svg",
        description: "Yüksek emiş gücü, LED aydınlatma, yıkanabilir metal filtre.",
        oldPrice: 9999,
        campaignPrice: 7999,
        highlights: ["Yüksek Emiş", "LED", "Sessiz"],
      },
    ],
  },
  {
    id: "kucuk-ev-aletleri-mutfak",
    slug: "kucuk-ev-aletlerinde-mutfak-firsatlari",
    title: "Küçük Ev Aletlerinde Mutfak Fırsatları",
    category: "Küçük Ev Aletleri",
    description:
      "Süpürge, kettle, blender ve kahve makinelerinde net indirimli mağaza fiyatları.",
    longDescription:
      "Mutfağınızın yardımcılarında sezon fırsatı. Dik süpürgeler, cam kettle'lar, yüksek devirli blender setleri ve tam otomatik kahve makinelerinde mağazamıza özel net indirimli fiyatlar. Küçük bütçeyle mutfağınızı güçlendirin.",
    image: "/images/campaign-kucukev.svg",
    heroImage: "/images/hero-campaign-kucukev.svg",
    benefit: "Seçili ürünlerde %30'a varan indirim",
    tag: "Sezon İndirimi",
    startDate: "2026-06-15",
    endDate: "2026-08-31",
    featured: false,
    price: 2499,
    oldPrice: 3599,
    terms: [
      "Kampanya 15 Haziran – 31 Ağustos 2026 tarihleri arasında geçerlidir.",
      "İndirim oranları ürün grubuna göre değişiklik gösterir.",
      "Kampanya stoklarla sınırlıdır.",
    ],
    products: [
      {
        name: "1.7 L Cam Kettle",
        image: "/images/product-kettle.svg",
        description: "2200 W hızlı ısıtma, iç aydınlatma, kireç filtreli ağız.",
        oldPrice: 1499,
        campaignPrice: 999,
        highlights: ["1.7 L", "2200 W", "Cam Gövde"],
      },
      {
        name: "Şarjlı Dik Süpürge",
        image: "/images/product-kettle.svg",
        description: "45 dakikaya varan çalışma, HEPA filtre, duvara monte şarj ünitesi.",
        oldPrice: 6999,
        campaignPrice: 4899,
        highlights: ["45 dk", "HEPA", "Şarjlı"],
      },
      {
        name: "Tam Otomatik Espresso Makinesi",
        image: "/images/product-kettle.svg",
        description: "Öğütücülü, süt köpürtme aparatlı, programlanabilir sertlik ayarı.",
        oldPrice: 14999,
        campaignPrice: 11999,
        highlights: ["Öğütücülü", "Süt Köpürtme", "15 Bar"],
      },
    ],
  },
];

export function getFeaturedCampaigns(): Campaign[] {
  return campaigns.filter((c) => c.featured);
}

export function getCampaignBySlug(slug: string): Campaign | undefined {
  return campaigns.find((c) => c.slug === slug);
}

export function getCampaignsByCategory(
  category: CampaignCategory | "Tümü"
): Campaign[] {
  if (category === "Tümü") return campaigns;
  return campaigns.filter((c) => c.category === category);
}

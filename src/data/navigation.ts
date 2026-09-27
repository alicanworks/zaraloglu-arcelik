export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Kampanyalar", href: "/kampanyalar" },
  { label: "Mağazamız", href: "/magazamiz" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

export const footerNav: NavItem[] = [
  { label: "Kampanyalar", href: "/kampanyalar" },
  { label: "Mağazamız", href: "/magazamiz" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

export const legalNav: NavItem[] = [
  { label: "KVKK Aydınlatma Metni", href: "/kvkk" },
  { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  { label: "Çerez Politikası", href: "/cerez-politikasi" },
];

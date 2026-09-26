import Link from "next/link";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { footerNav, legalNav } from "@/data/navigation";
import { store } from "@/data/store";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-footer">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {store.dealerLine}. Güncel mağaza kampanyalarını keşfedin, ürünleri
              yerinde deneyimleyin.
            </p>
            <div className="mt-5 flex gap-2">
              {store.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-line-strong bg-surface text-ink-soft hover:border-ink hover:text-brand"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav>
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-ink">
              Menü
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-ink">
              Yasal
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-ink">
              İletişim
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>{store.address.full}</span>
              </li>
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>
                  {store.openingHours.map((o) => (
                    <span key={o.days} className="block">
                      {o.days}: {o.hours}
                    </span>
                  ))}
                </span>
              </li>
              <li>
                <a
                  href={store.phoneHref}
                  className="flex items-center gap-2.5 hover:text-brand"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand" />
                  {store.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={store.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-brand"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-brand" />
                  WhatsApp: {store.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${store.email}`}
                  className="flex items-center gap-2.5 hover:text-brand"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand" />
                  {store.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {store.legalName} · Tüm hakları saklıdır.
          </p>
          <p className="text-[11px]">
            Bu site bağımsız bir yetkili satış mağazasına aittir. “Arçelik” adı ve
            logosu Arçelik A.Ş.’ye aittir.
          </p>
        </div>
      </div>
    </footer>
  );
}

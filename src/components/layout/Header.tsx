"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { cn } from "@/lib/utils";
import { mainNav } from "@/data/navigation";
import { store } from "@/data/store";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { CategoryStrip } from "./CategoryStrip";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility strip */}
      <div className="hidden border-b border-line bg-surface-muted lg:block">
        <div className="container-page flex h-9 items-center justify-between text-[12px] text-muted">
          <a
            href={store.mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-ink"
          >
            <MapPin className="h-3.5 w-3.5 text-brand" />
            {store.address.full}
          </a>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-brand" />
              {store.openingHours[0].days}: {store.openingHours[0].hours}
            </span>
            <a
              href={store.phoneHref}
              className="inline-flex items-center gap-1.5 font-bold text-ink hover:text-brand"
            >
              <Phone className="h-3.5 w-3.5 text-brand" />
              {store.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "border-b bg-surface transition-shadow",
          scrolled ? "border-line shadow-card" : "border-line"
        )}
      >
        <div className="container-page flex h-14 items-center justify-between gap-6 md:h-[68px]">
          <Logo />

          <nav className="hidden items-center gap-0.5 lg:flex">
            {mainNav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-[14px] transition-colors",
                    active
                      ? "font-black text-brand"
                      : "font-normal text-ink hover:text-brand"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-4 -bottom-[15px] hidden h-[3px] bg-brand transition-transform duration-200 lg:block",
                      active ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <Button
              href={store.phoneHref}
              variant="outline"
              size="sm"
              aria-label="Mağazayı ara"
            >
              <Phone className="h-4 w-4" />
              Mağazayı Ara
            </Button>
            <Button href={store.whatsappHref} variant="whatsapp" size="sm">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </Button>
          </div>

          <MobileMenu />
        </div>
      </div>

      {/* Category tile strip (Arçelik-style) */}
      <div className="hidden md:block">
        <CategoryStrip />
      </div>
    </header>
  );
}

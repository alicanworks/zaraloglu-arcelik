"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { cn } from "@/lib/utils";
import { mainNav } from "@/data/navigation";
import { store } from "@/data/store";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Menüyü aç"
        className="flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-surface-muted"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-[90] bg-ink/50 transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed inset-y-0 right-0 z-[95] flex w-[88%] max-w-sm flex-col border-l border-line bg-white shadow-pop transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <Logo />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Menüyü kapat"
            className="flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-surface-muted"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col px-2 py-3">
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
                  "rounded-[4px] px-3 py-3.5 text-[15px] transition-colors",
                  active
                    ? "bg-brand-tint font-black text-brand"
                    : "font-normal text-ink hover:bg-surface-muted"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-3 border-t border-line px-5 py-5">
          <Button href={store.whatsappHref} variant="whatsapp" className="w-full">
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp&apos;tan Sor
          </Button>
          <Button href={store.phoneHref} variant="outline" className="w-full">
            <Phone className="h-4 w-4" />
            {store.phoneDisplay}
          </Button>
          <a
            href={store.mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-1 pt-1 text-sm text-muted"
          >
            <MapPin className="h-4 w-4 text-brand" />
            {store.address.full}
          </a>
        </div>
      </div>
    </div>
  );
}

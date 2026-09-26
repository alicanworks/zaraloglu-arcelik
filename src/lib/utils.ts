import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const priceFormatter = new Intl.NumberFormat("tr-TR", {
  maximumFractionDigits: 0,
});

/** 29999 -> "29.999 TL" */
export function formatPrice(value: number): string {
  return `${priceFormatter.format(value)} TL`;
}

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** "2026-06-01" -> "1 Haziran 2026" */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

/** "1 Haziran 2026 – 31 Ağustos 2026" */
export function formatDateRange(startIso: string, endIso: string): string {
  return `${formatDate(startIso)} – ${formatDate(endIso)}`;
}

export function isCampaignActive(endIso: string, now: Date = new Date()): boolean {
  const end = new Date(endIso);
  end.setHours(23, 59, 59, 999);
  return end.getTime() >= now.getTime();
}

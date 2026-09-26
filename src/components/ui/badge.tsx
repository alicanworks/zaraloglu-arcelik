import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-[3px] font-black uppercase tracking-wide",
  {
    variants: {
      variant: {
        brand: "bg-brand text-white",
        light: "bg-brand-light text-brand-dark",
        neutral: "bg-surface-sunken text-ink-soft",
        outline: "border border-line-strong text-ink-soft",
        dark: "bg-ink text-white",
      },
      size: {
        sm: "px-2.5 py-1 text-[10px]",
        md: "px-3.5 py-1.5 text-[11px]",
      },
    },
    defaultVariants: { variant: "brand", size: "sm" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

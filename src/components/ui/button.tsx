import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-black uppercase tracking-wide transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-brand text-white hover:bg-brand-dark",
        dark: "bg-ink text-white hover:bg-ink-soft",
        outline:
          "border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-surface-muted",
        ghost: "bg-transparent text-ink hover:bg-surface-muted",
        whatsapp: "bg-[#25D366] text-white hover:bg-[#1ebe5b]",
        link: "text-brand normal-case tracking-normal underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-9 px-5 text-[11px]",
        md: "h-11 px-8 text-[12px]",
        lg: "h-[46px] px-10 text-[12px]",
      },
      shape: {
        sharp: "rounded-none",
        soft: "rounded-[4px]",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "pill",
    },
  }
);

type CommonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { className, variant, size, shape, children, ...rest } = props;
  const classes = cn(buttonVariants({ variant, size, shape }), className);

  if (typeof props.href === "string") {
    const { href, ...anchorRest } =
      rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    const external = /^https?:\/\//.test(props.href) || props.href.startsWith("tel:");
    if (external) {
      return (
        <a
          href={props.href}
          className={classes}
          {...(props.href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...anchorRest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

export { buttonVariants };

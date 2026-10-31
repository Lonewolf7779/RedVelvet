import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4";
  editorial?: boolean;
}

export function Heading({
  as: Component = "h2",
  editorial = true,
  className,
  children,
  ...props
}: HeadingProps) {
  const styles: Record<"h1" | "h2" | "h3" | "h4", string> = {
    h1: "font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-[-0.025em] text-monochrome-pureWhite",
    h2: "font-serif text-2xl sm:text-3xl lg:text-4xl font-light tracking-[-0.02em] text-monochrome-pureWhite",
    h3: "font-serif text-xl sm:text-2xl font-normal tracking-[-0.015em] text-monochrome-alabaster",
    h4: "font-sans text-sm sm:text-base uppercase tracking-[0.15em] font-medium text-monochrome-concrete-light",
  };

  return (
    <Component
      className={twMerge(
        clsx(styles[Component], editorial && "leading-tight", className),
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "body" | "bodyLarge" | "caption" | "overline" | "mono";
}

export function Text({
  variant = "body",
  className,
  children,
  ...props
}: TextProps) {
  const styles: Record<NonNullable<TextProps["variant"]>, string> = {
    bodyLarge:
      "font-sans text-base sm:text-lg font-light text-monochrome-concrete-light leading-relaxed",
    body: "font-sans text-sm sm:text-base font-normal text-monochrome-concrete-DEFAULT leading-relaxed",
    caption:
      "font-sans text-xs uppercase tracking-[0.1em] text-monochrome-concrete-dark font-medium",
    overline:
      "font-mono text-[11px] uppercase tracking-[0.2em] text-wine-accent font-semibold",
    mono: "font-mono text-xs text-monochrome-concrete-dark tracking-wide",
  };

  return (
    <p className={twMerge(clsx(styles[variant], className))} {...props}>
      {children}
    </p>
  );
}

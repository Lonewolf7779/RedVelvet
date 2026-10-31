import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "solid" | "bordered" | "glass";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "bordered", children, ...props }, ref) => {
    const variantStyles: Record<NonNullable<CardProps["variant"]>, string> = {
      solid: "bg-surface-card border border-border-subtle",
      bordered:
        "bg-transparent border border-border-subtle hover:border-border-editorial transition-colors duration-300",
      glass: "bg-surface-overlay backdrop-blur-md border border-border-subtle",
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx("relative p-6 rounded-none", variantStyles[variant], className),
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

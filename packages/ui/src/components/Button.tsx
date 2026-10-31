import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "wine" | "outline" | "ghost" | "charcoal";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans uppercase tracking-[0.12em] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-wine-light disabled:pointer-events-none disabled:opacity-40 border rounded-none select-none";

    const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
      primary:
        "bg-burgundy text-monochrome-pureWhite border-burgundy hover:bg-wine hover:border-wine active:bg-burgundy-deep",
      wine: "bg-wine text-monochrome-pureWhite border-wine hover:bg-wine-light hover:border-wine-light active:bg-wine-deep",
      outline:
        "bg-transparent text-monochrome-pureWhite border-monochrome-concrete-dark hover:border-monochrome-pureWhite hover:bg-monochrome-charcoal-dark",
      ghost:
        "bg-transparent text-monochrome-concrete-light border-transparent hover:text-monochrome-pureWhite hover:bg-monochrome-charcoal-DEFAULT",
      charcoal:
        "bg-monochrome-charcoal-DEFAULT text-monochrome-pureWhite border-monochrome-charcoal-light hover:bg-monochrome-charcoal-light",
    };

    const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
      sm: "h-8 px-4 text-xs",
      md: "h-11 px-6 text-xs",
      lg: "h-14 px-8 text-sm",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={twMerge(
          clsx(baseStyles, variantStyles[variant], sizeStyles[size], className),
        )}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Processing</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

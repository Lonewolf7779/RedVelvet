import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide" | "full";
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "default", children, ...props }, ref) => {
    const sizeStyles: Record<NonNullable<ContainerProps["size"]>, string> = {
      narrow: "max-w-4xl",
      default: "max-w-6xl",
      wide: "max-w-7xl",
      full: "max-w-full",
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            "mx-auto w-full px-6 sm:px-8 lg:px-12",
            sizeStyles[size],
            className,
          ),
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Container.displayName = "Container";

import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={twMerge(
        clsx(
          "animate-pulse bg-monochrome-charcoal-light/60 border border-border-subtle",
          className,
        ),
      )}
      {...props}
    />
  );
}

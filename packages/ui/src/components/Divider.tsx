import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
  tone?: "subtle" | "editorial" | "wine";
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  (
    { className, orientation = "horizontal", tone = "subtle", ...props },
    ref,
  ) => {
    const toneStyles: Record<NonNullable<DividerProps["tone"]>, string> = {
      subtle: "border-border-subtle",
      editorial: "border-border-editorial",
      wine: "border-wine-deep",
    };

    if (orientation === "vertical") {
      return (
        <hr
          ref={ref}
          aria-orientation="vertical"
          className={twMerge(
            clsx(
              "inline-block h-full w-[1px] border-0 border-l border-solid",
              toneStyles[tone],
              className,
            ),
          )}
          {...props}
        />
      );
    }

    return (
      <hr
        ref={ref}
        aria-orientation="horizontal"
        className={twMerge(
          clsx(
            "w-full border-0 border-t border-solid",
            toneStyles[tone],
            className,
          ),
        )}
        {...props}
      />
    );
  },
);

Divider.displayName = "Divider";

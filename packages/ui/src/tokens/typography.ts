/**
 * Project Red Velvet - Editorial Typography Tokens
 *
 * Strict High-Fashion Editorial Aesthetic:
 * - Elegant, high-contrast serif for headings and display
 * - Restrained modern geometric / grotesque sans for clean functional body
 * - Editorial tracking, leading, and proportional scale
 */

export const typography = {
  fonts: {
    serif: [
      '"Cormorant Garamond"',
      '"Playfair Display"',
      '"Didot"',
      '"Bodoni MT"',
      "Georgia",
      "serif",
    ].join(", "),
    sans: [
      '"Inter"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "sans-serif",
    ].join(", "),
    mono: [
      '"JetBrains Mono"',
      "SFMono-Regular",
      "Menlo",
      "Monaco",
      "Consolas",
      "monospace",
    ].join(", "),
  },
  sizes: {
    hero: {
      fontSize: "4.5rem", // 72px
      lineHeight: "1.05",
      letterSpacing: "-0.03em",
      fontWeight: "300",
    },
    display: {
      fontSize: "3.5rem", // 56px
      lineHeight: "1.1",
      letterSpacing: "-0.025em",
      fontWeight: "300",
    },
    h1: {
      fontSize: "2.75rem", // 44px
      lineHeight: "1.15",
      letterSpacing: "-0.02em",
      fontWeight: "400",
    },
    h2: {
      fontSize: "2rem", // 32px
      lineHeight: "1.25",
      letterSpacing: "-0.015em",
      fontWeight: "400",
    },
    h3: {
      fontSize: "1.5rem", // 24px
      lineHeight: "1.35",
      letterSpacing: "-0.01em",
      fontWeight: "400",
    },
    h4: {
      fontSize: "1.125rem", // 18px
      lineHeight: "1.4",
      letterSpacing: "0.02em",
      fontWeight: "500",
    },
    bodyLarge: {
      fontSize: "1.125rem", // 18px
      lineHeight: "1.7",
      letterSpacing: "0.005em",
      fontWeight: "300",
    },
    body: {
      fontSize: "0.9375rem", // 15px
      lineHeight: "1.65",
      letterSpacing: "0.01em",
      fontWeight: "400",
    },
    caption: {
      fontSize: "0.75rem", // 12px
      lineHeight: "1.5",
      letterSpacing: "0.08em",
      textTransform: "uppercase" as const,
      fontWeight: "500",
    },
    overline: {
      fontSize: "0.6875rem", // 11px
      lineHeight: "1.4",
      letterSpacing: "0.15em",
      textTransform: "uppercase" as const,
      fontWeight: "600",
    },
  },
} as const;

export type Typography = typeof typography;

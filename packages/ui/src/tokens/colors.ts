/**
 * Project Red Velvet - Strict Editorial Color Palette
 *
 * Core aesthetic:
 * - Deep burgundy & wine red
 * - Pure white & alabaster
 * - Charcoal & deep noir
 * - Concrete grey & architectural stone
 *
 * PROHIBITED:
 * - Generic SaaS blues / purples
 * - Rainbow gradients
 * - Saturated cartoonish accents
 */

export const colors = {
  burgundy: {
    DEFAULT: "#4A0E17",
    deep: "#2E0A10",
    dark: "#3B0D14",
    mid: "#4A0E17",
    light: "#5E131E",
  },
  wine: {
    DEFAULT: "#721B29",
    deep: "#54141E",
    dark: "#631723",
    mid: "#721B29",
    light: "#8B2333",
    accent: "#9E2A3C",
  },
  monochrome: {
    pureWhite: "#FFFFFF",
    alabaster: "#F8F8F9",
    concrete: {
      light: "#E5E5EA",
      DEFAULT: "#D1D1D6",
      dark: "#8E8E93",
    },
    charcoal: {
      light: "#2C2C2E",
      DEFAULT: "#1C1C1E",
      dark: "#121214",
    },
    noir: "#0A0A0A",
  },
  gold: {
    brass: "#C5A880",
    champagne: "#D4BFA0",
    muted: "#9E8057",
  },
  border: {
    subtle: "rgba(255, 255, 255, 0.08)",
    divider: "rgba(255, 255, 255, 0.15)",
    editorial: "rgba(255, 255, 255, 0.25)",
    concrete: "#2A2A2E",
  },
  surface: {
    canvas: "#0A0A0A",
    card: "#121214",
    elevated: "#18181B",
    overlay: "rgba(10, 10, 10, 0.85)",
  },
} as const;

export type Colors = typeof colors;

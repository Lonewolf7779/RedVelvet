/**
 * Project Red Velvet - Architectural Spacing & Rhythm
 *
 * Grounded in editorial magazine composition:
 * - Generous margins and breathing room
 * - Hairline dividers (0.5px - 1px)
 * - Minimalist radii: sharp or barely rounded (0px - 2px)
 * - Zero excessive rounded pills or bubbled cards
 */

export const spacing = {
  hairline: "1px",
  fine: "2px",
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "3rem", // 48px
  "3xl": "4rem", // 64px
  "4xl": "6rem", // 96px
  "5xl": "8rem", // 128px
} as const;

export const radii = {
  none: "0px",
  sharp: "0px",
  minimal: "1px",
  subtle: "2px",
  input: "2px",
} as const;

export const shadows = {
  none: "none",
  editorial: "0 1px 3px rgba(0, 0, 0, 0.4)",
  subtleModal: "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
  deepGallery: "0 25px 50px -12px rgba(0, 0, 0, 0.9)",
} as const;

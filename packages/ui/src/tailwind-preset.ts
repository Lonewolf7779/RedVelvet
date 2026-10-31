import { colors } from "./tokens/colors";
import { typography } from "./tokens/typography";
import { spacing, radii, shadows } from "./tokens/spacing";

export const redVelvetPreset = {
  theme: {
    extend: {
      colors: {
        burgundy: colors.burgundy,
        wine: colors.wine,
        monochrome: colors.monochrome,
        gold: colors.gold,
        surface: colors.surface,
        border: colors.border,
      },
      fontFamily: {
        serif: typography.fonts.serif.split(", "),
        sans: typography.fonts.sans.split(", "),
        mono: typography.fonts.mono.split(", "),
      },
      spacing: {
        hairline: spacing.hairline,
        fine: spacing.fine,
      },
      borderRadius: {
        none: radii.none,
        sharp: radii.sharp,
        minimal: radii.minimal,
        subtle: radii.subtle,
      },
      boxShadow: {
        editorial: shadows.editorial,
        "subtle-modal": shadows.subtleModal,
        "deep-gallery": shadows.deepGallery,
      },
    },
  },
};

export default redVelvetPreset;

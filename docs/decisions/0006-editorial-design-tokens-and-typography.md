# ADR 0006: Editorial Design Tokens and Typography

## Status

Accepted

## Context

Standard web UI libraries default to generic SaaS aesthetics (rounded bubbly buttons, neon gradients, cartoonish icons) which conflict with the high-fashion editorial identity required by Project Red Velvet.

## Decision

We create a centralized `@red-velvet/ui` package codifying an editorial aesthetic: deep burgundy (`#4A0E17`), wine red (`#721B29`), pure white (`#FFFFFF`), charcoal (`#1C1C1E`), and concrete grey (`#D1D1D6`). Headings use high-contrast editorial serifs (`Cormorant Garamond`), body text uses architectural grotesque sans (`Inter`), and borders use fine hairline rules.

## Consequences

- **Positive**: Cohesive editorial brand identity across public and administrative canvases; zero generic styling.
- **Negative**: Standard generic Tailwind component kits cannot be used without custom styling alignment.

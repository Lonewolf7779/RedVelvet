# ADR 0003: Frontend Architecture and Modular Visuals

## Status

Accepted

## Context

High-fashion editorial web presentations demand rich visuals, 3D WebGL forms, and fluid choreographies (Three.js, React Three Fiber, GSAP, Anime.js). Bundling these libraries across every route causes severe performance penalties, high initial bundle sizes, and poor Core Web Vitals.

## Decision

We mandate Next.js App Router with strict dynamic code-splitting (`next/dynamic` with `ssr: false`) for all 3D canvases and animation controllers. GSAP and Three.js will never be loaded on generic routes or during server-side pre-rendering.

## Consequences

- **Positive**: Rapid initial page loads (<100ms TTFB), low Time-to-Interactive, elegant fallback skeletons.
- **Negative**: Visual components must handle client-only hydration lifecycles cleanly.

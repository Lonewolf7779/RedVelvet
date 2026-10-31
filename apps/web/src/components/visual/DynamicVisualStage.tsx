"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "../common/Skeleton";

// Dynamic import with SSR disabled to ensure Three.js/R3F are strictly loaded on-demand
const DynamicThreeScene = dynamic(() => import("./ThreeScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-72 w-full items-center justify-center sm:h-96">
      <Skeleton className="h-64 w-64 border border-border-subtle" />
    </div>
  ),
});

// Dynamic import for GSAP / Anime.js interactive animation module
const DynamicEditorialAnimation = dynamic(
  () => import("./EditorialAnimation"),
  {
    ssr: false,
    loading: () => (
      <div className="my-8 h-16 w-full animate-pulse bg-surface-card" />
    ),
  },
);

export function DynamicVisualStage() {
  return (
    <div className="relative border border-border-subtle bg-surface-card/40 p-8 sm:p-12">
      <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-wine-light">
        Visual Stage // Three.js & Motion
      </div>
      <DynamicEditorialAnimation />
      <DynamicThreeScene />
    </div>
  );
}

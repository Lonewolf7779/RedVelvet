import React from "react";
import { Container } from "@red-velvet/ui";

export default function Loading() {
  return (
    <Container size="default" className="py-12">
      <div className="h-6 w-32 animate-pulse bg-surface-card" />
      <div className="mt-4 h-10 w-96 animate-pulse bg-surface-card" />
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="h-32 animate-pulse bg-surface-card" />
        <div className="h-32 animate-pulse bg-surface-card" />
        <div className="h-32 animate-pulse bg-surface-card" />
      </div>
    </Container>
  );
}

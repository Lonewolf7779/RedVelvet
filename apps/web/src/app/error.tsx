"use client";

import React, { useEffect } from "react";
import { Container, Button } from "@red-velvet/ui";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Structured client logging
    console.error("[Red Velvet Application Error]:", error);
  }, [error]);

  return (
    <Container size="narrow" className="py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-wine-light">
        Execution Halt
      </p>
      <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-light text-monochrome-pureWhite">
        An unexpected condition occurred
      </h1>
      <p className="mt-4 font-sans text-sm text-monochrome-concrete-dark">
        {error.message || "The application encountered an unhandled exception."}
      </p>
      {error.digest && (
        <p className="mt-2 font-mono text-[11px] text-monochrome-concrete-dark">
          Digest: {error.digest}
        </p>
      )}
      <div className="mt-8 flex justify-center gap-4">
        <Button variant="wine" size="md" onClick={() => reset()}>
          Retry View
        </Button>
      </div>
    </Container>
  );
}

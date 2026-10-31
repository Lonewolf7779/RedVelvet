"use client";

import React from "react";
import { Container, Button } from "@red-velvet/ui";

export default function AdminError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Container size="narrow" className="py-20 text-center">
      <h2 className="font-serif text-2xl text-monochrome-pureWhite">
        Admin Console Error
      </h2>
      <p className="mt-2 text-xs text-monochrome-concrete-dark">
        {error.message || "Failed to render administration interface."}
      </p>
      <div className="mt-6">
        <Button variant="outline" size="sm" onClick={() => reset()}>
          Reset Console
        </Button>
      </div>
    </Container>
  );
}

import React from "react";
import Link from "next/link";
import { Container, Button, Divider } from "@red-velvet/ui";

export default function NotFound() {
  return (
    <Container size="narrow" className="py-28 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-wine-accent">
        Error 404 // Non-Existent Route
      </p>
      <h1 className="mt-4 font-serif text-4xl sm:text-5xl font-light text-monochrome-pureWhite">
        The requested canvas does not exist
      </h1>
      <p className="mx-auto mt-4 max-w-md font-sans text-sm text-monochrome-concrete-dark leading-relaxed">
        The architectural route you are attempting to access has either been
        retired, relocated, or restricted under tenant access controls.
      </p>
      <Divider tone="subtle" className="my-8 mx-auto max-w-xs" />
      <div className="flex justify-center">
        <Link href="/">
          <Button variant="outline" size="md">
            Return to Atelier Canvas
          </Button>
        </Link>
      </div>
    </Container>
  );
}

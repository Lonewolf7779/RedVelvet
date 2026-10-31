import React from "react";
import { Container, Button, Card, Divider } from "@red-velvet/ui";
import { Heading, Text } from "../components/common/Typography";
import { DynamicVisualStage } from "../components/visual/DynamicVisualStage";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden py-16 sm:py-24">
      {/* Editorial Header Section */}
      <Container size="default">
        <div className="mb-12 text-center">
          <Text variant="overline" className="mb-3">
            Milestone RV-001 // Core Architectural Foundation
          </Text>
          <Heading as="h1" className="mb-6">
            The Architecture of Restraint
          </Heading>
          <Text variant="bodyLarge" className="mx-auto max-w-2xl">
            A security-hardened, high-fashion editorial ecosystem designed with
            disciplined proportions, fine architectural dividers, and an
            immutable defense-in-depth posture.
          </Text>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="wine" size="md">
              Explore Architecture
            </Button>
            <Button variant="outline" size="md">
              System Specification
            </Button>
          </div>
        </div>

        <Divider tone="editorial" className="my-16" />

        {/* Dynamic Heavy Visual Stage (Modular: Three.js & Motion loaded on demand) */}
        <section aria-label="Interactive Visual Stage" className="my-16">
          <DynamicVisualStage />
        </section>

        <Divider tone="subtle" className="my-16" />

        {/* Architectural Pillars Grid */}
        <section
          aria-label="System Foundations"
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          <Card variant="bordered" className="p-8">
            <Text variant="overline" className="mb-2">
              01 // Security Posture
            </Text>
            <h3 className="mb-3 font-serif text-2xl font-normal text-monochrome-pureWhite">
              OWASP ASVS Baseline
            </h3>
            <Text variant="body">
              Engineered according to Level 2 verification requirements. Secret
              isolation, content security headers, static taint analysis, and
              strict origin validation.
            </Text>
          </Card>

          <Card variant="bordered" className="p-8">
            <Text variant="overline" className="mb-2">
              02 // Monorepo Topology
            </Text>
            <h3 className="mb-3 font-serif text-2xl font-normal text-monochrome-pureWhite">
              Modular Monorepo
            </h3>
            <Text variant="body">
              Decoupled application domains separating Next.js App Router
              presentation, FastAPI async telemetry, and shared design tokens
              into strict package boundaries.
            </Text>
          </Card>

          <Card variant="bordered" className="p-8">
            <Text variant="overline" className="mb-2">
              03 // Editorial Aesthetics
            </Text>
            <h3 className="mb-3 font-serif text-2xl font-normal text-monochrome-pureWhite">
              Haute Horlogerie & Fashion
            </h3>
            <Text variant="body">
              Deep burgundy accents, pure white typography, concrete grey
              undertones, and hairline architectural dividers. Free from
              cartoonish SaaS templates.
            </Text>
          </Card>
        </section>
      </Container>
    </div>
  );
}

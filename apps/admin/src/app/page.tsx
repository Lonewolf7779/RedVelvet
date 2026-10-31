import React from "react";
import { Container, Card, Divider } from "@red-velvet/ui";

export default function AdminPage() {
  return (
    <Container size="default" className="py-12">
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-wine-accent">
          Operations & Curation
        </p>
        <h1 className="mt-2 font-serif text-3xl font-light text-monochrome-pureWhite">
          System Governance Dashboard
        </h1>
        <p className="mt-2 text-sm text-monochrome-concrete-dark">
          Administrative control plane foundation for tenant organization
          management, media quarantine inspection, and security audit log
          analysis.
        </p>
      </div>

      <Divider tone="subtle" className="my-8" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card variant="solid" className="p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-monochrome-concrete-dark">
            Tenant Isolation
          </p>
          <p className="mt-2 font-serif text-2xl text-monochrome-pureWhite">
            Enforced
          </p>
          <p className="mt-1 text-xs text-monochrome-concrete-dark">
            Multi-tenant boundary active
          </p>
        </Card>
        <Card variant="solid" className="p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-monochrome-concrete-dark">
            Security Posture
          </p>
          <p className="mt-2 font-serif text-2xl text-monochrome-pureWhite">
            OWASP ASVS L2
          </p>
          <p className="mt-1 text-xs text-monochrome-concrete-dark">
            Verification standards enabled
          </p>
        </Card>
        <Card variant="solid" className="p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-monochrome-concrete-dark">
            Media Storage
          </p>
          <p className="mt-2 font-serif text-2xl text-monochrome-pureWhite">
            Presigned Only
          </p>
          <p className="mt-1 text-xs text-monochrome-concrete-dark">
            Zero public bucket exposure
          </p>
        </Card>
      </div>
    </Container>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RED VELVET ADMIN | Curation & Governance Console",
  description: "Secure administrative control portal for Project Red Velvet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-monochrome-noir text-monochrome-pureWhite antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-border-subtle bg-surface-card px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-wine" />
                <span className="font-serif text-sm tracking-[0.2em] text-monochrome-pureWhite">
                  RED VELVET // ADMIN CONSOLE
                </span>
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-monochrome-concrete-dark">
                ENVIRONMENT: LOCAL
              </span>
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}

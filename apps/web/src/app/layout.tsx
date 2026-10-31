import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RED VELVET | Haute Architecture & Editorial Curation",
  description:
    "Security-hardened high-fashion editorial platform and private portfolio ecosystem.",
  keywords: [
    "Editorial",
    "Fashion",
    "Haute Horlogerie",
    "Portfolio",
    "Architecture",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-monochrome-noir text-monochrome-pureWhite antialiased selection:bg-wine selection:text-white">
        {/* Skip to main content accessibility link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-wine focus:px-4 focus:py-2 focus:text-xs focus:font-mono focus:uppercase focus:text-white"
        >
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-40 border-b border-border-subtle bg-surface-canvas/90 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-wine" aria-hidden="true" />
                <span className="font-serif text-lg tracking-[0.25em] text-monochrome-pureWhite">
                  RED VELVET
                </span>
              </div>
              <nav
                aria-label="Primary Navigation"
                className="hidden sm:flex items-center gap-8"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-monochrome-concrete-dark">
                  RV-001 // FOUNDATION ARCHITECTURE
                </span>
              </nav>
            </div>
          </header>
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <footer className="border-t border-border-subtle bg-surface-canvas py-8">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row sm:px-8">
              <p className="font-mono text-xs tracking-wider text-monochrome-concrete-dark">
                PROJECT RED VELVET © 2026. ALL RIGHTS RESERVED.
              </p>
              <p className="font-mono text-xs text-wine-accent">
                OWASP ASVS SECURED // HIGH-FASHION MONOREPO
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

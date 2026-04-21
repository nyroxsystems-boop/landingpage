import type { Metadata } from "next";
import { DM_Sans, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// JetBrains Mono — für Zahlen, OEM-Nummern und Preise im Industrial-Precision-Design
// der Dashboard- und WaWi-Previews. Tabular-nums für spalten-ausgerichtete Zahlen.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.partsunion.de"),
  title: {
    default: "Partsunion – KI-Automatisierung für Autoteilehändler | OEM, WaWi & WhatsApp-Bot",
    template: "%s | Partsunion",
  },
  description:
    "Partsunion automatisiert Ihren Autoteilehandel mit KI: OEM-Ermittlung in Sekunden, 24/7 WhatsApp-Bot, Warenwirtschaft und Retourenreduktion auf unter 4 %. Jetzt kostenlose Demo ansehen.",
  keywords: [
    "Autoteile Software",
    "Autoteilehändler Automatisierung",
    "KI Autoteile",
    "OEM Ermittlung",
    "OEM Nummer finden",
    "WhatsApp Bot Autoteile",
    "Warenwirtschaft Autoteile",
    "Teilehandel Software",
    "Ersatzteile KI",
    "Autoteile-Dashboard",
    "Partsunion",
    "Retourenquote senken",
    "Autoteile Händler Tools",
  ],
  authors: [{ name: "Partsunion", url: "https://www.partsunion.de" }],
  creator: "Partsunion",
  publisher: "Partsunion",
  applicationName: "Partsunion",
  category: "Business Software",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Partsunion – KI-Automatisierung für Autoteilehändler",
    description:
      "OEM-Ermittlung in Sekunden, 24/7 WhatsApp-Bot, Warenwirtschaft und Retourenreduktion – das Betriebssystem für den modernen Teilehandel.",
    type: "website",
    locale: "de_DE",
    url: "https://www.partsunion.de",
    siteName: "Partsunion",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Partsunion – KI-Automatisierung für Autoteilehändler",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partsunion – KI-Automatisierung für Autoteilehändler",
    description:
      "OEM-Ermittlung in Sekunden, 24/7 WhatsApp-Bot und Warenwirtschaft für Autoteilehändler.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.partsunion.de",
    languages: {
      "de-DE": "https://www.partsunion.de",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    // app/icon.png is picked up automatically by Next.js for /icon route,
    // but apple-touch-icon needs an explicit hint.
    apple: [{ url: "/favicon.png", sizes: "512x512", type: "image/png" }],
  },
};

import { Navbar } from "@/components/layout/Navbar";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Footer } from "@/components/landing/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <head>
        {/*
          Favicons + apple-touch-icon are emitted automatically from the
          metadata.icons config above — no manual <link> tags needed.
          NOTE: no preconnect to fonts.googleapis.com / fonts.gstatic.com.
          next/font/google downloads the fonts at build time and serves them
          from /_next/static/media as self-hosted WOFF2. Preconnect links
          to Google would only open an unused connection to Google servers
          (violating DSGVO), so they are intentionally omitted.
        */}
        {/* Schema.org structured data (Organization + WebSite + SoftwareApplication)
            for SEO rich snippets, Knowledge Graph eligibility and Sitelinks Search Box. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.partsunion.de/#organization",
                  name: "Partsunion",
                  url: "https://www.partsunion.de",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://www.partsunion.de/logo.png",
                    width: 512,
                    height: 512,
                  },
                  description:
                    "Partsunion ist das Betriebssystem für den Teilehandel: KI-Automatisierung, OEM-Ermittlung, Warenwirtschaft und 24/7 WhatsApp-Bot für Autoteilehändler.",
                  areaServed: "DE",
                  knowsLanguage: ["de", "en"],
                  sameAs: [],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.partsunion.de/#website",
                  url: "https://www.partsunion.de",
                  name: "Partsunion",
                  description:
                    "KI-Automatisierung für Autoteilehändler: OEM-Ermittlung, WhatsApp-Bot, Warenwirtschaft.",
                  publisher: { "@id": "https://www.partsunion.de/#organization" },
                  inLanguage: "de-DE",
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://www.partsunion.de/#software",
                  name: "Partsunion",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Web",
                  description:
                    "All-in-One SaaS für Autoteilehändler: OEM-Ermittlung in Sekunden, 24/7 WhatsApp-Bot, Warenwirtschaft, Retourenreduktion und automatische Angebotserstellung.",
                  url: "https://www.partsunion.de",
                  offers: {
                    "@type": "Offer",
                    priceCurrency: "EUR",
                    availability: "https://schema.org/InStock",
                    url: "https://www.partsunion.de/pricing",
                  },
                  featureList: [
                    "KI-OEM-Ermittlung aus VIN, HSN/TSN oder Fahrzeugbrief",
                    "24/7 WhatsApp-Bot für Kundenanfragen",
                    "Integrierte Warenwirtschaft (WaWi)",
                    "Automatische Angebotserstellung",
                    "Echtzeit-Bestandssynchronisation",
                    "Retourenmanagement",
                  ],
                  provider: { "@id": "https://www.partsunion.de/#organization" },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased flex flex-col min-h-screen bg-background text-foreground`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}

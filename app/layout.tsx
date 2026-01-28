import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Partsunion - Das Betriebssystem für den Teilehandel",
  description: "Die All-in-One Lösung für Autoteile-Händler. KI-Automatisierung, Warenwirtschaft und 24/7 WhatsApp Bot für mehr Umsatz.",
  keywords: "Autoteile, Teilehandel, KI, WhatsApp Bot, Warenwirtschaft, OEM, Ersatzteile, Automatisierung",
  openGraph: {
    title: "Partsunion - Das Betriebssystem für den Teilehandel",
    description: "KI-gestützte Automatisierung für Autoteilehändler",
    type: "website",
  },
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${dmSans.variable} ${outfit.variable} antialiased flex flex-col min-h-screen bg-background text-foreground`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

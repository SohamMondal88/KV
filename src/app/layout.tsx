import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import LoadingScreen from "@/components/LoadingScreen";
import { PageTransition } from "@/components/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "KuboVista — Discover Offbeat Himalayan Destinations",
    template: "%s | KuboVista",
  },
  description:
    "Travel For Premium Memories. KuboVista curates extraordinary offbeat Himalayan destinations with curated homestays, trekking packages, local food guides, and unforgettable experiences in North Bengal and Sikkim.",
  keywords: [
    "KuboVista", "offbeat travel", "Himalayan destinations", "North Bengal travel", "Sikkim travel",
    "homestays", "trekking", "Kalimpong", "Pelling", "Darjeeling", "Mirik", "Sittong", "Lamahatta",
    "travel packages", "Himalayan food guide", "local experiences", "sustainable tourism"
  ],
  authors: [{ name: "KuboVista Travel" }],
  creator: "KuboVista Travel",
  metadataBase: new URL("https://KuboVista.travel"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "KuboVista",
    title: "KuboVista — Discover Offbeat Himalayan Destinations",
    description: "Discover offbeat Himalayan destinations with KuboVista. Curated homestays, trekking packages, local food guides, and unforgettable experiences.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KuboVista - Offbeat Himalayan Travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KuboVista — Discover Offbeat Himalayan Destinations",
    description: "Discover offbeat Himalayan destinations with KuboVista. Curated homestays, trekking packages, local food guides, and unforgettable experiences.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import AmbientSound from "@/components/AmbientSound";

import { FloatingButtons } from "@/components/FloatingButtons";
import { CommandPalette } from "@/components/CommandPalette";
import { MobileDock } from "@/components/MobileDock";
import { SeasonalEffects } from "@/components/SeasonalEffects";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0B5D3B" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <AuthProvider>
          <CartProvider>
            <SeasonalEffects />
            <CommandPalette />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <AIChatbot />
            <AmbientSound />
            <MobileDock />
            <FloatingButtons />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

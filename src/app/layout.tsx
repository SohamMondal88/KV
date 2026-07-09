import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Hidden Gems — Discover Offbeat Himalayan Destinations",
    template: "%s | Hidden Gems",
  },
  description:
    "Discover offbeat Himalayan destinations with Hidden Gems. Curated homestays, trekking packages, local food guides, and unforgettable experiences in the untouched corners of North Bengal and Sikkim.",
  keywords: [
    "hidden gems", "offbeat travel", "Himalayan destinations", "North Bengal travel", "Sikkim travel",
    "homestays", "trekking", "Kalimpong", "Pelling", "Darjeeling", "Mirik", "Sittong", "Lamahatta",
    "travel packages", "Himalayan food guide", "local experiences", "sustainable tourism"
  ],
  authors: [{ name: "Hidden Gems Travel" }],
  creator: "Hidden Gems Travel",
  metadataBase: new URL("https://hiddengems.travel"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Hidden Gems",
    title: "Hidden Gems — Discover Offbeat Himalayan Destinations",
    description: "Discover offbeat Himalayan destinations with Hidden Gems. Curated homestays, trekking packages, local food guides, and unforgettable experiences.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hidden Gems - Offbeat Himalayan Travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hidden Gems — Discover Offbeat Himalayan Destinations",
    description: "Discover offbeat Himalayan destinations with Hidden Gems. Curated homestays, trekking packages, local food guides, and unforgettable experiences.",
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <AIChatbot />
      </body>
    </html>
  );
}

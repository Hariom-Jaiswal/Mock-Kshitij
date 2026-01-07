import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono, Bebas_Neue, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

import { Toaster } from 'sonner';
import SmoothScroll from './components/SmoothScroll';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  variable: '--font-bebas-neue',
  subsets: ['latin'],
});

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  subsets: ['latin'],
});

const fairyDust = localFont({
  src: "../public/(Assets)/fonts/FairyDustB.ttf",
  variable: '--font-fairy-dust',
  display: 'block',
});

const helveticaNeue = localFont({
  src: "../public/(Assets)/fonts/HelveticaNeue Light.ttf",
  variable: '--font-helvetica-neue',
  display: 'swap',
});

const boldHelvetica = localFont({
  src: "../public/(Assets)/fonts/Bold Helvetica.ttf",
  variable: '--font-bold-helvetica',
  display: 'swap',
});

const amsterdam = localFont({
  src: "../public/(Assets)/fonts/Amsterdam.otf",
  variable: '--font-amsterdam',
  display: 'block',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mithibaikshitij.com'),
  title: {
    default: "Mithibai Kshitij",
    template: "%s | Mithibai Kshitij"
  },
  description: "Soaring beyond the horizon. The Official Website of Mithibai Kshitij - An International Intercollegiate Cultural Festival.",
  keywords: ["Mithibai", "Kshitij", "Festival", "Cultural", "College", "Mumbai", "Events", "Concert"],
  authors: [{ name: "MCC Website Team" }],
  creator: "MCC Website Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.mithibaikshitij.com",
    title: "Mithibai Kshitij",
    description: "Soaring beyond the horizon",
    siteName: "Mithibai Kshitij",
    images: [
      {
        url: "/og-image.png", // Ensure this image exists or use a valid path
        width: 1200,
        height: 630,
        alt: "Mithibai Kshitij",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mithibai Kshitij",
    description: "Soaring beyond the horizon",
    images: ["/og-image.png"],
    creator: "@mithibaikshitij",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/LogoThisYear.jpg",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kshitij",
  },
};

export const viewport: Viewport = {
  themeColor: '#ebb609',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" as="video" href="/pro.mp4" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${playfairDisplay.variable} ${poppins.variable} ${fairyDust.variable} ${helveticaNeue.variable} ${boldHelvetica.variable} ${amsterdam.variable} antialiased bg-black selection:bg-[#FFD700] selection:text-black`}
        suppressHydrationWarning
      >
        <SmoothScroll>
          {children}
          <SpeedInsights />
          <Analytics />
        </SmoothScroll>
        <Toaster position="bottom-center" theme="dark" />
      </body>
    </html>
  );
}
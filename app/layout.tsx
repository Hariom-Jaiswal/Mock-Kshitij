import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono, Bebas_Neue, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
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
  src: "./(Assets)/fonts/FairyDustB.ttf",
  variable: '--font-fairy-dust',
  display: 'block',
});

const helveticaNeue = localFont({
  src: "./(Assets)/fonts/HelveticaNeue Light.ttf",
  variable: '--font-helvetica-neue',
  display: 'swap',
});

const boldHelvetica = localFont({
  src: "./(Assets)/fonts/Bold Helvetica.ttf",
  variable: '--font-bold-helvetica',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Mithibai Kshitij",
  description: "Something Spectacular is on the Horizon",
};

export const viewport: Viewport = {
  themeColor: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${playfairDisplay.variable} ${poppins.variable} ${fairyDust.variable} ${helveticaNeue.variable} ${boldHelvetica.variable} antialiased`}
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

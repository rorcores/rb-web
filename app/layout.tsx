import type { Metadata, Viewport } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const lastica = localFont({
  src: "../public/fonts/Lastica.ttf",
  variable: "--font-lastica",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FOR THOSE WHO BUILD",
  description:
    "FOR THOSE WHO BUILD — an interview show by Rory Garton-Smith. team@forthosewho.build",
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${jetbrainsMono.variable} ${lastica.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

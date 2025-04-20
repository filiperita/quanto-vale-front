import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "./analytics"; // GA4

/* ---------- Fontes ---------- */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ---------- Metadata ---------- */
export const metadata: Metadata = {
  title: "QuantoVale | Avalia o preço do teu produto usado",
  description: "Calcula quanto vale o teu produto usado de forma rápida e gratuita.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics /> {/* Google Analytics 4 */}
      </body>
    </html>
  );
}

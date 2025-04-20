// price‑simulator/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";            // ← importa next/script
import "./globals.css";
import Analytics from "./analytics";         // GA4

/* ---------------- Fontes (Geist) ---------------- */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
/* ------------------------------------------------ */

/* ------------ Metadata / Favicon --------------- */
export const metadata: Metadata = {
  title: "QuantoVale | Avalia o preço do teu produto usado",
  description: "Calcula quanto vale o teu produto usado de forma rápida e gratuita.",
  icons: { icon: "/favicon.ico" },
};
/* ------------------------------------------------ */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <head>
        {/* ------- Favicon ------- */}
        <link rel="icon" href="/favicon.ico" />

        {/* -------- Google Translate (script externo) -------- */}
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        {/* -------- Callback de inicialização --------------- */}
        <Script id="gt-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'pt',
                includedLanguages: 'pt,en',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
              }, 'google_translate_element');
            }
          `}
        </Script>
        {/* --------------------------------------------------- */}
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* --- Widget será injetado neste div --- */}
        <div id="google_translate_element" className="fixed top-4 right-4 z-50" />

        {children}

        <Analytics /> {/* GA4 */}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { Toaster } from "@/components/ui/sonner";
import { site } from "@/lib/site";

import "./globals.css";

/* Fontes auto-hospedadas (Fontsource). Nenhuma requisição ao Google no build nem no navegador. */
const nunito = localFont({
  src: "../fonts/nunito-latin-wght-normal.woff2",
  variable: "--font-nunito",
  weight: "200 1000",
  display: "swap",
});

const sourceSans = localFont({
  src: "../fonts/source-sans-3-latin-wght-normal.woff2",
  variable: "--font-source-sans",
  weight: "200 900",
  display: "swap",
});

const anton = localFont({
  src: "../fonts/anton-latin-400-normal.woff2",
  variable: "--font-anton",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Top Deli",
    "Top Deli Salgados",
    "salgados congelados Salvador",
    "mini coxinha",
    "mini kibe",
    "tortas salgadas",
    "pão metro",
    "salgados para festa Salvador",
    "Luiz Anselmo",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.legalName,
  category: "food",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${nunito.variable} ${sourceSans.variable} ${anton.variable} h-full`}
    >
      <body className="min-h-full">
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}

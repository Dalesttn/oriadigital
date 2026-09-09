import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileCta } from "@/components/layout/MobileCta";
import { RevealObserver } from "@/components/ui/Reveal";
import { OriaGradientDefs } from "@/components/ui/OriaMark";
import { JsonLd } from "@/components/seo/JsonLd";
import { graph, organizationSchema, websiteSchema, personSchema } from "@/lib/schema";
import { site } from "@/lib/site";

/**
 * Fonts are self-hosted by next/font at build time: no render-blocking request
 * to Google, no layout shift, and `display: swap` with a matched fallback so
 * first paint is never blocked. This is most of the typography half of CWV.
 */
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-archivo",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-instrument-serif",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Websites, AI & Automation for Australian Businesses`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.founder.name, url: `${site.url}/about` }],
  creator: site.name,
  publisher: site.name,
  category: "Technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, address: false, email: false },
  ...(site.analytics.gscVerification
    ? { verification: { google: site.analytics.gscVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#f5f1ea",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.language} className={`${archivo.variable} ${instrumentSerif.variable}`}>
      <body>
        {/* Entity graph. Present in the initial HTML on every route. */}
        <JsonLd data={graph(organizationSchema(), websiteSchema(), personSchema())} />

        {/* One gradient paint, referenced by every instance of the mark. */}
        <OriaGradientDefs />

        <a href="#main" className="skip">
          Skip to content
        </a>

        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileCta />
        <RevealObserver />

        {site.analytics.ga4Id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${site.analytics.ga4Id}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${site.analytics.ga4Id}',{anonymize_ip:true});`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

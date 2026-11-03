import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { BookingProvider } from "@/components/booking/BookingProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.title, template: `%s | ${site.brand.name}` },
  description: site.seo.description,
  applicationName: `${site.brand.name} ${site.brand.descriptor}`,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: `${site.brand.name} | ${site.brand.descriptor}`,
    title: site.seo.title,
    description: site.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
  },
  // Projeto demonstrativo: não indexar até virar o site real.
  robots: site.demo ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f4ee",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Ativa os estados ocultos das animações só com JS; desfaz se algo falhar. */
const jsFlag = `(function(d){d.classList.add('js');setTimeout(function(){if(!window.__reveal){d.classList.remove('js')}},3500)})(document.documentElement)`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-paper"
        >
          Pular para o conteúdo
        </a>
        <BookingProvider>{children}</BookingProvider>
        <RevealObserver />
      </body>
    </html>
  );
}

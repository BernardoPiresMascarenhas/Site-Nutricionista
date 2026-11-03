import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/content/site";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { BookingProvider } from "@/components/booking/BookingProvider";

/*
 * Fontes locais (src/app/fonts) — os mesmos arquivos variáveis que o Google Fonts
 * entregava ao next/font/google, agora sem download durante o build.
 * Cada peso é declarado separadamente, como no CSS do Google, para manter a
 * renderização idêntica (o mesmo arquivo variável atende a todos os pesos).
 */
const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-latin-wght-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-wght-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-wght-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/cormorant-garamond-latin-wght-italic.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const manrope = localFont({
  src: [
    { path: "./fonts/manrope-latin-wght-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/manrope-latin-wght-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/manrope-latin-wght-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/manrope-latin-wght-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
  adjustFontFallback: "Arial",
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

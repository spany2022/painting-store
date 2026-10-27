import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Noto_Serif_Oriya } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Loader } from "@/components/layout/Loader";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/motion/Cursor";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const notoOriya = Noto_Serif_Oriya({
  variable: "--font-noto-oriya",
  subsets: ["oriya"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Handcrafted Indian Art & Pattachitra Paintings`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: "/images/art/patta-krishna-indigo.webp", alt: "Pattachitra painting of Krishna on an indigo ground" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#211D19",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
  sameAs: Object.values(site.social),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${cormorant.variable} ${manrope.variable} ${notoOriya.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <StoreProvider>
          <Loader />
          <SmoothScroll />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppFab />
          <Cursor />
        </StoreProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ToastProvider } from "@/components/ui/toast";
import { AdProvider } from "@/components/ads";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolwise.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Toolwise – Simple, Fast & Free Online Tools by GrainZap",
    template: "%s | Toolwise",
  },
  description:
    "Free calculators, developer utilities, PDF tools, image tools, AI tools and student tools — fast, private and easy to use. No sign-up required. Toolwise is a product by GrainZap.",
  keywords: ["online tools", "free calculators", "developer tools", "pdf tools", "image tools", "GrainZap"],
  openGraph: {
    type: "website",
    siteName: "Toolwise",
    title: "Toolwise – Simple, Fast & Free Online Tools by GrainZap",
    description:
      "Free calculators, developer utilities, PDF tools, image tools, AI tools and student tools — all in one place. A product by GrainZap.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolwise – Simple, Fast & Free Online Tools",
    description: "Everything you need. One simple toolkit.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#161822" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Toolwise",
    url: siteUrl,
    publisher: {
      "@type": "Organization",
      name: "GrainZap",
      url: "https://grainzap.com",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <AdProvider>
            <ToastProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </ToastProvider>
          </AdProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

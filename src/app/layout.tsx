import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "@/components/ui/error-boundary";
import LayoutClient from "./layout-client";
import SkipLink from "@/components/ui/a11y/skip-link";
import AnimatedBackground from "@/components/ui/animated-background";
import GroceryAssistant from "@/components/ui/grocery-assistant/grocery-assistant";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: "FMCG Commerce — Ultra-fast Grocery Delivery",
  description: "Premium AI-powered grocery commerce delivering fresh groceries, vegetables, fruits, snacks, dairy, and beverages across India in under 10 minutes. Best prices, free delivery on orders above ₹199.",
  keywords: ["grocery delivery", "online groceries", "fresh vegetables", "fruits online", "snacks delivery", "dairy products", "beverages", "instant delivery", "10 minute delivery", "FMCG", "ecommerce groceries", "Blinkit alternative", "BigBasket alternative", "online shopping India", "daily essentials", "organic groceries"],
  authors: [{ name: "FMCG Commerce" }],
  creator: "FMCG Commerce",
  publisher: "FMCG Commerce",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: env.siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: env.siteUrl,
    title: "FMCG Commerce — Ultra-fast Grocery Delivery in India",
    description: "Premium AI-powered grocery delivery in 10 minutes. Fresh groceries, vegetables, fruits, snacks, dairy & beverages at the best prices.",
    siteName: "FMCG Commerce",
    images: [
      {
        url: `${env.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "FMCG Commerce — Ultra-fast Grocery Delivery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FMCG Commerce — Ultra-fast Grocery Delivery",
    description: "Fresh groceries, fruits, snacks & more delivered in 10 minutes. Free delivery on orders above ₹199.",
    images: [`${env.siteUrl}/og-image.png`],
    creator: "@fmcgcommerce",
  },
  metadataBase: new URL(env.siteUrl),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <html lang="en" className="h-full antialiased">
         <body className="min-h-full flex flex-col bg-[#f2f2f2] relative">
           <AnimatedBackground />
           <SkipLink />
           <LayoutClient>
             <ErrorBoundary>
               <main id="main-content" tabIndex={-1} className="relative z-10">
                 {children}
               </main>
             </ErrorBoundary>
           </LayoutClient>
           <GroceryAssistant />
           <Toaster position="bottom-right" className="z-50" />
         </body>
       </html>
    </>
  );
}

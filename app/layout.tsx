import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Header/Nav";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "ADF",
  description: "Assemblée Des Fondateurs",
  openGraph: {
    title: "ADF",
    description: "Assemblée Des Fondateurs",
    url: "https://adf.com",
    siteName: "ADF",
    // images: [
    // {
    //   url: "https://adf.com/og-image.png",
    //   width: 1200,
    //   height: 630,
    // },
    // ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ADF",
    description: "Assemblée Des Fondateurs",
    // images: ["https://adf.com/twitter-image.png"],
  },
  robots: "index, follow",
  authors: [{ name: "ADF Team" }],
  creator: "rezz_que",
  keywords: ["ADF", "Assemblée", "Fondateurs", "Discord"],
  applicationName: "ADF",
  category: "Social Media",
  classification: "Discord Community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="adf">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        {children}
        <Footer />
        <Toaster position="top-center" visibleToasts={3} />
      </body>
    </html>
  );
}

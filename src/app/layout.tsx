import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "On Our Menu - QR Code Menu Management",
    template: "%s | On Our Menu",
  },
  description:
    "Create and manage digital menus for your restaurant with QR codes. Easy to update, easy to share, and perfect for modern dining experiences.",
  keywords: [
    "restaurant menu",
    "QR code menu",
    "digital menu",
    "restaurant management",
    "menu QR code",
    "contactless menu",
  ],
  authors: [{ name: "On Our Menu" }],
  creator: "On Our Menu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "On Our Menu - QR Code Menu Management",
    description:
      "Create and manage digital menus for your restaurant with QR codes",
    siteName: "On Our Menu",
  },
  twitter: {
    card: "summary_large_image",
    title: "On Our Menu - QR Code Menu Management",
    description:
      "Create and manage digital menus for your restaurant with QR codes",
  },
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <Providers>
          <Header />
          <main className="min-h-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

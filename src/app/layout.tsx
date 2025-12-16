import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BlogSpace - Your Source for Tech & Lifestyle",
    template: "%s | BlogSpace",
  },
  description: "Discover the latest insights in technology, lifestyle, and more on BlogSpace. Join our community of readers today.",
  keywords: ["blog", "technology", "lifestyle", "nextjs", "web development", "programming"],
  openGraph: {
    title: "BlogSpace",
    description: "Discover the latest insights in technology, lifestyle, and more on BlogSpace.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="BlogSpa" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LayoutWrapper>
          <main>
            {children}
            <Toaster />
          </main>
        </LayoutWrapper>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";

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
    default: "Vorqara Endpoint",
    template: "%s | Vorqara Endpoint",
  },
  description:
    "Endpoint security, monitoring, health intelligence, and response platform by Vorqara.",
  icons: {
    icon: [
      {
        url: "/brand/favicon/vorqara-favicon-32.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/brand/favicon/vorqara-favicon-32.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  colorScheme: "light dark",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
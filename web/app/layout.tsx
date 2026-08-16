import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";
import "./mcptrade.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "buggy — Bug Hunting Skills & Security Toolkit",
  description:
    "51 specialized skills for bug hunting, web security, and external red-team workflows. Auto-load by context. 7-Question Gate before every submission.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
      { url: "/logo.png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: "buggy — Bug Hunting Skills & Security Toolkit",
    description: "51 specialized skills for bug hunting, web security, and external red-team workflows.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Buggy Logo" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${GeistMono.variable} ${instrumentSerif.variable} antialiased`}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ParallaxBackground from "@/components/ParallaxBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "  PORTFOLIO - Manoa",
  description: "Manoa - Your Gateway to the Stars",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background: "#000" }}
      >
        <ParallaxBackground />
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}

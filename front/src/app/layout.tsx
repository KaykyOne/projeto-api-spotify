import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar";
import "./globals.css";

// Import custom font families for consistent typography
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for the aplication - used for SEO and page title
export const metadata: Metadata = {
  title: "Sistema Estrelas",
  description: "Criado por Kayky Zioti",
};

// Root layout component - wraps entire aplication with fonts and base styling
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      {/* Body with custom fonts applied through CSS variables */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased justify-center items-center flex`}
      >
        {/* Main container - provides base layout with flexbox and responsive height */}
        <div className="flex flex-col w-full h-screen relative py-5 items-center justify-start">
          {children}
        </div>

      </body>
    </html>
  );
}

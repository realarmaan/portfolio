import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Armaan — AI Research, Rubab, SaltSense, Healing State Vector (HSV)",
  description: "Armaan (12) — student, independent AI researcher and founder building Rubab (AI-human hybrid for education), SaltSense (healthcare records), and the Healing State Vector (HSV) proposal.",
  keywords: ["Armaan", "AI researcher", "Rubab", "SaltSense", "Healing State Vector", "student researcher", "youth founder", "education AI", "health-tech prototype"],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${spaceMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

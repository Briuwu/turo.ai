import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FlashcardStoreProvider } from "@/providers/flashcard-store-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Turo.AI – AI-Powered Study Flashcards",
  description:
    "Upload your lessons and get instant flashcards powered by AI. Study smarter with TuroAI. ",
  keywords: [
    "AI tutor",
    "study tool",
    "flashcard generator",
    "learning",
    "summary tool",
    "GPT tutor",
    "Turo",
    "Turo.AI",
  ],
  openGraph: {
    title: "Turo.AI",
    description: "Turn lecture notes into study-ready flashcards.",
    url: "https://turo-ai.vercel.app/",
    siteName: "Turo.AI",
    images: [
      {
        url: "https://turo-ai.vercel.app/preview.png", // Replace with your image URL
        width: 1200,
        height: 630,
        alt: "Turo.AI App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Turo.AI",
    description: "Upload. Summarize. Flashcards. Learn faster with AI.",
    images: ["https://turo-ai.vercel.app/preview.png"], // Replace with your image
  },
  metadataBase: new URL("https://turo-ai.vercel.app/"),
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
      >
        <FlashcardStoreProvider>{children}</FlashcardStoreProvider>
        <Toaster richColors />
        <Analytics />
      </body>
    </html>
  );
}

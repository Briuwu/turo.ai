import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

import { FlashcardStoreProvider } from "@/providers/flashcard-store-provider";

import { Analytics } from "@vercel/analytics/react";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

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
        <footer>
          <div className="flex flex-col items-center justify-center w-full py-4 text-sm text-center text-gray-500 bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
            <p>
              Made with <span className="text-red-500">❤️</span> by{" "}
              <Link
                href="https://brianmillonte.vercel.app/"
                target="_blank"
                className="underline font-bold"
              >
                Briuwu
              </Link>
            </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}

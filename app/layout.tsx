import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FlashcardStoreProvider } from "@/providers/flashcard-store-provider";
import { Toaster } from "@/components/ui/sonner";

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
    "Upload your lessons and get instant flashcards powered by AI. Study smarter with Turo.AI. ",
  keywords: [
    "AI tutor",
    "study tool",
    "quiz generator",
    "learning",
    "summary tool",
    "GPT tutor",
    "Turo",
    "Turo.AI",
  ],
  // openGraph: {
  //   title: "Turo.AI",
  //   description: "Turn lecture notes into study-ready summaries and quizzes with AI.",
  //   url: "https://Turo.AI.app",
  //   siteName: "Turo.AI",
  //   images: [
  //     {
  //       url: "https://Turo.AI.app/og-image.png", // Replace with your image URL
  //       width: 1200,
  //       height: 630,
  //       alt: "Turo.AI App Preview"
  //     }
  //   ],
  //   locale: "en_US",
  //   type: "website"
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Turo.AI",
  //   description: "Upload. Summarize. Quiz. Learn faster with AI.",
  //   images: ["https://Turo.AI.app/twitter-card.png"] // Replace with your image
  // },
  // metadataBase: new URL("https://Turo.AI.app")
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
      </body>
    </html>
  );
}

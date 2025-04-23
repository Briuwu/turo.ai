"use client";

import { useFlashcardStore } from "@/providers/flashcard-store-provider";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const History = () => {
  const router = useRouter();
  const { flashcards } = useFlashcardStore((state) => state);
  return (
    <div className="mt-10">
      <p className="font-bold">Flashcard History</p>
      <div className="mt-5 flex gap-5 flex-wrap">
        {flashcards.map((flashcard) => (
          <Button
            variant="outline"
            key={flashcard.flashcardId}
            onClick={() => {
              router.refresh();
              router.push(`/?flashcardId=${flashcard.flashcardId}`);
            }}
          >
            {flashcard.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

"use client";

import { useState } from "react";

import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CardComponent } from "./card";

type FlashcardType = Partial<{
  front: string;
  back: string;
}>;

type FlashcardDeck = {
  title: string;
  cards: FlashcardType[];
};

interface FlashcardViewerProps {
  flashcardDeck: FlashcardDeck;
}

export function FlashcardViewer({ flashcardDeck }: FlashcardViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    setIsFlipped(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < flashcardDeck.cards.length - 1 ? prev + 1 : prev
    );
    setIsFlipped(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
  };

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
        variant="outline"
      >
        <Maximize2 className="h-4 w-4" />
        Study Flashcards
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="sm:max-w-md md:max-w-xl"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <DialogHeader>
            <DialogTitle>{flashcardDeck.title}</DialogTitle>
          </DialogHeader>

          <div className="py-6">
            <CardComponent
              card={flashcardDeck.cards[currentIndex]}
              index={currentIndex}
              isFlipped={isFlipped}
            />
          </div>

          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Card {currentIndex + 1} of {flashcardDeck.cards.length}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={currentIndex === flashcardDeck.cards.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

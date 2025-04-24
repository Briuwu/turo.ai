"use client";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { CardComponent } from "./card";
import { flashcardSchema } from "@/app/api/generate/schema";
import { Button } from "./ui/button";
import { ExamSheet } from "./exam";
import { useFlashcardStore } from "@/providers/flashcard-store-provider";
import { Loader, Trash } from "lucide-react";
import { DeepPartial } from "ai";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FlashcardViewer } from "./flashcard-viewer";

type Props = {
  object: DeepPartial<z.infer<typeof flashcardSchema>>[] | undefined;
  isLoading: boolean;
};

export const Flashcards = ({ object, isLoading }: Props) => {
  const searchParams = useSearchParams();
  const flashcardId = searchParams.get("flashcardId");
  const { setFlashcards, flashcards, deleteFlashcard } = useFlashcardStore(
    (state) => state
  );

  const selectedFlashcard = flashcards.find(
    (flashcard) => flashcard.flashcardId === flashcardId
  );

  const invalidFlashcard = object?.[0]?.flashcardId === "invalid-input";

  const isSaved = flashcards.some(
    (flashcard) => flashcard.flashcardId === object?.[0]?.flashcardId
  );
  return (
    <div className="bg-white p-5 md:p-10 rounded-xl text-black border border-black">
      {object && !isLoading && !flashcardId && !invalidFlashcard && (
        <div className="flex flex-col md:flex-row gap-5 justify-between items-center mb-5">
          <Button variant="outline" asChild>
            <PDFDownloadLink
              key={object[0].flashcardId}
              document={
                <ExamSheet
                  questions={
                    object.flatMap(
                      (item) => item.cards?.map((card) => card!.front) || []
                    ) as string[]
                  }
                />
              }
              fileName={`exam_sheet.pdf`}
              className="download-link"
            >
              {({ loading }) => (loading ? "Loading" : "Create PDF")}
            </PDFDownloadLink>
          </Button>
          <p className="text-xs">
            Save your PDF to study them in the Flashcard Viewer
          </p>
          <Button
            onClick={() => {
              setFlashcards([
                ...flashcards,
                ...(object as z.infer<typeof flashcardSchema>[]),
              ]);
            }}
            disabled={isSaved}
          >
            Save Flashcards
          </Button>
        </div>
      )}
      {flashcardId && selectedFlashcard && (
        <div className="mb-5 pb-5 border-b border-black flex flex-col md:flex-row justify-between items-center">
          <div className="space-y-3">
            <p className="font-bold">Flashcard: {selectedFlashcard.name}</p>
            <FlashcardViewer
              flashcardDeck={{
                title: selectedFlashcard.name,
                cards: selectedFlashcard.cards,
              }}
            />
          </div>
          <div className="grid gap-3 md:grid-cols-2 mt-5">
            <Button variant="outline" asChild>
              <PDFDownloadLink
                key={selectedFlashcard.flashcardId}
                document={
                  <ExamSheet
                    questions={
                      selectedFlashcard.cards.map(
                        (card) => card.front
                      ) as string[]
                    }
                  />
                }
                fileName={`exam_sheet.pdf`}
                className="download-link"
              >
                {({ loading }) => (loading ? "Loading" : "Create PDF")}
              </PDFDownloadLink>
            </Button>

            <Button
              variant="destructive"
              onClick={() =>
                confirm("Confirm flashcard deletion.") &&
                deleteFlashcard(flashcardId)
              }
            >
              <Trash /> Delete Flashcard
            </Button>
          </div>
        </div>
      )}
      <p className="text-center font-bold">Generated Flashcards</p>
      <div className="mt-10 grid md:grid-cols-2 gap-5">
        {isLoading ? (
          <Loader className="mx-auto animate-spin col-span-full" />
        ) : flashcardId && selectedFlashcard ? (
          selectedFlashcard.cards.map((card, index) => (
            <CardComponent key={index} card={card} index={index} />
          ))
        ) : invalidFlashcard ? (
          <p className="text-center text-red-500 font-bold col-span-full">
            Invalid input. Please check your PDF file and try again.
          </p>
        ) : object ? (
          object?.flatMap((item) =>
            item.cards?.map((card, index) => (
              <CardComponent key={index} card={card!} index={index} />
            ))
          )
        ) : (
          <p className="text-center col-span-full text-sm opacity-50">
            No flashcard generated. Please upload a PDF file to generate
            flashcards.
          </p>
        )}
      </div>
    </div>
  );
};

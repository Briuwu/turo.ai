import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

export type FlashcardState = {
  flashcards: {
    flashcardId: string;
    name: string;
    cards: {
      id: string;
      front: string;
      back: string;
    }[];
  }[];
};

export type FlashcardActions = {
  clearFlashcards: () => void;
  setFlashcards: (flashcards: FlashcardState["flashcards"]) => void;
  deleteFlashcard: (flashcardId: string) => void;
};

export type FlashcardStore = FlashcardState & FlashcardActions;

export const defaultInitState: FlashcardState = {
  flashcards: [],
};

export const createFlashcardStore = (
  initState: FlashcardState = defaultInitState
) => {
  return createStore<FlashcardStore>()(
    persist(
      (set) => ({
        ...initState,
        clearFlashcards: () => set({ flashcards: [] }),
        setFlashcards: (flashcards) => set({ flashcards }),
        deleteFlashcard: (flashcardId) =>
          set((state) => ({
            flashcards: state.flashcards.filter(
              (flashcard) => flashcard.flashcardId !== flashcardId
            ),
          })),
      }),
      {
        name: "flashcards",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
};

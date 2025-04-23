"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type FlashcardStore,
  createFlashcardStore,
} from "@/stores/flashcard-store";

export type FlashcardStoreApi = ReturnType<typeof createFlashcardStore>;

export const FlashcardStoreContext = createContext<
  FlashcardStoreApi | undefined
>(undefined);

export interface FlashcardStoreProviderProps {
  children: ReactNode;
}

export const FlashcardStoreProvider = ({
  children,
}: FlashcardStoreProviderProps) => {
  const storeRef = useRef<FlashcardStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createFlashcardStore();
  }

  return (
    <FlashcardStoreContext.Provider value={storeRef.current}>
      {children}
    </FlashcardStoreContext.Provider>
  );
};

export const useFlashcardStore = <T,>(
  selector: (store: FlashcardStore) => T
): T => {
  const flashcardStoreContext = useContext(FlashcardStoreContext);

  if (!flashcardStoreContext) {
    throw new Error(
      "useFlashcardStore must be used within a FlashcardStoreProvider"
    );
  }

  return useStore(flashcardStoreContext, selector);
};

import { z } from "zod";

export const flashcardSchema = z.object({
  name: z.string().describe("Name of the flashcard set"),
  flashcardId: z.string().describe("Unique identifier for the flashcard set"),
  cards: z.array(
    z.object({
      id: z.string(),
      front: z
        .string()
        .describe(
          "The question, term, or prompt shown on the front of the flashcard. This is what the user sees first."
        ),
      back: z
        .string()
        .describe(
          "The answer, definition, or explanation shown on the back of the flashcard when flipped."
        ),
    })
  ),
});

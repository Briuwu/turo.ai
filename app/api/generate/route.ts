import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { flashcardSchema } from "./schema";

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamObject({
    model: openai("gpt-4o-mini"),
    schema: flashcardSchema,
    output: "array",
    system: `You are an AI learning assistant that creates effective flashcards to help college students study and retain information.

    Your task is to extract key concepts, terms, and facts from the provided academic text and format them into simple, effective flashcards.

    Each flashcard should be:
    - Clearly written and focused on one concept
    - In a simple Q&A format
    - Designed for active recall`,
    messages: [
      {
        role: "user",
        content: `Create flashcards from the following text:\n\n${context}`,
      },
    ],
  });

  return result.toTextStreamResponse();
}

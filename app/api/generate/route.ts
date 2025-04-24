import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { flashcardSchema } from "./schema";

export async function POST(req: Request) {
  const context = await req.json();

  if (!context) {
    return new Response("No context provided", { status: 400 });
  }

  if (context.length > 8000) {
    return new Response("Context is too long", { status: 400 });
  }

  const result = streamObject({
    model: openai("gpt-4o-mini"),
    schema: flashcardSchema,
    output: "array",
    system: `You are an AI learning assistant that creates effective flashcards to help students study and retain information.

  Before generating flashcards, first verify that the provided content is a valid academic lesson typically found in school or university curricula (e.g., mathematics, biology, history, computer science, etc.).

  If the extracted content is **not related to any academic subject** or **not suitable for educational flashcards** (e.g., personal stories, random internet text, opinions, fictional content), respond with:
  {
    name: {reason why it's not valid},
    flashcardId: 'invalid-input',
    cards: []
  }

  If valid, your task is to extract key concepts, terms, and facts from the academic content and create a maximum of 25 flashcards in simple Q&A format for active recall.

  Each flashcard should:
  - Focus on one clear concept
  - Use simple and direct language
  - Be useful for review and retention

  Do not include explanations, summaries, or notes outside the flashcard format.`,
    messages: [
      {
        role: "user",
        content: `Create flashcards from the following text:\n\n${context}\n\nOnly proceed if the content is a valid academic lesson. Otherwise, respond with the 'invalid-input' format as instructed.`,
      },
    ],
  });

  return result.toTextStreamResponse();
}

"use client";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { flashcardSchema } from "@/app/api/generate/schema";

import { Flashcards } from "./flashcards";
import { UploadForm } from "./upload-form";
import { z } from "zod";
import { DeepPartial } from "ai";

export const AI = () => {
  const { submit, object, isLoading } = useObject({
    api: "/api/generate",
    schema: z.array(flashcardSchema),
  });
  return (
    <div className="grid md:grid-cols-[0.5fr_1fr] gap-10">
      <UploadForm submit={submit} />
      <Flashcards
        object={object as DeepPartial<z.infer<typeof flashcardSchema>>[]}
        isLoading={isLoading}
      />
    </div>
  );
};

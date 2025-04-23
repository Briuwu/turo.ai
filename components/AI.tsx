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
    <>
      <UploadForm submit={submit} />
      <Flashcards
        object={object as DeepPartial<z.infer<typeof flashcardSchema>>[]}
        isLoading={isLoading}
      />
    </>
  );
};

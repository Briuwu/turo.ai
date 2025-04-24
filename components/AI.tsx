"use client";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { flashcardSchema } from "@/app/api/generate/schema";

import { Flashcards } from "./flashcards";
import { UploadForm } from "./upload-form";
import { z } from "zod";
import { DeepPartial } from "ai";

import Image from "next/image";

import logo from "@/public/turo-logo.png";
import banner from "@/public/turo-banner.png";

export const AI = () => {
  const { submit, object, isLoading } = useObject({
    api: "/api/generate",
    schema: z.array(flashcardSchema),
  });
  return (
    <div className="grid md:grid-cols-[0.5fr_1fr] gap-10">
      <div className="grid gap-10 md:sticky md:top-5 self-start">
        <UploadForm submit={submit} />
        <div className="text-center bg-slate-900 order-1 md:order-2 text-white p-10 rounded-xl">
          <div className="max-w-lg grid mx-auto place-items-center gap-5">
            <Image
              src={logo}
              alt=""
              className="mx-auto block md:hidden rounded-xl w-40 mt-5"
            />
            <Image
              src={banner}
              alt=""
              className="mx-auto rounded-xl w-full h-32 object-cover hidden md:block mt-5"
            />
            <div>
              <p className="opacity-75 text-xs font-bold">
                Learn Smarter, Not Harder!
              </p>
              <h1 className="font-bold uppercase text-5xl">Turo.AI</h1>
              <p className="mt-5 max-w-lg mx-auto">
                Upload your lecture pdf — and let Turo.AI turn them into
                bite-sized flashcards using powerful AI.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Flashcards
        object={object as DeepPartial<z.infer<typeof flashcardSchema>>[]}
        isLoading={isLoading}
      />
    </div>
  );
};

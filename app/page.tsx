"use client";
import { AI } from "@/components/AI";

export default function Home() {
  return (
    <main className="p-5 md:p-10 space-y-10">
      <div className="text-center bg-slate-900 text-white p-10 rounded-xl">
        <p className="opacity-75 font-bold">Learn Smarter, Not Harder!</p>
        <h1 className="font-bold uppercase text-5xl">Turo.AI</h1>
        <p className="max-w-xl mx-auto mt-5">
          Upload your lecture pdf — and let Turo.AI turn them into bite-sized
          flashcards using powerful AI.
        </p>
      </div>
      <div className="grid md:grid-cols-[0.5fr_1fr] gap-10">
        <AI />
      </div>
    </main>
  );
}

import Image from "next/image";
import { AI } from "@/components/AI";

import logo from "@/public/turo-logo.png";
import banner from "@/public/turo-banner.png";

export default function Home() {
  return (
    <main className="p-5 max-w-[1440px] mx-auto md:px-2 space-y-10">
      <div className="text-center bg-slate-900 text-white p-10 rounded-xl">
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
      <AI />
    </main>
  );
}

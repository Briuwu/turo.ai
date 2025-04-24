import { AI } from "@/components/AI";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="p-5 max-w-[1440px] mx-auto md:px-2 space-y-10 relative">
      <Suspense>
        <AI />
      </Suspense>
    </main>
  );
}

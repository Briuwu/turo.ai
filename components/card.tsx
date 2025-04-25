"use client";

import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {
  card: Partial<{
    front: string;
    back: string;
  }>;
  index: number;
  isFlipped?: boolean;
};

export const CardComponent = ({ card, index, isFlipped }: Props) => {
  const [reveal, setReveal] = useState(false);

  const handleClick = () => {
    setReveal(!reveal);
  };
  useEffect(() => {
    if (isFlipped) {
      setReveal(false);
    }
  }, [isFlipped, index]);
  return (
    <div>
      <Card
        className={cn(
          "bg-slate-800 cursor-pointer text-white transition-all duration-200 md:h-[250px] flex flex-col justify-between",
          reveal
            ? "bg-neutral-800 flip-horizontal-bottom"
            : "flip-horizontal-top"
        )}
        onClick={handleClick}
      >
        <CardHeader>
          <CardTitle
            className={cn(
              "text-sm font-bold text-center",
              reveal ? "rotate-x-180" : "-rotate-x-180"
            )}
          >
            Flashcard {index + 1}
          </CardTitle>
        </CardHeader>
        <CardContent
          className={cn(
            "text-center max-h-[100px] overflow-y-auto",
            reveal ? "rotate-x-180" : "-rotate-x-180"
          )}
        >
          {reveal ? card.back : card.front}
        </CardContent>
        <CardFooter
          className={cn(
            "text-center text-xs opacity-75",
            reveal ? "rotate-x-180" : "-rotate-x-180"
          )}
        >
          Click to {reveal ? "hide" : "reveal"} answer
        </CardFooter>
      </Card>
    </div>
  );
};

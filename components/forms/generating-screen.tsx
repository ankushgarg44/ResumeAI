"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  "Preparing Resume Information",
  "Applying ATS Template",
  "Generating PDF",
  "Preparing Download",
];

interface GeneratingScreenProps {
  onComplete: () => void;
}

export function GeneratingScreen({ onComplete }: GeneratingScreenProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    STEPS.forEach((_, index) => {
      timers.push(
        setTimeout(() => {
          setCompletedSteps((prev) => [...prev, index]);
        }, (index + 1) * 500)
      );
    });

    // Trigger completion after all steps
    timers.push(
      setTimeout(() => {
        onComplete();
      }, (STEPS.length + 1) * 500)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-300">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-8">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>

      <h3 className="text-2xl font-bold mb-2 text-foreground">
        Generating Your Resume
      </h3>
      <p className="text-muted-foreground mb-10">
        Please wait while we prepare your ATS-optimized resume...
      </p>

      <div className="w-full max-w-sm space-y-4">
        {STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isActive =
            !isCompleted &&
            (index === 0 || completedSteps.includes(index - 1));

          return (
            <div
              key={step}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-all duration-300",
                isCompleted && "bg-emerald-50 dark:bg-emerald-950/20",
                isActive && "bg-primary/5",
                !isCompleted && !isActive && "opacity-40"
              )}
            >
              {isCompleted ? (
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
              ) : isActive ? (
                <Loader2 className="w-5 h-5 text-primary animate-spin shrink-0" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-muted shrink-0" />
              )}
              <span
                className={cn(
                  "text-sm font-medium",
                  isCompleted && "text-emerald-700 dark:text-emerald-400",
                  isActive && "text-foreground",
                  !isCompleted && !isActive && "text-muted-foreground"
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

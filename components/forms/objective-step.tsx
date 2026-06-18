"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ResumeData } from "@/types";

interface ObjectiveStepProps {
  data: ResumeData;
  onChange: (updater: (prev: ResumeData) => ResumeData) => void;
}

export function ObjectiveStep({ data, onChange }: ObjectiveStepProps) {
  const update = (value: string) => {
    onChange((prev) => ({
      ...prev,
      objective: value,
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h3 className="text-2xl font-bold mb-1">Professional Objective</h3>
        <p className="text-muted-foreground">
          Write a short summary or objective to highlight your career goals and overall profile.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="objective">Objective / Summary</Label>
        <Textarea
          id="objective"
          className="min-h-[150px]"
          placeholder="E.g. As an assistant manager, my primary objective is to support the functioning of business operations..."
          value={data.objective}
          onChange={(e) => update(e.target.value)}
        />
      </div>
    </div>
  );
}

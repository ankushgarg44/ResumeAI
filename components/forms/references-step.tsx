"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ResumeData } from "@/types";

interface ReferencesStepProps {
  data: ResumeData;
  onChange: (updater: (prev: ResumeData) => ResumeData) => void;
}

export function ReferencesStep({ data, onChange }: ReferencesStepProps) {
  const update = (value: string) => {
    onChange((prev) => ({
      ...prev,
      references: value,
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h3 className="text-2xl font-bold mb-1">References</h3>
        <p className="text-muted-foreground">
          List your references or indicate that they are available upon request.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="references">References</Label>
        <Textarea
          id="references"
          className="min-h-[100px]"
          placeholder="Available upon request."
          value={data.references}
          onChange={(e) => update(e.target.value)}
        />
      </div>
    </div>
  );
}

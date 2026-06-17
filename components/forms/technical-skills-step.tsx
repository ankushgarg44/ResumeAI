"use client";

import { useState, type KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import type { ResumeData, ResumeTechnicalSkills } from "@/types";

interface TechnicalSkillsStepProps {
  data: ResumeData;
  onChange: (updater: (prev: ResumeData) => ResumeData) => void;
}

type SkillCategory = keyof ResumeTechnicalSkills;

const CATEGORIES: { key: SkillCategory; label: string; placeholder: string }[] = [
  { key: "languages", label: "Languages", placeholder: "e.g. Python, Java, JavaScript" },
  { key: "developerTools", label: "Developer Tools", placeholder: "e.g. VS Code, Eclipse, Git" },
  { key: "frameworks", label: "Technologies / Frameworks", placeholder: "e.g. React, Node.js, Docker" },
];

function TagInput({
  label,
  placeholder,
  tags,
  onAdd,
  onRemove,
}: {
  label: string;
  placeholder: string;
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
}) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = input.trim();
      if (trimmed && !tags.includes(trimmed)) {
        onAdd(trimmed);
        setInput("");
      }
    }
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <Input
        placeholder={`${placeholder} — press Enter to add`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="px-3 py-1.5 text-sm flex items-center gap-1.5 bg-primary/10 text-primary border-primary/20"
            >
              {tag}
              <button
                type="button"
                onClick={() => onRemove(tag)}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export function TechnicalSkillsStep({ data, onChange }: TechnicalSkillsStepProps) {
  const addSkill = (category: SkillCategory, skill: string) => {
    onChange((prev) => ({
      ...prev,
      technicalSkills: {
        ...prev.technicalSkills,
        [category]: [...prev.technicalSkills[category], skill],
      },
    }));
  };

  const removeSkill = (category: SkillCategory, skill: string) => {
    onChange((prev) => ({
      ...prev,
      technicalSkills: {
        ...prev.technicalSkills,
        [category]: prev.technicalSkills[category].filter((s) => s !== skill),
      },
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h3 className="text-2xl font-bold mb-1">Technical Skills</h3>
        <p className="text-muted-foreground">
          Add your technical skills organized by category.
        </p>
      </div>

      <div className="space-y-6">
        {CATEGORIES.map((cat) => (
          <TagInput
            key={cat.key}
            label={cat.label}
            placeholder={cat.placeholder}
            tags={data.technicalSkills[cat.key]}
            onAdd={(skill) => addSkill(cat.key, skill)}
            onRemove={(skill) => removeSkill(cat.key, skill)}
          />
        ))}
      </div>
    </div>
  );
}

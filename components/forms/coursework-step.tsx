"use client";

import { useState, type KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import type { ResumeData } from "@/types";

interface CourseworkStepProps {
  data: ResumeData;
  onChange: (updater: (prev: ResumeData) => ResumeData) => void;
}

export function CourseworkStep({ data, onChange }: CourseworkStepProps) {
  const [inputValue, setInputValue] = useState("");

  const addCourse = (course: string) => {
    const trimmed = course.trim();
    if (!trimmed || data.coursework.includes(trimmed)) return;
    onChange((prev) => ({
      ...prev,
      coursework: [...prev.coursework, trimmed],
    }));
    setInputValue("");
  };

  const removeCourse = (course: string) => {
    onChange((prev) => ({
      ...prev,
      coursework: prev.coursework.filter((c) => c !== course),
    }));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCourse(inputValue);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h3 className="text-2xl font-bold mb-1">Relevant Coursework</h3>
        <p className="text-muted-foreground">
          Add courses relevant to your target role. Type a course name and press Enter.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="e.g. Data Structures — press Enter to add"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {data.coursework.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {data.coursework.map((course) => (
              <Badge
                key={course}
                variant="secondary"
                className="px-3 py-1.5 text-sm flex items-center gap-1.5 bg-primary/10 text-primary border-primary/20"
              >
                {course}
                <button
                  type="button"
                  onClick={() => removeCourse(course)}
                  className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {data.coursework.length === 0 && (
          <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">
            <p className="font-medium">No courses added yet</p>
            <p className="text-sm mt-1">
              Examples: Data Structures, Algorithms, Operating Systems, Database Management
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { createEmptyEducation } from "@/hooks/use-resume-builder";
import type { ResumeData, ResumeEducation } from "@/types";

interface EducationStepProps {
  data: ResumeData;
  onChange: (updater: (prev: ResumeData) => ResumeData) => void;
}

export function EducationStep({ data, onChange }: EducationStepProps) {
  const addEducation = () => {
    onChange((prev) => ({
      ...prev,
      education: [...prev.education, createEmptyEducation()],
    }));
  };

  const removeEducation = (id: string) => {
    onChange((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const updateEducation = (
    id: string,
    field: keyof ResumeEducation,
    value: string
  ) => {
    onChange((prev) => ({
      ...prev,
      education: prev.education.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-1">Education</h3>
          <p className="text-muted-foreground">
            Add your educational background, starting with the most recent.
          </p>
        </div>
        <Button variant="outline" onClick={addEducation} className="bg-background shrink-0">
          <Plus className="w-4 h-4 mr-2" /> Add Education
        </Button>
      </div>

      {data.education.length === 0 && (
        <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">
          <p className="font-medium">No education entries yet</p>
          <p className="text-sm mt-1">Click &quot;Add Education&quot; to get started.</p>
        </div>
      )}

      {data.education.map((edu, index) => (
        <Card key={edu.id} className="p-6 border-border relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Education #{index + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(edu.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>University / Institution</Label>
              <Input
                placeholder="State University"
                value={edu.university}
                onChange={(e) => updateEducation(edu.id, "university", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Degree</Label>
              <Input
                placeholder="Bachelor of Science in Computer Science"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                placeholder="City, State"
                value={edu.location}
                onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>CGPA / GPA</Label>
              <Input
                placeholder="3.8 / 4.0"
                value={edu.cgpa}
                onChange={(e) => updateEducation(edu.id, "cgpa", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="month"
                value={edu.startDate}
                onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="month"
                value={edu.endDate}
                onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

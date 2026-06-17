"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, X } from "lucide-react";
import { createEmptyExperience } from "@/hooks/use-resume-builder";
import type { ResumeData } from "@/types";

interface ExperienceStepProps {
  data: ResumeData;
  onChange: (updater: (prev: ResumeData) => ResumeData) => void;
}

export function ExperienceStep({ data, onChange }: ExperienceStepProps) {
  const addExperience = () => {
    onChange((prev) => ({
      ...prev,
      experience: [...prev.experience, createEmptyExperience()],
    }));
  };

  const removeExperience = (id: string) => {
    onChange((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  };

  const updateField = (id: string, field: string, value: string) => {
    onChange((prev) => ({
      ...prev,
      experience: prev.experience.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    }));
  };

  const updateBullet = (id: string, bulletIndex: number, value: string) => {
    onChange((prev) => ({
      ...prev,
      experience: prev.experience.map((e) =>
        e.id === id
          ? { ...e, bullets: e.bullets.map((b, i) => (i === bulletIndex ? value : b)) }
          : e
      ),
    }));
  };

  const addBullet = (id: string) => {
    onChange((prev) => ({
      ...prev,
      experience: prev.experience.map((e) =>
        e.id === id ? { ...e, bullets: [...e.bullets, ""] } : e
      ),
    }));
  };

  const removeBullet = (id: string, bulletIndex: number) => {
    onChange((prev) => ({
      ...prev,
      experience: prev.experience.map((e) =>
        e.id === id
          ? { ...e, bullets: e.bullets.filter((_, i) => i !== bulletIndex) }
          : e
      ),
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-1">Experience</h3>
          <p className="text-muted-foreground">
            List your relevant experience, starting with the most recent.
          </p>
        </div>
        <Button variant="outline" onClick={addExperience} className="bg-background shrink-0">
          <Plus className="w-4 h-4 mr-2" /> Add Experience
        </Button>
      </div>

      {data.experience.length === 0 && (
        <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">
          <p className="font-medium">No experience entries yet</p>
          <p className="text-sm mt-1">Click &quot;Add Experience&quot; to get started.</p>
        </div>
      )}

      {data.experience.map((exp, index) => (
        <Card key={exp.id} className="p-6 border-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Experience #{index + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeExperience(exp.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Company</Label>
              <Input
                placeholder="Company Name"
                value={exp.company}
                onChange={(e) => updateField(exp.id, "company", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Role / Title</Label>
              <Input
                placeholder="Software Engineer Intern"
                value={exp.role}
                onChange={(e) => updateField(exp.id, "role", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                placeholder="City, State"
                value={exp.location}
                onChange={(e) => updateField(exp.id, "location", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateField(exp.id, "startDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => updateField(exp.id, "endDate", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Bullet Points</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addBullet(exp.id)}
                className="h-7 text-xs text-primary"
              >
                <Plus className="w-3 h-3 mr-1" /> Add Bullet
              </Button>
            </div>
            {exp.bullets.map((bullet, bIdx) => (
              <div key={bIdx} className="flex items-start gap-2">
                <span className="mt-2.5 text-muted-foreground text-sm">•</span>
                <Input
                  placeholder="Describe an achievement or responsibility..."
                  value={bullet}
                  onChange={(e) => updateBullet(exp.id, bIdx, e.target.value)}
                  className="flex-1"
                />
                {exp.bullets.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeBullet(exp.id, bIdx)}
                    className="shrink-0 h-9 w-9 text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

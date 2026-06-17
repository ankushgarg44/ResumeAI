"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, X } from "lucide-react";
import { createEmptyProject } from "@/hooks/use-resume-builder";
import type { ResumeData } from "@/types";

interface ProjectsStepProps {
  data: ResumeData;
  onChange: (updater: (prev: ResumeData) => ResumeData) => void;
}

export function ProjectsStep({ data, onChange }: ProjectsStepProps) {
  const addProject = () => {
    onChange((prev) => ({
      ...prev,
      projects: [...prev.projects, createEmptyProject()],
    }));
  };

  const removeProject = (id: string) => {
    onChange((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const updateField = (id: string, field: string, value: string) => {
    onChange((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    }));
  };

  const updateBullet = (id: string, bulletIndex: number, value: string) => {
    onChange((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id
          ? { ...p, bullets: p.bullets.map((b, i) => (i === bulletIndex ? value : b)) }
          : p
      ),
    }));
  };

  const addBullet = (id: string) => {
    onChange((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, bullets: [...p.bullets, ""] } : p
      ),
    }));
  };

  const removeBullet = (id: string, bulletIndex: number) => {
    onChange((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id
          ? { ...p, bullets: p.bullets.filter((_, i) => i !== bulletIndex) }
          : p
      ),
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-1">Projects</h3>
          <p className="text-muted-foreground">
            Showcase personal or academic projects with technologies used.
          </p>
        </div>
        <Button variant="outline" onClick={addProject} className="bg-background shrink-0">
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>

      {data.projects.length === 0 && (
        <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">
          <p className="font-medium">No projects added yet</p>
          <p className="text-sm mt-1">Click &quot;Add Project&quot; to get started.</p>
        </div>
      )}

      {data.projects.map((proj, index) => (
        <Card key={proj.id} className="p-6 border-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Project #{index + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeProject(proj.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Project Title</Label>
              <Input
                placeholder="Gym Reservation Bot"
                value={proj.title}
                onChange={(e) => updateField(proj.id, "title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                placeholder="January 2021"
                value={proj.date}
                onChange={(e) => updateField(proj.id, "date", e.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Technologies (comma-separated)</Label>
              <Input
                placeholder="Python, Selenium, Google Cloud Console"
                value={proj.technologies}
                onChange={(e) => updateField(proj.id, "technologies", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Bullet Points</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addBullet(proj.id)}
                className="h-7 text-xs text-primary"
              >
                <Plus className="w-3 h-3 mr-1" /> Add Bullet
              </Button>
            </div>
            {proj.bullets.map((bullet, bIdx) => (
              <div key={bIdx} className="flex items-start gap-2">
                <span className="mt-2.5 text-muted-foreground text-sm">•</span>
                <Input
                  placeholder="Describe what you built or achieved..."
                  value={bullet}
                  onChange={(e) => updateBullet(proj.id, bIdx, e.target.value)}
                  className="flex-1"
                />
                {proj.bullets.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeBullet(proj.id, bIdx)}
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

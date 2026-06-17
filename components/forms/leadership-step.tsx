"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, X } from "lucide-react";
import { createEmptyLeadership } from "@/hooks/use-resume-builder";
import type { ResumeData } from "@/types";

interface LeadershipStepProps {
  data: ResumeData;
  onChange: (updater: (prev: ResumeData) => ResumeData) => void;
}

export function LeadershipStep({ data, onChange }: LeadershipStepProps) {
  const addLeadership = () => {
    onChange((prev) => ({
      ...prev,
      leadership: [...prev.leadership, createEmptyLeadership()],
    }));
  };

  const removeLeadership = (id: string) => {
    onChange((prev) => ({
      ...prev,
      leadership: prev.leadership.filter((l) => l.id !== id),
    }));
  };

  const updateField = (id: string, field: string, value: string) => {
    onChange((prev) => ({
      ...prev,
      leadership: prev.leadership.map((l) =>
        l.id === id ? { ...l, [field]: value } : l
      ),
    }));
  };

  const updateBullet = (id: string, bulletIndex: number, value: string) => {
    onChange((prev) => ({
      ...prev,
      leadership: prev.leadership.map((l) =>
        l.id === id
          ? { ...l, bullets: l.bullets.map((b, i) => (i === bulletIndex ? value : b)) }
          : l
      ),
    }));
  };

  const addBullet = (id: string) => {
    onChange((prev) => ({
      ...prev,
      leadership: prev.leadership.map((l) =>
        l.id === id ? { ...l, bullets: [...l.bullets, ""] } : l
      ),
    }));
  };

  const removeBullet = (id: string, bulletIndex: number) => {
    onChange((prev) => ({
      ...prev,
      leadership: prev.leadership.map((l) =>
        l.id === id
          ? { ...l, bullets: l.bullets.filter((_, i) => i !== bulletIndex) }
          : l
      ),
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-1">Leadership / Extracurricular</h3>
          <p className="text-muted-foreground">
            Highlight leadership roles, volunteer work, or extracurricular activities.
          </p>
        </div>
        <Button variant="outline" onClick={addLeadership} className="bg-background shrink-0">
          <Plus className="w-4 h-4 mr-2" /> Add Leadership
        </Button>
      </div>

      {data.leadership.length === 0 && (
        <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">
          <p className="font-medium">No leadership entries yet</p>
          <p className="text-sm mt-1">Click &quot;Add Leadership&quot; to get started.</p>
        </div>
      )}

      {data.leadership.map((lead, index) => (
        <Card key={lead.id} className="p-6 border-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Leadership #{index + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeLeadership(lead.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Organization</Label>
              <Input
                placeholder="Organization Name"
                value={lead.organization}
                onChange={(e) => updateField(lead.id, "organization", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input
                placeholder="President"
                value={lead.role}
                onChange={(e) => updateField(lead.id, "role", e.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Duration</Label>
              <Input
                placeholder="Spring 2020 – Present"
                value={lead.duration}
                onChange={(e) => updateField(lead.id, "duration", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Bullet Points</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addBullet(lead.id)}
                className="h-7 text-xs text-primary"
              >
                <Plus className="w-3 h-3 mr-1" /> Add Bullet
              </Button>
            </div>
            {lead.bullets.map((bullet, bIdx) => (
              <div key={bIdx} className="flex items-start gap-2">
                <span className="mt-2.5 text-muted-foreground text-sm">•</span>
                <Input
                  placeholder="Describe your contribution..."
                  value={bullet}
                  onChange={(e) => updateBullet(lead.id, bIdx, e.target.value)}
                  className="flex-1"
                />
                {lead.bullets.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeBullet(lead.id, bIdx)}
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

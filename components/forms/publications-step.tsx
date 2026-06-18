"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, X } from "lucide-react";
import { createEmptyPublication } from "@/hooks/use-resume-builder";
import type { ResumeData } from "@/types";

interface PublicationsStepProps {
  data: ResumeData;
  onChange: (updater: (prev: ResumeData) => ResumeData) => void;
}

export function PublicationsStep({ data, onChange }: PublicationsStepProps) {
  const addPublication = () => {
    onChange((prev) => ({
      ...prev,
      publications: [...prev.publications, createEmptyPublication()],
    }));
  };

  const removePublication = (id: string) => {
    onChange((prev) => ({
      ...prev,
      publications: prev.publications.filter((p) => p.id !== id),
    }));
  };

  const updateField = (id: string, field: string, value: string) => {
    onChange((prev) => ({
      ...prev,
      publications: prev.publications.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    }));
  };

  const updateDescription = (id: string, index: number, value: string) => {
    onChange((prev) => ({
      ...prev,
      publications: prev.publications.map((p) =>
        p.id === id
          ? { ...p, description: p.description.map((d, i) => (i === index ? value : d)) }
          : p
      ),
    }));
  };

  const addDescriptionBullet = (id: string) => {
    onChange((prev) => ({
      ...prev,
      publications: prev.publications.map((p) =>
        p.id === id ? { ...p, description: [...p.description, ""] } : p
      ),
    }));
  };

  const removeDescriptionBullet = (id: string, index: number) => {
    onChange((prev) => ({
      ...prev,
      publications: prev.publications.map((p) =>
        p.id === id
          ? { ...p, description: p.description.filter((_, i) => i !== index) }
          : p
      ),
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-1">Publications</h3>
          <p className="text-muted-foreground">
            List your published papers, articles, or books.
          </p>
        </div>
        <Button variant="outline" onClick={addPublication} className="bg-background shrink-0">
          <Plus className="w-4 h-4 mr-2" /> Add Publication
        </Button>
      </div>

      {data.publications.length === 0 && (
        <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">
          <p className="font-medium">No publications added yet</p>
          <p className="text-sm mt-1">Click &quot;Add Publication&quot; to get started.</p>
        </div>
      )}

      {data.publications.map((item, index) => (
        <Card key={item.id} className="p-6 border-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Publication #{index + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removePublication(item.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Publication Title</Label>
              <Input
                placeholder="The Future of AI"
                value={item.title}
                onChange={(e) => updateField(item.id, "title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Publisher / Journal</Label>
              <Input
                placeholder="Tech Monthly"
                value={item.publisher}
                onChange={(e) => updateField(item.id, "publisher", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Publication Date</Label>
              <Input
                type="month"
                value={item.publicationDate}
                onChange={(e) => updateField(item.id, "publicationDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Link (URL)</Label>
              <Input
                placeholder="https://example.com/article"
                value={item.link}
                onChange={(e) => updateField(item.id, "link", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Description</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addDescriptionBullet(item.id)}
                className="h-7 text-xs text-primary"
              >
                <Plus className="w-3 h-3 mr-1" /> Add Bullet
              </Button>
            </div>
            {item.description.map((desc, dIdx) => (
              <div key={dIdx} className="flex items-start gap-2">
                <span className="mt-2.5 text-muted-foreground text-sm">•</span>
                <Input
                  placeholder="Key takeaways or summary..."
                  value={desc}
                  onChange={(e) => updateDescription(item.id, dIdx, e.target.value)}
                  className="flex-1"
                />
                {item.description.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDescriptionBullet(item.id, dIdx)}
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

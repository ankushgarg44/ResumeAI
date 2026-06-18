"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText, GraduationCap, Briefcase, Code, Award, BookOpen, Wrench, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { TEMPLATE_CONFIGS, getTemplateIds } from "@/lib/template-configs";
import type { FormSectionKey } from "@/lib/template-configs";

interface TemplateSelectionStepProps {
  selectedTemplateId: string | null;
  onSelect: (id: string) => void;
}

// Icons for each section key
const SECTION_ICONS: Record<FormSectionKey, React.ReactNode> = {
  "personal-info": <FileText className="w-3.5 h-3.5" />,
  "education": <GraduationCap className="w-3.5 h-3.5" />,
  "coursework": <BookOpen className="w-3.5 h-3.5" />,
  "experience": <Briefcase className="w-3.5 h-3.5" />,
  "projects": <Code className="w-3.5 h-3.5" />,
  "technical-skills": <Wrench className="w-3.5 h-3.5" />,
  "leadership": <Users className="w-3.5 h-3.5" />,
};

const SECTION_LABELS: Record<FormSectionKey, string> = {
  "personal-info": "Personal Info",
  "education": "Education",
  "coursework": "Coursework",
  "experience": "Experience",
  "projects": "Projects",
  "technical-skills": "Technical Skills",
  "leadership": "Leadership",
};

// Skeleton section blocks for the mini preview — shows which sections a template includes
function MiniSkeletonPreview({ sections }: { sections: FormSectionKey[] }) {
  return (
    <div className="space-y-2.5 h-full flex flex-col">
      {/* Name header — always present */}
      <div className="text-center space-y-1 pb-2 border-b border-gray-200">
        <div className="h-4 w-2/5 bg-gray-800 rounded mx-auto" />
        <div className="h-1.5 w-3/5 bg-gray-300 rounded mx-auto" />
        <div className="h-1.5 w-4/5 bg-gray-300 rounded mx-auto" />
      </div>

      {sections
        .filter((s) => s !== "personal-info")
        .map((section) => (
          <div key={section} className="space-y-1">
            {/* Section heading + line */}
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-14 bg-gray-700 rounded" />
              <div className="flex-1 h-px bg-gray-300" />
            </div>
            {/* Content lines */}
            <div className="pl-2 space-y-0.5">
              <div className="h-1 w-full bg-gray-200 rounded" />
              <div className="h-1 w-4/5 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
    </div>
  );
}

export function TemplateSelectionStep({
  selectedTemplateId,
  onSelect,
}: TemplateSelectionStepProps) {
  const templateIds = getTemplateIds();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h3 className="text-2xl font-bold mb-1">Choose a Template</h3>
        <p className="text-muted-foreground">
          Each template shows different sections tailored to the role you&apos;re targeting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templateIds.map((id) => {
          const config = TEMPLATE_CONFIGS[id];
          const isSelected = selectedTemplateId === id;

          return (
            <Card
              key={id}
              className={cn(
                "cursor-pointer transition-all duration-200 overflow-hidden border-2 flex flex-col",
                isSelected
                  ? "border-primary shadow-lg shadow-primary/10 ring-2 ring-primary/20"
                  : "border-border hover:border-primary/40 hover:shadow-md"
              )}
              onClick={() => onSelect(id)}
            >
              {/* Mini preview */}
              <div className="aspect-[1/1.2] bg-white p-4 relative">
                <MiniSkeletonPreview sections={config.sections} />

                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-primary text-primary-foreground rounded-full p-1">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>

              {/* Template info */}
              <div className="p-4 bg-card border-t border-border flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground text-sm">{config.name}</h4>
                  <Badge
                    className={cn(
                      "text-[10px] px-1.5 py-0.5",
                      config.badgeColor.bg,
                      config.badgeColor.text,
                      config.badgeColor.border
                    )}
                  >
                    {config.badge}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3 flex-1">
                  {config.description}
                </p>

                {/* Section preview list */}
                <div className="space-y-1 pt-2 border-t border-border">
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">
                    Sections included
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {config.sections
                      .filter((s) => s !== "personal-info")
                      .map((section) => (
                        <span
                          key={section}
                          className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md"
                        >
                          {SECTION_ICONS[section]}
                          {SECTION_LABELS[section]}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

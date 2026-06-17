"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface TemplateSelectionStepProps {
  selectedTemplateId: string | null;
  onSelect: (id: string) => void;
}

export function TemplateSelectionStep({
  selectedTemplateId,
  onSelect,
}: TemplateSelectionStepProps) {
  const isSelected = selectedTemplateId === "ats-professional";

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h3 className="text-2xl font-bold mb-1">Choose Template</h3>
        <p className="text-muted-foreground">
          Select a template for your resume. More templates coming soon.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <Card
          className={cn(
            "cursor-pointer transition-all duration-200 overflow-hidden border-2",
            isSelected
              ? "border-primary shadow-lg shadow-primary/10 ring-2 ring-primary/20"
              : "border-border hover:border-primary/40 hover:shadow-md"
          )}
          onClick={() => onSelect("ats-professional")}
        >
          {/* Template Preview */}
          <div className="aspect-[1/1.414] bg-white p-6 relative">
            {/* Mini resume preview skeleton */}
            <div className="space-y-3 h-full flex flex-col">
              {/* Name header */}
              <div className="text-center space-y-1 pb-2 border-b border-gray-200">
                <div className="h-5 w-2/5 bg-gray-800 rounded mx-auto" />
                <div className="h-2 w-3/5 bg-gray-300 rounded mx-auto" />
                <div className="h-2 w-4/5 bg-gray-300 rounded mx-auto" />
              </div>

              {/* Education section */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-16 bg-gray-700 rounded" />
                  <div className="flex-1 h-px bg-gray-300" />
                </div>
                <div className="flex justify-between">
                  <div className="h-2 w-24 bg-gray-400 rounded" />
                  <div className="h-2 w-20 bg-gray-300 rounded" />
                </div>
                <div className="h-2 w-32 bg-gray-200 rounded" />
              </div>

              {/* Experience section */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-20 bg-gray-700 rounded" />
                  <div className="flex-1 h-px bg-gray-300" />
                </div>
                <div className="flex justify-between">
                  <div className="h-2 w-28 bg-gray-400 rounded" />
                  <div className="h-2 w-24 bg-gray-300 rounded" />
                </div>
                <div className="pl-3 space-y-1">
                  <div className="h-1.5 w-full bg-gray-200 rounded" />
                  <div className="h-1.5 w-5/6 bg-gray-200 rounded" />
                  <div className="h-1.5 w-4/6 bg-gray-200 rounded" />
                </div>
              </div>

              {/* Projects section */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-14 bg-gray-700 rounded" />
                  <div className="flex-1 h-px bg-gray-300" />
                </div>
                <div className="pl-3 space-y-1">
                  <div className="h-1.5 w-full bg-gray-200 rounded" />
                  <div className="h-1.5 w-3/4 bg-gray-200 rounded" />
                </div>
              </div>

              {/* Skills section */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-24 bg-gray-700 rounded" />
                  <div className="flex-1 h-px bg-gray-300" />
                </div>
                <div className="h-2 w-full bg-gray-200 rounded" />
                <div className="h-2 w-4/5 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Selected overlay */}
            {isSelected && (
              <div className="absolute top-3 right-3">
                <div className="bg-primary text-primary-foreground rounded-full p-1">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
            )}
          </div>

          {/* Template info */}
          <div className="p-4 bg-card border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-foreground">ATS Professional</h4>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                ATS Friendly
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Clean, structured layout optimized for Applicant Tracking Systems. Uses serif headings, clear section dividers, and professional formatting.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

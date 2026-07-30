"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useResumeDownload } from "@/components/resumes/resume-pdf-viewer";
import type { Resume } from "@/types";

export function DashboardResumeActions({ resume }: { resume: Resume }) {
  const { handleDownload, isGenerating, HiddenTemplate } = useResumeDownload(resume);

  return (
    <>
      <HiddenTemplate />
      <Button
        variant="outline"
        size="sm"
        className="h-9 shadow-sm"
        onClick={handleDownload}
        disabled={isGenerating}
      >
        <Download className="w-4 h-4 mr-1" />
        {isGenerating ? "..." : "PDF"}
      </Button>
    </>
  );
}

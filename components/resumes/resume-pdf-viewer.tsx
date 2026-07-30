"use client";
import { useRef } from "react";
import { usePdfGenerator } from "@/hooks/use-pdf-generator";
import { ATSTemplate } from "@/components/resume-templates/ats-template";
import { ModernTwoColumnTemplate } from "@/components/resume-templates/modern-two-column-template";
import { ClassicProfessionalTemplate } from "@/components/resume-templates/classic-professional-template";
import type { Resume } from "@/types";

export function useResumeDownload(resume: Resume) {
  const templateRef = useRef<HTMLDivElement>(null);
  const { generatePDF, isGenerating } = usePdfGenerator(templateRef);

  const handleDownload = async () => {
    // Note: usePdfGenerator handles the actual print dialog
    await generatePDF();
  };

  const HiddenTemplate = () => (
    <div style={{ position: "absolute", left: "-9999px", top: 0, pointerEvents: "none" }}>
      {resume.template_id === "ats-professional" && (
        <ATSTemplate ref={templateRef} data={resume.resume_data} />
      )}
      {resume.template_id === "modern-two-column" && (
        <ModernTwoColumnTemplate ref={templateRef} data={resume.resume_data} />
      )}
      {resume.template_id === "classic-professional" && (
        <ClassicProfessionalTemplate ref={templateRef} data={resume.resume_data} />
      )}
      {/* fallback */}
      {!["ats-professional", "modern-two-column", "classic-professional"].includes(resume.template_id) && (
        <ATSTemplate ref={templateRef} data={resume.resume_data} />
      )}
    </div>
  );

  return { handleDownload, isGenerating, HiddenTemplate };
}

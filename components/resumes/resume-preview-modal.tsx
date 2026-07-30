"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useRef } from "react";
import { usePdfGenerator } from "@/hooks/use-pdf-generator";
import { ATSTemplate } from "@/components/resume-templates/ats-template";
import { ModernTwoColumnTemplate } from "@/components/resume-templates/modern-two-column-template";
import { ClassicProfessionalTemplate } from "@/components/resume-templates/classic-professional-template";
import type { Resume } from "@/types";

interface ResumePreviewModalProps {
  resume: Resume | null;
  open: boolean;
  onClose: () => void;
}

export function ResumePreviewModal({ resume, open, onClose }: ResumePreviewModalProps) {
  const templateRef = useRef<HTMLDivElement>(null);
  const { generatePDF, isGenerating } = usePdfGenerator(templateRef);

  if (!resume) return null;

  const handleDownload = async () => {
    await generatePDF();
  };

  const renderTemplate = () => {
    const props = { ref: templateRef, data: resume.resume_data };
    switch (resume.template_id) {
      case "modern-two-column": return <ModernTwoColumnTemplate {...props} />;
      case "classic-professional": return <ClassicProfessionalTemplate {...props} />;
      default: return <ATSTemplate {...props} />;
    }
  };

  // Scale factor to fit A4 (794px wide) inside modal
  const MODAL_WIDTH = 680;
  const A4_WIDTH = 794;
  const scale = MODAL_WIDTH / A4_WIDTH;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{resume.title}</span>
            <Button onClick={handleDownload} disabled={isGenerating} size="sm">
              <Download className="w-4 h-4 mr-2" />
              {isGenerating ? "Generating..." : "Download PDF"}
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center bg-gray-100 rounded-lg p-4 overflow-auto">
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top center",
              width: A4_WIDTH,
              minHeight: 1123, // A4 height in px at 96dpi
            }}
          >
            {renderTemplate()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

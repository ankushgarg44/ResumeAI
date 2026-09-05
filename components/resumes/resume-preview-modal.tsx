"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useRef, useState, useLayoutEffect } from "react";
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { generatePDF, isGenerating } = usePdfGenerator(templateRef);
  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;

  // Responsive scale: measure available width and template's natural width
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    function computeScale() {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const available = Math.max(0, wrapper.clientWidth - 32); // account for some padding
      const newScale = Math.min(1, available / A4_WIDTH);
      setScale(newScale);
    }

    computeScale();
    window.addEventListener("resize", computeScale);
    return () => window.removeEventListener("resize", computeScale);
  }, [open]);

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


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto"
        style={{
          width: "min(90vw, 900px)",
          maxWidth: "min(90vw, 900px)",
        }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{resume.title}</span>
            <Button onClick={handleDownload} disabled={isGenerating} size="sm">
              <Download className="w-4 h-4 mr-2" />
              {isGenerating ? "Generating..." : "Download PDF"}
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div ref={wrapperRef} className="flex justify-center bg-gray-100 rounded-lg p-4 overflow-auto">
          <div
            style={{
              width: A4_WIDTH * scale,
              height: A4_HEIGHT * scale,
              overflow: "hidden",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                width: A4_WIDTH,
                height: A4_HEIGHT,
                zoom: scale,
              }}
            >
              {renderTemplate()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

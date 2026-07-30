"use client";

import { useState, useRef, useCallback, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

import { useResumeBuilder } from "@/hooks/use-resume-builder";
import { usePdfGenerator } from "@/hooks/use-pdf-generator";
import { getTemplateConfig } from "@/lib/template-configs";

import { TemplateSelectionStep } from "@/components/forms/template-selection-step";
import { GeneratingScreen } from "@/components/forms/generating-screen";
import { SuccessScreen } from "@/components/forms/success-screen";

import { SECTION_REGISTRY } from "@/lib/section-registry";
import { TEMPLATE_REGISTRY } from "@/lib/template-registry";

type BuilderPhase = "editing" | "generating" | "success";

function BuilderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const resumeId = searchParams?.get("id");
  const templateParam = searchParams?.get("template");
  const isProfileMode = searchParams?.get("isProfile") === "true";
  const profileTypeParam = searchParams?.get("profileType") ?? "";

  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    resumeId ? null : (templateParam || "ats-professional")
  );
  const [profileType, setProfileType] = useState(profileTypeParam);

  const builder = useResumeBuilder(selectedTemplateId);

  useEffect(() => {
    if (builder.loadedTemplateId) {
      setSelectedTemplateId(builder.loadedTemplateId);
    }
  }, [builder.loadedTemplateId]);
  const templateRef = useRef<HTMLDivElement>(null);
  const { generatePDF } = usePdfGenerator(templateRef);

  const [phase, setPhase] = useState<BuilderPhase>("editing");

  const templateConfig = getTemplateConfig(selectedTemplateId);

  const progress =
    ((builder.currentStep + 1) / builder.totalSteps) * 100;

  const handleGenerate = useCallback(async () => {
    try {
      const title = builder.resumeData.personalInfo.fullName 
        ? `${builder.resumeData.personalInfo.fullName} ${isProfileMode ? "Profile" : "Resume"}`
        : isProfileMode ? "Untitled Profile" : "Untitled Resume";
      
      const currentData = builder.resumeData;
      await builder.saveToDatabase(
        title,
        selectedTemplateId || "ats-professional",
        currentData,
        isProfileMode,
        profileType || null
      );
    } catch (error) {
      console.error("Failed to save resume:", error);
      // We still proceed to generating so the user can download their PDF even if DB save fails
    }
    setPhase("generating");
  }, [builder, selectedTemplateId, isProfileMode, profileType]);

  const handleGenerateComplete = useCallback(async () => {
    await generatePDF();
    setPhase("success");
  }, [generatePDF]);

  const handleDownloadAgain = useCallback(async () => {
    await generatePDF();
  }, [generatePDF]);

  const handleCreateAnother = useCallback(() => {
    builder.resetBuilder();
    setPhase("editing");
    setSelectedTemplateId(null);
    router.push("/builder?new=1");
  }, [builder, router]);

  const handleTemplateSelect = useCallback(
    (id: string) => {
      setSelectedTemplateId(id);
      // If user is on step 0 (template selection), stay there.
      // If they switched mid-way, clamp step to step 1 (first form step)
      // so they review their data in the new step order.
      if (builder.currentStep > 0) {
        builder.goToStep(1);
      }
    },
    [builder]
  );

  // Don't render until localStorage has been hydrated and API fetch is complete
  if (!builder.hydrated || builder.isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const renderStep = () => {
    const key = builder.currentStepInfo.key;

    if (key === "template") {
      return (
        <TemplateSelectionStep
          selectedTemplateId={selectedTemplateId}
          onSelect={handleTemplateSelect}
        />
      );
    }

    const StepComponent = SECTION_REGISTRY[key];
    if (!StepComponent) return null;

    return (
      <StepComponent
        data={builder.resumeData}
        onChange={builder.updateResumeData}
        visibleFields={key === "personal-info" ? templateConfig.personalInfoFields : undefined}
        requiredFields={key === "personal-info" ? templateConfig.requiredPersonalInfoFields : undefined}
        isProfile={key === "personal-info" ? isProfileMode : undefined}
        profileType={key === "personal-info" ? profileType : undefined}
        onProfileTypeChange={key === "personal-info" ? setProfileType : undefined}
      />
    );
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] -m-4 md:-m-6">
      {/* Hidden template for PDF generation */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
        }}
        aria-hidden="true"
      >
        {selectedTemplateId && TEMPLATE_REGISTRY[selectedTemplateId] && (
          (() => {
            const TemplateComponent = TEMPLATE_REGISTRY[selectedTemplateId].component;
            return <TemplateComponent ref={templateRef} data={builder.resumeData} />;
          })()
        )}
      </div>

      {/* Phase: Generating */}
      {phase === "generating" && (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-lg">
            <GeneratingScreen onComplete={handleGenerateComplete} />
          </div>
        </div>
      )}

      {/* Phase: Success */}
      {phase === "success" && (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-lg">
            <SuccessScreen
              onDownloadAgain={handleDownloadAgain}
              onCreateAnother={handleCreateAnother}
            />
          </div>
        </div>
      )}

      {/* Phase: Editing (wizard) */}
      {phase === "editing" && (
        <>
          {/* Top Progress Bar */}
          <div className="bg-card border-b border-border p-4 shrink-0 shadow-sm z-10">
            <div className="max-w-3xl mx-auto">
              {/* Step indicators */}
              <div className="hidden sm:flex justify-between mb-3">
                {builder.steps.map((step, idx) => (
                  <button
                    key={step.key}
                    onClick={() => builder.goToStep(idx)}
                    className={cn(
                      "flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer",
                      idx <= builder.currentStep
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-colors",
                        idx < builder.currentStep
                          ? "bg-primary border-primary text-primary-foreground"
                          : idx === builder.currentStep
                            ? "border-primary text-primary"
                            : "border-muted text-muted-foreground"
                      )}
                    >
                      {idx < builder.currentStep ? "✓" : step.number}
                    </span>
                    <span className="hidden lg:inline">{step.label}</span>
                  </button>
                ))}
              </div>

              {/* Mobile step label */}
              <div className="sm:hidden text-sm font-medium text-muted-foreground mb-2">
                Step {builder.currentStep + 1} of {builder.totalSteps}:{" "}
                <span className="text-foreground">
                  {builder.currentStepInfo.label}
                </span>
              </div>

              <Progress value={progress} className="h-2 bg-muted" />
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-3xl mx-auto">
              {/* Step content */}
              {renderStep()}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-10 pb-6">
                <Button
                  variant="outline"
                  onClick={builder.prevStep}
                  disabled={builder.isFirstStep}
                  className="bg-background"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                {builder.isLastStep ? (
                  <Button
                    onClick={handleGenerate}
                    className="bg-primary text-primary-foreground shadow-sm"
                    disabled={!selectedTemplateId}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Resume
                  </Button>
                ) : (
                  <Button
                    onClick={builder.nextStep}
                    className="bg-primary text-primary-foreground"
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-pulse text-muted-foreground">Loading Builder...</div>
      </div>
    }>
      <BuilderContent />
    </Suspense>
  );
}

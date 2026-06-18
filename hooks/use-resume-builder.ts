"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type {
  ResumeData,
  ResumeEducation,
  ResumeExperience,
  ResumeProject,
  ResumeLeadership,
  ResumeTraining,
  ResumePublication,
} from "@/types";
import { getStepsForTemplate } from "@/lib/template-configs";
import type { StepInfo } from "@/lib/template-configs";

const STORAGE_KEY = "resumeai-draft";

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function getEmptyResumeData(): ResumeData {
  return {
    personalInfo: {
      fullName: "",
      address: "",
      phone: "",
      email: "",
      linkedIn: "",
      github: "",
    },
    education: [],
    coursework: [],
    experience: [],
    projects: [],
    technicalSkills: {
      languages: [],
      developerTools: [],
      frameworks: [],
    },
    leadership: [],
    training: [],
    publications: [],
  };
}

export function createEmptyEducation(): ResumeEducation {
  return {
    id: generateId(),
    university: "",
    degree: "",
    location: "",
    startDate: "",
    endDate: "",
    cgpa: "",
  };
}

export function createEmptyExperience(): ResumeExperience {
  return {
    id: generateId(),
    company: "",
    role: "",
    location: "",
    startDate: "",
    endDate: "",
    bullets: [""],
  };
}

export function createEmptyProject(): ResumeProject {
  return {
    id: generateId(),
    title: "",
    technologies: "",
    date: "",
    bullets: [""],
  };
}

export function createEmptyLeadership(): ResumeLeadership {
  return {
    id: generateId(),
    organization: "",
    role: "",
    duration: "",
    bullets: [""],
  };
}

export function createEmptyTraining(): ResumeTraining {
  return {
    id: generateId(),
    title: "",
    organization: "",
    location: "",
    startDate: "",
    endDate: "",
    description: [""],
  };
}

export function createEmptyPublication(): ResumePublication {
  return {
    id: generateId(),
    title: "",
    publisher: "",
    publicationDate: "",
    link: "",
    description: [""],
  };
}

export function useResumeBuilder(templateId: string | null) {
  const searchParams = useSearchParams();
  const resumeId = searchParams?.get("id");
  const isNew = searchParams?.get("new") === "1";

  const [resumeData, setResumeData] = useState<ResumeData>(getEmptyResumeData);
  const [currentStep, setCurrentStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(!!resumeId);
  const [loadedTemplateId, setLoadedTemplateId] = useState<string | null>(null);

  // Derive steps dynamically from the selected template
  const steps: StepInfo[] = useMemo(
    () => getStepsForTemplate(templateId),
    [templateId]
  );

  // Clamp currentStep when steps array changes (template switch)
  useEffect(() => {
    setCurrentStep((prev) => Math.min(prev, steps.length - 1));
  }, [steps.length]);

  // Load from API if ID is present, else restore from localStorage
  useEffect(() => {
    async function init() {
      if (resumeId) {
        try {
          const res = await fetch(`/api/resumes/${resumeId}`);
          if (res.ok) {
            const data = await res.json();
            if (data.resume_data) {
              const empty = getEmptyResumeData();
              const loaded = data.resume_data as Partial<ResumeData>;
              setResumeData({
                personalInfo: { ...empty.personalInfo, ...(loaded.personalInfo ?? {}) },
                education: Array.isArray(loaded.education) ? loaded.education : empty.education,
                coursework: Array.isArray(loaded.coursework) ? loaded.coursework : empty.coursework,
                experience: Array.isArray(loaded.experience) ? loaded.experience : empty.experience,
                projects: Array.isArray(loaded.projects) ? loaded.projects : empty.projects,
                technicalSkills: {
                  ...empty.technicalSkills,
                  ...(loaded.technicalSkills ?? {}),
                },
                leadership: Array.isArray(loaded.leadership) ? loaded.leadership : empty.leadership,
                training: Array.isArray(loaded.training) ? loaded.training : empty.training,
                publications: Array.isArray(loaded.publications) ? loaded.publications : empty.publications,
              });
            }
            if (data.template_id) {
              setLoadedTemplateId(data.template_id);
            }
          }
        } catch (error) {
          console.error("Failed to load resume from API", error);
        } finally {
          setIsLoading(false);
          setHydrated(true);
        }
      } else if (isNew) {
        setResumeData(getEmptyResumeData());
        setIsLoading(false);
        setHydrated(true);
      } else {
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.resumeData) setResumeData(parsed.resumeData);
            if (typeof parsed.currentStep === "number") setCurrentStep(parsed.currentStep);
          }
        } catch {
          // ignore parse errors
        }
        setIsLoading(false);
        setHydrated(true);
      }
    }
    init();
  }, [resumeId]);

  // Auto-save to localStorage on changes
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ resumeData, currentStep, templateId })
      );
    } catch {
      // ignore quota errors
    }
  }, [resumeData, currentStep, templateId, hydrated]);

  const updateResumeData = useCallback(
    (updater: (prev: ResumeData) => ResumeData) => {
      setResumeData((prev) => updater(prev));
    },
    []
  );

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      setCurrentStep(Math.max(0, Math.min(step, steps.length - 1)));
    },
    [steps.length]
  );

  const resetBuilder = useCallback(() => {
    setResumeData(getEmptyResumeData());
    setCurrentStep(0);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const saveToDatabase = useCallback(
    async (title: string, currentTemplateId: string, dataToSave?: ResumeData) => {
      const payload = dataToSave ?? resumeData;
      setIsSaving(true);
      try {
        const url = resumeId ? `/api/resumes/${resumeId}` : "/api/resumes";
        const method = resumeId ? "PATCH" : "POST";
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            template_id: currentTemplateId,
            resume_data: payload,
            status: "published",
          }),
        });
        if (!res.ok) throw new Error("Failed to save resume");
        return await res.json();
      } finally {
        setIsSaving(false);
      }
    },
    [resumeData, resumeId]
  );

  return {
    resumeData,
    currentStep,
    hydrated,
    steps,
    updateResumeData,
    nextStep,
    prevStep,
    goToStep,
    resetBuilder,
    saveToDatabase,
    isSaving,
    isLoading,
    loadedTemplateId,
    totalSteps: steps.length,
    currentStepInfo: steps[currentStep] ?? steps[0],
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
  };
}

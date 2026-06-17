"use client";

import { useState, useCallback, useEffect } from "react";
import type {
  ResumeData,
  ResumeEducation,
  ResumeExperience,
  ResumeProject,
  ResumeLeadership,
} from "@/types";

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

export const BUILDER_STEPS = [
  { key: "personal-info" as const, label: "Personal Info", number: 1 },
  { key: "education" as const, label: "Education", number: 2 },
  { key: "coursework" as const, label: "Coursework", number: 3 },
  { key: "experience" as const, label: "Experience", number: 4 },
  { key: "projects" as const, label: "Projects", number: 5 },
  { key: "technical-skills" as const, label: "Skills", number: 6 },
  { key: "leadership" as const, label: "Leadership", number: 7 },
  { key: "template" as const, label: "Template", number: 8 },
] as const;

export function useResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(getEmptyResumeData);
  const [currentStep, setCurrentStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  // Restore from localStorage on mount
  useEffect(() => {
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
    setHydrated(true);
  }, []);

  // Auto-save to localStorage on changes
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ resumeData, currentStep })
      );
    } catch {
      // ignore quota errors
    }
  }, [resumeData, currentStep, hydrated]);

  const updateResumeData = useCallback(
    (updater: (prev: ResumeData) => ResumeData) => {
      setResumeData((prev) => updater(prev));
    },
    []
  );

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, BUILDER_STEPS.length - 1));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(0, Math.min(step, BUILDER_STEPS.length - 1)));
  }, []);

  const resetBuilder = useCallback(() => {
    setResumeData(getEmptyResumeData());
    setCurrentStep(0);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    resumeData,
    currentStep,
    hydrated,
    updateResumeData,
    nextStep,
    prevStep,
    goToStep,
    resetBuilder,
    totalSteps: BUILDER_STEPS.length,
    currentStepInfo: BUILDER_STEPS[currentStep],
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === BUILDER_STEPS.length - 1,
  };
}

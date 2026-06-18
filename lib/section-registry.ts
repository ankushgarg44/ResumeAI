import { PersonalInfoStep } from "@/components/forms/personal-info-step";
import { ObjectiveStep } from "@/components/forms/objective-step";
import { EducationStep } from "@/components/forms/education-step";
import { CourseworkStep } from "@/components/forms/coursework-step";
import { ExperienceStep } from "@/components/forms/experience-step";
import { ProjectsStep } from "@/components/forms/projects-step";
import { TechnicalSkillsStep } from "@/components/forms/technical-skills-step";
import { LeadershipStep } from "@/components/forms/leadership-step";
import { TrainingStep } from "@/components/forms/training-step";
import { PublicationsStep } from "@/components/forms/publications-step";
import { ReferencesStep } from "@/components/forms/references-step";
import type { FormSectionKey } from "@/lib/template-configs";
import type { ResumeData } from "@/types";

export interface SectionProps {
  data: ResumeData;
  onChange: (updater: (prev: ResumeData) => ResumeData) => void;
  // PersonalInfoStep accepts these optionally
  visibleFields?: string[];
  requiredFields?: string[];
}

export const SECTION_REGISTRY: Record<FormSectionKey, React.ComponentType<SectionProps>> = {
  "personal-info": PersonalInfoStep as any,
  "objective": ObjectiveStep as any,
  "education": EducationStep as any,
  "coursework": CourseworkStep as any,
  "experience": ExperienceStep as any,
  "projects": ProjectsStep as any,
  "technical-skills": TechnicalSkillsStep as any,
  "leadership": LeadershipStep as any,
  "training": TrainingStep as any,
  "publications": PublicationsStep as any,
  "references": ReferencesStep as any,
};

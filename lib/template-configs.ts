import type { ResumePersonalInfo, BuilderStep } from "@/types";

// All possible form section keys (excludes "template" which is always step 1)
export type FormSectionKey = Exclude<BuilderStep, "template">;

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  badge: string;
  badgeColor: { bg: string; text: string; border: string };
  sections: FormSectionKey[];
  personalInfoFields: (keyof ResumePersonalInfo)[];
  requiredPersonalInfoFields: (keyof ResumePersonalInfo)[];
}

export interface StepInfo {
  key: BuilderStep;
  label: string;
  number: number;
}

// Labels for each section key
const SECTION_LABELS: Record<BuilderStep, string> = {
  "template": "Template",
  "personal-info": "Personal Info",
  "education": "Education",
  "coursework": "Coursework",
  "experience": "Experience",
  "projects": "Projects",
  "technical-skills": "Skills",
  "leadership": "Leadership",
};

// ─── Template Configs ────────────────────────────────────

export const TEMPLATE_CONFIGS: Record<string, TemplateConfig> = {
  "ats-professional": {
    id: "ats-professional",
    name: "ATS Professional",
    description:
      "Clean, structured layout optimized for Applicant Tracking Systems. Uses serif headings, clear section dividers, and professional formatting.",
    badge: "ATS Friendly",
    badgeColor: {
      bg: "bg-emerald-100 dark:bg-emerald-950/30",
      text: "text-emerald-700 dark:text-emerald-400",
      border: "border-emerald-200 dark:border-emerald-800",
    },
    sections: [
      "personal-info",
      "education",
      "coursework",
      "experience",
      "projects",
      "technical-skills",
      "leadership",
    ],
    personalInfoFields: ["fullName", "address", "phone", "email", "linkedIn", "github"],
    requiredPersonalInfoFields: ["fullName", "email"],
  },

};

// ─── Helpers ─────────────────────────────────────────────

/** Get the ordered list of template IDs for rendering */
export function getTemplateIds(): string[] {
  return Object.keys(TEMPLATE_CONFIGS);
}

/** Get a template config by id, falls back to ats-professional */
export function getTemplateConfig(templateId: string | null): TemplateConfig {
  if (templateId && TEMPLATE_CONFIGS[templateId]) {
    return TEMPLATE_CONFIGS[templateId];
  }
  return TEMPLATE_CONFIGS["ats-professional"];
}

/**
 * Build the full wizard step array for a given template.
 * Template selection is always step 1, then the template's sections follow.
 */
export function getStepsForTemplate(templateId: string | null): StepInfo[] {
  const config = getTemplateConfig(templateId);

  const steps: StepInfo[] = [
    { key: "template", label: "Template", number: 1 },
  ];

  config.sections.forEach((sectionKey, idx) => {
    steps.push({
      key: sectionKey,
      label: SECTION_LABELS[sectionKey],
      number: idx + 2, // starts at 2 since template is 1
    });
  });

  return steps;
}

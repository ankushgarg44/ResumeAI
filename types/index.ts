// ==========================================
// ResumeAI — TypeScript Type Definitions
// ==========================================

// ---------- User ----------
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  plan: "free" | "pro" | "enterprise";
  createdAt: string;
  updatedAt: string;
}

// ---------- Resume Sections ----------
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  website?: string;
  currentRole: string;
  summary: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  highlights: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: "technical" | "soft" | "language" | "tool";
  proficiency?: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  technologies: string[];
}

// ---------- Resume ----------
export interface Resume {
  id: string;
  title: string;
  templateId: string;
  templateName: string;
  status: "draft" | "published";
  atsScore: number | null;
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  projects: Project[];
  createdAt: string;
  updatedAt: string;
}

// ---------- Resume Template ----------
export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  previewUrl: string;
  atsOptimized: boolean;
  matchScore?: number;
  tags: string[];
}

// ---------- ATS Analysis ----------
export interface ATSAnalysis {
  overallScore: number;
  matchedSkills: string[];
  missingKeywords: string[];
  suggestions: ATSSuggestion[];
}

export interface ATSSuggestion {
  id: string;
  icon: string;
  text: string;
  type: "improvement" | "warning" | "tip";
}

// ---------- Job Optimization ----------
export interface JobOptimization {
  jobDescription: string;
  analysis: ATSAnalysis | null;
  isAnalyzing: boolean;
}

// ---------- Dashboard ----------
export interface DashboardStats {
  totalResumes: number;
  atsScoreAvg: number;
  jobOptimized: number;
  downloads: number;
}

// ---------- Builder Steps ----------
export type BuilderStep =
  | "basics"
  | "experience"
  | "education"
  | "template"
  | "review";

export interface BuilderState {
  currentStep: BuilderStep;
  stepIndex: number;
  totalSteps: number;
  resume: Partial<Resume>;
  selectedTemplateId: string | null;
}

// ---------- Settings ----------
export interface UserSettings {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string;
  };
  preferences: {
    defaultTemplate: string;
    aiTone: "professional" | "creative" | "casual";
    autoSave: boolean;
  };
  billing: {
    plan: "free" | "pro" | "enterprise";
    nextBillingDate?: string;
    paymentMethod?: string;
  };
}

// ---------- Navigation ----------
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  active?: boolean;
}

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
  user_id: string;
  title: string;
  template_id: string;
  resume_data: ResumeData;
  ats_score: number | null;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
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

// ---------- Resume Data (Builder Wizard) ----------
export interface ResumePersonalInfo {
  fullName: string;
  address: string;
  phone: string;
  email: string;
  linkedIn: string;
  github: string;
}

export interface ResumeEducation {
  id: string;
  university: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  cgpa: string;
}

export interface ResumeExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface ResumeProject {
  id: string;
  title: string;
  technologies: string;
  date: string;
  bullets: string[];
}

export interface ResumeTechnicalSkills {
  languages: string[];
  developerTools: string[];
  frameworks: string[];
}

export interface ResumeLeadership {
  id: string;
  organization: string;
  role: string;
  duration: string;
  bullets: string[];
}

export interface ResumeTraining {
  id: string;
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface ResumePublication {
  id: string;
  title: string;
  publisher: string;
  publicationDate: string;
  link: string;
  description: string[];
}

export interface ResumeData {
  personalInfo: ResumePersonalInfo;
  education: ResumeEducation[];
  coursework: string[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  technicalSkills: ResumeTechnicalSkills;
  leadership: ResumeLeadership[];
  training: ResumeTraining[];
  publications: ResumePublication[];
}

// ---------- Builder Steps ----------
export type BuilderStep =
  | "personal-info"
  | "education"
  | "coursework"
  | "experience"
  | "projects"
  | "technical-skills"
  | "leadership"
  | "training"
  | "publications"
  | "template";

export interface BuilderState {
  currentStep: number;
  totalSteps: number;
  resumeData: ResumeData;
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

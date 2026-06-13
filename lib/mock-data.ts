import type {
  Resume,
  ResumeTemplate,
  DashboardStats,
  ATSAnalysis,
  UserSettings,
} from "@/types";

// ==========================================
// Dashboard Stats
// ==========================================
export const mockDashboardStats: DashboardStats = {
  totalResumes: 12,
  atsScoreAvg: 88,
  jobOptimized: 8,
  downloads: 45,
};

// ==========================================
// Resume Templates
// ==========================================
export const mockTemplates: ResumeTemplate[] = [
  {
    id: "tpl-ats-professional",
    name: "ATS Professional",
    description:
      "Clean, structured, and strictly adheres to parsing algorithms. Ideal for corporate roles and senior engineers.",
    category: "Corporate",
    previewUrl: "/templates/ats-professional.png",
    atsOptimized: true,
    matchScore: 98,
    tags: ["ATS Optimized", "Corporate"],
  },
  {
    id: "tpl-modern-swe",
    name: "Modern SWE",
    description:
      "Highlights technical skills prominently with a two-column layout. Great for developers and designers.",
    category: "Tech",
    previewUrl: "/templates/modern-swe.png",
    atsOptimized: true,
    matchScore: 92,
    tags: ["Tech Focused", "Two-Column"],
  },
  {
    id: "tpl-minimalist",
    name: "Minimalist Essential",
    description:
      "A refined, no-nonsense approach focusing entirely on content readability and elegant typography.",
    category: "Minimal",
    previewUrl: "/templates/minimalist.png",
    atsOptimized: true,
    tags: ["Entry Level", "Clean"],
  },
  {
    id: "tpl-executive",
    name: "Executive Brief",
    description:
      "Dense information hierarchy designed for senior management and C-suite applications.",
    category: "Executive",
    previewUrl: "/templates/executive.png",
    atsOptimized: true,
    tags: ["Senior", "C-Suite"],
  },
  {
    id: "tpl-creative",
    name: "Creative Modern",
    description:
      "A bold design with color accents and visual hierarchy for creative industry roles.",
    category: "Creative",
    previewUrl: "/templates/creative.png",
    atsOptimized: false,
    tags: ["Creative", "Design"],
  },
  {
    id: "tpl-academic",
    name: "Academic CV",
    description:
      "Comprehensive layout for academic positions with sections for publications, research, and grants.",
    category: "Academic",
    previewUrl: "/templates/academic.png",
    atsOptimized: true,
    tags: ["Academic", "Research"],
  },
];

// ==========================================
// Recent Resumes
// ==========================================
export const mockResumes: Resume[] = [
  {
    id: "res-1",
    title: "Senior SWE - Google",
    templateId: "tpl-ats-professional",
    templateName: "ATS Professional",
    status: "published",
    atsScore: 92,
    personalInfo: {
      fullName: "Ankush Garg",
      email: "ankush@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      linkedIn: "linkedin.com/in/ankushgarg",
      currentRole: "Senior Software Engineer",
      summary:
        "Experienced software engineer with 8+ years building scalable distributed systems.",
    },
    workExperience: [
      {
        id: "exp-1",
        company: "Google",
        role: "Senior Software Engineer",
        location: "Mountain View, CA",
        startDate: "2021-06",
        endDate: null,
        current: true,
        description:
          "Leading backend infrastructure team building distributed systems at scale.",
        highlights: [
          "Led migration of core services to Kubernetes, reducing deployment time by 60%",
          "Architected real-time data pipeline processing 10M+ events/day",
          "Mentored 5 junior engineers through technical growth program",
        ],
      },
    ],
    education: [
      {
        id: "edu-1",
        institution: "Stanford University",
        degree: "M.S.",
        field: "Computer Science",
        startDate: "2014",
        endDate: "2016",
        highlights: [],
      },
    ],
    skills: [
      { id: "sk-1", name: "Go", category: "technical", proficiency: "expert" },
      {
        id: "sk-2",
        name: "Kubernetes",
        category: "technical",
        proficiency: "advanced",
      },
      {
        id: "sk-3",
        name: "React",
        category: "technical",
        proficiency: "advanced",
      },
      {
        id: "sk-4",
        name: "Python",
        category: "technical",
        proficiency: "expert",
      },
    ],
    certifications: [],
    projects: [],
    createdAt: "2024-11-15T10:30:00Z",
    updatedAt: "2024-12-10T14:20:00Z",
  },
  {
    id: "res-2",
    title: "Backend Dev - Meta",
    templateId: "tpl-modern-swe",
    templateName: "Minimal Tech",
    status: "published",
    atsScore: 85,
    personalInfo: {
      fullName: "Ankush Garg",
      email: "ankush@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      currentRole: "Backend Developer",
      summary: "Backend specialist focused on high-performance systems.",
    },
    workExperience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: [],
    createdAt: "2024-10-20T08:15:00Z",
    updatedAt: "2024-12-03T09:45:00Z",
  },
  {
    id: "res-3",
    title: "Fullstack - Startup",
    templateId: "tpl-creative",
    templateName: "Creative Modern",
    status: "draft",
    atsScore: null,
    personalInfo: {
      fullName: "Ankush Garg",
      email: "ankush@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      currentRole: "Fullstack Developer",
      summary: "Versatile fullstack developer with startup experience.",
    },
    workExperience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: [],
    createdAt: "2024-11-28T16:00:00Z",
    updatedAt: "2024-11-28T16:00:00Z",
  },
];

// ==========================================
// ATS Analysis (for Job Optimization page)
// ==========================================
export const mockATSAnalysis: ATSAnalysis = {
  overallScore: 84,
  matchedSkills: ["React", "Node.js", "PostgreSQL", "Microservices", "Docker"],
  missingKeywords: ["TypeScript", "Jest", "GraphQL"],
  suggestions: [
    {
      id: "sug-1",
      icon: "edit_note",
      text: 'Highlight specific metrics in your most recent role to better align with the "impact-driven" requirement.',
      type: "improvement",
    },
    {
      id: "sug-2",
      icon: "swap_vert",
      text: 'Move your "Education" section below "Experience" to prioritize your technical background.',
      type: "tip",
    },
    {
      id: "sug-3",
      icon: "add_circle",
      text: "Add TypeScript to your skills section — it appears 4 times in the job description.",
      type: "warning",
    },
  ],
};

// ==========================================
// User Settings
// ==========================================
export const mockUserSettings: UserSettings = {
  profile: {
    firstName: "Ankush",
    lastName: "Garg",
    email: "ankush@example.com",
  },
  preferences: {
    defaultTemplate: "tpl-ats-professional",
    aiTone: "professional",
    autoSave: true,
  },
  billing: {
    plan: "pro",
    nextBillingDate: "2025-01-15",
    paymentMethod: "Visa ending in 4242",
  },
};

// ==========================================
// Builder Steps Config
// ==========================================
export const builderSteps = [
  { key: "basics" as const, label: "Basics", icon: "person" },
  { key: "experience" as const, label: "Experience", icon: "work" },
  { key: "education" as const, label: "Education", icon: "school" },
  { key: "template" as const, label: "Template", icon: "dashboard_customize" },
  { key: "review" as const, label: "Review", icon: "check_circle" },
];

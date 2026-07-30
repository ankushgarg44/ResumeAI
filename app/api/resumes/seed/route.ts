import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createResume, saveResume, updateATSScore } from "@/lib/supabase/resumes";

const MOCK_RESUMES = [
  {
    title: "Senior Full Stack Engineer",
    template_id: "ats-professional",
    status: "published" as const,
    ats_score: 92,
    resume_data: {
      personalInfo: {
        fullName: "Alex Rivera",
        address: "San Francisco, CA",
        phone: "+1 (555) 234-5678",
        email: "alex.rivera@example.com",
        linkedIn: "linkedin.com/in/alex-rivera-dev",
        github: "github.com/alexrivera-dev",
        currentRole: "Senior Full Stack Engineer",
      },
      objective:
        "Results-oriented Senior Full Stack Engineer with 6+ years of experience designing scalable web applications, microservices, and cloud architectures. Proven track record of boosting system performance by 40% and leading cross-functional engineering teams.",
      education: [
        {
          id: "edu-1",
          university: "University of California, Berkeley",
          degree: "B.S. Computer Science",
          location: "Berkeley, CA",
          startDate: "2015-08",
          endDate: "2019-05",
          cgpa: "3.85 / 4.0",
        },
      ],
      coursework: [
        "Distributed Systems",
        "Algorithms & Complexity",
        "Database Systems",
        "Software Architecture",
      ],
      experience: [
        {
          id: "exp-1",
          company: "Acme Cloud Solutions",
          role: "Senior Full Stack Engineer",
          location: "San Francisco, CA",
          startDate: "2021-06",
          endDate: "Present",
          bullets: [
            "Architected and deployed microservices handling 2M+ daily active requests using Next.js, Node.js, and PostgreSQL.",
            "Reduced application page load time by 45% through aggressive SSR optimization and dynamic client-side caching.",
            "Mentored 5 junior developers and enforced CI/CD quality pipelines, maintaining 95%+ unit test coverage.",
          ],
        },
        {
          id: "exp-2",
          company: "TechScale Innovations",
          role: "Full Stack Software Developer",
          location: "San Jose, CA",
          startDate: "2019-06",
          endDate: "2021-05",
          bullets: [
            "Built real-time data visualization dashboards for enterprise clients using React, TypeScript, and WebSockets.",
            "Integrated Stripe payment gateways and subscription management handling $1.2M annual recurring revenue.",
          ],
        },
      ],
      projects: [
        {
          id: "proj-1",
          title: "DevStream AI — Developer Workflow Engine",
          technologies: "Next.js, TypeScript, OpenAI API, TailwindCSS, Supabase",
          date: "2023",
          bullets: [
            "Created an AI-assisted code review tool used by over 3,000 developers worldwide.",
            "Implemented vector search embeddings with pgvector to query codebases in natural language.",
          ],
        },
      ],
      technicalSkills: {
        languages: ["TypeScript", "JavaScript", "Python", "Go", "SQL", "HTML/CSS"],
        developerTools: ["Git", "Docker", "AWS (S3, ECS, Lambda)", "Vercel", "Jest", "Playwright"],
        frameworks: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS", "Prisma", "GraphQL"],
      },
      leadership: [
        {
          id: "lead-1",
          organization: "SF Tech Meetup",
          role: "Technical Workshop Speaker",
          duration: "2022 - Present",
          bullets: [
            "Organized and hosted bi-monthly workshops on modern web architecture and AI tool integration.",
          ],
        },
      ],
      training: [],
      publications: [],
      references: "Available upon request.",
    },
  },
  {
    title: "Product Manager — AI & Growth",
    template_id: "modern-minimal",
    status: "published" as const,
    ats_score: 85,
    resume_data: {
      personalInfo: {
        fullName: "Sarah Chen",
        address: "New York, NY",
        phone: "+1 (555) 987-6543",
        email: "sarah.chen@example.com",
        linkedIn: "linkedin.com/in/sarahchen-pm",
        github: "",
        currentRole: "Lead Product Manager",
      },
      objective:
        "Data-driven Product Manager with 5+ years driving SaaS product growth, user acquisition, and AI feature integration. Expert in user research, agile methodologies, and cross-functional team leadership.",
      education: [
        {
          id: "edu-1",
          university: "Columbia University",
          degree: "B.A. Economics & Information Systems",
          location: "New York, NY",
          startDate: "2016-08",
          endDate: "2020-05",
          cgpa: "3.78 / 4.0",
        },
      ],
      coursework: [
        "Product Management",
        "Data Analytics",
        "Behavioral Economics",
        "User Experience Design",
      ],
      experience: [
        {
          id: "exp-1",
          company: "Nexus Tech Corp",
          role: "Lead Product Manager",
          location: "New York, NY",
          startDate: "2022-03",
          endDate: "Present",
          bullets: [
            "Led product vision and roadmap execution for an AI search feature that increased user retention by 28%.",
            "Managed a cross-functional team of 8 engineers, 2 designers, and 1 data analyst in 2-week sprint cycles.",
            "Ran A/B experiments optimizing onboarding flow, lifting free-to-paid conversion rate by 14%.",
          ],
        },
      ],
      projects: [],
      technicalSkills: {
        languages: ["SQL", "Python (Data Analysis)"],
        developerTools: ["Mixpanel", "Amplitude", "Jira", "Figma", "Postman", "Google Analytics"],
        frameworks: ["Agile/Scrum", "A/B Testing", "User Research", "Roadmapping"],
      },
      leadership: [],
      training: [],
      publications: [],
      references: "Available upon request.",
    },
  },
  {
    title: "Data Scientist & ML Engineer",
    template_id: "executive-classic",
    status: "draft" as const,
    ats_score: 78,
    resume_data: {
      personalInfo: {
        fullName: "Marcus Vance",
        address: "Austin, TX",
        phone: "+1 (555) 456-7890",
        email: "marcus.vance@example.com",
        linkedIn: "linkedin.com/in/marcusvance-ds",
        github: "github.com/marcusvance",
        currentRole: "Senior Data Scientist",
      },
      objective:
        "Passionate Data Scientist with expertise in predictive modeling, natural language processing, and deep learning pipelines. Strong foundation in statistical analysis and production ML deployment.",
      education: [
        {
          id: "edu-1",
          university: "University of Texas at Austin",
          degree: "M.S. Data Science",
          location: "Austin, TX",
          startDate: "2019-08",
          endDate: "2021-05",
          cgpa: "3.90 / 4.0",
        },
      ],
      coursework: [
        "Machine Learning",
        "Natural Language Processing",
        "Statistical Inference",
        "Deep Learning",
      ],
      experience: [
        {
          id: "exp-1",
          company: "DataDynamics Inc",
          role: "Senior Data Scientist",
          location: "Austin, TX",
          startDate: "2021-06",
          endDate: "Present",
          bullets: [
            "Designed and trained churn prediction models using XGBoost and PyTorch, saving $500K in ARR.",
            "Built NLP pipelines analyzing customer support tickets, reducing tagging triage time by 60%.",
          ],
        },
      ],
      projects: [],
      technicalSkills: {
        languages: ["Python", "R", "SQL", "C++"],
        developerTools: ["PyTorch", "TensorFlow", "scikit-learn", "Pandas", "AWS SageMaker", "MLflow"],
        frameworks: ["Deep Learning", "NLP", "Time Series Forecasting", "BERT", "LLM Fine-tuning"],
      },
      leadership: [],
      training: [],
      publications: [],
      references: "",
    },
  },
];

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const createdResumes = [];

    for (const mock of MOCK_RESUMES) {
      // 1. Create base row
      const newResume = await createResume(
        userId,
        mock.template_id,
        mock.title,
        false,
        null
      );

      // 2. Save complete resume data and status
      const updated = await saveResume(newResume.id, userId, {
        resume_data: mock.resume_data as any,
        status: mock.status,
      });

      // 3. Update ATS score if present
      if (mock.ats_score !== null) {
        await updateATSScore(newResume.id, userId, mock.ats_score);
      }

      createdResumes.push(updated);
    }

    return NextResponse.json({
      message: `Successfully created ${createdResumes.length} sample resumes.`,
      resumes: createdResumes,
    });
  } catch (error) {
    console.error("[POST /api/resumes/seed]", error);
    return NextResponse.json(
      { error: "Failed to seed sample resumes" },
      { status: 500 }
    );
  }
}

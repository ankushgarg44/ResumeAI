# ResumeAI — AI-Powered Resume Builder & ATS Optimizer

ResumeAI is a premium, production-ready SaaS application built for modern job seekers. It features an interactive, real-time resume builder, AI-driven content generation, ATS scoring, and beautiful, customizable resume templates.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

---

## ✨ Features

- **Interactive Resume Builder**: Real-time side-by-side editing interface. Customize typography, spacing, colors, and layouts dynamically.
- **ATS Analyzer & Optimizer**: Get instant feedback on your resume's searchability, missing keywords, and layout optimizations.
- **AI Content Generator**: Assemble tailored resumes for a job description using Groq-hosted language models.
- **Curated Templates**: Select from multiple high-end resume layouts (Minimal, Professional, Tech, Creative).
- **Authentication**: Modern, responsive login and signup screens (designed for seamless Clerk authentication integration).
- **Dashboard & History**: Track multiple resumes, view their ATS scores, and update them anytime.
- **PDF Export**: Single-click PDF downloads (designed for frontend/backend PDF generation libraries).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix Primitives)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: [Supabase](https://supabase.com/)
- **AI**: [Groq](https://groq.com/)
- **Containerization**: [Docker](https://www.docker.com/)

---

## 📁 Folder Structure

```text
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── (auth)/           # Authentication routes (Sign-in / Sign-up)
│   ├── (dashboard)/      # User dashboard, settings, and history
│   ├── builder/          # Live interactive Resume Builder
│   └── page.tsx          # Landing page
├── components/           # Reusable UI Components
│   ├── ui/               # shadcn base UI components
│   └── ...               # Custom layout, builder, and ATS components
├── lib/                  # Utility functions and API placeholders
│   ├── api.ts            # API integrations (Clerk, OpenAI, PDF Export)
│   ├── mock-data.ts      # Template & user resume mock data
│   └── utils.ts          # Tailwind merge & utility functions
├── types/                # Shared TypeScript definitions
└── public/               # Static assets
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) 20.9 or newer installed.

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd resume_ai
npm install
```

### 2. Configure Environment Variables

Duplicate the `.env.example` file to `.env.local` and add your Clerk, Supabase, and Groq credentials:

```bash
cp .env.example .env.local
```

Open `.env.local` and update the values:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GROQ_API_KEY=your_groq_key
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker

The production image uses a multi-stage build, Next.js standalone output, a
non-root runtime user, and an HTTP health check. Secrets are supplied only when
the container starts and are not copied into the image.

Build and start the application using the values in `.env.local`:

```bash
docker compose --env-file .env.local up --build
```

Open [http://localhost:3000](http://localhost:3000), then verify the container:

```bash
docker compose ps
curl http://localhost:3000/api/health
```

View application logs or stop the container:

```bash
docker compose logs -f web
docker compose down
```

GitHub Actions also builds the production image on every push and pull request.
The CI build uses non-secret placeholder public configuration and never receives
the Clerk secret key, Supabase service-role key, or Groq API key.

---

## 📄 License

This project is licensed under the MIT License.

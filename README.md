# ResumeAI — AI-Powered Resume Builder & ATS Optimizer

ResumeAI is a premium, production-ready SaaS application built for modern job seekers. It features an interactive, real-time resume builder, AI-driven content generation, ATS scoring, and beautiful, customizable resume templates.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

---

## ✨ Features

- **Interactive Resume Builder**: Real-time side-by-side editing interface. Customize typography, spacing, colors, and layouts dynamically.
- **ATS Analyzer & Optimizer**: Get instant feedback on your resume's searchability, missing keywords, and layout optimizations.
- **AI Content Generator**: Generate high-impact summaries, bullet points, and experience descriptions (designed for OpenAI integration).
- **Curated Templates**: Select from multiple high-end resume layouts (Minimal, Professional, Tech, Creative).
- **Authentication**: Modern, responsive login and signup screens (designed for seamless Clerk authentication integration).
- **Dashboard & History**: Track multiple resumes, view their ATS scores, and update them anytime.
- **PDF Export**: Single-click PDF downloads (designed for frontend/backend PDF generation libraries).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix Primitives)
- **Icons**: [Lucide Icons](https://lucide.dev/)

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

Ensure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd resume_ai
npm install
```

### 2. Configure Environment Variables

Duplicate the `.env.example` file to `.env.local` and add your Clerk and OpenAI API credentials:

```bash
cp .env.example .env.local
```

Open `.env.local` and update the values:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
OPENAI_API_KEY=your_openai_key
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📄 License

This project is licensed under the MIT License.

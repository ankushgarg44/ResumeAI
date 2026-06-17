import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ResumeAI — AI-Powered Resume Builder",
    template: "%s | ResumeAI",
  },
  description:
    "Build ATS-friendly, professional resumes in seconds with AI. Stand out to recruiters and beat Applicant Tracking Systems with ResumeAI.",
  keywords: [
    "resume builder",
    "AI resume",
    "ATS optimization",
    "career tools",
    "job application",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn("h-full", "antialiased", inter.variable, geistSans.variable, geistMono.variable, "font-sans", geist.variable)}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col bg-background text-foreground">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

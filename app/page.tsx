import { TopNavbar } from "@/components/layout/top-navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Sparkles, Target, Zap, ArrowRight, ShieldCheck, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/20">
      <TopNavbar />
      
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-background to-background dark:from-indigo-900/20" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="container mx-auto px-4 md:px-6 text-center">
            <Badge variant="outline" className="mb-8 py-1.5 px-4 bg-background/50 backdrop-blur-sm border-primary/20 text-primary">
              <Sparkles className="w-4 h-4 mr-2" />
              ResumeAI 2.0 is live
            </Badge>
            
            <h1 className="max-w-4xl mx-auto font-heading font-extrabold text-5xl md:text-7xl tracking-tight text-foreground mb-8">
              Land your dream job with an <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-600">AI-optimized</span> resume
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-12">
              Build ATS-friendly, professional resumes in seconds. Our AI analyzes job descriptions and tailors your experience to beat the screening algorithms.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25">
                  Build Your Resume
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg">
                  See How It Works
                </Button>
              </Link>
            </div>
            
            {/* Social Proof */}
            <div className="mt-12 flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-primary/20" />
                  </div>
                ))}
              </div>
              <p>Join 10,000+ job seekers hired at top companies</p>
            </div>
          </div>
        </section>

        {/* MOCKUP SECTION */}
        <section className="py-12 md:py-24 bg-surface-container-low border-y border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative max-w-5xl mx-auto rounded-xl border border-border bg-card shadow-2xl overflow-hidden glass-panel">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="mx-auto bg-background border border-border rounded text-xs px-3 py-1 text-muted-foreground">
                  app.resumeai.com/builder
                </div>
              </div>
              <div className="p-8 md:p-12 min-h-[400px] flex items-center justify-center bg-background relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <FileText className="w-64 h-64 text-primary" />
                </div>
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 relative">
                    <ShieldCheck className="w-10 h-10 text-primary" />
                    <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">ATS Score: 98%</h3>
                  <p className="text-muted-foreground">Optimized for "Senior Software Engineer"</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">Why choose ResumeAI?</h2>
              <p className="text-lg text-muted-foreground">
                Our platform combines industry-standard resume formats with cutting-edge AI to give you the unfair advantage in your job search.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 border-border bg-card hover:shadow-lg transition-all card-hover-accent">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI-Powered Writing</h3>
                <p className="text-muted-foreground">
                  Stuck on what to write? Give us a rough outline, and our AI will generate professional, impact-driven bullet points.
                </p>
              </Card>
              
              <Card className="p-8 border-border bg-card hover:shadow-lg transition-all card-hover-accent">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Targeted Optimization</h3>
                <p className="text-muted-foreground">
                  Paste a job description and instantly see how your resume scores. We'll tell you exactly which keywords you're missing.
                </p>
              </Card>
              
              <Card className="p-8 border-border bg-card hover:shadow-lg transition-all card-hover-accent">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">ATS-Friendly Designs</h3>
                <p className="text-muted-foreground">
                  Our templates aren't just beautiful—they are meticulously engineered to pass through Applicant Tracking Systems flawlessly.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">Ready to land more interviews?</h2>
            <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto mb-10">
              Join thousands of job seekers who have accelerated their careers with ResumeAI.
            </p>
            <Link href="/sign-up">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-bold text-primary hover:bg-white">
                Create Your Free Resume
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

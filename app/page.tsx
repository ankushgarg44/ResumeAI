import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { TopNavbar } from "@/components/layout/top-navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function LandingPage() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <TopNavbar />
      
      <main className="flex-1 flex items-center pt-24 pb-32 md:pt-32 md:pb-64">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Copy & CTA */}
            <div className="max-w-xl">
              <h1 className="font-heading font-extrabold text-5xl md:text-6xl text-foreground leading-[1.1] mb-6">
                Build ATS-Friendly<br />Resumes with AI
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed pr-4">
                Generate professional ATS-optimized resumes in seconds. Impress recruiters and beat Applicant Tracking Systems with our intelligent resume builder.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/sign-up" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-sm">
                    Start Building Free
                  </Button>
                </Link>
                <Link href="/templates" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base border-border text-foreground hover:bg-accent rounded-md font-medium">
                    View Templates
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: macOS Window Mockup */}
            <div className="relative w-full max-w-lg mx-auto lg:ml-auto lg:mr-0 pl-0 lg:pl-8">
              {/* Optional subtle background glow if needed, but the design looks very clean/white */}
              <div className="relative rounded-xl border border-border/60 bg-card shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden">
                
                {/* macOS Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  </div>
                </div>
                
                {/* Window Body (Resume Content) */}
                <div className="p-8 md:p-10 bg-background relative min-h-[380px] flex flex-col gap-6">
                  {/* Abstract Resume Lines */}
                  <div className="space-y-3">
                    <div className="w-1/3 h-4 bg-muted rounded-md mb-6" />
                    <div className="w-full h-2 bg-muted/60 rounded-md" />
                    <div className="w-5/6 h-2 bg-muted/60 rounded-md" />
                    <div className="w-4/6 h-2 bg-muted/60 rounded-md" />
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="w-1/4 h-3 bg-muted rounded-md mb-4" />
                    <div className="w-full h-2 bg-muted/60 rounded-md" />
                    <div className="w-full h-2 bg-muted/60 rounded-md" />
                    <div className="w-3/4 h-2 bg-muted/60 rounded-md" />
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="w-1/4 h-3 bg-muted rounded-md mb-4" />
                    <div className="w-full h-2 bg-muted/60 rounded-md" />
                    <div className="w-5/6 h-2 bg-muted/60 rounded-md" />
                  </div>

                  {/* Overlay Button */}
                  <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] flex items-center justify-center">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg h-12 px-8 rounded-full text-base font-medium transition-transform hover:scale-105">
                      Analyze Resume
                    </Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

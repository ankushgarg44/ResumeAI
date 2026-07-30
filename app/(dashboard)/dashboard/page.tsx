import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { EmptyState } from "@/components/ui/empty-state";
import Link from "next/link";
import { getUserResumes } from "@/lib/supabase/resumes";
import { SeedResumesButton } from "@/components/resumes/seed-button";
import { DashboardResumeActions } from "@/components/resumes/dashboard-resume-actions";

export default async function DashboardPage() {
  const user = await currentUser();
  const firstName = user?.firstName || "User";
  const userId = user?.id;

  if (!userId) {
    return <div>Not signed in</div>;
  }

  // Fetch real resumes
  const allResumes = await getUserResumes(userId);
  const recentResumes = allResumes.slice(0, 3); // top 3 for dashboard

  // Calculate actual stats
  const totalResumes = allResumes.length;
  
  // Calculate avg ATS score only for resumes that have one
  const scoredResumes = allResumes.filter(r => r.ats_score !== null);
  const atsScoreAvg = scoredResumes.length > 0
    ? Math.round(scoredResumes.reduce((acc, r) => acc + (r.ats_score || 0), 0) / scoredResumes.length)
    : null;

  // Count resumes that have a good ATS score (e.g., > 70) as "Job Optimized"
  const jobOptimized = scoredResumes.filter(r => (r.ats_score || 0) >= 70).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div>
        <h2 className="text-3xl font-heading font-bold text-foreground">
          Welcome back, {firstName} 👋
        </h2>
        <p className="text-muted-foreground mt-1">
          Here&apos;s what&apos;s happening with your job search today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Resumes</p>
              <p className="text-2xl font-bold text-foreground">{totalResumes}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">ATS Score Avg</p>
              <p className="text-2xl font-bold text-foreground">
                {atsScoreAvg !== null ? atsScoreAvg : "--"}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-lg">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Job Optimized</p>
              <p className="text-2xl font-bold text-foreground">{jobOptimized}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Downloads</p>
              <p className="text-2xl font-bold text-foreground">0</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Resumes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground">Recent Resumes</h3>
          {allResumes.length > 0 && (
            <Link href="/resumes" className="text-sm text-primary font-medium hover:underline">
              View all
            </Link>
          )}
        </div>

        {recentResumes.length === 0 ? (
          <EmptyState
            title="No resumes yet"
            description="Create your first AI-powered resume or generate test sample resumes to try out features."
            icon={<FileText className="w-8 h-8" />}
            action={
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/builder?new=1">
                  <Button className="bg-primary text-primary-foreground shadow-sm w-full sm:w-auto">
                    Create Resume
                  </Button>
                </Link>
                <SeedResumesButton variant="outline" />
              </div>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentResumes.map((resume) => (
              <Card key={resume.id} className="flex flex-col border-border shadow-sm hover:border-primary/50 transition-colors overflow-hidden group">
                {/* Visual Header */}
                <div className="h-32 bg-muted relative border-b border-border p-4 flex flex-col justify-end">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-2 py-1 bg-background/80 backdrop-blur-sm text-xs font-medium rounded text-muted-foreground border border-border shadow-sm">
                      {resume.template_id}
                    </span>
                    <span className="px-2 py-1 bg-background/80 backdrop-blur-sm text-xs font-medium rounded text-muted-foreground border border-border shadow-sm uppercase tracking-wider">
                      {resume.status}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h4 className="font-semibold text-foreground text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                    {resume.title}
                  </h4>
                  <div className="flex items-center text-xs text-muted-foreground mb-4">
                    <Clock className="w-3 h-3 mr-1" />
                    Updated {new Date(resume.updated_at).toLocaleDateString()}
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-border flex items-center gap-2">
                    <Link href={`/builder?id=${resume.id}`} className="flex-1">
                      <Button variant="outline" className="w-full bg-background hover:bg-muted text-sm shadow-sm h-9">
                        Edit
                      </Button>
                    </Link>
                    <DashboardResumeActions resume={resume} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, TrendingUp, CheckCircle } from "lucide-react";
import { EMPTY_STATS, EMPTY_RESUMES } from "@/lib/placeholders";
import { currentUser } from "@clerk/nextjs/server";
import { EmptyState } from "@/components/ui/empty-state";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await currentUser();
  const firstName = user?.firstName || "User";

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
              <p className="text-2xl font-bold text-foreground">{EMPTY_STATS.totalResumes}</p>
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
                {EMPTY_STATS.atsScoreAvg ?? "--"}
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
              <p className="text-2xl font-bold text-foreground">{EMPTY_STATS.jobOptimized}</p>
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
              <p className="text-2xl font-bold text-foreground">{EMPTY_STATS.downloads}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Resumes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground">Recent Resumes</h3>
          {EMPTY_RESUMES.length > 0 && (
            <Link href="/resumes" className="text-sm text-primary font-medium hover:underline">
              View all
            </Link>
          )}
        </div>

        {EMPTY_RESUMES.length === 0 ? (
          <EmptyState
            title="No resumes yet"
            description="Create your first AI-powered resume to get started."
            icon={<FileText className="w-8 h-8" />}
            action={
              <Link href="/builder">
                <Button className="bg-primary text-primary-foreground shadow-sm">
                  Create Resume
                </Button>
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Resumes would be rendered here if available */}
          </div>
        )}
      </div>
    </div>
  );
}

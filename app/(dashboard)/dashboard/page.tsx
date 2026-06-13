import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, MoreVertical, Download, Play, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { mockDashboardStats, mockResumes } from "@/lib/mock-data";
import { getScoreColor, getScoreBgColor, formatRelativeTime } from "@/lib/utils";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div>
        <h2 className="text-3xl font-heading font-bold text-foreground">
          Welcome back, Ankush 👋
        </h2>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your job search today.
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
              <p className="text-2xl font-bold text-foreground">{mockDashboardStats.totalResumes}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">ATS Score Avg</p>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl font-bold text-foreground">{mockDashboardStats.atsScoreAvg}</p>
                <span className="text-sm text-emerald-600 font-medium">+2%</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Job Optimized</p>
              <p className="text-2xl font-bold text-foreground">{mockDashboardStats.jobOptimized}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Downloads</p>
              <p className="text-2xl font-bold text-foreground">{mockDashboardStats.downloads}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Resumes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground">Recent Resumes</h3>
          <Link href="/resumes" className="text-sm text-primary font-medium hover:underline">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockResumes.map((resume) => (
            <Card key={resume.id} className="overflow-hidden border-border hover:shadow-md transition-all group">
              {/* Card Header (Preview thumbnail placeholder) */}
              <div className="h-32 bg-muted relative flex items-center justify-center border-b border-border">
                <FileText className="w-12 h-12 text-muted-foreground/30" />
                {resume.status === "draft" && (
                  <Badge variant="secondary" className="absolute top-3 left-3 bg-background/80 backdrop-blur">
                    Draft
                  </Badge>
                )}
                {resume.atsScore && (
                  <Badge className={`absolute top-3 right-3 shadow-sm ${getScoreBgColor(resume.atsScore)} ${getScoreColor(resume.atsScore)}`}>
                    Score: {resume.atsScore}
                  </Badge>
                )}
              </div>
              
              {/* Card Body */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-foreground line-clamp-1" title={resume.title}>
                    {resume.title}
                  </h4>
                  <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-2 text-muted-foreground">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Template: {resume.templateName}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Updated {formatRelativeTime(resume.updatedAt)}
                  </span>
                </div>
                
                {/* Actions (visible on hover or always on mobile) */}
                <div className="mt-4 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  <Button variant="outline" size="sm" className="flex-1 bg-background">
                    Edit
                  </Button>
                  <Button size="sm" className="flex-1 bg-primary text-primary-foreground">
                    <Download className="w-4 h-4 mr-1.5" />
                    Export
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          
          {/* Create New Card */}
          <Link href="/builder" className="block h-full">
            <Card className="h-full min-h-[280px] border-dashed border-2 border-border bg-transparent hover:bg-muted/50 hover:border-primary/50 transition-colors flex flex-col items-center justify-center text-center p-6 cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-1">Create New Resume</h4>
              <p className="text-sm text-muted-foreground">Start from scratch or use AI</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

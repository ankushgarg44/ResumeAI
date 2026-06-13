import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { mockResumes } from "@/lib/mock-data";
import { getScoreColor, getScoreBgColor, formatRelativeTime } from "@/lib/utils";
import { FileText, MoreVertical, Download, Search, Filter, Clock, Edit2, Trash2, Copy } from "lucide-react";
import Link from "next/link";

export default function ResumesPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">My Resumes</h2>
          <p className="text-muted-foreground mt-1">
            Manage your resumes, drafts, and optimized variants.
          </p>
        </div>
        <Link href="/builder">
          <Button className="bg-primary text-primary-foreground shadow-sm">
            Create New Resume
          </Button>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-lg border border-border shadow-sm">
        <div className="w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          <Tabs defaultValue="all" className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">All Resumes</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search resumes..."
              className="w-full pl-9 bg-background"
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 bg-background">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Resumes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockResumes.map((resume) => (
          <Card key={resume.id} className="overflow-hidden border-border hover:shadow-md transition-all group flex flex-col">
            {/* Card Header (Preview thumbnail placeholder) */}
            <div className="h-40 bg-muted relative flex items-center justify-center border-b border-border">
              <FileText className="w-16 h-16 text-muted-foreground/30" />
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
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-foreground line-clamp-1" title={resume.title}>
                  {resume.title}
                </h4>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-2 text-muted-foreground">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="cursor-pointer">
                      <Edit2 className="w-4 h-4 mr-2" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Download className="w-4 h-4 mr-2" /> Download PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Copy className="w-4 h-4 mr-2" /> Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground">
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 flex-1">
                {resume.templateName}
              </p>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatRelativeTime(resume.updatedAt)}
                </span>
              </div>
            </div>
          </Card>
        ))}
        
        {/* Create New Card */}
        <Link href="/builder" className="block h-full">
          <Card className="h-full min-h-[300px] border-dashed border-2 border-border bg-transparent hover:bg-muted/50 hover:border-primary/50 transition-colors flex flex-col items-center justify-center text-center p-6 cursor-pointer">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="w-7 h-7 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground mb-1">Create New Resume</h4>
            <p className="text-sm text-muted-foreground">Start from scratch or use AI</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}

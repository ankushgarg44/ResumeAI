"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Search, Filter, Clock, Eye, Download } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { DeleteResumeButton } from "@/components/resumes/delete-button";
import { SeedResumesButton } from "@/components/resumes/seed-button";
import { useResumeDownload } from "@/components/resumes/resume-pdf-viewer";
import { ResumePreviewModal } from "@/components/resumes/resume-preview-modal";
import type { Resume } from "@/types";

function ResumeCardActions({ resume, onPreview }: { resume: Resume, onPreview: (r: Resume) => void }) {
  const { handleDownload, isGenerating, HiddenTemplate } = useResumeDownload(resume);
  return (
    <>
      <HiddenTemplate />
      <Button
        variant="outline"
        size="sm"
        className="h-9 shadow-sm"
        onClick={() => onPreview(resume)}
      >
        <Eye className="w-4 h-4 mr-1" /> View
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-9 shadow-sm"
        onClick={handleDownload}
        disabled={isGenerating}
      >
        <Download className="w-4 h-4 mr-1" />
        {isGenerating ? "..." : "PDF"}
      </Button>
    </>
  );
}

export function ResumesClient({ allResumes }: { allResumes: Resume[] }) {
  const [previewResume, setPreviewResume] = useState<Resume | null>(null);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">My Resumes</h2>
          <p className="text-muted-foreground mt-1">
            Manage your resumes, drafts, and optimized variants.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SeedResumesButton variant="outline" />
          <Link href="/builder?new=1">
            <Button className="bg-primary text-primary-foreground shadow-sm">
              Create New Resume
            </Button>
          </Link>
        </div>
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
              // TODO: Implement client-side filtering later
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 bg-background">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Resumes Content */}
      {allResumes.length === 0 ? (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allResumes.map((resume) => (
            <Card key={resume.id} className="flex flex-col border-border shadow-sm hover:border-primary/50 transition-colors overflow-hidden group">
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
                  Updated {new Date(resume.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </div>
                
                <div className="mt-auto pt-4 border-t border-border flex items-center gap-2">
                  <Link href={`/builder?id=${resume.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-background hover:bg-muted text-sm shadow-sm h-9">
                      Edit
                    </Button>
                  </Link>
                  <ResumeCardActions resume={resume} onPreview={setPreviewResume} />
                  <DeleteResumeButton id={resume.id} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ResumePreviewModal
        resume={previewResume}
        open={!!previewResume}
        onClose={() => setPreviewResume(null)}
      />
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EMPTY_RESUMES } from "@/lib/placeholders";
import { FileText, Search, Filter } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
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
              // TODO: Implement search functionality
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 bg-background">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Resumes Content */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Resume cards would be rendered here if available */}
        </div>
      )}
    </div>
  );
}

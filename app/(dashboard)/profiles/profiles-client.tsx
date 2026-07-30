"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { UserCircle2, Clock, Eye, Download } from "lucide-react";
import Link from "next/link";
import { DeleteResumeButton } from "@/components/resumes/delete-button";
import { SeedProfilesButton } from "@/components/profiles/seed-button";
import { useResumeDownload } from "@/components/resumes/resume-pdf-viewer";
import { ResumePreviewModal } from "@/components/resumes/resume-preview-modal";
import type { Resume } from "@/types";

function ProfileCardActions({ profile, onPreview }: { profile: Resume, onPreview: (r: Resume) => void }) {
  const { handleDownload, isGenerating, HiddenTemplate } = useResumeDownload(profile);
  return (
    <>
      <HiddenTemplate />
      <Button
        variant="outline"
        size="sm"
        className="h-9 shadow-sm"
        onClick={() => onPreview(profile)}
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

export function ProfilesClient({ profiles }: { profiles: Resume[] }) {
  const [previewProfile, setPreviewProfile] = useState<Resume | null>(null);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">My Profiles</h2>
          <p className="text-muted-foreground mt-1">
            Your master resume vaults. Build one profile per domain you work in.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SeedProfilesButton variant="outline" />
          <Link href="/builder?new=1&isProfile=true">
            <Button className="bg-primary text-primary-foreground shadow-sm">
              Create New Profile
            </Button>
          </Link>
        </div>
      </div>

      {profiles.length === 0 ? (
        <EmptyState
          title="No profiles yet"
          description="No profiles yet. Create your first profile resume or generate test sample profiles to get started with Smart Assembly."
          icon={<UserCircle2 className="w-8 h-8" />}
          action={
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/builder?new=1&isProfile=true">
                <Button className="bg-primary text-primary-foreground shadow-sm w-full sm:w-auto">
                  Create Profile
                </Button>
              </Link>
              <SeedProfilesButton variant="outline" />
            </div>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {profiles.map((profile) => (
            <Card
              key={profile.id}
              className="flex flex-col border-border shadow-sm hover:border-primary/50 transition-colors overflow-hidden group"
            >
              <div className="h-32 bg-muted relative border-b border-border p-4 flex flex-col justify-end">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>
                <div className="relative z-10 flex items-center justify-between">
                  {profile.profile_type && (
                    <Badge className="bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                      {profile.profile_type}
                    </Badge>
                  )}
                  <span className="px-2 py-1 bg-background/80 backdrop-blur-sm text-xs font-medium rounded text-muted-foreground border border-border shadow-sm">
                    {profile.template_id}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h4 className="font-semibold text-foreground text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                  {profile.title}
                </h4>
                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <Clock className="w-3 h-3 mr-1" />
                  Updated {new Date(profile.updated_at).toLocaleDateString()}
                </div>

                <div className="mt-auto pt-4 border-t border-border flex items-center gap-2">
                  <Link
                    href={`/builder?id=${profile.id}&isProfile=true`}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      className="w-full bg-background hover:bg-muted text-sm shadow-sm h-9"
                    >
                      Edit
                    </Button>
                  </Link>
                  <ProfileCardActions profile={profile} onPreview={setPreviewProfile} />
                  <DeleteResumeButton id={profile.id} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ResumePreviewModal
        resume={previewProfile}
        open={!!previewProfile}
        onClose={() => setPreviewProfile(null)}
      />
    </div>
  );
}

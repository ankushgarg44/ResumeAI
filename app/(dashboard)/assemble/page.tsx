"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Check,
  Loader2,
  FileEdit,
  RotateCcw,
  UserCircle2,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { TEMPLATE_CONFIGS, getTemplateIds } from "@/lib/template-configs";
import type { Resume } from "@/types";

const loadingMessages = [
  "Reading your profiles...",
  "Analyzing the job description...",
  "Finding the best experience matches...",
  "Selecting most relevant projects...",
  "Ordering skills to match the role...",
  "Assembling your resume...",
];

interface AssembleResult {
  resumeId: string;
  assembledResume: any;
  reasoning: {
    summary: string;
    experience: string;
    projects: string;
    skills: string;
    omitted: string;
  };
  templateId: string;
}

export default function AssemblePage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 state
  const [profiles, setProfiles] = useState<Resume[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Step 2 state
  const [jobDescription, setJobDescription] = useState("");
  const [templateId, setTemplateId] = useState("ats-professional");
  const [isAssembling, setIsAssembling] = useState(false);
  const [assembleError, setAssembleError] = useState<string | null>(null);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);

  // Step 3 state
  const [result, setResult] = useState<AssembleResult | null>(null);
  const [openReasoningSections, setOpenReasoningSections] = useState<Set<string>>(
    new Set(["summary"])
  );

  // Fetch profiles on mount
  useEffect(() => {
    async function fetchProfiles() {
      try {
        const res = await fetch("/api/profiles");
        if (!res.ok) throw new Error("Failed to fetch profiles");
        const data = await res.json();
        setProfiles(data);
      } catch (err) {
        setProfileError("Failed to load profiles. Please try again.");
      } finally {
        setLoadingProfiles(false);
      }
    }
    fetchProfiles();
  }, []);

  // Cycle loading messages during assembly
  useEffect(() => {
    if (!isAssembling) return;
    const interval = setInterval(() => {
      setLoadingMsgIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isAssembling]);

  const toggleProfile = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleAssemble = useCallback(async () => {
    setIsAssembling(true);
    setAssembleError(null);
    setLoadingMsgIndex(0);
    try {
      const res = await fetch("/api/assemble", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileIds: Array.from(selectedIds),
          jobDescription,
          templateId,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Assembly failed");
      }
      const data: AssembleResult = await res.json();
      setResult(data);
      setStep(3);
    } catch (err: any) {
      setAssembleError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsAssembling(false);
    }
  }, [selectedIds, jobDescription, templateId]);

  const toggleReasoning = (key: string) => {
    setOpenReasoningSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const resetWizard = () => {
    setStep(1);
    setSelectedIds(new Set());
    setJobDescription("");
    setResult(null);
    setAssembleError(null);
  };

  // ─── STEP 1: Select Profiles ─────────────────
  if (step === 1) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-10">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Smart Assemble</h2>
          <p className="text-muted-foreground mt-1">
            Select the profiles you want to use, then paste a job description. AI will
            assemble the perfect resume.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
            1
          </span>
          <span className="text-foreground font-medium">Select Profiles</span>
          <ChevronRight className="w-4 h-4" />
          <span className="w-7 h-7 rounded-full border-2 border-muted flex items-center justify-center text-xs font-bold">
            2
          </span>
          <span>Job Description</span>
          <ChevronRight className="w-4 h-4" />
          <span className="w-7 h-7 rounded-full border-2 border-muted flex items-center justify-center text-xs font-bold">
            3
          </span>
          <span>Result</span>
        </div>

        {loadingProfiles ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : profileError ? (
          <div className="text-center py-10 text-red-500">{profileError}</div>
        ) : profiles.length === 0 ? (
          <Card className="p-10 text-center space-y-4">
            <UserCircle2 className="w-12 h-12 mx-auto text-muted-foreground" />
            <h3 className="font-semibold text-lg">No profiles found</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              You need at least one profile resume to use Smart Assembly. Create
              your first profile to get started.
            </p>
            <Link href="/builder?new=1&isProfile=true">
              <Button className="bg-primary text-primary-foreground">
                Create Profile
              </Button>
            </Link>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profiles.map((profile) => {
                const isSelected = selectedIds.has(profile.id);
                return (
                  <Card
                    key={profile.id}
                    onClick={() => toggleProfile(profile.id)}
                    className={cn(
                      "cursor-pointer transition-all duration-200 p-4 border-2 flex flex-col gap-3",
                      isSelected
                        ? "border-primary shadow-lg shadow-primary/10 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/40"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground truncate">
                          {profile.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Updated{" "}
                          {new Date(profile.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div
                        className={cn(
                          "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0 ml-2",
                          isSelected
                            ? "bg-primary border-primary"
                            : "border-muted-foreground/30"
                        )}
                      >
                        {isSelected && (
                          <Check className="w-3 h-3 text-primary-foreground" />
                        )}
                      </div>
                    </div>
                    {profile.profile_type && (
                      <Badge className="w-fit bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800 text-xs">
                        {profile.profile_type}
                      </Badge>
                    )}
                  </Card>
                );
              })}
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => setStep(2)}
                disabled={selectedIds.size === 0}
                className="bg-primary text-primary-foreground"
              >
                Next: Add Job Description
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }

  // ─── STEP 2: Job Description ─────────────────
  if (step === 2) {
    const selectedProfiles = profiles.filter((p) => selectedIds.has(p.id));
    const templateIds = getTemplateIds();

    return (
      <div className="max-w-3xl mx-auto space-y-6 pb-10 relative">
        {/* Loading overlay */}
        {isAssembling && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center space-y-6 max-w-sm">
              <div className="relative mx-auto w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                </div>
              </div>
              <p className="text-lg font-medium text-foreground animate-in fade-in duration-500" key={loadingMsgIndex}>
                {loadingMessages[loadingMsgIndex]}
              </p>
              <p className="text-sm text-muted-foreground">
                This usually takes 10–20 seconds.
              </p>
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Paste Job Description
          </h2>
          <p className="text-muted-foreground mt-1">
            The AI will analyze this and pick the best content from your selected
            profiles.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
            ✓
          </span>
          <span>Select Profiles</span>
          <ChevronRight className="w-4 h-4" />
          <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
            2
          </span>
          <span className="text-foreground font-medium">Job Description</span>
          <ChevronRight className="w-4 h-4" />
          <span className="w-7 h-7 rounded-full border-2 border-muted flex items-center justify-center text-xs font-bold">
            3
          </span>
          <span>Result</span>
        </div>

        {/* Selected profiles badges */}
        <div className="flex flex-wrap gap-2">
          {selectedProfiles.map((p) => (
            <Badge
              key={p.id}
              variant="secondary"
              className="text-xs"
            >
              {p.title}
              {p.profile_type && ` (${p.profile_type})`}
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobDescription">Job Description</Label>
          <Textarea
            id="jobDescription"
            className="min-h-[250px] font-mono text-sm"
            placeholder="Paste the full job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <p className="text-xs text-muted-foreground text-right">
            {jobDescription.length} characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="outputTemplate">Output Template</Label>
          <select
            id="outputTemplate"
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {templateIds.map((id) => (
              <option key={id} value={id}>
                {TEMPLATE_CONFIGS[id].name}
              </option>
            ))}
          </select>
        </div>

        {assembleError && (
          <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
            {assembleError}
          </div>
        )}

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(1)}
            className="bg-background"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleAssemble}
            disabled={!jobDescription.trim() || isAssembling}
            className="bg-primary text-primary-foreground"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Assemble My Resume
          </Button>
        </div>
      </div>
    );
  }

  // ─── STEP 3: Result ──────────────────────────
  if (step === 3 && result) {
    const reasoningSections = [
      { key: "summary", title: "Summary Strategy", content: result.reasoning.summary },
      { key: "experience", title: "Experience Picks", content: result.reasoning.experience },
      { key: "projects", title: "Project Picks", content: result.reasoning.projects },
      { key: "omitted", title: "What Was Omitted", content: result.reasoning.omitted },
    ];

    return (
      <div className="max-w-3xl mx-auto space-y-6 pb-10">
        {/* Progress */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
            ✓
          </span>
          <span>Select Profiles</span>
          <ChevronRight className="w-4 h-4" />
          <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
            ✓
          </span>
          <span>Job Description</span>
          <ChevronRight className="w-4 h-4" />
          <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
            3
          </span>
          <span className="text-foreground font-medium">Result</span>
        </div>

        {/* Success banner */}
        <div className="p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
            <Check className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300">
            Your resume has been assembled!
          </h3>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            The AI selected the most relevant content from your profiles for this job.
          </p>
        </div>

        {/* Reasoning accordion */}
        <div className="space-y-2">
          <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider text-muted-foreground">
            Why this was chosen
          </h4>
          {reasoningSections.map((section) => (
            <div
              key={section.key}
              className="border border-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleReasoning(section.key)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium text-sm text-foreground">
                  {section.title}
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform",
                    openReasoningSections.has(section.key) && "rotate-180"
                  )}
                />
              </button>
              {openReasoningSections.has(section.key) && (
                <div className="px-4 pb-4 text-sm text-muted-foreground border-t border-border pt-3">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={`/builder?id=${result.resumeId}`} className="flex-1">
            <Button className="w-full bg-primary text-primary-foreground">
              <FileEdit className="w-4 h-4 mr-2" />
              Edit & Download
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={resetWizard}
            className="flex-1 bg-background"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Assemble Another
          </Button>
        </div>
      </div>
    );
  }

  return null;
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { builderSteps } from "@/lib/mock-data";
import { BuilderStep } from "@/types";
import { Sparkles, ChevronRight, ChevronLeft, Save } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BuilderPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = builderSteps[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < builderSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  // Calculate progress percentage
  const progress = ((currentStepIndex + 1) / builderSteps.length) * 100;

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] -m-4 md:-m-6">
      {/* Top Action Bar & Progress */}
      <div className="bg-card border-b border-border p-4 shrink-0 shadow-sm z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span className="text-muted-foreground">Draft Resume</span>
            <span className="text-muted-foreground font-normal">/</span>
            {currentStep.label}
          </h2>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground">
              <Save className="w-4 h-4 mr-2" /> Save Draft
            </Button>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={handleBack} 
                disabled={currentStepIndex === 0}
                className="bg-background"
              >
                <ChevronLeft className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <Button 
                onClick={handleNext}
                className="bg-primary text-primary-foreground"
              >
                {currentStepIndex === builderSteps.length - 1 ? (
                  "Finish"
                ) : (
                  <>
                    <span className="hidden sm:inline">Next Step</span>
                    <ChevronRight className="w-4 h-4 sm:ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between mb-2 hidden sm:flex">
            {builderSteps.map((step, idx) => (
              <div 
                key={step.key} 
                className={cn(
                  "text-xs font-medium transition-colors",
                  idx <= currentStepIndex ? "text-primary" : "text-muted-foreground"
                )}
              >
                {idx + 1}. {step.label}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2 bg-muted">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-in-out" 
              style={{ width: `${progress}%` }} 
            />
          </Progress>
        </div>
      </div>

      {/* Main Builder Area - Dual Pane */}
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row bg-background">
        
        {/* Left Pane - Editor */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:border-r border-border">
          <div className="max-w-3xl mx-auto">
            {currentStep.key === "basics" && <BasicsStep />}
            {currentStep.key === "experience" && <ExperienceStep />}
            {currentStep.key !== "basics" && currentStep.key !== "experience" && (
              <div className="text-center py-20 text-muted-foreground">
                <p>Component for {currentStep.label} goes here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane - Preview (Hidden on small screens) */}
        <div className="hidden lg:block w-[45%] bg-muted/30 p-6 overflow-y-auto">
          <div className="sticky top-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">Live Preview</h3>
            </div>
            {/* Mock Resume Preview Paper */}
            <div className="aspect-[1/1.414] bg-white rounded shadow-sm border border-border p-8 relative overflow-hidden">
               {/* Skeleton Content */}
               <div className="w-3/4 h-8 bg-muted rounded mb-2" />
               <div className="w-1/2 h-4 bg-muted/50 rounded mb-8" />
               <div className="w-full h-px bg-border mb-6" />
               <div className="w-full h-24 bg-muted/30 rounded mb-6" />
               <div className="w-full h-px bg-border mb-6" />
               <div className="w-2/3 h-5 bg-muted rounded mb-4" />
               <div className="w-full h-16 bg-muted/30 rounded mb-4" />
               <div className="w-full h-16 bg-muted/30 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Step Components (Inline for brevity in this task)
// ==========================================

function BasicsStep() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h3 className="text-2xl font-bold mb-1">Personal Information</h3>
        <p className="text-muted-foreground">Start with the basics. This is how employers will contact you.</p>
      </div>

      {/* AI Assistant Card */}
      <Card className="p-5 border-primary/20 bg-primary/5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex-1 space-y-3">
            <h4 className="font-semibold text-foreground">AI Auto-Fill</h4>
            <p className="text-sm text-muted-foreground">
              Paste your LinkedIn summary or a quick intro, and we'll fill out the fields below.
            </p>
            <div className="flex gap-2">
              <Input placeholder="E.g., I'm a software engineer in SF with 5 years experience..." className="bg-background" />
              <Button className="shrink-0 bg-primary text-primary-foreground">Auto-Fill</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Manual Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" placeholder="Jane Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currentRole">Current Role</Label>
          <Input id="currentRole" placeholder="Senior Software Engineer" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="jane@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="San Francisco, CA" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn URL (Optional)</Label>
          <Input id="linkedin" placeholder="linkedin.com/in/janedoe" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="summary">Professional Summary</Label>
            <Button variant="ghost" size="sm" className="h-6 text-xs text-primary px-2 py-0">
              <Sparkles className="w-3 h-3 mr-1" /> AI Write
            </Button>
          </div>
          <Textarea 
            id="summary" 
            placeholder="Briefly summarize your expertise and career goals..." 
            className="min-h-[120px] resize-none"
          />
        </div>
      </div>
    </div>
  );
}

function ExperienceStep() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-1">Work Experience</h3>
          <p className="text-muted-foreground">List your relevant experience, starting with the most recent.</p>
        </div>
        <Button variant="outline" className="bg-background">
          + Add Position
        </Button>
      </div>

      <Card className="p-6 border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" placeholder="e.g. Google" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Job Title</Label>
            <Input id="role" placeholder="e.g. Software Engineer" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input id="startDate" type="month" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input id="endDate" type="month" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="desc">Description & Achievements</Label>
            <Button variant="ghost" size="sm" className="h-6 text-xs text-primary px-2 py-0 bg-primary/10 hover:bg-primary/20">
              <Sparkles className="w-3 h-3 mr-1" /> Generate Bullets
            </Button>
          </div>
          <Textarea 
            id="desc" 
            placeholder="Describe your responsibilities and achievements..." 
            className="min-h-[150px]"
          />
        </div>
      </Card>
    </div>
  );
}

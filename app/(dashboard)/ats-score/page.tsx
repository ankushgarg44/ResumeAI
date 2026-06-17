"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/ui/empty-state";
import { 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  RefreshCw, 
  Sparkles, 
  Upload 
} from "lucide-react";
import { getScoreColor } from "@/lib/utils";
import type { ATSAnalysis, ATSSuggestion } from "@/types";

export default function ATSScorePage() {
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);

  const handleClear = () => {
    setJobDescription("");
    setAnalysis(null);
  };

  const handleAnalyze = () => {
    // TODO: Implement real backend analysis integration
    setAnalysis({
      overallScore: 84,
      matchedSkills: ["React", "Node.js", "PostgreSQL", "Microservices", "Docker"],
      missingKeywords: ["TypeScript", "Jest", "GraphQL"],
      suggestions: [
        {
          id: "sug-1",
          icon: "edit_note",
          text: 'Highlight specific metrics in your most recent role to better align with the "impact-driven" requirement.',
          type: "improvement",
        },
        {
          id: "sug-2",
          icon: "swap_vert",
          text: 'Move your "Education" section below "Experience" to prioritize your technical background.',
          type: "tip",
        },
        {
          id: "sug-3",
          icon: "add_circle",
          text: "Add TypeScript to your skills section — it appears 4 times in the job description.",
          type: "warning",
        },
      ],
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Job Optimization</h2>
          <p className="text-muted-foreground mt-1">
            Tailor your resume to match specific job requirements.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-background" disabled={!analysis}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
          <Button className="bg-primary text-primary-foreground shadow-sm" disabled={!analysis}>
            <Sparkles className="w-4 h-4 mr-2" />
            Auto-Optimize Resume
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Input */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-5 border-border shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Target Job Description</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 text-xs text-muted-foreground"
                onClick={handleClear}
                disabled={!jobDescription}
              >
                Clear
              </Button>
            </div>
            
            <Textarea 
              placeholder="Paste the job description here..."
              className="min-h-[300px] flex-1 resize-none bg-muted/30 focus-visible:bg-background border-border text-sm"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            
            <Button 
              className="w-full mt-4 bg-primary text-primary-foreground shadow-sm"
              onClick={handleAnalyze}
              disabled={!jobDescription.trim()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Analyze Match
            </Button>
          </Card>
        </div>

        {/* Right Column: Analysis or Empty State */}
        <div className="lg:col-span-2 space-y-6">
          {analysis === null ? (
            <EmptyState
              title="Paste a job description to analyze your resume match."
              description="Analysis results will appear here."
              icon={<Sparkles className="w-8 h-8 text-primary" />}
              className="h-full min-h-[420px]"
            />
          ) : (
            <Card className="border-border shadow-sm overflow-hidden relative">
              {/* Top Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 to-primary" />
              
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Analysis Results</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Your resume analysis details.
                    </p>
                  </div>
                  
                  {/* Score Circle */}
                  <div className="relative shrink-0 flex items-center justify-center w-24 h-24 rounded-full border-8 border-muted">
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle 
                        cx="50" cy="50" r="46" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="8" 
                        strokeDasharray="289" 
                        strokeDashoffset={289 - (289 * (analysis?.overallScore || 0)) / 100}
                        className={getScoreColor(analysis?.overallScore || 0)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="text-center">
                      <span className={`text-2xl font-bold ${getScoreColor(analysis?.overallScore || 0)}`}>
                        {analysis?.overallScore || 0}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <Separator className="mb-8" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Matched Skills */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <h4 className="font-semibold text-foreground">Matched Keywords</h4>
                      <Badge variant="secondary" className="ml-auto bg-emerald-100 text-emerald-700">
                        {analysis?.matchedSkills?.length || 0}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {analysis?.matchedSkills?.map((skill: string) => (
                        <Badge key={skill} variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Missing Skills */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <h4 className="font-semibold text-foreground">Missing Keywords</h4>
                      <Badge variant="secondary" className="ml-auto bg-red-100 text-red-700">
                        {analysis?.missingKeywords?.length || 0}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {analysis?.missingKeywords?.map((skill: string) => (
                        <Badge key={skill} variant="outline" className="bg-red-50 border-red-200 text-red-700">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Suggestions */}
                <div>
                  <h4 className="font-semibold text-foreground mb-4">AI Suggestions</h4>
                  <div className="space-y-3">
                    {analysis?.suggestions?.map((suggestion: ATSSuggestion) => (
                      <div key={suggestion.id} className="flex gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                        <div className="shrink-0 mt-0.5">
                          {suggestion.type === 'tip' && <Lightbulb className="w-5 h-5 text-amber-500" />}
                          {suggestion.type === 'improvement' && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
                          {suggestion.type === 'warning' && <AlertCircle className="w-5 h-5 text-red-500" />}
                        </div>
                        <p className="text-sm text-foreground">{suggestion.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { mockATSAnalysis } from "@/lib/mock-data";
import { CheckCircle2, AlertCircle, Lightbulb, RefreshCw, Sparkles, Upload } from "lucide-react";
import { getScoreColor } from "@/lib/utils";

export default function ATSScorePage() {
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
          <Button variant="outline" className="bg-background">
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
          <Button className="bg-primary text-primary-foreground shadow-sm">
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
              <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground">Clear</Button>
            </div>
            
            <Textarea 
              placeholder="Paste the job description here..."
              className="min-h-[300px] flex-1 resize-none bg-muted/30 focus-visible:bg-background border-border"
              defaultValue="We are looking for a Senior Software Engineer with deep expertise in React, Node.js, and scalable microservices. You should have experience with PostgreSQL, Docker, and CI/CD pipelines. Knowledge of TypeScript, Jest, and GraphQL is highly preferred. The ideal candidate is impact-driven and has a proven track record of mentoring junior engineers..."
            />
            
            <Button variant="secondary" className="w-full mt-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Upload className="w-4 h-4 mr-2" />
              Analyze Match
            </Button>
          </Card>
        </div>

        {/* Right Column: Analysis */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border shadow-sm overflow-hidden relative">
            {/* Top Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 to-primary" />
            
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Analysis Results</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Your resume is a strong match, but adding a few key technical terms will improve your chances with ATS filters.
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
                      strokeDashoffset={289 - (289 * mockATSAnalysis.overallScore) / 100}
                      className={getScoreColor(mockATSAnalysis.overallScore)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="text-center">
                    <span className={`text-2xl font-bold ${getScoreColor(mockATSAnalysis.overallScore)}`}>
                      {mockATSAnalysis.overallScore}%
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
                    <Badge variant="secondary" className="ml-auto bg-emerald-100 text-emerald-700">{mockATSAnalysis.matchedSkills.length}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mockATSAnalysis.matchedSkills.map(skill => (
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
                    <Badge variant="secondary" className="ml-auto bg-red-100 text-red-700">{mockATSAnalysis.missingKeywords.length}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mockATSAnalysis.missingKeywords.map(skill => (
                      <Badge key={skill} variant="outline" className="bg-red-50 border-red-200 text-red-700 cursor-pointer hover:bg-red-100 transition-colors" title="Click to add to resume">
                        {skill} <span className="ml-1 opacity-50">+</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Suggestions */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">AI Suggestions</h4>
                <div className="space-y-3">
                  {mockATSAnalysis.suggestions.map((suggestion) => (
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
        </div>
      </div>
    </div>
  );
}

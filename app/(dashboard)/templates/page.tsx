import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockTemplates } from "@/lib/mock-data";
import { Check, Star } from "lucide-react";
import Image from "next/image";

export default function TemplatesPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Resume Templates</h2>
        <p className="text-muted-foreground mt-1">
          Choose from our selection of ATS-optimized designs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {mockTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden flex flex-col border-border group">
            {/* Template Preview Area */}
            <div className="aspect-[1/1.2] bg-muted relative p-4 flex items-center justify-center border-b border-border">
              {template.atsOptimized && (
                <Badge className="absolute top-4 left-4 z-10 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
                  <Check className="w-3 h-3 mr-1" /> ATS Optimized
                </Badge>
              )}
              {template.matchScore && (
                <Badge variant="secondary" className="absolute top-4 right-4 z-10 bg-background/90 backdrop-blur">
                  <Star className="w-3 h-3 mr-1 text-amber-500 fill-amber-500" /> {template.matchScore}% Match
                </Badge>
              )}
              
              {/* Placeholder for template image */}
              <div className="w-full h-full bg-background rounded-sm shadow-sm border border-border flex flex-col p-4 opacity-90 group-hover:opacity-100 transition-opacity">
                 {/* Wireframe representation of a resume */}
                 <div className="w-1/2 h-4 bg-muted-foreground/20 rounded mb-4" />
                 <div className="w-1/3 h-2 bg-muted-foreground/10 rounded mb-8" />
                 <div className="w-full h-px bg-border mb-4" />
                 <div className="w-3/4 h-3 bg-muted-foreground/20 rounded mb-2" />
                 <div className="w-full h-2 bg-muted-foreground/10 rounded mb-1" />
                 <div className="w-5/6 h-2 bg-muted-foreground/10 rounded mb-1" />
                 <div className="w-4/5 h-2 bg-muted-foreground/10 rounded mb-6" />
                 <div className="w-3/4 h-3 bg-muted-foreground/20 rounded mb-2" />
                 <div className="w-full h-2 bg-muted-foreground/10 rounded mb-1" />
                 <div className="w-5/6 h-2 bg-muted-foreground/10 rounded mb-1" />
                 <div className="w-4/5 h-2 bg-muted-foreground/10 rounded" />
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 z-20">
                <Button className="w-full bg-primary text-primary-foreground shadow-lg">
                  Use Template
                </Button>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-foreground">{template.name}</h3>
                <span className="text-xs font-medium bg-muted px-2 py-1 rounded text-muted-foreground">
                  {template.category}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 flex-1">
                {template.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border">
                {template.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs font-normal text-muted-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

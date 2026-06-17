import { EMPTY_TEMPLATES } from "@/lib/placeholders";
import { LayoutTemplate } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export default function TemplatesPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Resume Templates</h2>
        <p className="text-muted-foreground mt-1">
          Choose from our selection of ATS-optimized designs.
        </p>
      </div>

      {EMPTY_TEMPLATES.length === 0 ? (
        <EmptyState
          title="No templates available"
          description="Templates will appear here once they are loaded from the backend."
          icon={<LayoutTemplate className="w-8 h-8" />}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {/* Template cards would be rendered here if available */}
        </div>
      )}
    </div>
  );
}

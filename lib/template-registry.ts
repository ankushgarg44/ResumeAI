import { ATSTemplate } from "@/components/resume-templates/ats-template";
import { ModernTwoColumnTemplate } from "@/components/resume-templates/modern-two-column-template";
import { ClassicProfessionalTemplate } from "@/components/resume-templates/classic-professional-template";

export const TEMPLATE_REGISTRY: Record<string, { component: React.ComponentType<any> }> = {
  "ats-professional": {
    component: ATSTemplate,
  },
  "modern-two-column": {
    component: ModernTwoColumnTemplate,
  },
  "classic-professional": {
    component: ClassicProfessionalTemplate,
  },
};

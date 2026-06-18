import { TEMPLATE_CONFIGS, getTemplateIds } from "@/lib/template-configs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function TemplatesPage() {
  const templateIds = getTemplateIds();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div>
        <h2 className="text-3xl font-heading font-bold text-foreground">Template Gallery</h2>
        <p className="text-muted-foreground mt-2 text-lg">
          Choose from our selection of ATS-optimized and modern designs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {templateIds.map((id) => {
          const config = TEMPLATE_CONFIGS[id];

          return (
            <Card
              key={id}
              className="flex flex-col overflow-hidden border-border shadow-sm hover:shadow-md transition-shadow group"
            >
              {/* Preview Area */}
              <div className="bg-muted/20 p-6 border-b border-border group-hover:bg-muted/40 transition-colors">
                <div className="relative w-full aspect-[1/1.414] overflow-hidden bg-white rounded-lg border border-border shadow-sm">
                  <Image
                    src={config.previewImage}
                    alt={`${config.name} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Template Info Area */}
              <div className="p-5 bg-card flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-lg text-foreground leading-tight">
                    {config.name}
                  </h3>
                  <Badge
                    className={cn(
                      "text-[10px] px-2 py-0.5 whitespace-nowrap",
                      config.badgeColor.bg,
                      config.badgeColor.text,
                      config.badgeColor.border
                    )}
                  >
                    {config.badge}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground flex-1 mb-5 leading-relaxed">
                  {config.description}
                </p>

                <div className="mt-auto">
                  <Link href={`/builder?new=1&template=${id}`}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                      Use this template
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

import { FileText } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Form Side */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-background relative">
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
            <FileText className="w-5 h-5" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-foreground">
            ResumeAI
          </span>
        </Link>
        <div className="w-full max-w-sm mx-auto mt-16 md:mt-0">{children}</div>
      </div>

      {/* Brand Side (Hidden on Mobile) */}
      <div className="hidden md:flex flex-col justify-center px-12 lg:px-24 bg-surface-container-low border-l border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-md">
          <h2 className="font-heading font-bold text-4xl mb-6 text-foreground">
            Your career breakthrough starts here.
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            "ResumeAI transformed my job search. The ATS optimization helped me land interviews at three top-tier tech companies within weeks."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
              JS
            </div>
            <div>
              <p className="font-semibold text-foreground">Jane Smith</p>
              <p className="text-sm text-muted-foreground">Product Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

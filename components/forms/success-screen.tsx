"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Download, FilePlus2, LayoutDashboard } from "lucide-react";
import Link from "next/link";

interface SuccessScreenProps {
  onDownloadAgain: () => void;
  onCreateAnother: () => void;
}

export function SuccessScreen({
  onDownloadAgain,
  onCreateAnother,
}: SuccessScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center mb-6">
        <CheckCircle className="w-10 h-10 text-emerald-500" />
      </div>

      <h3 className="text-3xl font-bold mb-2 text-foreground">
        Your Resume is Ready
      </h3>
      <p className="text-muted-foreground mb-10 text-center max-w-md">
        Your ATS-friendly resume has been generated successfully and downloaded
        to your device.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Button
          onClick={onDownloadAgain}
          className="bg-primary text-primary-foreground shadow-sm w-full sm:w-auto"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Again
        </Button>
        <Button
          variant="outline"
          onClick={onCreateAnother}
          className="bg-background w-full sm:w-auto"
        >
          <FilePlus2 className="w-4 h-4 mr-2" />
          Create Another Resume
        </Button>
        <Link href="/dashboard">
          <Button variant="outline" className="bg-background w-full sm:w-auto">
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

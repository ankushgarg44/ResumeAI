"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

interface SeedResumesButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost";
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export function SeedResumesButton({
  variant = "outline",
  className = "",
  size = "default",
}: SeedResumesButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSeed() {
    setLoading(true);
    try {
      const res = await fetch("/api/resumes/seed", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to generate test resumes");
      }

      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to generate test resumes. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSeed}
      disabled={loading}
      className={className}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Creating Fake Resumes...
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
          Generate Test Resumes
        </>
      )}
    </Button>
  );
}

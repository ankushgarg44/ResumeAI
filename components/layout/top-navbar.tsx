"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AuthButtons } from "@/components/auth/auth-buttons";

const publicLinks = [
  { label: "Features", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "Pricing", href: "#pricing" },
];

export function TopNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
            <FileText className="w-5 h-5" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-foreground">
            ResumeAI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {publicLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth/CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <AuthButtons />
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 mt-4">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight">
                ResumeAI
              </span>
            </Link>

            <nav className="flex flex-col gap-4 mt-6">
              {publicLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-lg font-medium text-foreground py-2 border-b border-border"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-3 mt-auto mb-6">
              <AuthButtons />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

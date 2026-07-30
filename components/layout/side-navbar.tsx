"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  FilePlus2,
  LayoutTemplate,
  Settings,
  CreditCard,
  HelpCircle,
  UserCircle2,
  Sparkles,
} from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";

export const DASHBOARD_SIDEBAR_WIDTH = "w-64";

const mainNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Resumes", href: "/resumes", icon: FileText },
  { label: "My Profiles", href: "/profiles", icon: UserCircle2 },
  { label: "Smart Assemble", href: "/assemble", icon: Sparkles },
  { label: "Create Resume", href: "/builder?new=1", icon: FilePlus2 },
  { label: "Templates", href: "/templates", icon: LayoutTemplate },
];

const footerNavItems = [
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Billing", href: "/settings?tab=billing", icon: CreditCard },
  { label: "Help Center", href: "#", icon: HelpCircle },
];

export function SideNavbar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <aside
      className={cn(
        "flex flex-col h-screen border-r border-sidebar-border bg-sidebar text-sidebar-foreground",
        DASHBOARD_SIDEBAR_WIDTH,
        className
      )}
    >
      {/* Brand Header */}
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
            <FileText className="w-5 h-5" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight">
            ResumeAI
          </span>
        </Link>
      </div>

      {/* New Resume CTA */}
      <div className="px-4 mb-6">
        <Link href="/builder?new=1">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
            <FilePlus2 className="mr-2 w-4 h-4" />
            New Resume
          </Button>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Menu
        </div>
        {mainNavItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground border-r-2 border-primary"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
              )}
            >
              <item.icon
                className={cn("w-5 h-5", isActive ? "text-primary" : "")}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer Navigation */}
      <div className="p-4 border-t border-sidebar-border mt-auto">
        <nav className="space-y-1 mb-4">
          {footerNavItems.map((item) => {
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Summary */}
        <div className="flex items-center gap-3 px-2 py-2 mt-2">
          <UserButton />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.fullName || "User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.primaryEmailAddress?.emailAddress || "user@example.com"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

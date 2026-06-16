"use client";

import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SideNavbar } from "./side-navbar";
import { UserButton } from "@clerk/nextjs";

interface TopAppBarProps {
  title?: string;
}

export function TopAppBar({ title = "Dashboard" }: TopAppBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar Trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <SideNavbar className="w-full" />
            </SheetContent>
          </Sheet>
        </div>
        
        <h1 className="text-lg font-semibold text-foreground hidden sm:block">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4 flex-1 justify-end">
        {/* Search Bar - hidden on very small screens */}
        <div className="relative w-full max-w-sm hidden md:flex items-center">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resumes..."
            className="w-full pl-9 bg-muted/50 border-transparent focus-visible:bg-background focus-visible:border-ring"
          />
        </div>

        {/* Action Buttons */}
        <Button variant="ghost" size="icon" className="relative text-muted-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-destructive"></span>
          <span className="sr-only">Notifications</span>
        </Button>

        {/* User Profile */}
        <UserButton />
      </div>
    </header>
  );
}

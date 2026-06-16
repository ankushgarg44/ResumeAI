"use client";

import { Show, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AuthButtons() {
  return (
    <>
      <Show when="signed-out">
        <Link href="/sign-in">
          <Button variant="ghost" className="font-medium w-full md:w-auto">
            Sign In
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button className="font-medium bg-primary text-primary-foreground hover:bg-primary/90 w-full md:w-auto">
            Get Started
          </Button>
        </Link>
      </Show>
      <Show when="signed-in">
        <Link href="/dashboard" className="hidden md:block">
          <Button variant="outline" className="font-medium">
            Dashboard
          </Button>
        </Link>
        <div className="flex justify-center md:block">
          <UserButton />
        </div>
      </Show>
    </>
  );
}

import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./types";

// Server client for use in API routes and Server Components.
// Uses the SERVICE ROLE KEY to bypass RLS, because we enforce security manually
// by verifying the Clerk userId in our data access functions.
let serverSupabase: SupabaseClient<Database> | null = null;

export function getServerSupabase(): SupabaseClient<Database> {
  if (serverSupabase) return serverSupabase;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing required Supabase server environment variables");
  }

  serverSupabase = createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return serverSupabase;
}

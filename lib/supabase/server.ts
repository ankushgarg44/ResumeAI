import { createClient } from "@supabase/supabase-js";
import { Database } from "./types";

// Server client for use in API routes and Server Components.
// Uses the SERVICE ROLE KEY to bypass RLS, because we enforce security manually
// by verifying the Clerk userId in our data access functions.
export const serverSupabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

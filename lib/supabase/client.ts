import { createClient } from "@supabase/supabase-js";

// Client for use in browser/client components. Uses the public anon key.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

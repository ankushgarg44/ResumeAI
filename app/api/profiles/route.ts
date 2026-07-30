import { auth } from "@clerk/nextjs/server";
import { getUserProfiles } from "@/lib/supabase/resumes";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const profiles = await getUserProfiles(userId);
    return Response.json(profiles);
  } catch {
    return Response.json({ error: "Failed to fetch profiles" }, { status: 500 });
  }
}

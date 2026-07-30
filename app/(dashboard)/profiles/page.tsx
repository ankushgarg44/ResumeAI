import { currentUser } from "@clerk/nextjs/server";
import { getUserProfiles } from "@/lib/supabase/resumes";
import { ProfilesClient } from "./profiles-client";

export default async function ProfilesPage() {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return <div>Not signed in</div>;
  }

  const profiles = await getUserProfiles(userId);

  return <ProfilesClient profiles={profiles} />;
}

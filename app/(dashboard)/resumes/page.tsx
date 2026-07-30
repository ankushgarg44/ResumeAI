import { currentUser } from "@clerk/nextjs/server";
import { getUserResumes } from "@/lib/supabase/resumes";
import { ResumesClient } from "./resumes-client";

export default async function ResumesPage() {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return <div>Not signed in</div>;
  }

  const allResumes = await getUserResumes(userId);

  return <ResumesClient allResumes={allResumes} />;
}

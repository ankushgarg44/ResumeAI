import { getServerSupabase } from "./server";
import type { Resume, ResumeData } from "@/types";

export async function getUserResumes(userId: string): Promise<Resume[]> {
  const { data, error } = await getServerSupabase()
    .from("resumes")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching resumes:", error);
    throw new Error("Failed to fetch resumes");
  }

  // Cast the raw DB response to our Resume type
  return data as unknown as Resume[];
}

export async function getUserProfiles(userId: string): Promise<Resume[]> {
  const { data, error } = await getServerSupabase()
    .from("resumes")
    .select("*")
    .eq("user_id", userId)
    .eq("is_profile", true)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching profiles:", error);
    throw new Error("Failed to fetch profiles");
  }

  return data as unknown as Resume[];
}

export async function getResume(id: string, userId: string): Promise<Resume | null> {
  const { data, error } = await getServerSupabase()
    .from("resumes")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // Not found
    console.error("Error fetching resume:", error);
    throw new Error("Failed to fetch resume");
  }

  return data as unknown as Resume;
}

export async function createResume(
  userId: string,
  templateId: string,
  title: string,
  isProfile = false,
  profileType: string | null = null
): Promise<Resume> {
  const { data, error } = await getServerSupabase()
    .from("resumes")
    .insert({
      user_id: userId,
      template_id: templateId,
      title,
      resume_data: {},
      is_profile: isProfile,
      profile_type: profileType,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating resume:", error);
    throw new Error("Failed to create resume");
  }

  return data as unknown as Resume;
}

export async function saveResume(
  id: string,
  userId: string,
  resumeData: Partial<Resume>
): Promise<Resume> {
  // We only allow updating specific fields
  const updates: any = {};
  if (resumeData.title !== undefined) updates.title = resumeData.title;
  if (resumeData.template_id !== undefined) updates.template_id = resumeData.template_id;
  if (resumeData.resume_data !== undefined) updates.resume_data = resumeData.resume_data;
  if (resumeData.status !== undefined) updates.status = resumeData.status;
  if (resumeData.is_profile !== undefined) updates.is_profile = resumeData.is_profile;
  if (resumeData.profile_type !== undefined) updates.profile_type = resumeData.profile_type;
  if (resumeData.assembled_from !== undefined) updates.assembled_from = resumeData.assembled_from;
  if (resumeData.job_description !== undefined) updates.job_description = resumeData.job_description;

  console.log("[DB] saveResume payload:", JSON.stringify(updates.resume_data, null, 2));

  const { data, error } = await getServerSupabase()
    .from("resumes")
    .update(updates)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume");
  }

  return data as unknown as Resume;
}

export async function deleteResume(id: string, userId: string): Promise<void> {
  const { error } = await getServerSupabase()
    .from("resumes")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    console.error("Error deleting resume:", error);
    throw new Error("Failed to delete resume");
  }
}

export async function updateATSScore(
  id: string,
  userId: string,
  score: number
): Promise<void> {
  const { error } = await getServerSupabase()
    .from("resumes")
    .update({ ats_score: score })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    console.error("Error updating ATS score:", error);
    throw new Error("Failed to update ATS score");
  }
}

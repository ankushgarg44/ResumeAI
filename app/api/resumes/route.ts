import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getUserResumes, createResume } from "@/lib/supabase/resumes";

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resumes = await getUserResumes(userId);
    return NextResponse.json(resumes);
  } catch (error) {
    console.error("[GET /api/resumes]", error);
    return NextResponse.json(
      { error: "Failed to fetch resumes" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title = "Untitled Resume",
      template_id = "ats-professional",
      is_profile = false,
      profile_type = null,
    } = body;

    const resume = await createResume(
      userId,
      template_id,
      title,
      is_profile,
      profile_type
    );
    return NextResponse.json(resume, { status: 201 });
  } catch (error) {
    console.error("[POST /api/resumes]", error);
    return NextResponse.json(
      { error: "Failed to create resume" },
      { status: 500 }
    );
  }
}

import { auth } from "@clerk/nextjs/server";
import { serverSupabase } from "@/lib/supabase/server";
import { createResume, saveResume } from "@/lib/supabase/resumes";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { profileIds, jobDescription, templateId } = await req.json();

  if (!profileIds?.length || !jobDescription) {
    return Response.json(
      { error: "Missing profileIds or jobDescription" },
      { status: 400 }
    );
  }

  // Fetch selected profiles
  const { data: profiles, error } = await serverSupabase
    .from("resumes")
    .select("*")
    .in("id", profileIds)
    .eq("user_id", userId)
    .eq("is_profile", true);

  if (error || !profiles?.length) {
    return Response.json({ error: "Profiles not found" }, { status: 400 });
  }

  const systemPrompt = `You are an expert resume writer and technical recruiter with 15 years of experience. You will receive multiple profile resumes representing different domains of a candidate's experience, and a job description.

Your task is to assemble the single best resume for this specific job by:
- Selecting only the most relevant experience bullets from any profile (max 3 jobs, 3 bullets each)
- Picking the 2-3 most relevant projects
- Reordering skills to match the JD tech stack priority exactly
- Writing a 2-sentence tailored summary using the JD's language, tone and key verbs
- Only including sections that are relevant to this role
- Keeping the resume to one page worth of content

Return ONLY a valid JSON object with this exact structure, no markdown, no explanation outside the JSON:
{
  "assembledResume": {
    "personalInfo": {
      "fullName": "",
      "address": "",
      "phone": "",
      "email": "",
      "linkedIn": "",
      "github": "",
      "currentRole": ""
    },
    "objective": "",
    "education": [],
    "coursework": [],
    "experience": [],
    "projects": [],
    "technicalSkills": {
      "languages": [],
      "developerTools": [],
      "frameworks": []
    },
    "leadership": [],
    "training": [],
    "publications": [],
    "references": ""
  },
  "reasoning": {
    "summary": "explanation of overall assembly strategy for this role",
    "experience": "which experience items were chosen and why",
    "projects": "which projects were chosen and why",
    "skills": "how skills were ordered and why",
    "omitted": "what was left out and why"
  }
}`;

  const userMessage = `
JOB DESCRIPTION:
${jobDescription}

CANDIDATE PROFILES (${profiles.length} total):
${profiles
  .map(
    (p: any, i: number) => `
=== Profile ${i + 1}: ${p.profile_type ?? "General"} (${p.title}) ===
${JSON.stringify(p.resume_data, null, 2)}
`
  )
  .join("\n")}

Assemble the best resume for this job. Return JSON only.`;

  // Call Groq API
  const groqRes = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY!}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" },
        temperature: 0.3,
        max_tokens: 4000,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
      }),
    }
  );

  if (!groqRes.ok) {
    const errText = await groqRes.text();
    console.error("[Groq Error]", errText);
    return Response.json({ error: "AI service failed" }, { status: 500 });
  }

  const groqData = await groqRes.json();
  const text = groqData.choices?.[0]?.message?.content ?? "";

  let parsed: any;
  try {
    parsed = JSON.parse(text);
  } catch {
    console.error("[Parse Error] Groq returned:", text);
    return Response.json(
      { error: "AI returned invalid response" },
      { status: 500 }
    );
  }

  if (!parsed.assembledResume || !parsed.reasoning) {
    return Response.json(
      { error: "AI response missing required fields" },
      { status: 500 }
    );
  }

  // Save assembled resume to DB
  const created = await createResume(
    userId,
    templateId ?? "ats-professional",
    "Assembled Resume",
    false,
    null
  );

  await saveResume(created.id, userId, {
    resume_data: parsed.assembledResume,
    assembled_from: profileIds,
    job_description: jobDescription,
    status: "draft",
  } as any);

  return Response.json({
    resumeId: created.id,
    assembledResume: parsed.assembledResume,
    reasoning: parsed.reasoning,
    templateId: templateId ?? "ats-professional",
  });
}

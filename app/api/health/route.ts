export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    {
      status: "ok",
      service: "resume-ai",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

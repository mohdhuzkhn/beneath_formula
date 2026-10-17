import { published } from "../../lib/content";
export const dynamic = "force-static";
export function GET() {
  return Response.json(
    { status: "ok", publishedRecords: published().length },
    { headers: { "Cache-Control": "public, max-age=60" } },
  );
}

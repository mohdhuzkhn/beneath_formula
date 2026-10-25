import { NextRequest, NextResponse } from "next/server";
import { recordView } from "../../../../lib/engagement";
import { isTrackablePath } from "../../../../lib/engagement-routes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body: unknown = await request.json().catch(() => null);
  const path =
    typeof body === "object" && body && "path" in body
      ? (body as { path?: unknown }).path
      : undefined;
  if (!isTrackablePath(path))
    return NextResponse.json({ error: "Unknown public path" }, { status: 400 });
  const views = await recordView(path);
  return NextResponse.json({ enabled: views !== null, views: views ?? 0 });
}

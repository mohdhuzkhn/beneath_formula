import { NextRequest, NextResponse } from "next/server";
import { engagementCounts } from "../../../lib/engagement";
import { isTrackablePath } from "../../../lib/engagement-routes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  if (!isTrackablePath(path))
    return NextResponse.json({ error: "Unknown public path" }, { status: 400 });
  return NextResponse.json(await engagementCounts(path), {
    headers: { "Cache-Control": "no-store" },
  });
}

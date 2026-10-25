import { NextRequest, NextResponse } from "next/server";
import { follow } from "../../../../lib/engagement";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body: unknown = await request.json().catch(() => null);
  const visitorId =
    typeof body === "object" && body && "visitorId" in body
      ? (body as { visitorId?: unknown }).visitorId
      : undefined;
  if (typeof visitorId !== "string" || !/^[a-f0-9-]{36}$/i.test(visitorId))
    return NextResponse.json(
      { error: "Invalid follow request" },
      { status: 400 },
    );
  const result = await follow(visitorId);
  if (!result)
    return NextResponse.json(
      { error: "Engagement is not configured" },
      { status: 503 },
    );
  return NextResponse.json(result, {
    headers: { "Cache-Control": "no-store" },
  });
}

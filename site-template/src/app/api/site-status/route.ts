/**
 * Internal API: GET /api/site-status?host=<host>
 *
 * Resolves the site-status for a given host string and returns a tiny JSON
 * payload.  Only called by the Edge middleware (src/middleware.ts) so it can
 * inject the x-site-status response header before the RSC page renders.
 *
 * Response shape:
 *   { "status": "ok" | "gone" | "legal" | "notFound" }
 *
 * This route runs in Node.js runtime (not Edge), so it can safely import the
 * AWS SDK and the file-system–based fixture loader.
 *
 * Security: this route must NOT be publicly cacheable — every caller passes
 * a host query parameter and gets a fresh result.  CloudFront should NOT
 * cache /api/* paths.
 */

import { NextRequest, NextResponse } from "next/server";
import { loadSiteConfig } from "@/config/loader";

export const runtime = "nodejs";

// Disable Next.js route-level caching: each request is dynamic.
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const host = searchParams.get("host") ?? "localhost";

  try {
    const result = await loadSiteConfig(host);
    let status: "ok" | "gone" | "legal" | "notFound";

    if (result.kind === "ok") {
      status = "ok";
    } else if (result.kind === "gone") {
      // "suspended" → 410 Gone
      status = "gone";
    } else if (result.kind === "legal") {
      // "legal-suspended" → 451 Unavailable For Legal Reasons
      status = "legal";
    } else {
      status = "notFound";
    }

    return NextResponse.json(
      { status },
      {
        status: 200,
        headers: {
          // No-cache: the result must be fresh for every request.
          "Cache-Control": "no-store",
        },
      }
    );
  } catch {
    // Fail open: unknown status → treat as ok so the page can render and
    // return its own error UI.
    return NextResponse.json({ status: "ok" }, { status: 200 });
  }
}

/**
 * Next.js Edge Middleware — runs before every request.
 *
 * Responsibilities:
 *   1. Preview host detection: if the host ends with "-preview.setav.app",
 *      add X-Robots-Tag: noindex to the response so crawlers respect it
 *      even before the page's generateMetadata runs.
 *
 *   2. Site-status header injection: calls the internal /api/site-status
 *      route (Node.js runtime, same Lambda process in production) to learn
 *      the site's lifecycle status, then injects an x-site-status response
 *      header so the CloudFront viewer-response Function can rewrite the
 *      HTTP status to 410 Gone or 451 Unavailable For Legal Reasons.
 *
 *      Header values:
 *        x-site-status: gone   → suspended site         → CF rewrites to 410
 *        x-site-status: legal  → legal-suspended site   → CF rewrites to 451
 *        (header absent)       → live or preview site   → CF passes through (200)
 *
 * NOTE: Middleware runs on the Edge runtime and cannot import Node.js modules
 * or the AWS SDK directly.  Heavy lifting (S3 config lookup) is delegated to
 * the /api/site-status Node.js Route Handler via an internal fetch.
 */

import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    "";

  // Build the base response that passes the request through.
  const response = NextResponse.next();

  // -------------------------------------------------------------------------
  // 1. Preview host → noindex header
  // -------------------------------------------------------------------------
  if (host.includes("-preview.setav.app")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  // -------------------------------------------------------------------------
  // 2. Site-status header — skip for internal API routes to avoid recursion
  // -------------------------------------------------------------------------
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/api/") || pathname.startsWith("/_next/")) {
    return response;
  }

  try {
    // Construct an absolute URL for the internal API route.
    // In the Lambda, this resolves within the same process (no network RTT).
    // In Next.js dev mode, it resolves to localhost.
    const origin = request.nextUrl.origin;
    const statusUrl = `${origin}/api/site-status?host=${encodeURIComponent(host)}`;

    const statusRes = await fetch(statusUrl, {
      // Edge fetch must be short-lived; 2 s is generous for an in-process call.
      signal: AbortSignal.timeout(2000),
      headers: {
        // Forward the original host so the internal route can parse it.
        "x-forwarded-host": host,
      },
    });

    if (statusRes.ok) {
      const { status } = (await statusRes.json()) as {
        status: "ok" | "gone" | "legal" | "notFound";
      };

      if (status === "gone") {
        response.headers.set("x-site-status", "gone");
      } else if (status === "legal") {
        response.headers.set("x-site-status", "legal");
      }
      // "ok" and "notFound" → no x-site-status header; CF passes through.
    }
  } catch {
    // If the internal status check fails (timeout, Lambda cold-start race),
    // let the request continue normally.  The page will still render the
    // correct GoneBody or 404 UI — we just won't have the CF status header.
  }

  return response;
}

export const config = {
  // Run on all routes except Next.js internals, static files, and the
  // site-status API itself (to prevent recursive calls).
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/site-status).*)",
  ],
};

/**
 * Per-site robots.txt — Route Handler (P3.4).
 *
 * Published sites: allow all crawlers, point to sitemap.
 * Preview / non-published: disallow all crawlers.
 */

import { headers } from "next/headers";
import { loadSiteConfig } from "@/config/loader";

export async function GET(): Promise<Response> {
  const hdrs = await headers();
  const host =
    hdrs.get("x-forwarded-host") ?? hdrs.get("host") ?? "localhost:3000";

  const result = await loadSiteConfig(host);

  // For unknown / gone sites: still return a valid robots.txt that disallows all
  const isPublished = result.kind === "ok" && result.config.status === "published";

  let canonical = "";
  if (result.kind === "ok") {
    const { config } = result;
    canonical =
      config.seo.canonical ?? `https://${config.subdomain}.setav.app/`;
  }

  const body = isPublished
    ? `User-agent: *
Allow: /

Sitemap: ${canonical}sitemap.xml`
    : `User-agent: *
Disallow: /`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

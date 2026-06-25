/**
 * Per-site sitemap.xml — Route Handler (P3.4).
 *
 * Published sites: emit the canonical URL as the sole indexable entry.
 * Preview / non-published sites: return an empty sitemap (crawlers should
 *   already be excluded by robots.txt and X-Robots-Tag, but belt-and-suspenders).
 * Unknown subdomain: 404.
 */

import { headers } from "next/headers";
import { loadSiteConfig } from "@/config/loader";

export async function GET(): Promise<Response> {
  const hdrs = await headers();
  const host =
    hdrs.get("x-forwarded-host") ?? hdrs.get("host") ?? "localhost:3000";

  const result = await loadSiteConfig(host);

  if (result.kind === "notFound") {
    return new Response("Not Found", { status: 404 });
  }

  if (result.kind === "gone") {
    return new Response("Gone", { status: 410 });
  }

  if (result.kind === "legal") {
    return new Response("Unavailable For Legal Reasons", { status: 451 });
  }

  const { config } = result;
  const isPublished = config.status === "published";
  const canonical = config.seo.canonical ?? `https://${config.subdomain}.setav.app/`;
  const now = new Date().toISOString().split("T")[0];

  const xml = isPublished
    ? `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${canonical}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`
    : `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": isPublished
        ? "public, max-age=86400, stale-while-revalidate=43200"
        : "no-store",
    },
  });
}

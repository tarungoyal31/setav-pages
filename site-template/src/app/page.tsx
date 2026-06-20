/**
 * Root page — Server Component.
 *
 * This is the heart of the P3.1 SSR loop:
 *   1. Read the host from x-forwarded-host (set by CloudFront Function)
 *      or the Host header in dev.
 *   2. Load SiteConfig via loadSiteConfig(host).
 *   3. Return 404 if not found.
 *   4. Derive the MUI theme from config.theme.seedColor + variant.
 *   5. Server-render the page with ThemeRegistry + SectionRunner.
 *
 * The theme is derived HERE (server-side) and passed to ThemeRegistry
 * as serializable props — so MUI tokens are in the SSR HTML (no FOUC).
 */

import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ThemeRegistry from "@/theme/ThemeRegistry";
import SectionRunner from "@/components/SectionRunner";
import { loadSiteConfig } from "@/config/loader";

/** Dynamic metadata derived from config.seo. */
export async function generateMetadata(): Promise<Metadata> {
  const host = await resolveHost();
  const config = await loadSiteConfig(host);

  if (!config) {
    return { title: "Not Found" };
  }

  const { seo, identity } = config;

  return {
    title: seo.title ?? `${identity.name} — ${identity.profession ?? "Professional Services"}`,
    description: seo.description,
    alternates: seo.canonical
      ? { canonical: seo.canonical }
      : undefined,
    openGraph: {
      type: "website",
      siteName: identity.name,
      title:
        seo.title ??
        `${identity.name} — ${identity.profession ?? "Professional Services"}`,
      description: seo.description,
      url: seo.canonical,
      images: seo.ogImage
        ? [
            {
              url: seo.ogImage,
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title:
        seo.title ??
        `${identity.name} — ${identity.profession ?? "Professional Services"}`,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
    robots:
      config.status !== "published"
        ? { index: false, follow: false }
        : { index: true, follow: true, "max-image-preview": "large" },
  };
}

async function resolveHost(): Promise<string> {
  const hdrs = await headers();
  // x-forwarded-host is set by the CloudFront Function in production
  return (
    hdrs.get("x-forwarded-host") ??
    hdrs.get("host") ??
    "localhost:3000"
  );
}

export default async function SitePage() {
  const host = await resolveHost();
  const config = await loadSiteConfig(host);

  if (!config) {
    notFound();
  }

  // Suspended / gone states: in production these return 410/451 at the
  // CloudFront/Lambda edge before reaching the render. Here we treat them
  // like not-found for safety (P3.2 will add proper status-code mapping).
  if (config.status === "suspended") {
    notFound();
  }

  return (
    <ThemeRegistry
      seedColor={config.theme.seedColor}
      variant={config.theme.variant}
    >
      <SectionRunner config={config} />
    </ThemeRegistry>
  );
}

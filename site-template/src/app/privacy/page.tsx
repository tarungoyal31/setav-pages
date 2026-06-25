/**
 * /privacy — Privacy Policy page (P3.5).
 *
 * Fetches the markdown body from the S3 key stored in config.legal.privacyKey,
 * parses it to HTML, sanitizes it, and renders it.
 *
 * The ConsentBanner links to this page (/privacy).
 */

import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { loadSiteConfig, loadLegalMarkdown } from "@/config/loader";
import { markdownToHtml } from "@/lib/markdown";
import LegalPage from "@/components/LegalPage";

async function resolveHost(): Promise<string> {
  const hdrs = await headers();
  return (
    hdrs.get("x-forwarded-host") ?? hdrs.get("host") ?? "localhost:3000"
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const host = await resolveHost();
  const result = await loadSiteConfig(host);
  if (result.kind !== "ok") return { title: "Privacy Policy" };
  const { config } = result;
  return {
    title: `Privacy Policy — ${config.identity.name}`,
    robots: { index: false, follow: false },
  };
}

export default async function PrivacyPage() {
  const host = await resolveHost();
  const result = await loadSiteConfig(host);

  if (result.kind === "notFound") notFound();
  if (result.kind === "gone") notFound();
  if (result.kind === "legal") notFound();

  const { config } = result;
  const canonical = config.seo.canonical ?? `https://${config.subdomain}.setav.app/`;

  let htmlContent = "";
  if (config.legal.privacyKey) {
    const markdown = await loadLegalMarkdown(config.legal.privacyKey);
    htmlContent = await markdownToHtml(markdown);
  }

  return (
    <LegalPage
      title="Privacy Policy"
      siteName={config.identity.name}
      htmlContent={htmlContent}
      homeHref={canonical}
    />
  );
}

/**
 * /terms — Terms of Service page (P3.5).
 *
 * Fetches the markdown body from the S3 key stored in config.legal.termsKey,
 * parses it to HTML, sanitizes it, and renders it.
 *
 * If the config has no termsKey set, renders a "not available" message.
 * If the site is not found, calls notFound() → 404.
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
  if (result.kind !== "ok") return { title: "Terms of Service" };
  const { config } = result;
  return {
    title: `Terms of Service — ${config.identity.name}`,
    robots: { index: false, follow: false },
  };
}

export default async function TermsPage() {
  const host = await resolveHost();
  const result = await loadSiteConfig(host);

  if (result.kind === "notFound") notFound();
  if (result.kind === "gone") notFound();
  if (result.kind === "legal") notFound();

  const { config } = result;
  const canonical = config.seo.canonical ?? `https://${config.subdomain}.setav.app/`;

  let htmlContent = "";
  if (config.legal.termsKey) {
    const markdown = await loadLegalMarkdown(config.legal.termsKey);
    htmlContent = await markdownToHtml(markdown);
  }

  return (
    <LegalPage
      title="Terms of Service"
      siteName={config.identity.name}
      htmlContent={htmlContent}
      homeHref={canonical}
    />
  );
}

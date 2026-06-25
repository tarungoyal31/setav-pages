/**
 * Config loader — host → SiteConfig or a LoadResult sentinel.
 *
 * Resolution flow (per PRD §06 and Epic 3 S3 contract):
 *   1. Extract subdomain from host (strip "-preview" suffix → isPreview).
 *   2. GET the resolution pointer: sites/by-subdomain/<subdomain>.json
 *      → { siteId, status, publishedVersion }
 *      Missing (NoSuchKey / 404) → return { kind: "notFound" }
 *   3. Branch on isPreview and pointer.status:
 *        preview host  → load draft config: sites/<siteId>/draft/config.json
 *        status=published → load sites/<siteId>/published/config.<publishedVersion>.json
 *        status=suspended → return { kind: "gone" }
 *        otherwise        → return { kind: "notFound" }
 *
 * CONFIG_SOURCE env var:
 *   "fixture" (default in dev/CI) — reads fixtures/<subdomain>.config.json
 *   "s3"      (prod)              — two-phase S3 read against SITES_BUCKET_NAME
 *
 * Bucket/region env vars (required when CONFIG_SOURCE=s3):
 *   SITES_BUCKET_NAME   — e.g. "setav-prod-sites"
 *   SITES_BUCKET_REGION — e.g. "ap-south-1"
 */

import { SiteConfig } from "./types";

// ---------------------------------------------------------------------------
// Load result — typed sentinel avoids null-conflation between "not found"
// and "gone/suspended"
// ---------------------------------------------------------------------------

export type LoadResult =
  | { kind: "ok"; config: SiteConfig }
  | { kind: "notFound" }
  | { kind: "gone" }
  /**
   * "legal" — site is suspended for legal reasons (HTTP 451).
   * Renders GoneBody with a legal-suspension message.
   * The CloudFront viewer-response Function maps x-site-status: legal → 451.
   */
  | { kind: "legal" };

// ---------------------------------------------------------------------------
// Source interface
// ---------------------------------------------------------------------------

interface ConfigSource {
  /**
   * Load config for the given subdomain.
   * Returns a typed LoadResult sentinel — callers map to HTTP status codes.
   */
  load(subdomain: string, isPreview: boolean): Promise<LoadResult>;
}

// ---------------------------------------------------------------------------
// Fixture source (local dev / CI)
// ---------------------------------------------------------------------------

class FixtureConfigSource implements ConfigSource {
  async load(subdomain: string, isPreview: boolean): Promise<LoadResult> {
    void isPreview; // fixture always returns the same config regardless of preview
    try {
      const { readFile } = await import("fs/promises");
      const { join } = await import("path");
      const fixturesDir = join(process.cwd(), "fixtures");
      const filePath = join(fixturesDir, `${subdomain}.config.json`);
      const raw = await readFile(filePath, "utf-8");
      return { kind: "ok", config: JSON.parse(raw) as SiteConfig };
    } catch {
      return { kind: "notFound" };
    }
  }
}

// ---------------------------------------------------------------------------
// S3 resolution pointer shape
// ---------------------------------------------------------------------------

interface SitePointer {
  siteId: string;
  status: string;
  publishedVersion: string;
}

// ---------------------------------------------------------------------------
// S3 source — two-phase: pointer → versioned config
// ---------------------------------------------------------------------------

class S3ConfigSource implements ConfigSource {
  private readonly bucket: string;
  private readonly region: string;

  constructor() {
    const bucket = process.env.SITES_BUCKET_NAME;
    const region = process.env.SITES_BUCKET_REGION ?? "ap-south-1";
    if (!bucket) {
      throw new Error(
        "SITES_BUCKET_NAME env var is required when CONFIG_SOURCE=s3"
      );
    }
    this.bucket = bucket;
    this.region = region;
  }

  async load(subdomain: string, isPreview: boolean): Promise<LoadResult> {
    const { S3Client, GetObjectCommand, NoSuchKey } = await import(
      "@aws-sdk/client-s3"
    );
    const client = new S3Client({ region: this.region });

    // ---- Phase 1: resolution pointer ----
    const pointerKey = `sites/by-subdomain/${subdomain}.json`;
    let pointer: SitePointer;
    try {
      const pointerObj = await client.send(
        new GetObjectCommand({ Bucket: this.bucket, Key: pointerKey })
      );
      const body = await pointerObj.Body?.transformToString("utf-8");
      if (!body) return { kind: "notFound" };
      pointer = JSON.parse(body) as SitePointer;
    } catch (err) {
      // NoSuchKey → subdomain is not registered
      if (err instanceof NoSuchKey) return { kind: "notFound" };
      // Any other S3/network error: fail safe → not found (avoids surfacing infra errors)
      console.error("[S3ConfigSource] pointer fetch error", err);
      return { kind: "notFound" };
    }

    // ---- Phase 2: determine which config key to fetch ----
    let configKey: string;

    if (isPreview) {
      // Preview host always loads draft regardless of pointer.status
      configKey = `sites/${pointer.siteId}/draft/config.json`;
    } else {
      switch (pointer.status) {
        case "published":
          // Immutable key — safe to cache aggressively
          configKey = `sites/${pointer.siteId}/published/config.${pointer.publishedVersion}.json`;
          break;
        case "suspended":
          return { kind: "gone" };
        case "legal-suspended":
          // Site removed for legal reasons — HTTP 451 Unavailable For Legal Reasons.
          // The CloudFront viewer-response Function maps x-site-status: legal → 451.
          return { kind: "legal" };
        default:
          // lead, new, draft etc. → not publicly routable
          return { kind: "notFound" };
      }
    }

    // ---- Phase 3: fetch config object ----
    try {
      const configObj = await client.send(
        new GetObjectCommand({ Bucket: this.bucket, Key: configKey })
      );
      const body = await configObj.Body?.transformToString("utf-8");
      if (!body) return { kind: "notFound" };
      return { kind: "ok", config: JSON.parse(body) as SiteConfig };
    } catch (err) {
      if (err instanceof NoSuchKey) return { kind: "notFound" };
      console.error("[S3ConfigSource] config fetch error", err);
      return { kind: "notFound" };
    }
  }
}

// ---------------------------------------------------------------------------
// Source registry — singleton per Lambda invocation
// ---------------------------------------------------------------------------

function buildSource(): ConfigSource {
  const src = process.env.CONFIG_SOURCE ?? "fixture";
  if (src === "s3") return new S3ConfigSource();
  return new FixtureConfigSource();
}

const source: ConfigSource = buildSource();

// ---------------------------------------------------------------------------
// Host → subdomain extraction
// ---------------------------------------------------------------------------

/**
 * Extract the base subdomain and preview flag from an incoming host header.
 *
 * Rules:
 *  - The tenant host arrives as x-forwarded-host (set by CloudFront Function).
 *    Example: "sanjayprasad.setav.app" or "sanjayprasad-preview.setav.app"
 *  - Strip the apex (".setav.app") to get the subdomain label.
 *  - If the label ends in "-preview", strip that suffix and set isPreview=true.
 *  - In dev (fixture mode) the host may be "localhost:3000"; we map that
 *    to NEXT_PUBLIC_DEV_SUBDOMAIN (default "sanjayprasad").
 */
export function parseHost(host: string): { subdomain: string; isPreview: boolean } {
  if (host.startsWith("localhost") || host.startsWith("127.0.0.1")) {
    const devSubdomain = process.env.NEXT_PUBLIC_DEV_SUBDOMAIN ?? "sanjayprasad";
    return { subdomain: devSubdomain, isPreview: false };
  }

  const hostWithoutPort = host.split(":")[0];

  const apexSuffix = ".setav.app";
  const label = hostWithoutPort.endsWith(apexSuffix)
    ? hostWithoutPort.slice(0, -apexSuffix.length)
    : hostWithoutPort;

  if (label.endsWith("-preview")) {
    return { subdomain: label.slice(0, -"-preview".length), isPreview: true };
  }

  return { subdomain: label, isPreview: false };
}

// ---------------------------------------------------------------------------
// Main entry point — used by every Next.js Server Component / route
// ---------------------------------------------------------------------------

/**
 * Load SiteConfig for the given host header value.
 *
 * Returns a LoadResult:
 *   { kind: "ok", config }    → render the page (200 or 200+noindex for preview)
 *   { kind: "notFound" }      → caller calls notFound() → 404
 *   { kind: "gone" }          → caller returns 410 Gone (suspended)
 *   { kind: "legal" }         → caller returns 451 Unavailable For Legal Reasons
 *
 * The host must be the x-forwarded-host value set by the CloudFront Function.
 * Falls back to the Host header in dev.
 */
export async function loadSiteConfig(host: string): Promise<LoadResult> {
  const { subdomain, isPreview } = parseHost(host);
  const result = await source.load(subdomain, isPreview);

  if (result.kind !== "ok") return result;

  // Safety: if the stored config is published but the request came in via
  // the -preview host, override status so SSR emits noindex.
  if (isPreview && result.config.status === "published") {
    return { kind: "ok", config: { ...result.config, status: "preview" } };
  }

  return result;
}

/**
 * Fetch a legal markdown body from S3.
 * Returns the raw markdown string or null if the key is missing or empty.
 * Used by /terms and /privacy routes.
 */
export async function loadLegalMarkdown(s3Key: string): Promise<string | null> {
  const src = process.env.CONFIG_SOURCE ?? "fixture";
  if (src !== "s3") {
    // Dev fallback: return placeholder text
    return `# Legal Document\n\nThis content is only available in the production (S3) environment.\n\n_Key: ${s3Key}_`;
  }

  const bucket = process.env.SITES_BUCKET_NAME;
  const region = process.env.SITES_BUCKET_REGION ?? "ap-south-1";
  if (!bucket) return null;

  const { S3Client, GetObjectCommand, NoSuchKey } = await import(
    "@aws-sdk/client-s3"
  );
  const client = new S3Client({ region });
  try {
    const obj = await client.send(
      new GetObjectCommand({ Bucket: bucket, Key: s3Key })
    );
    return (await obj.Body?.transformToString("utf-8")) ?? null;
  } catch (err) {
    if (err instanceof NoSuchKey) return null;
    console.error("[loadLegalMarkdown] error", err);
    return null;
  }
}

/**
 * Config loader — host → SiteConfig.
 *
 * Abstracts the config source so P3.1 dev uses local fixtures and P3.2
 * wires the real S3/pointer read without reshaping callers.
 *
 * Resolution steps (per PRD §06):
 *   1. Extract subdomain from host (strip "-preview" suffix to get the base
 *      subdomain; remember whether it was a preview request).
 *   2. Resolve {status, published_version} from the site registry
 *      (today: mocked by the fixture source).
 *   3. Load the versioned config object:
 *        published → sites/<siteId>/published/config.<version>.json
 *        preview   → sites/<siteId>/draft/config.json
 *
 * The "source" is injected via the CONFIG_SOURCE env var:
 *   "fixture" (default in dev) — reads fixtures/<subdomain>.config.json
 *   "s3"      (prod)          — TODO P3.2: fetch pointer then versioned key
 */

import { SiteConfig } from "./types";

// ---------------------------------------------------------------------------
// Source interface — P3.2 plugs in the S3 implementation here
// ---------------------------------------------------------------------------

interface ConfigSource {
  /**
   * Load config for the given subdomain.
   * Returns null if not found (caller should 404).
   */
  load(subdomain: string, isPreview: boolean): Promise<SiteConfig | null>;
}

// ---------------------------------------------------------------------------
// Fixture source (local dev / CI)
// ---------------------------------------------------------------------------

class FixtureConfigSource implements ConfigSource {
  async load(subdomain: string, isPreview: boolean): Promise<SiteConfig | null> {
    void isPreview; // Preview vs published resolution is handled by the caller
    // In Next.js server context we use the Node.js fs module.
    // We dynamic-import so this module is safe to import anywhere.
    try {
      const { readFile } = await import("fs/promises");
      const { join } = await import("path");
      // Fixture files live next to package.json
      const fixturesDir = join(process.cwd(), "fixtures");
      const filePath = join(fixturesDir, `${subdomain}.config.json`);
      const raw = await readFile(filePath, "utf-8");
      return JSON.parse(raw) as SiteConfig;
    } catch {
      return null;
    }
  }
}

// ---------------------------------------------------------------------------
// S3 source stub — wire in P3.2
// ---------------------------------------------------------------------------

class S3ConfigSource implements ConfigSource {
  /**
   * TODO P3.2: implement the two-phase fetch:
   *   1. Read the pointer object from S3:
   *        published: sites/<siteId>/published/pointer.json  → { version }
   *        preview:   sites/<siteId>/draft/pointer.json      → (no version)
   *   2. Fetch the versioned config:
   *        published: sites/<siteId>/published/config.<version>.json
   *        preview:   sites/<siteId>/draft/config.json
   *   Use the setav-{env}-sites bucket (env var SITES_BUCKET_NAME).
   *   Apply a bounded timeout (e.g. 2s); return null on failure.
   */
  async load(subdomain: string, isPreview: boolean): Promise<SiteConfig | null> {
    // TODO P3.2: implement two-phase S3 fetch (pointer then versioned config)
    throw new Error(
      `S3ConfigSource is not yet implemented (subdomain=${subdomain}, preview=${isPreview}). ` +
      "Set CONFIG_SOURCE=fixture for local dev. " +
      "Implement in P3.2."
    );
  }
}

// ---------------------------------------------------------------------------
// Source registry
// ---------------------------------------------------------------------------

function buildSource(): ConfigSource {
  const src = process.env.CONFIG_SOURCE ?? "fixture";
  if (src === "s3") return new S3ConfigSource();
  return new FixtureConfigSource();
}

// Singleton per Lambda invocation (module-level cache is fine in Lambda).
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
 *  - Strip the apex ("setav.app") to get the subdomain label.
 *  - If the label ends in "-preview", strip that suffix to get the base subdomain
 *    and set isPreview=true.
 *  - In dev (fixture mode) the host may be "localhost:3000"; we map that
 *    to the NEXT_PUBLIC_DEV_SUBDOMAIN env var (default "sanjayprasad").
 */
export function parseHost(host: string): { subdomain: string; isPreview: boolean } {
  // Dev localhost fallback
  if (host.startsWith("localhost") || host.startsWith("127.0.0.1")) {
    const devSubdomain = process.env.NEXT_PUBLIC_DEV_SUBDOMAIN ?? "sanjayprasad";
    return { subdomain: devSubdomain, isPreview: false };
  }

  // Strip port if present
  const hostWithoutPort = host.split(":")[0];

  // Extract subdomain label: "sanjayprasad.setav.app" → "sanjayprasad"
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
 * The host must be the x-forwarded-host value set by the CloudFront Function.
 * Falls back to the Host header in dev.
 *
 * Returns null when no config exists for the subdomain (caller returns 404).
 */
export async function loadSiteConfig(host: string): Promise<SiteConfig | null> {
  const { subdomain, isPreview } = parseHost(host);
  const config = await source.load(subdomain, isPreview);
  if (!config) return null;

  // Safety: if the stored config is not a preview but the host is -preview,
  // mark it as preview so SSR emits noindex.
  if (isPreview && config.status === "published") {
    return { ...config, status: "preview" };
  }

  return config;
}

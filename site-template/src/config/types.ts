/**
 * SiteConfig — the TypeScript mirror of the backend Go struct
 * internal/services/custom_sites/models/config/config_json.go
 *
 * This is the single config shape the SSR renderer reads at render time.
 * SECURITY: contains ONLY publicly renderable data (no private refs, no audit fields).
 *
 * Storage paths (setav-{env}-sites S3 bucket):
 *   Published: sites/<siteId>/published/config.<version>.json
 *   Preview:   sites/<siteId>/draft/config.json
 */

export interface ConfigSocialLink {
  type: string;
  url: string;
}

export interface ConfigLinks {
  booking?: string;
  social?: ConfigSocialLink[];
}

export interface ConfigIdentity {
  /** Display name — required for publish. */
  name: string;
  /** Profession / job title (e.g. "Astrologer"). */
  profession?: string;
  /**
   * Unique-copy intro shown in Hero.
   * One of the three core fields gated at publish (PRD §3.1).
   */
  intro?: string;
  /** S3 URL of the practitioner's logo/headshot. */
  logo?: string;
}

export interface ConfigTheme {
  /**
   * Brand hex color (e.g. "#E65100").
   * Drives palette.primary.main; on/surface colors are derived.
   */
  seedColor?: string;
  /**
   * Visual variant: "bold" | "editorial" | "classic" | "" (default).
   * Controls typography scale, density, and component shape — not the hue.
   */
  variant?: string;
}

export interface ConfigSection {
  /** Section type key (e.g. "hero", "about", "services"). */
  type: string;
  /** Whether this section is enabled and should render. */
  enabled: boolean;
  /** Render order — ascending. */
  order: number;
  /**
   * "group" = data fetched at render time from api.setav.in by groupId.
   * Absent = static config only.
   */
  source?: string;
}

export interface ConfigContact {
  phone?: string;
  email?: string;
  address?: string;
  showContactInformation: boolean;
}

export interface ConfigIntegrations {
  /** Meta Pixel ID — empty string means no snippet injected. */
  metaPixelId: string;
  /** GA4 Measurement ID — empty string means no snippet injected. */
  ga4Id: string;
  /** If true, show the consent banner before injecting trackers. */
  consentRequired: boolean;
}

export interface ConfigLegal {
  /**
   * S3 key for the Terms of Service markdown.
   * SSR fetches the body at render time.
   */
  termsKey?: string;
  /** S3 key for the Privacy Policy markdown. */
  privacyKey?: string;
  /** false blocks publish (P2.3 publish gate). */
  approved: boolean;
  version: number;
}

export interface ConfigSEO {
  /** Page title — unique per site, ≤ ~60 chars. */
  title?: string;
  /** Meta description — 140–160 chars. */
  description?: string;
  /** Self-referencing canonical URL. Must point at published host, never preview. */
  canonical?: string;
  /** Per-site OG image URL — 1200×630. */
  ogImage?: string;
  /**
   * false on preview configs → SSR emits noindex.
   * Published configs set to true.
   */
  jsonldEnabled: boolean;
}

// ---------------------------------------------------------------------------
// Per-section config shapes (added in P3.2)
// ---------------------------------------------------------------------------

/** A stat/highlight card shown in the About section. */
export interface ConfigAboutHighlight {
  label: string;
  value: string;
}

export interface ConfigAbout {
  /** Heading override; defaults to "About {name}". */
  heading?: string;
  /** Multi-paragraph bio text. Rendered with whitespace preserved. */
  bio: string;
  /** Up to 4 key stats shown as highlight cards above the bio. */
  highlights?: ConfigAboutHighlight[];
}

/** A single image in the Gallery. */
export interface ConfigGalleryImage {
  url: string;
  /** Alt text for the image; required for accessibility. */
  alt: string;
}

export interface ConfigGallery {
  heading?: string;
  images: ConfigGalleryImage[];
}

/** A single reason card in the Why Us section. */
export interface ConfigWhyUsReason {
  /** MUI icon name string (e.g. "AutoAwesome"). Used to pick the icon. */
  icon?: string;
  title: string;
  description: string;
}

export interface ConfigWhyUs {
  heading?: string;
  /** Short subheading below the main heading. */
  subheading?: string;
  reasons: ConfigWhyUsReason[];
}

export interface ConfigYouTube {
  heading?: string;
  subheading?: string;
  /** YouTube channel URL — shown as "View All Videos" CTA. */
  channelUrl?: string;
  /** List of YouTube video IDs to embed. */
  videoIds: string[];
}

/**
 * SiteConfig — root shape of config.json loaded by the SSR renderer.
 *
 * Mirror of config_json.go::SiteConfig. Field names match JSON keys (camelCase).
 */
export interface SiteConfig {
  siteId: string;
  subdomain: string;
  groupId: string;
  /**
   * Lifecycle status: "published" | "preview" | "suspended" | "lead" | "new" | "draft"
   * The renderer uses this to decide HTTP status code and noindex.
   */
  status: string;
  identity: ConfigIdentity;
  theme: ConfigTheme;
  sections?: ConfigSection[];
  contact: ConfigContact;
  links: ConfigLinks;
  integrations: ConfigIntegrations;
  legal: ConfigLegal;
  seo: ConfigSEO;
  /** Unix timestamp (seconds) when this config was generated. */
  generatedAt: number;

  // ---------------------------------------------------------------------------
  // Per-section static config (P3.2)
  // ---------------------------------------------------------------------------
  about?: ConfigAbout;
  gallery?: ConfigGallery;
  whyUs?: ConfigWhyUs;
  youtube?: ConfigYouTube;
}

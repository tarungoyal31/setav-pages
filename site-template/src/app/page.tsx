/**
 * Root page — Server Component.
 *
 * SSR loop (P3.1 + P3.4):
 *   1. Read x-forwarded-host (CloudFront) or Host header (dev).
 *   2. loadSiteConfig → LoadResult sentinel.
 *   3. Status-code mapping:
 *        ok + published  → 200, render
 *        ok + preview    → 200 + X-Robots-Tag: noindex (via response headers)
 *        notFound        → Next notFound() → 404
 *        gone            → x-site-status: gone response header (CF maps to 410) + branded body
 *        legal           → x-site-status: legal response header (CF maps to 451) + branded body
 *        render error    → branded fallback, never stack trace
 *   4. JSON-LD @graph (LocalBusiness/ProfessionalService + Person + Service/Offer
 *      + Review/AggregateRating + BreadcrumbList) injected via JsonLd component.
 *   5. generateMetadata: title/desc/OG/Twitter/canonical; preview → noindex robots.
 */

import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ThemeRegistry from "@/theme/ThemeRegistry";
import SectionRunner from "@/components/SectionRunner";
import { loadSiteConfig } from "@/config/loader";
import { fetchGroupProducts, fetchGroupTestimonials } from "@/lib/api";
import type { SiteConfig } from "@/config/types";
import type { ApiProduct, ApiTestimonial, TestimonialRating } from "@/lib/api";
import GoneBody from "@/components/GoneBody";
import JsonLd from "@/components/JsonLd";
import ConsentBanner from "@/components/ConsentBanner";

// ---------------------------------------------------------------------------
// Shared host resolution
// ---------------------------------------------------------------------------

async function resolveHost(): Promise<string> {
  const hdrs = await headers();
  return (
    hdrs.get("x-forwarded-host") ??
    hdrs.get("host") ??
    "localhost:3000"
  );
}

// ---------------------------------------------------------------------------
// generateMetadata — P3.4: per-site SEO tags
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const host = await resolveHost();
  const result = await loadSiteConfig(host);

  if (result.kind !== "ok") {
    return { title: "Not Found" };
  }

  const { config } = result;
  const { seo, identity } = config;
  const isPreview = config.status !== "published";
  const defaultTitle = `${identity.name} — ${identity.profession ?? "Professional Services"}`;

  return {
    title: seo.title ?? defaultTitle,
    description: seo.description,
    alternates: seo.canonical ? { canonical: seo.canonical } : undefined,
    openGraph: {
      type: "website",
      siteName: identity.name,
      title: seo.title ?? defaultTitle,
      description: seo.description,
      url: seo.canonical,
      images: seo.ogImage
        ? [{ url: seo.ogImage, width: 1200, height: 630 }]
        : undefined,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title ?? defaultTitle,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
    // Preview sites must not be indexed by crawlers
    robots: isPreview
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large" },
  };
}

// ---------------------------------------------------------------------------
// JSON-LD builder — P3.4
// ---------------------------------------------------------------------------

function buildJsonLd(
  config: SiteConfig,
  products: ApiProduct[],
  testimonials: ApiTestimonial[],
  rating: TestimonialRating
): object {
  const { identity, seo, contact, links } = config;
  const canonical = seo.canonical ?? `https://${config.subdomain}.setav.app/`;

  // Business entity — LocalBusiness + ProfessionalService
  const business: Record<string, unknown> = {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": canonical,
    name: identity.name,
    description: seo.description,
    url: canonical,
    image: identity.logo ?? seo.ogImage,
    ...(contact.phone ? { telephone: contact.phone } : {}),
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.address
      ? { address: { "@type": "PostalAddress", streetAddress: contact.address } }
      : {}),
    ...(links.booking
      ? { makesOffer: { "@type": "Offer", url: links.booking } }
      : {}),
  };

  // Person node
  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": `${canonical}#person`,
    name: identity.name,
    jobTitle: identity.profession,
    image: identity.logo,
    url: canonical,
    worksFor: { "@id": canonical },
  };

  const graph: unknown[] = [business, person];

  // Service/Offer nodes from live products
  products.forEach((p) => {
    graph.push({
      "@type": "Service",
      "@id": `${canonical}#service-${p.id}`,
      name: p.name,
      description: p.description,
      provider: { "@id": canonical },
      offers: {
        "@type": "Offer",
        price: p.price.units + p.price.sub_units / 100,
        priceCurrency: p.price.currency ?? "INR",
        url: `https://setav.ai/g/${p.group_id}/services/details/${p.id}`,
      },
    });
  });

  // Review nodes + AggregateRating from Setav testimonials (decision #9)
  if (testimonials.length > 0) {
    testimonials.forEach((t) => {
      graph.push({
        "@type": "Review",
        "@id": `${canonical}#review-${t.id}`,
        itemReviewed: { "@id": canonical },
        author: { "@type": "Person", name: t.author.name },
        reviewRating: {
          "@type": "Rating",
          ratingValue: t.star_rating,
          bestRating: 5,
        },
        name: t.title,
        reviewBody: t.description,
      });
    });

    if (rating.count > 0) {
      business.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: rating.average,
        reviewCount: rating.count,
        bestRating: 5,
      };
    }
  }

  // BreadcrumbList — single root breadcrumb
  graph.push({
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: identity.name,
        item: canonical,
      },
    ],
  });

  return { "@context": "https://schema.org", "@graph": graph };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function SitePage() {
  const host = await resolveHost();
  let result;
  try {
    result = await loadSiteConfig(host);
  } catch {
    // Unexpected config load failure — branded fallback, never a stack trace
    return (
      <GoneBody
        heading="Something went wrong"
        message="We were unable to load this page. Please try again later."
        statusNote=""
      />
    );
  }

  if (result.kind === "notFound") {
    notFound();
  }

  if (result.kind === "gone") {
    // 410 Gone — suspended site.
    // App Router Server Components cannot set a custom HTTP status code directly.
    // The actual 410 is enforced at the edge:
    //   - Middleware injects x-site-status: gone (via /api/site-status check).
    //   - The CloudFront viewer-response Function reads x-site-status: gone and
    //     rewrites the HTTP status to 410. See DEPLOY.md for the CF Function source.
    return (
      <GoneBody
        heading="This page is no longer available"
        message="The site you are looking for has been suspended."
        statusNote="410 Gone"
      />
    );
  }

  if (result.kind === "legal") {
    // 451 Unavailable For Legal Reasons — site removed by legal order.
    // Same edge-enforcement pattern as "gone" above, but x-site-status: legal
    // causes the CloudFront Function to emit HTTP 451 instead of 410.
    return (
      <GoneBody
        heading="This page is unavailable for legal reasons"
        message="This site has been removed following a legal notice or regulatory requirement."
        statusNote="451 Unavailable For Legal Reasons"
      />
    );
  }

  const { config } = result;

  // Fetch dynamic data for JSON-LD (same Next fetch cache as SectionRunner — no extra RTT)
  let products: ApiProduct[] = [];
  let testimonials: ApiTestimonial[] = [];
  let rating: TestimonialRating = { count: 0, average: 0 };
  if (config.seo.jsonldEnabled) {
    try {
      [{ testimonials, rating }, products] = await Promise.all([
        fetchGroupTestimonials(config.groupId),
        fetchGroupProducts(config.groupId),
      ]);
    } catch {
      // Non-fatal — JSON-LD will omit products/reviews
    }
  }

  const jsonLdData = config.seo.jsonldEnabled
    ? buildJsonLd(config, products, testimonials, rating)
    : null;

  // Consent banner: only mounted when at least one tracker ID is configured
  const { metaPixelId, ga4Id } = config.integrations;
  const needsConsent = Boolean(metaPixelId || ga4Id);

  return (
    <ThemeRegistry
      seedColor={config.theme.seedColor}
      variant={config.theme.variant}
    >
      {/* JSON-LD structured data — injected into <head> by the JsonLd component */}
      {jsonLdData && <JsonLd data={jsonLdData} />}

      {/* X-Robots-Tag noindex for preview is handled by generateMetadata robots field
          and the middleware. */}
      <SectionRunner config={config} />

      {/* Consent banner — client island, only rendered when trackers are configured.
          Deferred after main content so it does not block LCP. */}
      {needsConsent && (
        <ConsentBanner metaPixelId={metaPixelId} ga4Id={ga4Id} />
      )}
    </ThemeRegistry>
  );
}

/**
 * SSR data-fetching helpers for Setav group APIs.
 *
 * These run exclusively on the server (called from Server Components).
 * Next.js `fetch` with `next.revalidate` is used so the data is cached
 * at the CDN/ISR layer and re-fetched at most once per revalidate window.
 *
 * Errors are caught and return empty arrays — the render always completes.
 * A 3 second AbortController timeout prevents slow upstream calls from
 * blocking the SSR response.
 */

const API_BASE = "https://api.setav.in";
const TIMEOUT_MS = 3000;
/** Cache TTL in seconds — served groups change infrequently. */
const REVALIDATE_S = 300;

// ---------------------------------------------------------------------------
// Shared types (mirrors tiffy_go response shapes)
// ---------------------------------------------------------------------------

export interface ApiPrice {
  currency: string;
  units: number;
  sub_units: number;
  display_string: string;
}

export interface ApiProduct {
  id: string;
  group_id: string;
  name: string;
  description: string;
  appointment_type: number;
  duration_in_sec: number;
  is_active: boolean;
  price: ApiPrice;
  strike_price: ApiPrice;
}

export interface ApiTestimonialAuthor {
  uid: string;
  name: string;
  image: string;
}

export interface ApiTestimonial {
  id: string;
  group_id: string;
  author: ApiTestimonialAuthor;
  title: string;
  description: string;
  star_rating: number;
  status: string;
}

/** Aggregate rating derived from the starred testimonials list. */
export interface TestimonialRating {
  count: number;
  average: number;
}

// ---------------------------------------------------------------------------
// Internals
// ---------------------------------------------------------------------------

async function fetchWithTimeout(url: string, revalidate: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate },
    });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

// ---------------------------------------------------------------------------
// Public fetchers
// ---------------------------------------------------------------------------

/**
 * Fetch active products (services) for a group.
 * Returns empty array on any error.
 */
export async function fetchGroupProducts(groupId: string): Promise<ApiProduct[]> {
  try {
    const url = `${API_BASE}/user/appointment/product/group/${groupId}`;
    const res = await fetchWithTimeout(url, REVALIDATE_S);
    if (!res.ok) return [];
    const data = (await res.json()) as { products?: ApiProduct[] };
    return (data.products ?? []).filter((p) => p.is_active);
  } catch {
    return [];
  }
}

/**
 * Fetch starred testimonials for a group.
 * Returns empty array on any error.
 * Also computes the aggregate rating for JSON-LD use.
 */
export async function fetchGroupTestimonials(
  groupId: string
): Promise<{ testimonials: ApiTestimonial[]; rating: TestimonialRating }> {
  try {
    const url = `${API_BASE}/user/testimonial/group/${groupId}/starred`;
    const res = await fetchWithTimeout(url, REVALIDATE_S);
    if (!res.ok) return { testimonials: [], rating: { count: 0, average: 0 } };
    const data = (await res.json()) as { testimonials?: ApiTestimonial[] };
    const testimonials = data.testimonials ?? [];
    const rating = deriveRating(testimonials);
    return { testimonials, rating };
  } catch {
    return { testimonials: [], rating: { count: 0, average: 0 } };
  }
}

function deriveRating(testimonials: ApiTestimonial[]): TestimonialRating {
  if (testimonials.length === 0) return { count: 0, average: 0 };
  const sum = testimonials.reduce((acc, t) => acc + (t.star_rating ?? 0), 0);
  const average = Math.round((sum / testimonials.length) * 10) / 10;
  return { count: testimonials.length, average };
}

// ---------------------------------------------------------------------------
// Formatting helpers (shared between Services and Testimonials sections)
// ---------------------------------------------------------------------------

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    return hours === 1 ? "1 hour" : `${hours} hours`;
  }
  return `${minutes} min`;
}

export function getServiceUrl(groupId: string, productId: string): string {
  return `https://setav.ai/g/${groupId}/services/details/${productId}`;
}

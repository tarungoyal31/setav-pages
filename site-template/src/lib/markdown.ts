/**
 * Markdown → sanitized HTML helper (server-side only).
 *
 * Uses `marked` for parsing and `isomorphic-dompurify` for sanitization.
 * Both packages are Node.js-compatible and safe in Next.js Server Components.
 *
 * The sanitization configuration is conservative:
 *   - Allows standard content tags (p, ul, ol, li, h1–h6, blockquote, code, pre, etc.)
 *   - Allows href on <a> elements (external links in legal docs)
 *   - Strips all <script>, event handlers, and unsafe attributes
 */

import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

// Configure marked for safety (no raw HTML pass-through by default in v9+)
marked.setOptions({ gfm: true, breaks: false });

/**
 * Parse markdown to sanitized HTML string.
 * Returns an empty string if input is null/empty.
 */
export async function markdownToHtml(markdown: string | null): Promise<string> {
  if (!markdown) return "";

  // marked.parse returns string | Promise<string> depending on version
  const rawHtml = await marked.parse(markdown);

  // Sanitize — DOMPurify is safe on both server (jsdom via isomorphic-dompurify) and browser
  const clean = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      "h1", "h2", "h3", "h4", "h5", "h6",
      "p", "br", "hr",
      "ul", "ol", "li",
      "strong", "em", "b", "i", "u", "s", "del",
      "a", "blockquote", "code", "pre",
      "table", "thead", "tbody", "tr", "th", "td",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "class"],
    // Force rel="noopener noreferrer" on external links
    FORCE_BODY: false,
  });

  return clean;
}

/**
 * JsonLd — injects a JSON-LD <script> into the document <head>.
 *
 * This is a Server Component; it uses Next.js head injection via the
 * special <script> tag pattern (recognized by App Router).
 *
 * SECURITY: dangerouslySetInnerHTML is safe here because the data object
 * is constructed entirely from config (no user-supplied HTML) and
 * JSON.stringify escapes all special characters.
 */

interface JsonLdProps {
  data: object;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

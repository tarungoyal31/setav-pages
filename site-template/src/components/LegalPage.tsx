/**
 * LegalPage — shared layout for /terms and /privacy.
 *
 * Renders sanitized HTML from a markdown S3 document.
 * Uses minimal inline styles (no MUI ThemeProvider dependency)
 * so it renders even when config is unavailable.
 */

interface LegalPageProps {
  title: string;
  siteName: string;
  htmlContent: string;
  /** Back-link to the site root */
  homeHref: string;
}

export default function LegalPage({
  title,
  siteName,
  htmlContent,
  homeHref,
}: LegalPageProps) {
  return (
    <div
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "48px 24px 80px",
        fontFamily: "Georgia, 'Times New Roman', serif",
        color: "#1a1a1a",
        lineHeight: 1.75,
      }}
    >
      <nav style={{ marginBottom: 32 }}>
        <a
          href={homeHref}
          style={{
            fontFamily: "sans-serif",
            fontSize: "0.875rem",
            color: "#1976d2",
            textDecoration: "none",
          }}
        >
          ← Back to {siteName}
        </a>
      </nav>

      <h1
        style={{
          fontFamily: "sans-serif",
          fontSize: "2rem",
          fontWeight: 700,
          marginBottom: 32,
          color: "#111",
        }}
      >
        {title}
      </h1>

      {htmlContent ? (
        <div
          /* The HTML is sanitized server-side by DOMPurify before reaching here */
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          style={{
            fontSize: "1rem",
          }}
        />
      ) : (
        <p style={{ color: "#666", fontFamily: "sans-serif" }}>
          This document is not yet available.
        </p>
      )}
    </div>
  );
}

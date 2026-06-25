/**
 * GoneBody — branded fallback for 410 Gone and render-error states.
 *
 * Deliberately avoids any MUI ThemeProvider dependency (the theme is not
 * available when config load fails) — uses inline styles only.
 */

interface GoneBodyProps {
  heading: string;
  message: string;
  statusNote: string;
}

export default function GoneBody({ heading, message, statusNote }: GoneBodyProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        padding: 32,
        backgroundColor: "#f5f5f5",
        fontFamily: "sans-serif",
      }}
    >
      {statusNote && (
        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
            color: "#999",
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          {statusNote}
        </p>
      )}
      <h1
        style={{
          margin: 0,
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "#333",
          textAlign: "center",
        }}
      >
        {heading}
      </h1>
      <p
        style={{
          margin: 0,
          fontSize: "1rem",
          color: "#666",
          textAlign: "center",
          maxWidth: 440,
        }}
      >
        {message}
      </p>
      <a
        href="https://setav.ai"
        style={{
          marginTop: 16,
          padding: "12px 32px",
          backgroundColor: "#1976d2",
          color: "#fff",
          borderRadius: 8,
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "0.9375rem",
        }}
      >
        Go to Setav
      </a>
    </div>
  );
}

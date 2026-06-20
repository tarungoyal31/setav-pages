import type { Metadata } from "next";

export const metadata: Metadata = {
  // Per-site metadata is set dynamically in the page's generateMetadata()
  // and overrides these defaults. This is just the fallback.
  title: "Setav — Professional Services",
  description: "Powered by Setav",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ThemeRegistry is applied per-page (in page.tsx) so it can receive
  // the site-specific seedColor + variant from the loaded config.
  // Root layout stays minimal — just the HTML shell.
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}

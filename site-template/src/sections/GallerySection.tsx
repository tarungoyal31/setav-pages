/**
 * GallerySection — image carousel with lightbox.
 *
 * Config contract:
 *   gallery.heading  — section heading; defaults to "Gallery"
 *   gallery.images   — array of { url, alt }; renders nothing when empty
 *
 * The carousel + lightbox are fully interactive so the whole section is
 * a client component. The server wrapper (this file) is intentionally
 * thin — it just gates on the config presence.
 */

import type { ConfigGallery } from "@/config/types";
import GalleryCarousel from "@/components/GalleryCarousel";

interface GallerySectionProps {
  gallery: ConfigGallery;
}

export default function GallerySection({ gallery }: GallerySectionProps) {
  if (!gallery.images || gallery.images.length === 0) return null;

  return (
    <GalleryCarousel
      heading={gallery.heading ?? "Gallery"}
      images={gallery.images}
    />
  );
}

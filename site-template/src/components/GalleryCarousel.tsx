"use client";

/**
 * GalleryCarousel — image carousel with lightbox.
 *
 * Client island: all interactivity (auto-scroll, keyboard nav, lightbox) lives here.
 * Images are loaded lazily. Alt text comes from config.
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { ConfigGalleryImage } from "@/config/types";

interface GalleryCarouselProps {
  heading: string;
  images: ConfigGalleryImage[];
}

interface GalleryImageTileProps {
  url: string;
  alt: string;
  height: string;
}

function GalleryImageTile({ url, alt, height }: GalleryImageTileProps) {
  return (
    <div
      style={{
        width: "100%",
        height,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blurred background fill */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px) brightness(0.7)",
          transform: "scale(1.1)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary S3 URLs; next/image requires domain allowlist config */}
      <img
        src={url}
        alt={alt}
        loading="lazy"
        style={{
          position: "relative",
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          borderRadius: 8,
        }}
      />
    </div>
  );
}

export default function GalleryCarousel({ heading, images }: GalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const visibleCount = isMobile ? 1 : isTablet ? 2 : 3;
  const maxIndex = useMemo(
    () => Math.max(0, images.length - visibleCount),
    [images.length, visibleCount]
  );

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") {
        setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : i));
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((i) =>
          i !== null && i < images.length - 1 ? i + 1 : i
        );
      } else if (e.key === "Escape") {
        setSelectedIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, images.length]);

  const imageHeight = isMobile ? "280px" : "320px";

  return (
    <Box
      component="section"
      aria-labelledby="gallery-heading"
      sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.default" }}
    >
      <Container maxWidth="lg">
        <Typography
          id="gallery-heading"
          variant="h4"
          component="h2"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: "text.primary",
            mb: 4,
          }}
        >
          {heading}
        </Typography>

        {/* Carousel */}
        <Box sx={{ position: "relative" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Prev button — hidden on xs */}
            <IconButton
              onClick={goToPrev}
              disabled={currentIndex === 0}
              aria-label="Previous image"
              sx={{
                bgcolor: "action.hover",
                color: "primary.main",
                "&:disabled": { opacity: 0.3 },
                display: { xs: "none", sm: "flex" },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>

            <Box sx={{ flex: 1, overflow: "hidden", borderRadius: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  transition: "transform 0.4s ease-in-out",
                  transform: `translateX(calc(-${currentIndex} * (100% / ${visibleCount} + 16px / ${visibleCount})))`,
                }}
              >
                {images.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${image.alt}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedIndex(index);
                      }
                    }}
                    sx={{
                      flex: `0 0 calc(100% / ${visibleCount} - 16px * ${visibleCount - 1} / ${visibleCount})`,
                      cursor: "pointer",
                      borderRadius: 2,
                      overflow: "hidden",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": { transform: "scale(1.02)" },
                    }}
                  >
                    <GalleryImageTile
                      url={image.url}
                      alt={image.alt}
                      height={imageHeight}
                    />
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Next button — hidden on xs */}
            <IconButton
              onClick={goToNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next image"
              sx={{
                bgcolor: "action.hover",
                color: "primary.main",
                "&:disabled": { opacity: 0.3 },
                display: { xs: "none", sm: "flex" },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>

          {/* Mobile prev/next row */}
          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              justifyContent: "center",
              gap: 1,
              mt: 2,
            }}
          >
            <IconButton
              onClick={goToPrev}
              disabled={currentIndex === 0}
              size="small"
              aria-label="Previous image"
              sx={{
                bgcolor: "action.hover",
                color: "primary.main",
                "&:disabled": { opacity: 0.3 },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={goToNext}
              disabled={currentIndex >= maxIndex}
              size="small"
              aria-label="Next image"
              sx={{
                bgcolor: "action.hover",
                color: "primary.main",
                "&:disabled": { opacity: 0.3 },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>

          {/* Dot indicators */}
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}
            role="tablist"
            aria-label="Gallery pages"
          >
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <Box
                key={idx}
                role="tab"
                aria-selected={currentIndex === idx}
                aria-label={`Go to page ${idx + 1}`}
                tabIndex={0}
                onClick={() => setCurrentIndex(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setCurrentIndex(idx);
                  }
                }}
                sx={{
                  width: currentIndex === idx ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: currentIndex === idx ? "primary.main" : "action.disabledBackground",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Lightbox */}
        <Modal
          open={selectedIndex !== null}
          onClose={() => setSelectedIndex(null)}
          aria-label="Image lightbox"
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Box
            sx={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              outline: "none",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <IconButton
              onClick={() => setSelectedIndex(null)}
              aria-label="Close lightbox"
              sx={{ position: "absolute", top: -48, right: 0, color: "white", zIndex: 1 }}
            >
              <CloseIcon />
            </IconButton>

            <IconButton
              onClick={() =>
                setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : i))
              }
              disabled={selectedIndex === null || selectedIndex <= 0}
              aria-label="Previous image"
              sx={{
                color: "white",
                bgcolor: "rgba(0,0,0,0.5)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                "&:disabled": { opacity: 0.3 },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>

            {selectedIndex !== null && images[selectedIndex] && (
              // eslint-disable-next-line @next/next/no-img-element -- lightbox modal with arbitrary S3 URLs; next/image requires domain allowlist
              <img
                src={images[selectedIndex].url}
                alt={images[selectedIndex].alt}
                style={{
                  maxWidth: "calc(90vw - 120px)",
                  maxHeight: "85vh",
                  borderRadius: 8,
                  objectFit: "contain",
                }}
              />
            )}

            <IconButton
              onClick={() =>
                setSelectedIndex((i) =>
                  i !== null && i < images.length - 1 ? i + 1 : i
                )
              }
              disabled={
                selectedIndex === null || selectedIndex >= images.length - 1
              }
              aria-label="Next image"
              sx={{
                color: "white",
                bgcolor: "rgba(0,0,0,0.5)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                "&:disabled": { opacity: 0.3 },
              }}
            >
              <ChevronRightIcon />
            </IconButton>

            <Typography
              sx={{
                position: "absolute",
                bottom: -32,
                left: "50%",
                transform: "translateX(-50%)",
                color: "white",
                fontSize: "0.875rem",
              }}
            >
              {selectedIndex !== null ? selectedIndex + 1 : 0} / {images.length}
            </Typography>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
}

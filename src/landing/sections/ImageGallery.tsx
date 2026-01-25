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
import { siteInfo } from "../data/info";
import { M3Colors } from "../../components/colors";

export default function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const images = useMemo(
    () => siteInfo.info_group.images[0]?.images || [],
    []
  );
  const visibleCount = isMobile ? 1 : isTablet ? 2 : 3;
  const maxIndex = Math.max(0, images.length - visibleCount);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === "ArrowLeft") {
          const idx = images.findIndex((img) => img.url === selectedImage);
          if (idx > 0) setSelectedImage(images[idx - 1].url);
        } else if (e.key === "ArrowRight") {
          const idx = images.findIndex((img) => img.url === selectedImage);
          if (idx < images.length - 1) setSelectedImage(images[idx + 1].url);
        } else if (e.key === "Escape") {
          setSelectedImage(null);
        }
      }
    },
    [selectedImage, images]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const modalImageIndex = selectedImage
    ? images.findIndex((img) => img.url === selectedImage)
    : -1;

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: M3Colors.surfaceHigh }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: M3Colors.onSurface,
            mb: 4,
          }}
        >
          Gallery
        </Typography>

        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <IconButton
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              sx={{
                bgcolor: M3Colors.surfaceHighest,
                color: M3Colors.primary,
                "&:hover": { bgcolor: M3Colors.surface },
                "&:disabled": { opacity: 0.3 },
                display: { xs: "none", sm: "flex" },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>

            <Box
              sx={{
                flex: 1,
                overflow: "hidden",
                borderRadius: 3,
              }}
            >
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
                    onClick={() => setSelectedImage(image.url)}
                    sx={{
                      flex: `0 0 calc(100% / ${visibleCount} - 16px * ${visibleCount - 1} / ${visibleCount})`,
                      cursor: "pointer",
                      borderRadius: 2,
                      overflow: "hidden",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    <img
                      src={image.url}
                      alt={`Gallery image ${index + 1}`}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: isMobile ? "280px" : "320px",
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>

            <IconButton
              onClick={goToNext}
              disabled={currentIndex >= maxIndex}
              sx={{
                bgcolor: M3Colors.surfaceHighest,
                color: M3Colors.primary,
                "&:hover": { bgcolor: M3Colors.surface },
                "&:disabled": { opacity: 0.3 },
                display: { xs: "none", sm: "flex" },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              justifyContent: "center",
              gap: 1,
              mt: 2,
            }}
          >
            <IconButton
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              size="small"
              sx={{
                bgcolor: M3Colors.surfaceHighest,
                color: M3Colors.primary,
                "&:disabled": { opacity: 0.3 },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={goToNext}
              disabled={currentIndex >= maxIndex}
              size="small"
              sx={{
                bgcolor: M3Colors.surfaceHighest,
                color: M3Colors.primary,
                "&:disabled": { opacity: 0.3 },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              mt: 3,
            }}
          >
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <Box
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                sx={{
                  width: currentIndex === idx ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  bgcolor:
                    currentIndex === idx
                      ? M3Colors.primary
                      : M3Colors.surfaceHighest,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Box>
        </Box>

        <Modal
          open={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
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
              onClick={() => setSelectedImage(null)}
              sx={{
                position: "absolute",
                top: -48,
                right: 0,
                color: "white",
                zIndex: 1,
              }}
            >
              <CloseIcon />
            </IconButton>

            <IconButton
              onClick={() => {
                if (modalImageIndex > 0) {
                  setSelectedImage(images[modalImageIndex - 1].url);
                }
              }}
              disabled={modalImageIndex <= 0}
              sx={{
                color: "white",
                bgcolor: "rgba(0,0,0,0.5)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                "&:disabled": { opacity: 0.3 },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>

            {selectedImage && (
              <img
                src={selectedImage}
                alt="Gallery preview"
                style={{
                  maxWidth: "calc(90vw - 120px)",
                  maxHeight: "85vh",
                  borderRadius: 8,
                  objectFit: "contain",
                }}
              />
            )}

            <IconButton
              onClick={() => {
                if (modalImageIndex < images.length - 1) {
                  setSelectedImage(images[modalImageIndex + 1].url);
                }
              }}
              disabled={modalImageIndex >= images.length - 1}
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
              {modalImageIndex + 1} / {images.length}
            </Typography>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
}

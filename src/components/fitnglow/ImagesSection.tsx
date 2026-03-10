import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { M3Colors } from "../colors";
import { BRAND } from "../../constants/fitnglow";
import type { CommonImage } from "../../types/api";

interface ImagesSectionProps {
    images: CommonImage[];
}

export default function ImagesSection({ images }: ImagesSectionProps) {
    return (
        <Box
            sx={{
                bgcolor: M3Colors.surfaceHigh,
                py: { xs: 8, md: 12 },
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Subtle pattern overlay */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `radial-gradient(${M3Colors.primary}08 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                }}
            />

            <Container maxWidth="lg" sx={{ position: "relative" }}>
                <Box sx={{ textAlign: "center", mb: 6 }}>
                    <Typography
                        sx={{
                            color: M3Colors.accent,
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            letterSpacing: 2,
                            textTransform: "uppercase",
                            mb: 1.5,
                        }}
                    >
                        Your Expert Guide
                    </Typography>
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            fontWeight: 700,
                            color: M3Colors.onSurface,
                            fontSize: { xs: "1.8rem", md: "2.5rem" },
                        }}
                    >
                        Meet {BRAND.owner}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "1.2fr 0.8fr 1fr",
                        },
                        gap: { xs: 3, md: 3 },
                        maxWidth: 900,
                        mx: "auto",
                    }}
                >
                    {images.map((image, index) => (
                        <Box
                            key={image.url ?? index}
                            sx={{
                                position: "relative",
                                borderRadius: index === 1 ? "60px 20px 60px 20px" : 4,
                                overflow: "hidden",
                                aspectRatio: "3/4",
                                boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                                transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                mt: { xs: 0, md: index === 1 ? 5 : 0 },
                                "&:hover": {
                                    transform: "translateY(-8px)",
                                    boxShadow: "0 30px 80px rgba(0,0,0,0.12)",
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src={image.url}
                                alt={`${BRAND.owner} - Nutritionist ${index + 1}`}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    transition: "transform 0.5s ease",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                    },
                                }}
                            />
                            {/* Gradient overlay */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: "40%",
                                    background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
                                    opacity: 0,
                                    transition: "opacity 0.3s ease",
                                    ".MuiBox-root:hover &": { opacity: 1 },
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}

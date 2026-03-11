import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { M3Colors } from "../colors";
import { BRAND } from "../../constants/fitnglow";
import type { CommonImage } from "../../types/api";

interface ImagesSectionProps {
    images: CommonImage[];
}

export default function ImagesSection({ images }: ImagesSectionProps) {
    if (images.length === 0) return null;

    const settings = {
        dots: true,
        infinite: images.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        adaptiveHeight: true,
    };

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
                        maxWidth: 600,
                        mx: "auto",
                        "& .slick-dots li button:before": {
                            color: M3Colors.primary,
                            fontSize: 10,
                        },
                        "& .slick-dots li.slick-active button:before": {
                            color: M3Colors.primary,
                        },
                        "& .slick-slide": {
                            px: 0,
                        },
                        "& .slick-list": {
                            overflow: "hidden",
                        },
                        "& .slick-track": {
                            display: "flex",
                        },
                    }}
                >
                    <Slider {...settings}>
                        {images.map((image, index) => (
                            <Box key={image.url ?? index}>
                                <Box
                                    sx={{
                                        borderRadius: 4,
                                        overflow: "hidden",
                                        boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={image.url}
                                        alt={`${BRAND.owner} - Nutritionist ${index + 1}`}
                                        sx={{
                                            width: "100%",
                                            height: "auto",
                                            display: "block",
                                            objectFit: "contain",
                                        }}
                                    />
                                </Box>
                            </Box>
                        ))}
                    </Slider>
                </Box>
            </Container>
        </Box>
    );
}

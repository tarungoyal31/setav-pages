import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Testimonial, fetchTestimonials } from "../data/siteData";
import { palette } from "./colors";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function TestimonialsSection() {
    const ref = useScrollReveal<HTMLElement>();
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchTestimonials()
            .then(setTestimonials)
            .finally(() => setLoaded(true));
    }, []);

    if (loaded && testimonials.length === 0) return null;

    return (
        <Box
            ref={ref}
            component="section"
            sx={{
                py: { xs: 10, md: 16 },
                px: { xs: 2, md: 4 },
                bgcolor: palette.light,
            }}
        >
            <Box sx={{ maxWidth: 1200, mx: "auto" }}>
                <Box className="reveal" sx={{ textAlign: "center", mb: 8 }}>
                    <Typography
                        sx={{
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: palette.accent,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            mb: 2,
                        }}
                    >
                        Testimonials
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: "2rem", md: "2.8rem" },
                            color: palette.text,
                            maxWidth: 500,
                            mx: "auto",
                        }}
                    >
                        What people{" "}
                        <Box
                            component="span"
                            sx={{ color: palette.textMuted }}
                        >
                            are saying.
                        </Box>
                    </Typography>
                </Box>

                <Grid container spacing={2.5} justifyContent="center">
                    {testimonials.map((t, index) => (
                        <Grid
                            key={t.id}
                            size={{
                                xs: 12,
                                sm: testimonials.length === 1 ? 8 : 6,
                                md: testimonials.length === 1 ? 6 : 4,
                            }}
                        >
                            <Box
                                className={`reveal reveal-delay-${Math.min(index + 1, 4)}`}
                                sx={{
                                    p: { xs: 3, md: 4 },
                                    borderRadius: 3,
                                    bgcolor: palette.white,
                                    border: `1px solid ${palette.borderLight}`,
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    transition: "transform 0.3s",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                    },
                                }}
                            >
                                <FormatQuoteIcon
                                    sx={{
                                        fontSize: 32,
                                        color: palette.accent,
                                        opacity: 0.3,
                                        mb: 2,
                                    }}
                                />

                                <Typography
                                    sx={{
                                        fontSize: "1.1rem",
                                        fontWeight: 600,
                                        color: palette.text,
                                        mb: 1.5,
                                    }}
                                >
                                    {t.title}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "0.9rem",
                                        color: palette.textMuted,
                                        lineHeight: 1.8,
                                        mb: 3,
                                        flex: 1,
                                        whiteSpace: "pre-line",
                                    }}
                                >
                                    {t.description}
                                </Typography>

                                {/* Stars */}
                                <Box sx={{ display: "flex", gap: 0.3, mb: 2.5 }}>
                                    {Array.from({ length: t.starRating }).map(
                                        (_, i) => (
                                            <StarIcon
                                                key={i}
                                                sx={{
                                                    fontSize: 18,
                                                    color: "#f59e0b",
                                                }}
                                            />
                                        )
                                    )}
                                </Box>

                                {/* Author */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.5,
                                        pt: 2.5,
                                        borderTop: `1px solid ${palette.borderLight}`,
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={t.authorImage}
                                        alt={t.authorName}
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontSize: "0.9rem",
                                            fontWeight: 600,
                                            color: palette.text,
                                        }}
                                    >
                                        {t.authorName}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

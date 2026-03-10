import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Icon from "@mui/material/Icon";
import { M3Colors } from "../colors";
import type { Testimonial } from "../../types/api";

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
}

function StarRating({ rating }: { rating?: number }) {
    if (rating == null) return null;
    return (
        <Box sx={{ display: "flex", gap: 0.3, mb: 2 }}>
            {Array.from({ length: 5 }, (_, i) => (
                <Icon
                    key={i}
                    sx={{
                        fontSize: 20,
                        color: i < rating ? M3Colors.accent : "#D4D0C8",
                    }}
                >
                    {i < rating ? "star" : "star_border"}
                </Icon>
            ))}
        </Box>
    );
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
    if (testimonials.length === 0) return null;

    return (
        <Box
            sx={{
                bgcolor: M3Colors.surfaceHigh,
                py: { xs: 8, md: 12 },
                position: "relative",
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ textAlign: "center", mb: 7 }}>
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
                        Testimonials
                    </Typography>
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            fontWeight: 700,
                            color: M3Colors.onSurface,
                            fontSize: { xs: "1.8rem", md: "2.5rem" },
                            mb: 2,
                        }}
                    >
                        What Our Clients Say
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: testimonials.length === 1 ? "1fr" : `repeat(${Math.min(testimonials.length, 3)}, 1fr)`,
                        },
                        gap: 3,
                        maxWidth: testimonials.length === 1 ? 600 : "none",
                        mx: "auto",
                    }}
                >
                    {testimonials.map((testimonial) => (
                        <Box
                            key={testimonial.id ?? testimonial.title}
                            sx={{
                                bgcolor: "#fff",
                                borderRadius: 4,
                                p: { xs: 3, md: 4 },
                                boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                                border: "1px solid #E8E4DC",
                                transition: "all 0.4s ease",
                                "&:hover": {
                                    transform: "translateY(-6px)",
                                    boxShadow: `0 20px 60px ${M3Colors.primary}10`,
                                },
                            }}
                        >
                            <StarRating rating={testimonial.star_rating} />

                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    color: M3Colors.onSurface,
                                    fontSize: "1.05rem",
                                    mb: 1.5,
                                    fontFamily: "'Inter', sans-serif",
                                }}
                            >
                                {testimonial.title}
                            </Typography>

                            <Typography
                                sx={{
                                    color: M3Colors.onSurfaceVariant,
                                    lineHeight: 1.7,
                                    fontSize: "0.95rem",
                                    mb: 3,
                                    whiteSpace: "pre-line",
                                }}
                            >
                                {testimonial.description}
                            </Typography>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                <Avatar
                                    src={testimonial.author.image}
                                    alt={testimonial.author.name ?? ""}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        bgcolor: M3Colors.primary,
                                    }}
                                >
                                    {testimonial.author.name?.charAt(0) ?? ""}
                                </Avatar>
                                {testimonial.author.name && (
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            color: M3Colors.onSurface,
                                            fontSize: "0.9rem",
                                        }}
                                    >
                                        {testimonial.author.name}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}

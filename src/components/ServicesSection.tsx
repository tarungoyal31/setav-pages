import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { SITE_DATA } from "../data/siteData";
import { palette } from "./colors";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function ServicesSection() {
    const ref = useScrollReveal<HTMLElement>();

    return (
        <Box
            ref={ref}
            id="services"
            component="section"
            sx={{
                py: { xs: 10, md: 16 },
                px: { xs: 2, md: 4 },
                bgcolor: palette.white,
            }}
        >
            <Box sx={{ maxWidth: 1200, mx: "auto" }}>
                <Box className="reveal" sx={{ mb: 8 }}>
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
                        Services
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: "2rem", md: "2.8rem" },
                            color: palette.text,
                            maxWidth: 500,
                        }}
                    >
                        What I can{" "}
                        <Box
                            component="span"
                            sx={{ color: palette.textMuted }}
                        >
                            help you with.
                        </Box>
                    </Typography>
                </Box>

                <Box>
                    {SITE_DATA.services.map((service, index) => (
                        <Box
                            key={index}
                            className={`reveal reveal-delay-${Math.min(index + 1, 4)}`}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                py: { xs: 3, md: 4 },
                                borderBottom: `1px solid ${palette.borderLight}`,
                                cursor: "default",
                                transition: "padding-left 0.3s",
                                "&:hover": {
                                    pl: { md: 2 },
                                },
                                "&:hover .service-arrow": {
                                    opacity: 1,
                                    transform: "translateX(0)",
                                },
                                "&:first-of-type": {
                                    borderTop: `1px solid ${palette.borderLight}`,
                                },
                            }}
                        >
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: "1.15rem",
                                            md: "1.35rem",
                                        },
                                        fontWeight: 600,
                                        color: palette.text,
                                        mb: 0.5,
                                        letterSpacing: "-0.01em",
                                    }}
                                >
                                    {service.title}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "0.9rem",
                                        color: palette.textMuted,
                                        maxWidth: 500,
                                    }}
                                >
                                    {service.description}
                                </Typography>
                            </Box>
                            <ArrowOutwardIcon
                                className="service-arrow"
                                sx={{
                                    fontSize: 20,
                                    color: palette.textMuted,
                                    opacity: { xs: 0.5, md: 0 },
                                    transform: {
                                        md: "translateX(-8px)",
                                    },
                                    transition:
                                        "opacity 0.3s, transform 0.3s",
                                    ml: 2,
                                    flexShrink: 0,
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

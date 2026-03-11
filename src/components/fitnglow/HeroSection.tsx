import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import { M3Colors } from "../colors";
import { BRAND, URLS } from "../../constants/fitnglow";

interface HeroSectionProps {
    profileImage?: string;
}

export default function HeroSection({ profileImage }: HeroSectionProps) {
    return (
        <Box
            sx={{
                position: "relative",
                minHeight: { xs: "auto", md: "100vh" },
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                bgcolor: M3Colors.surface,
            }}
        >
            {/* Decorative background elements */}
            <Box
                sx={{
                    position: "absolute",
                    top: -120,
                    right: -120,
                    width: 400,
                    height: 400,
                    borderRadius: "50%",
                    bgcolor: `${M3Colors.primary}08`,
                    display: { xs: "none", md: "block" },
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: -80,
                    left: -80,
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    bgcolor: `${M3Colors.accent}10`,
                    display: { xs: "none", md: "block" },
                }}
            />

            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: { xs: 5, md: 8 },
                        alignItems: "center",
                        py: { xs: 8, md: 4 },
                    }}
                >
                    {/* Text Content */}
                    <Box>
                        <Box
                            sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 1,
                                bgcolor: `${M3Colors.primary}12`,
                                color: M3Colors.primary,
                                px: 2.5,
                                py: 0.8,
                                borderRadius: 50,
                                mb: 3,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    bgcolor: M3Colors.accent,
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    letterSpacing: 0.5,
                                }}
                            >
                                Certified Nutritionist
                            </Typography>
                        </Box>

                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                fontWeight: 700,
                                color: M3Colors.onSurface,
                                mb: 1,
                                fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.4rem" },
                                lineHeight: 1.15,
                            }}
                        >
                            {BRAND.tagline.split(",")[0]},
                        </Typography>
                        <Typography
                            variant="h2"
                            component="span"
                            sx={{
                                fontWeight: 700,
                                color: M3Colors.primary,
                                mb: 3,
                                fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.4rem" },
                                lineHeight: 1.15,
                                display: "block",
                                fontStyle: "italic",
                            }}
                        >
                            {BRAND.tagline.split(",")[1]?.trim() || "Transform Your Life"}
                        </Typography>

                        <Typography
                            sx={{
                                color: M3Colors.onSurfaceVariant,
                                mb: 4,
                                mt: 3,
                                fontSize: { xs: "1rem", md: "1.15rem" },
                                lineHeight: 1.7,
                                maxWidth: 480,
                            }}
                        >
                            Expert nutrition guidance by <strong>{BRAND.owner}</strong> — MSc Public Health,
                            5+ years of transforming lives through personalized wellness plans.
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                flexWrap: "wrap",
                                mb: 5,
                            }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                href={URLS.bookAppointment}
                                target="_blank"
                                rel="noopener noreferrer"
                                endIcon={<Icon sx={{ fontSize: "1.2rem !important" }}>arrow_forward</Icon>}
                                sx={{
                                    bgcolor: M3Colors.primary,
                                    color: "#fff",
                                    px: 4,
                                    py: 1.8,
                                    fontSize: "1.05rem",
                                    boxShadow: `0 8px 30px ${M3Colors.primary}40`,
                                    "&:hover": {
                                        bgcolor: M3Colors.primaryDark,
                                        boxShadow: `0 12px 40px ${M3Colors.primary}50`,
                                        transform: "translateY(-2px)",
                                    },
                                    transition: "all 0.3s ease",
                                }}
                            >
                                Book Consultation
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                href={URLS.call}
                                startIcon={<Icon>phone</Icon>}
                                sx={{
                                    borderColor: M3Colors.onSurfaceLight,
                                    color: M3Colors.onSurface,
                                    px: 4,
                                    py: 1.8,
                                    fontSize: "1.05rem",
                                    borderWidth: 1.5,
                                    "&:hover": {
                                        borderColor: M3Colors.primary,
                                        bgcolor: `${M3Colors.primary}08`,
                                        borderWidth: 1.5,
                                    },
                                    transition: "all 0.3s ease",
                                }}
                            >
                                Call Now
                            </Button>
                        </Box>

                        {/* Trust indicators */}
                        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                            {[
                                { number: "500+", label: "Happy Clients" },
                                { number: "5+", label: "Years Experience" },
                                { number: "98%", label: "Success Rate" },
                            ].map((stat) => (
                                <Box key={stat.label}>
                                    <Typography
                                        sx={{
                                            fontFamily: "'Playfair Display', serif",
                                            fontSize: "1.6rem",
                                            fontWeight: 700,
                                            color: M3Colors.primary,
                                            lineHeight: 1,
                                        }}
                                    >
                                        {stat.number}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "0.8rem",
                                            color: M3Colors.onSurfaceLight,
                                            mt: 0.5,
                                            fontWeight: 500,
                                        }}
                                    >
                                        {stat.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Hero Image */}
                    <Box
                        sx={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                                width: { xs: "85%", sm: "70%", md: "100%" },
                                maxWidth: 480,
                            }}
                        >
                            {/* Background shape */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    inset: -16,
                                    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                                    bgcolor: `${M3Colors.primary}10`,
                                }}
                            />
                            <Box
                                component="img"
                                src={profileImage}
                                alt={`${BRAND.owner} - Certified Nutritionist`}
                                sx={{
                                    width: "100%",
                                    aspectRatio: "4/5",
                                    objectFit: "cover",
                                    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                                    position: "relative",
                                    zIndex: 1,
                                }}
                            />
                            {/* Floating badge */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 40,
                                    left: { xs: -10, md: -30 },
                                    bgcolor: "#fff",
                                    borderRadius: 3,
                                    p: 2,
                                    px: 3,
                                    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                                    zIndex: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1.5,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: "50%",
                                        bgcolor: `${M3Colors.accent}20`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Icon sx={{ color: M3Colors.accent, fontSize: 22 }}>verified</Icon>
                                </Box>
                                <Box>
                                    <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", color: M3Colors.onSurface, lineHeight: 1.2 }}>
                                        MSc Public Health
                                    </Typography>
                                    <Typography sx={{ fontSize: "0.75rem", color: M3Colors.onSurfaceLight }}>
                                        Lady Irwin College, DU
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

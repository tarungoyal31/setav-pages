import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import { M3Colors } from "../colors";
import { WHY_US_FEATURES } from "../../constants/fitnglow";

export default function WhyUsSection() {
    return (
        <Box
            sx={{
                bgcolor: M3Colors.surface,
                py: { xs: 8, md: 12 },
                position: "relative",
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
                        gap: { xs: 5, md: 8 },
                        alignItems: "start",
                    }}
                >
                    {/* Left: Section heading */}
                    <Box sx={{ position: { md: "sticky" }, top: { md: 100 } }}>
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
                            Why Choose Us
                        </Typography>
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                fontWeight: 700,
                                color: M3Colors.onSurface,
                                fontSize: { xs: "1.8rem", md: "2.4rem" },
                                lineHeight: 1.2,
                                mb: 2,
                            }}
                        >
                            Expertise You Can{" "}
                            <Box component="span" sx={{ color: M3Colors.primary }}>
                                Trust
                            </Box>
                        </Typography>
                        <Typography
                            sx={{
                                color: M3Colors.onSurfaceVariant,
                                lineHeight: 1.7,
                                fontSize: "1rem",
                            }}
                        >
                            We combine scientific knowledge with personalized care to deliver
                            real, lasting results for your health journey.
                        </Typography>
                    </Box>

                    {/* Right: Features grid */}
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                            gap: 3,
                        }}
                    >
                        {WHY_US_FEATURES.map((feature, index) => (
                            <Box
                                key={index}
                                sx={{
                                    p: 3.5,
                                    borderRadius: 4,
                                    bgcolor: "#fff",
                                    border: `1px solid ${M3Colors.surfaceHighest}`,
                                    transition: "all 0.4s ease",
                                    cursor: "default",
                                    "&:hover": {
                                        borderColor: M3Colors.primary,
                                        boxShadow: `0 20px 60px ${M3Colors.primary}10`,
                                        transform: "translateY(-4px)",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 52,
                                        height: 52,
                                        borderRadius: 3,
                                        bgcolor: index % 2 === 0 ? `${M3Colors.primary}12` : `${M3Colors.accent}15`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 2.5,
                                    }}
                                >
                                    <Icon
                                        sx={{
                                            fontSize: 26,
                                            color: index % 2 === 0 ? M3Colors.primary : M3Colors.accent,
                                        }}
                                    >
                                        {feature.icon}
                                    </Icon>
                                </Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 700,
                                        color: M3Colors.onSurface,
                                        mb: 1,
                                        fontSize: "1.05rem",
                                        fontFamily: "'Inter', sans-serif",
                                    }}
                                >
                                    {feature.title}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: M3Colors.onSurfaceVariant,
                                        lineHeight: 1.6,
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    {feature.description}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

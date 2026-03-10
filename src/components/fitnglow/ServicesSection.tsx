import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import Button from "@mui/material/Button";
import { M3Colors } from "../colors";
import { SERVICES, URLS } from "../../constants/fitnglow";

export default function ServicesSection() {
    return (
        <Box
            sx={{
                bgcolor: M3Colors.primaryDark,
                py: { xs: 8, md: 12 },
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Decorative circles */}
            <Box
                sx={{
                    position: "absolute",
                    top: -100,
                    left: -100,
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    border: `1px solid rgba(255,255,255,0.06)`,
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: -60,
                    right: -60,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    border: `1px solid rgba(255,255,255,0.06)`,
                }}
            />

            <Container maxWidth="lg" sx={{ position: "relative" }}>
                <Box sx={{ textAlign: "center", mb: 7 }}>
                    <Typography
                        sx={{
                            color: M3Colors.accentLight,
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            letterSpacing: 2,
                            textTransform: "uppercase",
                            mb: 1.5,
                        }}
                    >
                        Our Specializations
                    </Typography>
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            fontWeight: 700,
                            color: "#fff",
                            fontSize: { xs: "1.8rem", md: "2.5rem" },
                            mb: 2,
                        }}
                    >
                        Services We Offer
                    </Typography>
                    <Typography
                        sx={{
                            color: "rgba(255,255,255,0.6)",
                            maxWidth: 540,
                            mx: "auto",
                            lineHeight: 1.7,
                        }}
                    >
                        Comprehensive nutrition solutions tailored to your specific health goals and lifestyle needs.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(3, 1fr)",
                        },
                        gap: 3,
                    }}
                >
                    {SERVICES.map((service, index) => (
                        <Box
                            key={index}
                            sx={{
                                p: 4,
                                borderRadius: 4,
                                bgcolor: "rgba(255,255,255,0.06)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                transition: "all 0.4s ease",
                                cursor: "default",
                                "&:hover": {
                                    bgcolor: "rgba(255,255,255,0.1)",
                                    borderColor: `${M3Colors.accent}60`,
                                    transform: "translateY(-6px)",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: "50%",
                                    bgcolor: `${M3Colors.accent}20`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mb: 3,
                                }}
                            >
                                <Icon
                                    sx={{
                                        fontSize: 28,
                                        color: M3Colors.accent,
                                    }}
                                >
                                    {service.icon}
                                </Icon>
                            </Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    color: "#fff",
                                    mb: 1.5,
                                    fontSize: "1.1rem",
                                    fontFamily: "'Inter', sans-serif",
                                }}
                            >
                                {service.title}
                            </Typography>
                            <Typography
                                sx={{
                                    color: "rgba(255,255,255,0.55)",
                                    lineHeight: 1.6,
                                    fontSize: "0.9rem",
                                }}
                            >
                                {service.description}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                <Box sx={{ textAlign: "center", mt: 6 }}>
                    <Button
                        variant="contained"
                        size="large"
                        href={URLS.bookAppointment}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            bgcolor: M3Colors.accent,
                            color: "#fff",
                            px: 5,
                            py: 1.8,
                            fontSize: "1.05rem",
                            boxShadow: `0 8px 30px ${M3Colors.accent}40`,
                            "&:hover": {
                                bgcolor: M3Colors.accentDark,
                                transform: "translateY(-2px)",
                            },
                            transition: "all 0.3s ease",
                        }}
                    >
                        Get Started Today
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

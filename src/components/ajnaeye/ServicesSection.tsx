import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Icon from "@mui/material/Icon";
import { M3Colors } from "../colors";
import { SERVICES } from "../../constants/ajnaeye";

export default function ServicesSection() {
    return (
        <Box
            sx={{
                bgcolor: M3Colors.surfaceHighest,
                py: { xs: 6, md: 10 },
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        textAlign: "center",
                        fontWeight: 700,
                        color: M3Colors.onSurface,
                        mb: 5,
                    }}
                >
                    Our Healing Services
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                        },
                        gap: 3,
                    }}
                >
                    {SERVICES.map((service, index) => (
                        <Paper
                            key={index}
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                bgcolor: M3Colors.surface,
                                border: `1px solid ${M3Colors.surfaceHighest}`,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    borderColor: M3Colors.primary,
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 8px 24px rgba(213, 150, 203, 0.15)",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: "50%",
                                    bgcolor: M3Colors.primary,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mb: 2,
                                }}
                            >
                                <Icon
                                    sx={{
                                        fontSize: 28,
                                        color: "#fff",
                                    }}
                                >
                                    {service.icon}
                                </Icon>
                            </Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    color: M3Colors.onSurface,
                                    mb: 1,
                                }}
                            >
                                {service.title}
                            </Typography>
                            <Typography
                                sx={{
                                    color: M3Colors.onSurfaceVariant,
                                    lineHeight: 1.6,
                                }}
                            >
                                {service.description}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}

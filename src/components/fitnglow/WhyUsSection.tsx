import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Icon from "@mui/material/Icon";
import { M3Colors } from "../colors";
import { WHY_US_FEATURES } from "../../constants/fitnglow";

export default function WhyUsSection() {
    return (
        <Box
            sx={{
                bgcolor: M3Colors.surface,
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
                    Why Choose Fit n Glow?
                </Typography>

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
                    {WHY_US_FEATURES.map((feature, index) => (
                        <Paper
                            key={index}
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                bgcolor: M3Colors.surfaceHigh,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    bgcolor: M3Colors.surfaceHighest,
                                    transform: "translateY(-4px)",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: 2,
                                    bgcolor: `${M3Colors.primary}20`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mb: 2,
                                }}
                            >
                                <Icon
                                    sx={{
                                        fontSize: 28,
                                        color: M3Colors.primary,
                                    }}
                                >
                                    {feature.icon}
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
                                {feature.title}
                            </Typography>
                            <Typography
                                sx={{
                                    color: M3Colors.onSurfaceVariant,
                                    lineHeight: 1.6,
                                }}
                            >
                                {feature.description}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}

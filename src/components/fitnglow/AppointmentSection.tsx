import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Icon from "@mui/material/Icon";
import { M3Colors } from "../colors";
import { PRICING, URLS } from "../../constants/fitnglow";

export default function AppointmentSection() {
    return (
        <Box
            sx={{
                bgcolor: M3Colors.surfaceHigh,
                py: { xs: 6, md: 10 },
            }}
        >
            <Container maxWidth="sm">
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
                    Start Your Transformation Today
                </Typography>

                <Paper
                    elevation={0}
                    sx={{
                        bgcolor: M3Colors.surface,
                        borderRadius: 4,
                        overflow: "hidden",
                        border: `2px solid ${M3Colors.primary}`,
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: M3Colors.primary,
                            color: "#fff",
                            py: 2,
                            px: 3,
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {PRICING.title}
                        </Typography>
                    </Box>

                    <Box sx={{ p: 4 }}>
                        <Typography
                            variant="h3"
                            sx={{
                                textAlign: "center",
                                fontWeight: 700,
                                color: M3Colors.onSurface,
                                mb: 3,
                            }}
                        >
                            <Typography
                                component="span"
                                sx={{ fontSize: "1.5rem", verticalAlign: "top" }}
                            >
                                {PRICING.currency === "INR" ? "\u20B9" : "$"}
                            </Typography>
                            {PRICING.price}
                        </Typography>

                        <Box
                            sx={{
                                bgcolor: `${M3Colors.primary}15`,
                                borderRadius: 2,
                                p: 2,
                                mb: 3,
                                textAlign: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: M3Colors.primary,
                                    fontWeight: 600,
                                    fontSize: "1.1rem",
                                }}
                            >
                                {PRICING.highlight}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            {PRICING.features.map((feature, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        mb: 1.5,
                                    }}
                                >
                                    <Icon
                                        sx={{
                                            color: M3Colors.primary,
                                            fontSize: 20,
                                        }}
                                    >
                                        check_circle
                                    </Icon>
                                    <Typography
                                        sx={{
                                            color: M3Colors.onSurface,
                                            fontSize: "1rem",
                                        }}
                                    >
                                        {feature}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            href={URLS.productDetails}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                bgcolor: M3Colors.primary,
                                color: "#fff",
                                py: 1.5,
                                borderRadius: 3,
                                textTransform: "none",
                                fontSize: "1.1rem",
                                fontWeight: 600,
                                "&:hover": {
                                    bgcolor: M3Colors.secondary,
                                },
                            }}
                        >
                            Book Your Appointment
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

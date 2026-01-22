import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Icon from "@mui/material/Icon";
import Chip from "@mui/material/Chip";
import { M3Colors } from "../colors";
import { PRICING_PLANS } from "../../constants/fitnglow";

export default function AppointmentSection() {
    return (
        <Box
            sx={{
                bgcolor: M3Colors.surfaceHigh,
                py: { xs: 6, md: 10 },
            }}
        >
            <Container maxWidth="md">
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

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: 3,
                    }}
                >
                    {PRICING_PLANS.map((plan) => (
                        <Paper
                            key={plan.id}
                            elevation={0}
                            sx={{
                                bgcolor: M3Colors.surface,
                                borderRadius: 4,
                                overflow: "hidden",
                                border: `2px solid ${plan.popular ? M3Colors.primary : M3Colors.surfaceHigh}`,
                                position: "relative",
                            }}
                        >
                            {plan.popular && (
                                <Chip
                                    label="Popular"
                                    size="small"
                                    sx={{
                                        position: "absolute",
                                        top: 12,
                                        right: 12,
                                        bgcolor: M3Colors.secondary,
                                        color: "#fff",
                                        fontWeight: 600,
                                    }}
                                />
                            )}
                            <Box
                                sx={{
                                    bgcolor: plan.popular ? M3Colors.primary : M3Colors.surfaceHigh,
                                    color: plan.popular ? "#fff" : M3Colors.onSurface,
                                    py: 2,
                                    px: 3,
                                    textAlign: "center",
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {plan.title}
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
                                        {plan.currency === "INR" ? "\u20B9" : "$"}
                                    </Typography>
                                    {plan.price}
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
                                        {plan.highlight}
                                    </Typography>
                                </Box>

                                <Box sx={{ mb: 4 }}>
                                    {plan.features.map((feature, index) => (
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
                                    variant={plan.popular ? "contained" : "outlined"}
                                    fullWidth
                                    size="large"
                                    href={plan.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        bgcolor: plan.popular ? M3Colors.primary : "transparent",
                                        color: plan.popular ? "#fff" : M3Colors.primary,
                                        borderColor: M3Colors.primary,
                                        py: 1.5,
                                        borderRadius: 3,
                                        textTransform: "none",
                                        fontSize: "1.1rem",
                                        fontWeight: 600,
                                        "&:hover": {
                                            bgcolor: plan.popular ? M3Colors.secondary : `${M3Colors.primary}15`,
                                            borderColor: M3Colors.primary,
                                        },
                                    }}
                                >
                                    Book Now
                                </Button>
                            </Box>
                        </Paper>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}

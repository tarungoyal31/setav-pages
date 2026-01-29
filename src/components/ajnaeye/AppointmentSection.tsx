import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { M3Colors } from "../colors";
import { APPOINTMENT_PRODUCTS } from "../../constants/ajnaeye";

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
                    Book Your Session
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: 3,
                    }}
                >
                    {APPOINTMENT_PRODUCTS.map((product) => (
                        <Paper
                            key={product.id}
                            elevation={0}
                            sx={{
                                bgcolor: M3Colors.surface,
                                borderRadius: 4,
                                overflow: "hidden",
                                border: `1px solid ${M3Colors.surfaceHighest}`,
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
                                    {product.title}
                                </Typography>
                            </Box>

                            <Box sx={{ p: 4 }}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        textAlign: "center",
                                        fontWeight: 700,
                                        color: M3Colors.onSurface,
                                        mb: 2,
                                    }}
                                >
                                    <Typography
                                        component="span"
                                        sx={{ fontSize: "1.5rem", verticalAlign: "top" }}
                                    >
                                        ₹
                                    </Typography>
                                    {product.price}
                                </Typography>

                                <Box sx={{ textAlign: "center", mb: 3 }}>
                                    <Chip
                                        label={product.duration}
                                        size="small"
                                        sx={{
                                            bgcolor: `${M3Colors.primary}15`,
                                            color: M3Colors.primary,
                                            fontWeight: 600,
                                        }}
                                    />
                                </Box>

                                <Typography
                                    sx={{
                                        color: M3Colors.onSurfaceVariant,
                                        textAlign: "center",
                                        lineHeight: 1.6,
                                        mb: 4,
                                        minHeight: 48,
                                    }}
                                >
                                    {product.description}
                                </Typography>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    href={product.url}
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

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import {
    AppointmentProduct,
    fetchAppointmentProducts,
} from "../data/siteData";
import { palette } from "./colors";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function AppointmentProductsSection() {
    const ref = useScrollReveal<HTMLElement>();
    const [products, setProducts] = useState<AppointmentProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointmentProducts()
            .then(setProducts)
            .finally(() => setLoading(false));
    }, []);

    if (!loading && products.length === 0) return null;

    return (
        <Box
            ref={ref}
            id="pricing"
            component="section"
            className="grain"
            sx={{
                position: "relative",
                py: { xs: 10, md: 16 },
                px: { xs: 2, md: 4 },
                bgcolor: palette.dark,
                color: palette.textOnDark,
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,
                    maxWidth: 1200,
                    mx: "auto",
                }}
            >
                <Box className="reveal" sx={{ textAlign: "center", mb: 8 }}>
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
                        Pricing
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: "2rem", md: "2.8rem" },
                            color: palette.textOnDark,
                            maxWidth: 500,
                            mx: "auto",
                        }}
                    >
                        Book a session,{" "}
                        <Box
                            component="span"
                            sx={{ color: palette.textOnDarkMuted }}
                        >
                            get started today.
                        </Box>
                    </Typography>
                </Box>

                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                        <CircularProgress sx={{ color: palette.accent }} />
                    </Box>
                ) : (
                    <Grid container spacing={2.5} justifyContent="center">
                        {products.map((product, index) => (
                            <Grid
                                key={product.id}
                                size={{ xs: 12, sm: 6, md: 4 }}
                            >
                                <Box
                                    className={`reveal reveal-delay-${Math.min(index + 1, 4)}`}
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        p: { xs: 3, md: 4 },
                                        borderRadius: 3,
                                        border: `1px solid ${palette.borderDark}`,
                                        bgcolor: palette.darkElevated,
                                        transition:
                                            "border-color 0.3s, transform 0.3s",
                                        "&:hover": {
                                            borderColor:
                                                "rgba(255,255,255,0.15)",
                                            transform: "translateY(-2px)",
                                        },
                                    }}
                                >
                                    {product.isFree && (
                                        <Box
                                            sx={{
                                                alignSelf: "flex-start",
                                                px: 1.5,
                                                py: 0.3,
                                                borderRadius: 999,
                                                bgcolor: palette.freeBg,
                                                color: palette.free,
                                                fontSize: "0.75rem",
                                                fontWeight: 600,
                                                mb: 2,
                                            }}
                                        >
                                            Free
                                        </Box>
                                    )}

                                    <Typography
                                        sx={{
                                            fontSize: "1.15rem",
                                            fontWeight: 600,
                                            color: palette.textOnDark,
                                            mb: 1,
                                        }}
                                    >
                                        {product.name}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: "0.9rem",
                                            color: palette.textOnDarkMuted,
                                            lineHeight: 1.7,
                                            mb: 3,
                                            flex: 1,
                                        }}
                                    >
                                        {product.additionalInformation ||
                                            product.description}
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.5,
                                            color: palette.textOnDarkMuted,
                                            mb: 3,
                                        }}
                                    >
                                        <AccessTimeIcon
                                            sx={{ fontSize: 16 }}
                                        />
                                        <Typography
                                            sx={{ fontSize: "0.85rem" }}
                                        >
                                            {product.durationMinutes} min
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            pt: 3,
                                            borderTop: `1px solid ${palette.borderDark}`,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: product.isFree
                                                    ? "1.1rem"
                                                    : "1.5rem",
                                                fontWeight: 700,
                                                color: palette.textOnDark,
                                                letterSpacing: "-0.02em",
                                            }}
                                        >
                                            {product.priceDisplay}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            endIcon={
                                                <ArrowOutwardIcon
                                                    sx={{ fontSize: 16 }}
                                                />
                                            }
                                            href={product.bookingUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                bgcolor: palette.accent,
                                                color: "#fff",
                                                px: 3,
                                                py: 1,
                                                fontSize: "0.85rem",
                                                "&:hover": {
                                                    bgcolor:
                                                        palette.accentHover,
                                                },
                                                boxShadow: "none",
                                            }}
                                        >
                                            Book
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Box>
    );
}

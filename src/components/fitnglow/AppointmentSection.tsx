import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import { M3Colors } from "../colors";
import type { AppointmentProduct } from "../../types/api";

interface AppointmentSectionProps {
    products: AppointmentProduct[];
}

function formatPrice(units?: number): string {
    if (units == null || units === 0) return "Free";
    return units.toLocaleString("en-IN");
}

function getCurrency(currency?: string): string {
    if (currency === "INR") return "\u20B9";
    if (currency === "USD") return "$";
    return currency ?? "";
}

export default function AppointmentSection({ products }: AppointmentSectionProps) {
    if (products.length === 0) return null;

    // Mark the last product as popular if more than one
    const popularIndex = products.length > 1 ? products.length - 1 : -1;

    return (
        <Box
            sx={{
                bgcolor: M3Colors.surfaceWarm,
                py: { xs: 8, md: 12 },
                position: "relative",
            }}
        >
            <Container maxWidth="md">
                <Box sx={{ textAlign: "center", mb: 7 }}>
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
                        Pricing Plans
                    </Typography>
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            fontWeight: 700,
                            color: M3Colors.onSurface,
                            fontSize: { xs: "1.8rem", md: "2.5rem" },
                            mb: 2,
                        }}
                    >
                        Start Your Transformation
                    </Typography>
                    <Typography
                        sx={{
                            color: M3Colors.onSurfaceVariant,
                            maxWidth: 480,
                            mx: "auto",
                            lineHeight: 1.7,
                        }}
                    >
                        Choose a plan that works for your goals. Every plan includes personalized attention and expert guidance.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: products.length === 1 ? "1fr" : `repeat(${Math.min(products.length, 3)}, 1fr)`,
                        },
                        gap: 3,
                        alignItems: "start",
                    }}
                >
                    {products.map((product, index) => {
                        const isPopular = index === popularIndex;
                        const priceUnits = product.price?.units;
                        const isFree = priceUnits == null || priceUnits === 0;
                        const priceDisplay = formatPrice(priceUnits);
                        const currencySymbol = isFree ? "" : getCurrency(product.price?.currency);
                        const bookingUrl = `https://app.setav.ai/#/g/${product.group_id}/services/details/${product.id}`;

                        return (
                            <Box
                                key={product.id}
                                sx={{
                                    bgcolor: "#fff",
                                    borderRadius: 5,
                                    overflow: "hidden",
                                    border: isPopular
                                        ? `2px solid ${M3Colors.primary}`
                                        : "1px solid #E8E4DC",
                                    position: "relative",
                                    transition: "all 0.4s ease",
                                    transform: isPopular ? { md: "scale(1.04)" } : "none",
                                    boxShadow: isPopular
                                        ? `0 20px 60px ${M3Colors.primary}15`
                                        : "0 4px 20px rgba(0,0,0,0.04)",
                                    "&:hover": {
                                        transform: isPopular
                                            ? { md: "scale(1.06)" }
                                            : "translateY(-6px)",
                                        boxShadow: `0 24px 70px ${M3Colors.primary}18`,
                                    },
                                }}
                            >
                                {isPopular && (
                                    <Box
                                        sx={{
                                            bgcolor: M3Colors.primary,
                                            color: "#fff",
                                            textAlign: "center",
                                            py: 1,
                                            fontSize: "0.8rem",
                                            fontWeight: 700,
                                            letterSpacing: 1.5,
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        Most Popular
                                    </Box>
                                )}

                                <Box sx={{ p: { xs: 3.5, md: 4.5 } }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            color: M3Colors.onSurfaceVariant,
                                            fontSize: "1rem",
                                            mb: 1,
                                        }}
                                    >
                                        {product.name}
                                    </Typography>

                                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5, mb: 1 }}>
                                        {currencySymbol && (
                                            <Typography
                                                sx={{
                                                    fontSize: "0.95rem",
                                                    fontWeight: 500,
                                                    color: M3Colors.onSurfaceVariant,
                                                }}
                                            >
                                                {currencySymbol}
                                            </Typography>
                                        )}
                                        <Typography
                                            sx={{
                                                fontFamily: "'Playfair Display', serif",
                                                fontSize: "3rem",
                                                fontWeight: 700,
                                                color: M3Colors.onSurface,
                                                lineHeight: 1,
                                            }}
                                        >
                                            {priceDisplay}
                                        </Typography>
                                    </Box>

                                    {product.additional_information && (
                                        <Box
                                            sx={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: 1,
                                                bgcolor: `${M3Colors.primary}10`,
                                                color: M3Colors.primary,
                                                px: 2,
                                                py: 0.8,
                                                borderRadius: 50,
                                                mb: 3.5,
                                            }}
                                        >
                                            <Icon sx={{ fontSize: 18 }}>trending_up</Icon>
                                            <Typography sx={{ fontSize: "0.85rem", fontWeight: 600 }}>
                                                {product.additional_information}
                                            </Typography>
                                        </Box>
                                    )}

                                    <Box sx={{ height: 1, bgcolor: M3Colors.surfaceHighest, mb: 3 }} />

                                    {product.description && (
                                        <Box sx={{ mb: 4 }}>
                                            <Typography
                                                sx={{
                                                    color: M3Colors.onSurfaceVariant,
                                                    fontSize: "0.95rem",
                                                    lineHeight: 1.7,
                                                }}
                                            >
                                                {product.description}
                                            </Typography>
                                        </Box>
                                    )}

                                    <Button
                                        variant={isPopular ? "contained" : "outlined"}
                                        fullWidth
                                        size="large"
                                        href={bookingUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            bgcolor: isPopular ? M3Colors.primary : "transparent",
                                            color: isPopular ? "#fff" : M3Colors.primary,
                                            borderColor: isPopular ? M3Colors.primary : M3Colors.onSurfaceLight,
                                            py: 1.8,
                                            fontSize: "1rem",
                                            fontWeight: 700,
                                            boxShadow: isPopular
                                                ? `0 8px 30px ${M3Colors.primary}30`
                                                : "none",
                                            "&:hover": {
                                                bgcolor: isPopular
                                                    ? M3Colors.primaryDark
                                                    : `${M3Colors.primary}08`,
                                                borderColor: M3Colors.primary,
                                                transform: "translateY(-2px)",
                                            },
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        {isFree ? "Book Now" : isPopular ? "Get Started" : "Choose Plan"}
                                    </Button>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </Container>
        </Box>
    );
}

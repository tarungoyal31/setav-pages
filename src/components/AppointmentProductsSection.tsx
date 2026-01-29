import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { APPOINTMENT_PRODUCTS } from "../data/siteData";
import { M3Colors } from "./colors";
import SectionContainer from "./SectionContainer";

export default function AppointmentProductsSection() {
    return (
        <SectionContainer backgroundColor={M3Colors.surfaceHigh}>
            <Typography
                variant="h4"
                component="h2"
                sx={{ fontWeight: 700, mb: 1, textAlign: "center" }}
            >
                Book a Session
            </Typography>
            <Box
                sx={{
                    width: 60,
                    height: 4,
                    bgcolor: M3Colors.primary,
                    borderRadius: 2,
                    mb: 6,
                    mx: "auto",
                }}
            />
            <Grid container spacing={3} justifyContent="center">
                {APPOINTMENT_PRODUCTS.map((product) => (
                    <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card
                            elevation={0}
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                borderRadius: 3,
                                border: `1px solid ${M3Colors.surfaceHighest}`,
                                bgcolor: M3Colors.surface,
                                transition: "box-shadow 0.2s",
                                "&:hover": {
                                    boxShadow:
                                        "0 4px 20px rgba(21,101,192,0.1)",
                                },
                            }}
                        >
                            <CardContent sx={{ flex: 1, p: 3 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                        mb: 2,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {product.name}
                                    </Typography>
                                    {product.isFree && (
                                        <Chip
                                            label="Free"
                                            size="small"
                                            sx={{
                                                bgcolor: "#E8F5E9",
                                                color: "#2E7D32",
                                                fontWeight: 600,
                                            }}
                                        />
                                    )}
                                </Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: M3Colors.onSurfaceVariant,
                                        mb: 2,
                                        lineHeight: 1.7,
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
                                        color: M3Colors.onSurfaceVariant,
                                        mb: 1,
                                    }}
                                >
                                    <AccessTimeIcon sx={{ fontSize: 18 }} />
                                    <Typography variant="body2">
                                        {product.durationMinutes} min
                                    </Typography>
                                </Box>
                                {!product.isFree && (
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 700,
                                            color: M3Colors.primary,
                                            mt: 1,
                                        }}
                                    >
                                        {product.priceDisplay}
                                    </Typography>
                                )}
                            </CardContent>
                            <CardActions sx={{ p: 3, pt: 0 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    href={product.bookingUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        borderRadius: 2,
                                        py: 1.2,
                                        fontWeight: 600,
                                        textTransform: "none",
                                        fontSize: "0.95rem",
                                    }}
                                >
                                    Book Now
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </SectionContainer>
    );
}

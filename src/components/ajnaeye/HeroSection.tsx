import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { M3Colors } from "../colors";
import { BRAND, URLS } from "../../constants/ajnaeye";

export default function HeroSection() {
    return (
        <Box
            sx={{
                background: `linear-gradient(135deg, ${M3Colors.surface} 0%, ${M3Colors.surfaceHigh} 100%)`,
                py: { xs: 6, md: 10 },
                minHeight: { xs: "auto", md: "70vh" },
                display: "flex",
                alignItems: "center",
            }}
        >
            <Container maxWidth="md">
                <Box sx={{ textAlign: "center" }}>
                    <Typography
                        variant="h6"
                        sx={{
                            color: M3Colors.primary,
                            fontWeight: 600,
                            mb: 2,
                            letterSpacing: 1,
                        }}
                    >
                        {BRAND.name}
                    </Typography>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 700,
                            color: M3Colors.onSurface,
                            mb: 3,
                            fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                            lineHeight: 1.2,
                        }}
                    >
                        {BRAND.tagline}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: M3Colors.onSurfaceVariant,
                            mb: 5,
                            fontWeight: 400,
                            fontSize: { xs: "1rem", md: "1.25rem" },
                            maxWidth: 600,
                            mx: "auto",
                        }}
                    >
                        {BRAND.subheadline}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            href={URLS.bookAppointment}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                bgcolor: M3Colors.primary,
                                color: "#fff",
                                px: 4,
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
                            Book Appointment
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            href={URLS.call}
                            sx={{
                                borderColor: M3Colors.primary,
                                color: M3Colors.primary,
                                px: 4,
                                py: 1.5,
                                borderRadius: 3,
                                textTransform: "none",
                                fontSize: "1.1rem",
                                fontWeight: 600,
                                borderWidth: 2,
                                "&:hover": {
                                    borderWidth: 2,
                                    borderColor: M3Colors.secondary,
                                    bgcolor: `${M3Colors.primary}10`,
                                },
                            }}
                        >
                            Call Now
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import HeroSection from "../components/fitnglow/HeroSection";
import ImagesSection from "../components/fitnglow/ImagesSection";
import WhyUsSection from "../components/fitnglow/WhyUsSection";
import ServicesSection from "../components/fitnglow/ServicesSection";
import AppointmentSection from "../components/fitnglow/AppointmentSection";
import TestimonialsSection from "../components/fitnglow/TestimonialsSection";
import ContactSection from "../components/fitnglow/ContactSection";
import Footer from "../components/fitnglow/Footer";
import { fetchAllPageData } from "../api/fitnglow";
import type { PageData } from "../types/api";
import { M3Colors } from "../components/colors";

export default function Home() {
    const [data, setData] = useState<PageData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const pageData = await fetchAllPageData();
            setData(pageData);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                    bgcolor: M3Colors.surface,
                }}
            >
                <CircularProgress sx={{ color: M3Colors.primary }} />
            </Box>
        );
    }

    if (error || !data) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                    bgcolor: M3Colors.surface,
                    px: 3,
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        color: M3Colors.onSurface,
                        fontWeight: 600,
                        mb: 2,
                    }}
                >
                    Unable to load page
                </Typography>
                <Typography
                    sx={{
                        color: M3Colors.onSurfaceVariant,
                        mb: 4,
                        maxWidth: 400,
                    }}
                >
                    {error ?? "An unexpected error occurred."}
                </Typography>
                <Button
                    variant="contained"
                    onClick={loadData}
                    sx={{
                        bgcolor: M3Colors.primary,
                        color: "#fff",
                        px: 5,
                        py: 1.5,
                        fontSize: "1rem",
                        "&:hover": {
                            bgcolor: M3Colors.primaryDark,
                        },
                    }}
                >
                    Retry
                </Button>
            </Box>
        );
    }

    const firstImageGroup = data.linkInfo.info_group.images?.[0];
    const images = firstImageGroup?.images ?? [];

    return (
        <Box>
            <HeroSection />
            <ImagesSection images={images} />
            <WhyUsSection />
            <ServicesSection />
            <AppointmentSection products={data.products} />
            <TestimonialsSection testimonials={data.testimonials} />
            <ContactSection />
            <Footer />
        </Box>
    );
}

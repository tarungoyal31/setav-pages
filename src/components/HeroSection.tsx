import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { SITE_DATA } from "../data/siteData";
import { M3Colors } from "./colors";

export default function HeroSection() {
    return (
        <Box
            sx={{
                minHeight: { xs: "auto", md: "100vh" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `linear-gradient(135deg, ${M3Colors.primary} 0%, #0D47A1 100%)`,
                color: "#fff",
                py: { xs: 8, md: 0 },
                px: { xs: 2, md: 4 },
            }}
        >
            <Box
                sx={{
                    maxWidth: 1200,
                    mx: "auto",
                    width: "100%",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    gap: { xs: 4, md: 8 },
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        textAlign: { xs: "center", md: "left" },
                        order: { xs: 2, md: 1 },
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 400,
                            opacity: 0.9,
                            mb: 1,
                            letterSpacing: 1,
                        }}
                    >
                        {SITE_DATA.name}
                    </Typography>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                            lineHeight: 1.2,
                            mb: 2,
                        }}
                    >
                        {SITE_DATA.tagline}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 400,
                            opacity: 0.85,
                            mb: 4,
                            fontSize: { xs: "1rem", md: "1.15rem" },
                            lineHeight: 1.6,
                        }}
                    >
                        {SITE_DATA.subtitle}
                    </Typography>
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        justifyContent={{ xs: "center", md: "flex-start" }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<CalendarMonthIcon />}
                            href={SITE_DATA.urls.bookAppointment}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                bgcolor: "#fff",
                                color: M3Colors.primary,
                                fontWeight: 600,
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                "&:hover": {
                                    bgcolor: "rgba(255,255,255,0.9)",
                                },
                            }}
                        >
                            Book a Session
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            href="#contact"
                            sx={{
                                borderColor: "rgba(255,255,255,0.6)",
                                color: "#fff",
                                fontWeight: 600,
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                "&:hover": {
                                    borderColor: "#fff",
                                    bgcolor: "rgba(255,255,255,0.1)",
                                },
                            }}
                        >
                            Get in Touch
                        </Button>
                    </Stack>
                </Box>
                <Box
                    sx={{
                        order: { xs: 1, md: 2 },
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Avatar
                        src={SITE_DATA.profileImage}
                        alt={SITE_DATA.name}
                        sx={{
                            width: { xs: 160, md: 240 },
                            height: { xs: 160, md: 240 },
                            border: "4px solid rgba(255,255,255,0.3)",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                        }}
                    >
                        TG
                    </Avatar>
                </Box>
            </Box>
        </Box>
    );
}

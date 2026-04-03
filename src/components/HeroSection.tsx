import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { palette } from "./colors";
import { SITE_DATA } from "../data/siteData";
import { useScrollReveal } from "../hooks/useScrollReveal";

const CREDENTIAL_TAGS = [
    "IIT Roorkee",
    "Ex-Google",
    "Ex-Walmart",
    "Ex-Zomato",
    "ACM ICPC",
    "10+ Years",
];

export default function HeroSection() {
    const ref = useScrollReveal<HTMLDivElement>();

    return (
        <Box
            ref={ref}
            className="grain"
            sx={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: palette.dark,
                color: palette.textOnDark,
                overflow: "hidden",
                px: { xs: 2, md: 4 },
            }}
        >
            {/* Subtle radial glow behind profile */}
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: 400, md: 700 },
                    height: { xs: 400, md: 700 },
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${palette.accentGlow} 0%, transparent 70%)`,
                    filter: "blur(60px)",
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />

            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,
                    maxWidth: 1000,
                    mx: "auto",
                    textAlign: "center",
                    py: { xs: 14, md: 4 },
                pt: { xs: 16, md: 14 },
                }}
            >
                {/* Profile image */}
                <Box className="reveal" sx={{ mb: 4 }}>
                    <Box
                        component="img"
                        src={SITE_DATA.profileImage}
                        alt={SITE_DATA.name}
                        sx={{
                            width: { xs: 100, md: 120 },
                            height: { xs: 100, md: 120 },
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: `2px solid rgba(255,255,255,0.15)`,
                        }}
                    />
                </Box>

                {/* Name + Title */}
                <Typography
                    className="reveal reveal-delay-1"
                    sx={{
                        fontSize: { xs: "0.85rem", md: "0.95rem" },
                        fontWeight: 500,
                        color: palette.textOnDarkMuted,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        mb: 2,
                    }}
                >
                    {SITE_DATA.profession}
                </Typography>

                {/* Tagline - large display text */}
                <Typography
                    className="reveal reveal-delay-2"
                    variant="h1"
                    sx={{
                        fontSize: {
                            xs: "2.5rem",
                            sm: "3.5rem",
                            md: "4.5rem",
                            lg: "5.5rem",
                        },
                        maxWidth: 900,
                        mx: "auto",
                        mb: 3,
                    }}
                >
                    {SITE_DATA.tagline}
                </Typography>

                {/* Subtitle */}
                <Typography
                    className="reveal reveal-delay-3"
                    sx={{
                        fontSize: { xs: "1rem", md: "1.15rem" },
                        color: palette.textOnDarkMuted,
                        maxWidth: 600,
                        mx: "auto",
                        mb: 4,
                        lineHeight: 1.7,
                    }}
                >
                    Founder of Setav Innovations. Leveraging a decade of
                    experience at Google, Walmart & Zomato to build the future
                    of professional networking.
                </Typography>

                {/* Credential tags */}
                <Stack
                    className="reveal reveal-delay-3"
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    justifyContent="center"
                    useFlexGap
                    sx={{ mb: 5 }}
                >
                    {CREDENTIAL_TAGS.map((tag) => (
                        <Box
                            key={tag}
                            sx={{
                                px: 2,
                                py: 0.6,
                                borderRadius: 999,
                                border: "1px solid rgba(255,255,255,0.12)",
                                fontSize: "0.8rem",
                                fontWeight: 500,
                                color: "rgba(255,255,255,0.65)",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {tag}
                        </Box>
                    ))}
                </Stack>

                {/* CTAs */}
                <Stack
                    className="reveal reveal-delay-4"
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowOutwardIcon sx={{ fontSize: 18 }} />}
                        href={SITE_DATA.urls.bookAppointment}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            bgcolor: "#fff",
                            color: palette.dark,
                            px: 4,
                            py: 1.5,
                            fontSize: "0.95rem",
                            "&:hover": {
                                bgcolor: "rgba(255,255,255,0.9)",
                            },
                            boxShadow: "none",
                        }}
                    >
                        Book a Session
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        href="#contact"
                        sx={{
                            borderColor: "rgba(255,255,255,0.2)",
                            color: "#fff",
                            px: 4,
                            py: 1.5,
                            fontSize: "0.95rem",
                            "&:hover": {
                                borderColor: "rgba(255,255,255,0.5)",
                                bgcolor: "rgba(255,255,255,0.05)",
                            },
                        }}
                    >
                        Get in Touch
                    </Button>
                </Stack>
            </Box>

            {/* Bottom gradient fade */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 120,
                    background: `linear-gradient(to top, ${palette.white}, transparent)`,
                    pointerEvents: "none",
                    zIndex: 2,
                }}
            />
        </Box>
    );
}

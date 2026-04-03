import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { SITE_DATA } from "../data/siteData";
import { palette } from "./colors";
import { downloadVCard } from "../utils/vcard";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function ContactSection() {
    const ref = useScrollReveal<HTMLElement>();

    return (
        <Box
            ref={ref}
            id="contact"
            component="section"
            sx={{
                py: { xs: 10, md: 16 },
                px: { xs: 2, md: 4 },
                bgcolor: palette.white,
            }}
        >
            <Box sx={{ maxWidth: 800, mx: "auto", textAlign: "center" }}>
                <Typography
                    className="reveal"
                    sx={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: palette.accent,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        mb: 2,
                    }}
                >
                    Contact
                </Typography>

                <Typography
                    className="reveal reveal-delay-1"
                    variant="h2"
                    sx={{
                        fontSize: { xs: "2rem", sm: "2.5rem", md: "3.2rem" },
                        color: palette.text,
                        mb: 2,
                    }}
                >
                    Let's build something{" "}
                    <Box component="span" sx={{ color: palette.textMuted }}>
                        great together.
                    </Box>
                </Typography>

                <Typography
                    className="reveal reveal-delay-2"
                    sx={{
                        fontSize: { xs: "1rem", md: "1.05rem" },
                        color: palette.textMuted,
                        mb: 6,
                        maxWidth: 500,
                        mx: "auto",
                    }}
                >
                    Whether you need technical consulting, an architecture
                    review, or career guidance — I'm here to help.
                </Typography>

                <Stack
                    className="reveal reveal-delay-3"
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ mb: 5 }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowOutwardIcon sx={{ fontSize: 16 }} />}
                        href={SITE_DATA.urls.bookAppointment}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            bgcolor: palette.accent,
                            color: "#fff",
                            px: 4,
                            py: 1.5,
                            fontSize: "0.95rem",
                            "&:hover": {
                                bgcolor: palette.accentHover,
                            },
                            boxShadow: "none",
                            minWidth: 200,
                        }}
                    >
                        Book a Session
                    </Button>
                </Stack>

                {/* Contact pills */}
                <Stack
                    className="reveal reveal-delay-4"
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.5}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        startIcon={<PhoneIcon sx={{ fontSize: 18 }} />}
                        href={`tel:${SITE_DATA.phone}`}
                        sx={{
                            color: palette.textMuted,
                            fontSize: "0.9rem",
                            fontWeight: 500,
                            px: 2.5,
                            py: 1,
                            borderRadius: 999,
                            border: `1px solid ${palette.borderLight}`,
                            "&:hover": {
                                borderColor: palette.text,
                                color: palette.text,
                            },
                            transition: "all 0.3s",
                        }}
                    >
                        {SITE_DATA.phoneDisplay}
                    </Button>
                    <Button
                        startIcon={<EmailIcon sx={{ fontSize: 18 }} />}
                        href={`mailto:${SITE_DATA.email}`}
                        sx={{
                            color: palette.textMuted,
                            fontSize: "0.9rem",
                            fontWeight: 500,
                            px: 2.5,
                            py: 1,
                            borderRadius: 999,
                            border: `1px solid ${palette.borderLight}`,
                            "&:hover": {
                                borderColor: palette.text,
                                color: palette.text,
                            },
                            transition: "all 0.3s",
                        }}
                    >
                        {SITE_DATA.email}
                    </Button>
                    <Button
                        startIcon={<ContactPageIcon sx={{ fontSize: 18 }} />}
                        onClick={downloadVCard}
                        sx={{
                            color: palette.textMuted,
                            fontSize: "0.9rem",
                            fontWeight: 500,
                            px: 2.5,
                            py: 1,
                            borderRadius: 999,
                            border: `1px solid ${palette.borderLight}`,
                            "&:hover": {
                                borderColor: palette.text,
                                color: palette.text,
                            },
                            transition: "all 0.3s",
                        }}
                    >
                        Save Contact
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}

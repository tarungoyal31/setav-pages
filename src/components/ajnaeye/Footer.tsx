import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import { M3Colors } from "../colors";
import { BRAND, URLS, VCARD_DATA } from "../../constants/ajnaeye";
import { downloadVCard } from "../../utils/vcard";

export default function Footer() {
    const handleSaveContact = () => {
        downloadVCard(VCARD_DATA, "shreya-suman-ajnaeye");
    };

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: M3Colors.onSurface,
                color: M3Colors.surface,
                py: { xs: 5, md: 6 },
            }}
        >
            <Container maxWidth="md">
                <Typography
                    variant="h5"
                    sx={{
                        textAlign: "center",
                        fontWeight: 700,
                        mb: 1,
                    }}
                >
                    {BRAND.name}
                </Typography>
                <Typography
                    sx={{
                        textAlign: "center",
                        opacity: 0.8,
                        mb: 4,
                    }}
                >
                    by {BRAND.owner}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                        flexWrap: "wrap",
                        mb: 4,
                    }}
                >
                    <Button
                        variant="outlined"
                        startIcon={<Icon>contact_phone</Icon>}
                        onClick={handleSaveContact}
                        sx={{
                            borderColor: M3Colors.surface,
                            color: M3Colors.surface,
                            textTransform: "none",
                            borderRadius: 2,
                            "&:hover": {
                                borderColor: M3Colors.surfaceHigh,
                                bgcolor: "rgba(255,255,255,0.1)",
                            },
                        }}
                    >
                        Save Contact
                    </Button>
                    <Button
                        variant="outlined"
                        component="a"
                        href={URLS.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            borderColor: M3Colors.surface,
                            color: M3Colors.surface,
                            textTransform: "none",
                            borderRadius: 2,
                            "&:hover": {
                                borderColor: M3Colors.surfaceHigh,
                                bgcolor: "rgba(255,255,255,0.1)",
                            },
                        }}
                    >
                        Follow on Instagram
                    </Button>
                    <Button
                        variant="outlined"
                        component="a"
                        href={URLS.setavLogin}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            borderColor: M3Colors.surface,
                            color: M3Colors.surface,
                            textTransform: "none",
                            borderRadius: 2,
                            "&:hover": {
                                borderColor: M3Colors.surfaceHigh,
                                bgcolor: "rgba(255,255,255,0.1)",
                            },
                        }}
                    >
                        Login to Setav
                    </Button>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 3,
                        mb: 4,
                    }}
                >
                    <Box
                        component="a"
                        href={URLS.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            display: "block",
                            transition: "transform 0.2s",
                            "&:hover": {
                                transform: "scale(1.05)",
                            },
                        }}
                    >
                        <Box
                            component="img"
                            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                            alt="Download on the App Store"
                            sx={{ height: 40 }}
                        />
                    </Box>
                    <Box
                        component="a"
                        href={URLS.playStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            display: "block",
                            transition: "transform 0.2s",
                            "&:hover": {
                                transform: "scale(1.05)",
                            },
                        }}
                    >
                        <Box
                            component="img"
                            src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                            alt="Get it on Google Play"
                            sx={{ height: 60, mt: -1.25 }}
                        />
                    </Box>
                </Box>

                <Typography
                    sx={{
                        textAlign: "center",
                        opacity: 0.6,
                        fontSize: "0.875rem",
                    }}
                >
                    &copy; {new Date().getFullYear()} {BRAND.name}. Powered by{" "}
                    <Box
                        component="a"
                        href={URLS.setavLogin}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            color: "inherit",
                            textDecoration: "underline",
                            "&:hover": {
                                opacity: 1,
                            },
                        }}
                    >
                        Setav
                    </Box>
                </Typography>
            </Container>
        </Box>
    );
}

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import { M3Colors } from "../colors";
import { BRAND, URLS, VCARD_DATA } from "../../constants/fitnglow";
import { downloadVCard } from "../../utils/vcard";

export default function Footer() {
    const handleSaveContact = () => {
        downloadVCard(VCARD_DATA, "shreya-suman-fitnglow");
    };

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: M3Colors.darkSurface,
                color: "#fff",
                pt: { xs: 6, md: 8 },
                pb: { xs: 3, md: 4 },
            }}
        >
            <Container maxWidth="md">
                {/* Brand */}
                <Box sx={{ textAlign: "center", mb: 5 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            mb: 0.5,
                            letterSpacing: -0.5,
                        }}
                    >
                        {BRAND.name}
                    </Typography>
                    <Typography
                        sx={{
                            opacity: 0.5,
                            fontSize: "0.95rem",
                        }}
                    >
                        by {BRAND.owner}
                    </Typography>
                </Box>

                {/* Action buttons */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                        flexWrap: "wrap",
                        mb: 5,
                    }}
                >
                    <Button
                        variant="outlined"
                        startIcon={<Icon>contact_phone</Icon>}
                        onClick={handleSaveContact}
                        sx={{
                            borderColor: "rgba(255,255,255,0.2)",
                            color: "#fff",
                            px: 3,
                            "&:hover": {
                                borderColor: "rgba(255,255,255,0.4)",
                                bgcolor: "rgba(255,255,255,0.06)",
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
                        startIcon={<Icon>photo_camera</Icon>}
                        sx={{
                            borderColor: "rgba(255,255,255,0.2)",
                            color: "#fff",
                            px: 3,
                            "&:hover": {
                                borderColor: "rgba(255,255,255,0.4)",
                                bgcolor: "rgba(255,255,255,0.06)",
                            },
                        }}
                    >
                        Instagram
                    </Button>
                    <Button
                        variant="outlined"
                        component="a"
                        href={URLS.setavLogin}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<Icon>login</Icon>}
                        sx={{
                            borderColor: "rgba(255,255,255,0.2)",
                            color: "#fff",
                            px: 3,
                            "&:hover": {
                                borderColor: "rgba(255,255,255,0.4)",
                                bgcolor: "rgba(255,255,255,0.06)",
                            },
                        }}
                    >
                        Login to Setav
                    </Button>
                </Box>

                {/* App store badges */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 3,
                        mb: 5,
                    }}
                >
                    <Box
                        component="a"
                        href={URLS.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            display: "block",
                            transition: "all 0.3s ease",
                            opacity: 0.8,
                            "&:hover": {
                                opacity: 1,
                                transform: "translateY(-2px)",
                            },
                        }}
                    >
                        <Box
                            component="img"
                            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                            alt="Download on the App Store"
                            sx={{ height: 42 }}
                        />
                    </Box>
                    <Box
                        component="a"
                        href={URLS.playStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            display: "block",
                            transition: "all 0.3s ease",
                            opacity: 0.8,
                            "&:hover": {
                                opacity: 1,
                                transform: "translateY(-2px)",
                            },
                        }}
                    >
                        <Box
                            component="img"
                            src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                            alt="Get it on Google Play"
                            sx={{ height: 62, mt: -1.25 }}
                        />
                    </Box>
                </Box>

                {/* Divider */}
                <Box
                    sx={{
                        height: 1,
                        bgcolor: "rgba(255,255,255,0.08)",
                        mb: 3,
                    }}
                />

                {/* Copyright */}
                <Typography
                    sx={{
                        textAlign: "center",
                        opacity: 0.4,
                        fontSize: "0.85rem",
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

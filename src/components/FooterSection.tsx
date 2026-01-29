import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AppleIcon from "@mui/icons-material/Apple";
import ShopIcon from "@mui/icons-material/Shop";
import { SITE_DATA } from "../data/siteData";
import { M3Colors } from "./colors";

export default function FooterSection() {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: M3Colors.onSurface,
                color: "#fff",
                py: 5,
                px: { xs: 2, md: 4 },
            }}
        >
            <Box sx={{ maxWidth: 1200, mx: "auto" }}>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={3}
                >
                    <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, mb: 0.5 }}
                        >
                            {SITE_DATA.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ opacity: 0.7 }}
                        >
                            {SITE_DATA.profession}
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton
                            href={SITE_DATA.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ color: "#fff" }}
                            aria-label="LinkedIn"
                        >
                            <LinkedInIcon />
                        </IconButton>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >
                        <Typography
                            variant="body2"
                            sx={{ opacity: 0.7, mr: 1 }}
                        >
                            Download Setav
                        </Typography>
                        <Link
                            href={SITE_DATA.urls.appStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                                color: "#fff",
                                opacity: 0.8,
                                "&:hover": { opacity: 1 },
                                fontSize: "0.85rem",
                            }}
                        >
                            <AppleIcon sx={{ fontSize: 20 }} />
                            App Store
                        </Link>
                        <Link
                            href={SITE_DATA.urls.playStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                                color: "#fff",
                                opacity: 0.8,
                                "&:hover": { opacity: 1 },
                                fontSize: "0.85rem",
                            }}
                        >
                            <ShopIcon sx={{ fontSize: 20 }} />
                            Play Store
                        </Link>
                    </Stack>
                </Stack>

                <Typography
                    variant="body2"
                    sx={{
                        textAlign: "center",
                        opacity: 0.5,
                        mt: 4,
                        pt: 3,
                        borderTop: "1px solid rgba(255,255,255,0.1)",
                    }}
                >
                    Powered by{" "}
                    <Link
                        href={SITE_DATA.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: "#fff", opacity: 0.8 }}
                    >
                        Setav
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}

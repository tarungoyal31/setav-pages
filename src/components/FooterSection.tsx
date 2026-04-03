import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AppleIcon from "@mui/icons-material/Apple";
import ShopIcon from "@mui/icons-material/Shop";
import { SITE_DATA } from "../data/siteData";
import { palette } from "./colors";

export default function FooterSection() {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: palette.light,
                py: { xs: 5, md: 6 },
                px: { xs: 2, md: 4 },
                borderTop: `1px solid ${palette.borderLight}`,
            }}
        >
            <Box sx={{ maxWidth: 1200, mx: "auto" }}>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "center", md: "flex-start" }}
                    spacing={4}
                >
                    {/* Left — Brand */}
                    <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: "1.05rem",
                                color: palette.text,
                                mb: 0.5,
                            }}
                        >
                            {SITE_DATA.name}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "0.85rem",
                                color: palette.textMuted,
                            }}
                        >
                            {SITE_DATA.profession}
                        </Typography>
                    </Box>

                    {/* Center — Social + download */}
                    <Stack
                        direction="row"
                        spacing={3}
                        alignItems="center"
                    >
                        <IconButton
                            href={SITE_DATA.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            sx={{
                                color: palette.textMuted,
                                border: `1px solid ${palette.borderLight}`,
                                width: 40,
                                height: 40,
                                "&:hover": {
                                    color: palette.text,
                                    borderColor: palette.text,
                                },
                                transition: "all 0.3s",
                            }}
                        >
                            <LinkedInIcon sx={{ fontSize: 20 }} />
                        </IconButton>

                        <Link
                            href={SITE_DATA.urls.appStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                                color: palette.textMuted,
                                fontSize: "0.82rem",
                                fontWeight: 500,
                                "&:hover": { color: palette.text },
                                transition: "color 0.3s",
                            }}
                        >
                            <AppleIcon sx={{ fontSize: 18 }} />
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
                                color: palette.textMuted,
                                fontSize: "0.82rem",
                                fontWeight: 500,
                                "&:hover": { color: palette.text },
                                transition: "color 0.3s",
                            }}
                        >
                            <ShopIcon sx={{ fontSize: 18 }} />
                            Play Store
                        </Link>
                    </Stack>
                </Stack>

                {/* Bottom */}
                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: "0.78rem",
                        color: palette.textMuted,
                        mt: 5,
                        pt: 3,
                        borderTop: `1px solid ${palette.borderLight}`,
                    }}
                >
                    Powered by{" "}
                    <Link
                        href={SITE_DATA.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            color: palette.accent,
                            fontWeight: 500,
                            "&:hover": { textDecoration: "underline" },
                        }}
                    >
                        Setav
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}

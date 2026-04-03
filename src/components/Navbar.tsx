import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { palette } from "./colors";
import { SITE_DATA } from "../data/siteData";

const NAV_LINKS = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <Box
                component="nav"
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1100,
                    px: { xs: 2, md: 4 },
                    py: 1.5,
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                <Box
                    sx={{
                        maxWidth: 1200,
                        mx: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        px: { xs: 2, md: 3 },
                        py: 1.2,
                        borderRadius: 999,
                        bgcolor: scrolled
                            ? "rgba(255,255,255,0.85)"
                            : "rgba(255,255,255,0.05)",
                        backdropFilter: "blur(20px)",
                        border: scrolled
                            ? `1px solid ${palette.borderLight}`
                            : "1px solid rgba(255,255,255,0.1)",
                        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 700,
                            fontSize: "1.05rem",
                            color: scrolled ? palette.text : palette.textOnDark,
                            transition: "color 0.4s",
                        }}
                    >
                        {SITE_DATA.name}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ display: { xs: "none", md: "flex" } }}
                    >
                        {NAV_LINKS.map((link) => (
                            <Button
                                key={link.label}
                                href={link.href}
                                sx={{
                                    color: scrolled
                                        ? palette.textMuted
                                        : "rgba(255,255,255,0.7)",
                                    fontSize: "0.875rem",
                                    fontWeight: 500,
                                    px: 2,
                                    "&:hover": {
                                        color: scrolled
                                            ? palette.text
                                            : "#fff",
                                        bgcolor: "transparent",
                                    },
                                    transition: "color 0.3s",
                                }}
                            >
                                {link.label}
                            </Button>
                        ))}
                        <Button
                            variant="contained"
                            href={SITE_DATA.urls.bookAppointment}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                ml: 1,
                                px: 3,
                                py: 0.8,
                                fontSize: "0.875rem",
                                bgcolor: scrolled ? palette.accent : "#fff",
                                color: scrolled ? "#fff" : palette.dark,
                                "&:hover": {
                                    bgcolor: scrolled
                                        ? palette.accentHover
                                        : "rgba(255,255,255,0.9)",
                                },
                                boxShadow: "none",
                                transition: "all 0.3s",
                            }}
                        >
                            Book Session
                        </Button>
                    </Stack>

                    <IconButton
                        onClick={() => setDrawerOpen(true)}
                        sx={{
                            display: { xs: "flex", md: "none" },
                            color: scrolled ? palette.text : palette.textOnDark,
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Box>

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: {
                        width: 280,
                        bgcolor: palette.white,
                        pt: 2,
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        px: 2,
                        mb: 2,
                    }}
                >
                    <IconButton onClick={() => setDrawerOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <List>
                    {NAV_LINKS.map((link) => (
                        <ListItemButton
                            key={link.label}
                            component="a"
                            href={link.href}
                            onClick={() => setDrawerOpen(false)}
                            sx={{ px: 3, py: 1.5 }}
                        >
                            <ListItemText
                                primary={link.label}
                                primaryTypographyProps={{
                                    fontWeight: 500,
                                    fontSize: "1rem",
                                }}
                            />
                        </ListItemButton>
                    ))}
                </List>
                <Box sx={{ px: 3, mt: 2 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        href={SITE_DATA.urls.bookAppointment}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            py: 1.3,
                            fontSize: "0.95rem",
                            bgcolor: palette.accent,
                            "&:hover": { bgcolor: palette.accentHover },
                            boxShadow: "none",
                        }}
                    >
                        Book Session
                    </Button>
                </Box>
            </Drawer>
        </>
    );
}

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import { M3Colors } from "../colors";
import { CONTACT, URLS } from "../../constants/ajnaeye";

export default function ContactSection() {
    return (
        <Box
            sx={{
                bgcolor: M3Colors.surface,
                py: { xs: 6, md: 8 },
            }}
        >
            <Container maxWidth="sm">
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        textAlign: "center",
                        fontWeight: 700,
                        color: M3Colors.onSurface,
                        mb: 5,
                    }}
                >
                    Get in Touch
                </Typography>

                <Box sx={{ mb: 4 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 2.5,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: M3Colors.surfaceHigh,
                        }}
                    >
                        <Icon sx={{ color: M3Colors.primary, fontSize: 28 }}>phone</Icon>
                        <Box>
                            <Typography
                                variant="body2"
                                sx={{ color: M3Colors.onSurfaceVariant }}
                            >
                                Phone
                            </Typography>
                            <Typography
                                component="a"
                                href={URLS.call}
                                sx={{
                                    color: M3Colors.onSurface,
                                    fontWeight: 600,
                                    fontSize: "1.1rem",
                                    textDecoration: "none",
                                    "&:hover": {
                                        color: M3Colors.primary,
                                    },
                                }}
                            >
                                {CONTACT.phoneFormatted}
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 2.5,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: M3Colors.surfaceHigh,
                        }}
                    >
                        <Icon sx={{ color: M3Colors.primary, fontSize: 28 }}>email</Icon>
                        <Box>
                            <Typography
                                variant="body2"
                                sx={{ color: M3Colors.onSurfaceVariant }}
                            >
                                Email
                            </Typography>
                            <Typography
                                component="a"
                                href={URLS.email}
                                sx={{
                                    color: M3Colors.onSurface,
                                    fontWeight: 600,
                                    fontSize: "1.1rem",
                                    textDecoration: "none",
                                    "&:hover": {
                                        color: M3Colors.primary,
                                    },
                                }}
                            >
                                {CONTACT.email}
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 2.5,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: M3Colors.surfaceHigh,
                        }}
                    >
                        <Icon sx={{ color: M3Colors.primary, fontSize: 28 }}>language</Icon>
                        <Box>
                            <Typography
                                variant="body2"
                                sx={{ color: M3Colors.onSurfaceVariant }}
                            >
                                Website
                            </Typography>
                            <Typography
                                component="a"
                                href={URLS.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    color: M3Colors.onSurface,
                                    fontWeight: 600,
                                    fontSize: "1.1rem",
                                    textDecoration: "none",
                                    "&:hover": {
                                        color: M3Colors.primary,
                                    },
                                }}
                            >
                                www.ajnaeye.com
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        component="a"
                        href={URLS.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: M3Colors.surfaceHigh,
                            textDecoration: "none",
                            transition: "all 0.2s",
                            "&:hover": {
                                bgcolor: M3Colors.surfaceHighest,
                            },
                        }}
                    >
                        <Box
                            component="img"
                            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                            alt="Instagram"
                            sx={{ width: 28, height: 28 }}
                        />
                        <Box>
                            <Typography
                                variant="body2"
                                sx={{ color: M3Colors.onSurfaceVariant }}
                            >
                                Instagram
                            </Typography>
                            <Typography
                                sx={{
                                    color: M3Colors.onSurface,
                                    fontWeight: 600,
                                    fontSize: "1.1rem",
                                }}
                            >
                                @{CONTACT.instagram}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        flexWrap: "wrap",
                    }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        href={URLS.call}
                        startIcon={<Icon>phone</Icon>}
                        sx={{
                            flex: 1,
                            minWidth: 140,
                            bgcolor: M3Colors.primary,
                            color: "#fff",
                            py: 1.5,
                            borderRadius: 3,
                            textTransform: "none",
                            fontSize: "1rem",
                            fontWeight: 600,
                            "&:hover": {
                                bgcolor: M3Colors.secondary,
                            },
                        }}
                    >
                        Call Now
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        href={URLS.email}
                        startIcon={<Icon>email</Icon>}
                        sx={{
                            flex: 1,
                            minWidth: 140,
                            borderColor: M3Colors.primary,
                            color: M3Colors.primary,
                            py: 1.5,
                            borderRadius: 3,
                            textTransform: "none",
                            fontSize: "1rem",
                            fontWeight: 600,
                            borderWidth: 2,
                            "&:hover": {
                                borderWidth: 2,
                                borderColor: M3Colors.secondary,
                                bgcolor: `${M3Colors.primary}10`,
                            },
                        }}
                    >
                        Send Email
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

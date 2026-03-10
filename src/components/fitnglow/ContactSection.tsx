import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import { M3Colors } from "../colors";
import { CONTACT, URLS } from "../../constants/fitnglow";

export default function ContactSection() {
    const contactItems = [
        {
            icon: "phone",
            label: "Phone",
            value: CONTACT.phoneFormatted,
            href: URLS.call,
            color: M3Colors.primary,
        },
        {
            icon: "email",
            label: "Email",
            value: CONTACT.email,
            href: URLS.email,
            color: M3Colors.accent,
        },
        {
            icon: "photo_camera",
            label: "Instagram",
            value: `@${CONTACT.instagram}`,
            href: URLS.instagram,
            color: "#E1306C",
            external: true,
        },
    ];

    return (
        <Box
            sx={{
                bgcolor: M3Colors.surface,
                py: { xs: 8, md: 12 },
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: { xs: 5, md: 8 },
                        alignItems: "center",
                    }}
                >
                    {/* Left: Text and CTA */}
                    <Box>
                        <Typography
                            sx={{
                                color: M3Colors.accent,
                                fontWeight: 600,
                                fontSize: "0.9rem",
                                letterSpacing: 2,
                                textTransform: "uppercase",
                                mb: 1.5,
                            }}
                        >
                            Contact Us
                        </Typography>
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                fontWeight: 700,
                                color: M3Colors.onSurface,
                                fontSize: { xs: "1.8rem", md: "2.4rem" },
                                lineHeight: 1.2,
                                mb: 2,
                            }}
                        >
                            Ready to Start Your{" "}
                            <Box component="span" sx={{ color: M3Colors.primary, fontStyle: "italic" }}>
                                Journey?
                            </Box>
                        </Typography>
                        <Typography
                            sx={{
                                color: M3Colors.onSurfaceVariant,
                                lineHeight: 1.7,
                                mb: 4,
                                maxWidth: 420,
                            }}
                        >
                            Reach out today and take the first step towards a healthier, happier you.
                            We&apos;d love to hear from you.
                        </Typography>

                        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                            <Button
                                variant="contained"
                                size="large"
                                href={URLS.call}
                                startIcon={<Icon>phone</Icon>}
                                sx={{
                                    bgcolor: M3Colors.primary,
                                    color: "#fff",
                                    px: 4,
                                    py: 1.5,
                                    boxShadow: `0 8px 30px ${M3Colors.primary}30`,
                                    "&:hover": {
                                        bgcolor: M3Colors.primaryDark,
                                        transform: "translateY(-2px)",
                                    },
                                    transition: "all 0.3s ease",
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
                                    borderColor: M3Colors.onSurfaceLight,
                                    color: M3Colors.onSurface,
                                    px: 4,
                                    py: 1.5,
                                    borderWidth: 1.5,
                                    "&:hover": {
                                        borderColor: M3Colors.primary,
                                        bgcolor: `${M3Colors.primary}08`,
                                        borderWidth: 1.5,
                                    },
                                    transition: "all 0.3s ease",
                                }}
                            >
                                Send Email
                            </Button>
                        </Box>
                    </Box>

                    {/* Right: Contact cards */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {contactItems.map((item) => (
                            <Box
                                key={item.label}
                                component="a"
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noopener noreferrer" : undefined}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 3,
                                    p: 3,
                                    borderRadius: 4,
                                    bgcolor: "#fff",
                                    border: "1px solid #E8E4DC",
                                    textDecoration: "none",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        borderColor: item.color,
                                        boxShadow: `0 10px 40px ${item.color}12`,
                                        transform: "translateX(4px)",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 52,
                                        height: 52,
                                        borderRadius: 3,
                                        bgcolor: `${item.color}12`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Icon sx={{ color: item.color, fontSize: 26 }}>
                                        {item.icon}
                                    </Icon>
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            color: M3Colors.onSurfaceLight,
                                            fontSize: "0.8rem",
                                            fontWeight: 500,
                                            mb: 0.3,
                                        }}
                                    >
                                        {item.label}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: M3Colors.onSurface,
                                            fontWeight: 600,
                                            fontSize: "1.05rem",
                                        }}
                                    >
                                        {item.value}
                                    </Typography>
                                </Box>
                                <Icon
                                    sx={{
                                        ml: "auto",
                                        color: M3Colors.onSurfaceLight,
                                        fontSize: 20,
                                    }}
                                >
                                    arrow_forward
                                </Icon>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

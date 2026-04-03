import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { SITE_DATA } from "../data/siteData";
import { palette } from "./colors";
import { useScrollReveal } from "../hooks/useScrollReveal";

const ICONS = ["01", "02", "03", "04"];

export default function WhyUsSection() {
    const ref = useScrollReveal<HTMLElement>();

    return (
        <Box
            ref={ref}
            component="section"
            sx={{
                py: { xs: 10, md: 16 },
                px: { xs: 2, md: 4 },
                bgcolor: palette.light,
            }}
        >
            <Box sx={{ maxWidth: 1200, mx: "auto" }}>
                <Box className="reveal" sx={{ textAlign: "center", mb: 8 }}>
                    <Typography
                        sx={{
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: palette.accent,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            mb: 2,
                        }}
                    >
                        Why Work With Me
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: "2rem", md: "2.8rem" },
                            color: palette.text,
                            maxWidth: 600,
                            mx: "auto",
                        }}
                    >
                        Built different,{" "}
                        <Box
                            component="span"
                            sx={{ color: palette.textMuted }}
                        >
                            proven track record.
                        </Box>
                    </Typography>
                </Box>

                <Grid container spacing={2.5}>
                    {SITE_DATA.whyUs.map((item, index) => (
                        <Grid
                            key={index}
                            size={{ xs: 12, sm: 6 }}
                        >
                            <Box
                                className={`reveal reveal-delay-${index + 1}`}
                                sx={{
                                    p: { xs: 3, md: 4 },
                                    borderRadius: 3,
                                    bgcolor: palette.white,
                                    border: `1px solid ${palette.borderLight}`,
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    transition:
                                        "border-color 0.3s, transform 0.3s",
                                    "&:hover": {
                                        borderColor: palette.borderLight,
                                        transform: "translateY(-2px)",
                                    },
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                        color: palette.accent,
                                        fontVariantNumeric: "tabular-nums",
                                        mb: 2,
                                    }}
                                >
                                    {ICONS[index]}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: "1.1rem",
                                        fontWeight: 600,
                                        color: palette.text,
                                        mb: 1,
                                    }}
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "0.9rem",
                                        color: palette.textMuted,
                                        lineHeight: 1.7,
                                    }}
                                >
                                    {item.description}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

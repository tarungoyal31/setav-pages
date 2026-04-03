import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { palette } from "./colors";
import { useScrollReveal } from "../hooks/useScrollReveal";

const STATS = [
    { value: "10+", label: "Years Experience" },
    { value: "3+", label: "Top Tech Companies" },
    { value: "IIT", label: "Roorkee Alumnus" },
    { value: "ACM", label: "ICPC Finalist" },
];

export default function AboutSection() {
    const ref = useScrollReveal<HTMLElement>();

    return (
        <Box
            ref={ref}
            id="about"
            component="section"
            sx={{
                py: { xs: 10, md: 16 },
                px: { xs: 2, md: 4 },
                bgcolor: palette.white,
            }}
        >
            <Box sx={{ maxWidth: 1200, mx: "auto" }}>
                <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
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
                            About
                        </Typography>
                        <Typography
                            className="reveal reveal-delay-1"
                            variant="h2"
                            sx={{
                                fontSize: {
                                    xs: "2rem",
                                    md: "2.8rem",
                                },
                                mb: 3,
                                color: palette.text,
                            }}
                        >
                            Engineering excellence,{" "}
                            <Box
                                component="span"
                                sx={{ color: palette.textMuted }}
                            >
                                from code to company.
                            </Box>
                        </Typography>
                        <Typography
                            className="reveal reveal-delay-2"
                            sx={{
                                fontSize: { xs: "1rem", md: "1.05rem" },
                                color: palette.textMuted,
                                mb: 2,
                            }}
                        >
                            Tarun Goyal is the founder of Setav Innovations Pvt.
                            Ltd., building the next generation of professional
                            networking tools powered by AI. With B.Tech and
                            M.Tech degrees from IIT Roorkee, he represented
                            India at the ACM ICPC World Finals.
                        </Typography>
                        <Typography
                            className="reveal reveal-delay-3"
                            sx={{
                                fontSize: { xs: "1rem", md: "1.05rem" },
                                color: palette.textMuted,
                                mb: 2,
                            }}
                        >
                            Over the past decade, Tarun has built scalable
                            systems at Google, Walmart, and Zomato — leading
                            high-impact projects from architecture to delivery.
                            Today, he channels that expertise into Setav,
                            helping professionals and businesses connect, grow,
                            and thrive.
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Grid container spacing={2}>
                            {STATS.map((stat, i) => (
                                <Grid
                                    key={stat.label}
                                    size={{ xs: 6 }}
                                >
                                    <Box
                                        className={`reveal reveal-delay-${i + 1}`}
                                        sx={{
                                            p: { xs: 3, md: 4 },
                                            borderRadius: 3,
                                            border: `1px solid ${palette.borderLight}`,
                                            textAlign: "center",
                                            transition:
                                                "border-color 0.3s, box-shadow 0.3s",
                                            "&:hover": {
                                                borderColor: palette.accent,
                                                boxShadow: `0 0 0 1px ${palette.accent}`,
                                            },
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: {
                                                    xs: "2rem",
                                                    md: "2.5rem",
                                                },
                                                fontWeight: 800,
                                                letterSpacing: "-0.03em",
                                                color: palette.text,
                                                lineHeight: 1,
                                                mb: 1,
                                            }}
                                        >
                                            {stat.value}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: "0.8rem",
                                                fontWeight: 500,
                                                color: palette.textMuted,
                                                letterSpacing: "0.02em",
                                            }}
                                        >
                                            {stat.label}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

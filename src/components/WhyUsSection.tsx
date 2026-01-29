import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import SchoolIcon from "@mui/icons-material/School";
import CodeIcon from "@mui/icons-material/Code";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { SITE_DATA } from "../data/siteData";
import { M3Colors } from "./colors";
import SectionContainer from "./SectionContainer";

const icons = [
    <WorkHistoryIcon key="work" sx={{ fontSize: 40 }} />,
    <SchoolIcon key="school" sx={{ fontSize: 40 }} />,
    <CodeIcon key="code" sx={{ fontSize: 40 }} />,
    <LightbulbIcon key="bulb" sx={{ fontSize: 40 }} />,
];

export default function WhyUsSection() {
    return (
        <SectionContainer backgroundColor={M3Colors.surfaceHigh}>
            <Typography
                variant="h4"
                component="h2"
                sx={{ fontWeight: 700, mb: 1, textAlign: "center" }}
            >
                Why Work With Me
            </Typography>
            <Box
                sx={{
                    width: 60,
                    height: 4,
                    bgcolor: M3Colors.primary,
                    borderRadius: 2,
                    mb: 6,
                    mx: "auto",
                }}
            />
            <Grid container spacing={3}>
                {SITE_DATA.whyUs.map((item, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                height: "100%",
                                borderRadius: 3,
                                bgcolor: M3Colors.surface,
                                border: `1px solid ${M3Colors.surfaceHighest}`,
                                transition: "box-shadow 0.2s",
                                "&:hover": {
                                    boxShadow:
                                        "0 4px 20px rgba(21,101,192,0.1)",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    color: M3Colors.primary,
                                    mb: 2,
                                }}
                            >
                                {icons[index]}
                            </Box>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 600, mb: 1 }}
                            >
                                {item.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: M3Colors.onSurfaceVariant,
                                    lineHeight: 1.7,
                                }}
                            >
                                {item.description}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </SectionContainer>
    );
}

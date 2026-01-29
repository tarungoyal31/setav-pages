import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SITE_DATA } from "../data/siteData";
import { M3Colors } from "./colors";
import SectionContainer from "./SectionContainer";

export default function AboutSection() {
    return (
        <SectionContainer backgroundColor={M3Colors.surface}>
            <Box sx={{ maxWidth: 800 }}>
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{ fontWeight: 700, mb: 1 }}
                >
                    {SITE_DATA.about.title}
                </Typography>
                <Box
                    sx={{
                        width: 60,
                        height: 4,
                        bgcolor: M3Colors.primary,
                        borderRadius: 2,
                        mb: 4,
                    }}
                />
                {SITE_DATA.about.paragraphs.map((paragraph, index) => (
                    <Typography
                        key={index}
                        variant="body1"
                        sx={{
                            mb: 2,
                            lineHeight: 1.8,
                            color: M3Colors.onSurfaceVariant,
                            fontSize: "1.05rem",
                        }}
                    >
                        {paragraph}
                    </Typography>
                ))}
            </Box>
        </SectionContainer>
    );
}

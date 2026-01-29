import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import EngineeringIcon from "@mui/icons-material/Engineering";
import QuizIcon from "@mui/icons-material/Quiz";
import GroupsIcon from "@mui/icons-material/Groups";
import { SITE_DATA } from "../data/siteData";
import { M3Colors } from "./colors";
import SectionContainer from "./SectionContainer";

const icons = [
    <ArchitectureIcon key="arch" sx={{ fontSize: 36 }} />,
    <EngineeringIcon key="eng" sx={{ fontSize: 36 }} />,
    <QuizIcon key="quiz" sx={{ fontSize: 36 }} />,
    <GroupsIcon key="groups" sx={{ fontSize: 36 }} />,
];

export default function ServicesSection() {
    return (
        <SectionContainer backgroundColor={M3Colors.surface}>
            <Typography
                variant="h4"
                component="h2"
                sx={{ fontWeight: 700, mb: 1, textAlign: "center" }}
            >
                Services Offered
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
                {SITE_DATA.services.map((service, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                        <Box
                            sx={{
                                textAlign: "center",
                                p: 3,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 72,
                                    height: 72,
                                    borderRadius: "50%",
                                    bgcolor: `${M3Colors.primary}14`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mx: "auto",
                                    mb: 2,
                                    color: M3Colors.primary,
                                }}
                            >
                                {icons[index]}
                            </Box>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 600, mb: 1, fontSize: "1.1rem" }}
                            >
                                {service.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: M3Colors.onSurfaceVariant,
                                    lineHeight: 1.7,
                                }}
                            >
                                {service.description}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </SectionContainer>
    );
}

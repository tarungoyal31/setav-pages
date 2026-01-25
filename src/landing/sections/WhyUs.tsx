import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { M3Colors } from "../../components/colors";

const reasons = [
  {
    icon: <AutoAwesomeIcon sx={{ fontSize: 40 }} />,
    title: "25+ Years of Expertise",
    description:
      "Deep knowledge and experience in Vedic astrology, numerology, and Vaastu Shastra.",
  },
  {
    icon: <VolunteerActivismIcon sx={{ fontSize: 40 }} />,
    title: "Simple, Cost-Free Remedies",
    description:
      "Practical solutions that don't burden you financially. Effective remedies without expensive rituals.",
  },
  {
    icon: <PersonIcon sx={{ fontSize: 40 }} />,
    title: "Personalized Consultations",
    description:
      "Each session is tailored to your specific concerns and life situation.",
  },
  {
    icon: <MenuBookIcon sx={{ fontSize: 40 }} />,
    title: "Vedic Astrology & Vaastu",
    description:
      "Comprehensive services covering astrology, kundli analysis, numerology, and Vaastu consultation.",
  },
  {
    icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
    title: "Client-Focused Approach",
    description:
      "Dedicated to helping people in distress with genuine care and compassion.",
  },
];

export default function WhyUs() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: M3Colors.surface }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: M3Colors.onSurface,
            mb: 1,
          }}
        >
          Why Choose Us
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            color: M3Colors.onSurfaceVariant,
            mb: 5,
            maxWidth: 600,
            mx: "auto",
          }}
        >
          Experience authentic Vedic astrology with a compassionate approach
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {reasons.map((reason) => (
            <Paper
              key={reason.title}
              elevation={0}
              sx={{
                p: 3,
                bgcolor: M3Colors.surfaceHighest,
                borderRadius: 3,
                textAlign: "center",
                transition: "transform 0.2s",
                width: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(33.333% - 16px)" },
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Box sx={{ color: M3Colors.primary, mb: 2 }}>{reason.icon}</Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: M3Colors.onSurface,
                  mb: 1,
                }}
              >
                {reason.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: M3Colors.onSurfaceVariant, lineHeight: 1.6 }}
              >
                {reason.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

"use client";

/**
 * WhyUsSection — reason cards for why users should choose this practitioner.
 *
 * Config contract:
 *   whyUs.heading    — section heading; defaults to "Why Choose Us"
 *   whyUs.subheading — optional subheading
 *   whyUs.reasons    — array of { icon?, title, description }
 *
 * Renders nothing when config.whyUs is absent or reasons is empty.
 *
 * "use client" because MUI useTheme is needed for consistent icon color styling
 * and `sx` Emotion context runs client-side on hydration.
 */

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import type { ConfigWhyUs, ConfigWhyUsReason } from "@/config/types";
import type { SvgIconComponent } from "@mui/icons-material";

interface WhyUsSectionProps {
  whyUs: ConfigWhyUs;
}

/** Map config icon string to MUI icon component. */
const ICON_MAP: Record<string, SvgIconComponent> = {
  AutoAwesome: AutoAwesomeIcon,
  VolunteerActivism: VolunteerActivismIcon,
  Person: PersonIcon,
  MenuBook: MenuBookIcon,
  Favorite: FavoriteIcon,
  Star: StarIcon,
};

function ReasonIcon({ iconName }: { iconName?: string }) {
  const Icon = iconName ? (ICON_MAP[iconName] ?? StarIcon) : StarIcon;
  return <Icon sx={{ fontSize: 40 }} />;
}

function ReasonCard({ reason }: { reason: ConfigWhyUsReason }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: "action.hover",
        borderRadius: 3,
        textAlign: "center",
        transition: "transform 0.2s",
        width: {
          xs: "100%",
          sm: "calc(50% - 12px)",
          md: "calc(33.333% - 16px)",
        },
        "&:hover": { transform: "translateY(-4px)" },
      }}
    >
      <Box sx={{ color: "primary.main", mb: 2 }}>
        <ReasonIcon iconName={reason.icon} />
      </Box>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: "text.primary", mb: 1 }}
      >
        {reason.title}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", lineHeight: 1.6 }}
      >
        {reason.description}
      </Typography>
    </Paper>
  );
}

export default function WhyUsSection({ whyUs }: WhyUsSectionProps) {
  if (!whyUs.reasons || whyUs.reasons.length === 0) return null;

  const heading = whyUs.heading ?? "Why Choose Us";

  return (
    <Box
      component="section"
      aria-labelledby="whyus-heading"
      sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}
    >
      <Container maxWidth="lg">
        <Typography
          id="whyus-heading"
          variant="h4"
          component="h2"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: "text.primary",
            mb: 1,
          }}
        >
          {heading}
        </Typography>

        {whyUs.subheading && (
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mb: 5,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            {whyUs.subheading}
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {whyUs.reasons.map((reason) => (
            <ReasonCard key={reason.title} reason={reason} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

/**
 * AboutSection — bio + stat highlights for the practitioner.
 *
 * Config contract:
 *   about.heading     — section heading; defaults to "About {name}"
 *   about.bio         — multi-paragraph bio (whitespace preserved)
 *   about.highlights  — up to 4 stat cards (optional)
 *   identity.name     — used in the default heading fallback
 *
 * Renders nothing when config.about is absent.
 *
 * The "read more / read less" toggle is the only interactive bit;
 * it is isolated to the AboutReadMore client island.
 */

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import type { ConfigAbout, ConfigIdentity } from "@/config/types";
import AboutReadMore from "@/components/AboutReadMore";

interface AboutSectionProps {
  about: ConfigAbout;
  identity: ConfigIdentity;
}

export default function AboutSection({ about, identity }: AboutSectionProps) {
  const heading = about.heading ?? `About ${identity.name}`;

  return (
    <Box
      component="section"
      aria-labelledby="about-heading"
      sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}
    >
      <Container maxWidth="md">
        <Typography
          id="about-heading"
          variant="h4"
          component="h2"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: "text.primary",
            mb: 4,
          }}
        >
          {heading}
        </Typography>

        {about.highlights && about.highlights.length > 0 && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 4 }}
          >
            {about.highlights.map((item) => (
              <Paper
                key={item.label}
                elevation={0}
                sx={{
                  p: 2,
                  textAlign: "center",
                  bgcolor: "action.hover",
                  borderRadius: 2,
                  minWidth: 140,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: "primary.main" }}
                >
                  {item.value}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {item.label}
                </Typography>
              </Paper>
            ))}
          </Stack>
        )}

        {/* Client island: handles expand/collapse toggle */}
        <AboutReadMore bio={about.bio} />
      </Container>
    </Box>
  );
}

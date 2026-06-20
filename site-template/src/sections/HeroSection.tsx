"use client";

/**
 * HeroSection — the first and primary section of every site.
 *
 * Config contract (PRD §3.1):
 *   identity.name        — required; shown as <h1>
 *   identity.profession  — optional; shown as job title
 *   identity.intro       — optional; unique-copy tagline (one of three core fields)
 *   identity.logo        — optional; if absent → render initials avatar
 *   links.booking        — optional; if absent → no "Book Appointment" CTA
 *   contact.phone        — optional; if absent → no "Call Now" CTA
 *   theme.*              — gradient colors come from ThemeRegistry (theme context)
 *
 * Accessibility:
 *   - Exactly one <h1> on the page (identity.name)
 *   - Logo image has alt = identity.name (meaningful)
 *   - Both CTAs are <a> elements (real links, keyboard reachable)
 *   - fetchpriority="high" on the logo (LCP element)
 *
 * Performance:
 *   - Logo loads eagerly with fetchpriority="high" (LCP)
 *   - No useEffect or client data fetch — fully SSR-renderable
 *   - "use client" only because MUI sx props use Emotion context at hydration
 */

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import type { ConfigIdentity, ConfigLinks, ConfigContact } from "@/config/types";

interface HeroSectionProps {
  identity: ConfigIdentity;
  links: ConfigLinks;
  contact: ConfigContact;
}

export default function HeroSection({
  identity,
  links,
  contact,
}: HeroSectionProps) {
  const theme = useTheme();
  const { name, profession, intro, logo } = identity;

  // Initials fallback for missing logo
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const gradientBg = `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`;

  return (
    <Box
      component="header"
      aria-label={`${name} — ${profession ?? "Professional Services"}`}
      sx={{
        background: gradientBg,
        py: { xs: 6, md: 10 },
        minHeight: { xs: "auto", md: "70vh" },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4} alignItems="center" textAlign="center">
          {/* Logo / Avatar — LCP element */}
          <Avatar
            src={logo}
            alt={logo ? name : ""}
            imgProps={
              logo
                ? ({
                    fetchPriority: "high",
                    loading: "eager",
                  } as React.ImgHTMLAttributes<HTMLImageElement>)
                : undefined
            }
            sx={{
              width: { xs: 150, md: 200 },
              height: { xs: 150, md: 200 },
              border: "4px solid white",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              bgcolor: logo ? undefined : theme.palette.primary.dark,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              fontWeight: 700,
              color: "white",
            }}
          >
            {!logo ? initials : undefined}
          </Avatar>

          {/* Identity copy */}
          <Box>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                color: "white",
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "3rem" },
                mb: 1,
              }}
            >
              {name}
            </Typography>

            {profession && (
              <Typography
                variant="h5"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  fontWeight: 500,
                  fontSize: { xs: "1.1rem", md: "1.5rem" },
                  mb: intro ? 2 : 0,
                }}
              >
                {profession}
              </Typography>
            )}

            {intro && (
              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255,255,255,0.85)",
                  fontWeight: 400,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                {intro}
              </Typography>
            )}
          </Box>

          {/* CTAs — only rendered when the relevant config field is present */}
          {(links.booking || contact.phone) && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 2 }}
            >
              {links.booking && (
                <Button
                  variant="contained"
                  size="large"
                  component="a"
                  href={links.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    bgcolor: "white",
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    "&:hover": {
                      bgcolor: theme.palette.background.paper,
                    },
                  }}
                >
                  Book Appointment
                </Button>
              )}

              {contact.phone && (
                <Button
                  variant="outlined"
                  size="large"
                  component="a"
                  href={`tel:${contact.phone}`}
                  sx={{
                    borderColor: "white",
                    color: "white",
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Call Now
                </Button>
              )}
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

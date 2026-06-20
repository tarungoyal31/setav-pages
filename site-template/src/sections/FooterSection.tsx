"use client";

/**
 * FooterSection — site footer with name, social links, App Store / Play Store CTAs.
 *
 * Config contract:
 *   identity.name   — shown as the footer name
 *   links.social    — renders icon buttons for known types (instagram, youtube)
 *
 * App Store / Play Store links are hardcoded Setav platform links (not per-site config).
 *
 * "use client" because useTheme is used for palette.primary.main on the dark bg,
 * and currentYear is derived from Date (avoids SSR/client mismatch with suppressHydrationWarning).
 */

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AppleIcon from "@mui/icons-material/Apple";
import type { ConfigIdentity, ConfigLinks } from "@/config/types";

const APP_STORE_URL =
  "https://apps.apple.com/in/app/setav/id6738992536";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=ai.setav.customer";

const SOCIAL_ICON_MAP: Record<string, React.ReactNode> = {
  instagram: <InstagramIcon />,
  youtube: <YouTubeIcon />,
};

interface FooterSectionProps {
  identity: ConfigIdentity;
  links: ConfigLinks;
}

export default function FooterSection({ identity, links }: FooterSectionProps) {
  const currentYear = new Date().getFullYear();
  const socialLinks = (links.social ?? []).filter(
    (s) => SOCIAL_ICON_MAP[s.type]
  );

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 4, md: 6 },
        bgcolor: "text.primary",
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={3} alignItems="center">
          <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
            {identity.name}
          </Typography>

          {socialLinks.length > 0 && (
            <Stack direction="row" spacing={1}>
              {socialLinks.map((s) => (
                <IconButton
                  key={s.type}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow on ${s.type}`}
                  sx={{
                    color: "white",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  {SOCIAL_ICON_MAP[s.type]}
                </IconButton>
              ))}
            </Stack>
          )}

          <Divider
            sx={{ width: "100%", borderColor: "rgba(255,255,255,0.2)" }}
          />

          <Box textAlign="center">
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.7)", mb: 2 }}
            >
              Download the Setav App
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="outlined"
                startIcon={<AppleIcon />}
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.5)",
                  borderRadius: 2,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                App Store
              </Button>
              <Button
                variant="outlined"
                startIcon={
                  <Box
                    component="img"
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg"
                    alt=""
                    aria-hidden="true"
                    sx={{ width: 20, height: 20 }}
                  />
                }
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on Google Play"
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.5)",
                  borderRadius: 2,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Google Play
              </Button>
            </Stack>
          </Box>

          <Divider
            sx={{ width: "100%", borderColor: "rgba(255,255,255,0.2)" }}
          />

          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.5)", textAlign: "center" }}
          >
            &copy; {currentYear} {identity.name}. All rights reserved.
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "rgba(255,255,255,0.4)", textAlign: "center" }}
          >
            Powered by{" "}
            <Box
              component="a"
              href="https://setav.ai"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
              }}
            >
              Setav
            </Box>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

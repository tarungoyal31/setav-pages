/**
 * YouTubeSection — lite-embed YouTube video grid.
 *
 * Config contract:
 *   youtube.heading    — section heading; defaults to "Videos"
 *   youtube.subheading — optional subheading
 *   youtube.channelUrl — if present, shows "View All Videos" CTA
 *   youtube.videoIds   — list of YouTube video IDs to embed
 *
 * Renders nothing when config.youtube is absent or videoIds is empty.
 *
 * The iframe embeds are isolated to the YouTubeEmbed client island so
 * the section wrapper stays server-renderable.
 */

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import YouTubeIcon from "@mui/icons-material/YouTube";
import type { ConfigYouTube } from "@/config/types";
import YouTubeEmbed from "@/components/YouTubeEmbed";

interface YouTubeSectionProps {
  youtube: ConfigYouTube;
}

export default function YouTubeSection({ youtube }: YouTubeSectionProps) {
  if (!youtube.videoIds || youtube.videoIds.length === 0) return null;

  const heading = youtube.heading ?? "Videos";

  return (
    <Box
      component="section"
      aria-labelledby="youtube-heading"
      sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.default" }}
    >
      <Container maxWidth="lg">
        <Typography
          id="youtube-heading"
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

        {youtube.subheading && (
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mb: 5,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            {youtube.subheading}
          </Typography>
        )}

        {/* Grid of lite-embed facades (client island) */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
            mt: youtube.subheading ? 0 : 5,
          }}
        >
          {youtube.videoIds.map((id) => (
            <Box
              key={id}
              sx={{
                width: {
                  xs: "100%",
                  sm: "calc(50% - 12px)",
                  md: "calc(33.333% - 16px)",
                },
                minWidth: 280,
                borderRadius: 3,
                overflow: "hidden",
                bgcolor: "action.hover",
              }}
            >
              <YouTubeEmbed videoId={id} />
            </Box>
          ))}
        </Box>

        {youtube.channelUrl && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="outlined"
              startIcon={<YouTubeIcon />}
              href={youtube.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ borderRadius: 2, px: 4, py: 1.5 }}
            >
              View All Videos
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}

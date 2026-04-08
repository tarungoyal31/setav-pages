import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { siteInfo } from "../data/info";
import videoData from "../data/youtube-videos.json";
import { M3Colors } from "../../components/colors";

const getYouTubeChannelUrl = (): string | null => {
  const ytInfo = siteInfo.info_group.infos.find(
    (i) => i.config_type === "youtube"
  );
  return ytInfo?.link_address || null;
};

export default function YouTubeVideos() {
  const channelUrl = getYouTubeChannelUrl();
  const videoIds: string[] = videoData.videoIds || [];

  if (!channelUrl || videoIds.length === 0) return null;

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: M3Colors.surfaceHigh }}>
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
          Videos
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
          Watch our latest videos on astrology and guidance
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {videoIds.map((id) => (
            <Box
              key={id}
              sx={{
                width: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(33.333% - 16px)" },
                minWidth: 280,
                borderRadius: 3,
                overflow: "hidden",
                bgcolor: M3Colors.surfaceHighest,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="outlined"
            startIcon={<YouTubeIcon />}
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              borderColor: M3Colors.primary,
              color: M3Colors.primary,
              borderRadius: 2,
              px: 4,
              py: 1.5,
              "&:hover": {
                bgcolor: M3Colors.surfaceHighest,
                borderColor: M3Colors.primary,
              },
            }}
          >
            View All Videos
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

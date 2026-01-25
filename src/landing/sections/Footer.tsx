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
import {
  siteInfo,
  getInstagramUrl,
  getYouTubeUrl,
  getAppStoreUrl,
  getPlayStoreUrl,
} from "../data/info";
import { M3Colors } from "../../components/colors";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 4, md: 6 },
        bgcolor: M3Colors.onSurface,
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={3} alignItems="center">
          <Typography
            variant="h6"
            sx={{ color: "white", fontWeight: 600 }}
          >
            {siteInfo.name}
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton
              href={getInstagramUrl()}
              target="_blank"
              sx={{
                color: "white",
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
              }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href={getYouTubeUrl()}
              target="_blank"
              sx={{
                color: "white",
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
              }}
            >
              <YouTubeIcon />
            </IconButton>
          </Stack>

          <Divider sx={{ width: "100%", borderColor: "rgba(255,255,255,0.2)" }} />

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
                href={getAppStoreUrl()}
                target="_blank"
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
                    alt="Play Store"
                    sx={{ width: 20, height: 20 }}
                  />
                }
                href={getPlayStoreUrl()}
                target="_blank"
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

          <Divider sx={{ width: "100%", borderColor: "rgba(255,255,255,0.2)" }} />

          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.5)", textAlign: "center" }}
          >
            &copy; {currentYear} {siteInfo.name}. All rights reserved.
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
              sx={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
            >
              Setav
            </Box>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { siteInfo, getPhoneNumber, getBookingUrl } from "../data/info";
import { M3Colors } from "../../components/colors";

export default function Hero() {
  const { info_group } = siteInfo;

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${M3Colors.primary} 0%, ${M3Colors.secondary} 100%)`,
        py: { xs: 6, md: 10 },
        minHeight: { xs: "auto", md: "70vh" },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Avatar
            src={info_group.image}
            alt={info_group.name}
            sx={{
              width: { xs: 150, md: 200 },
              height: { xs: 150, md: 200 },
              border: "4px solid white",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          />
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
              {info_group.name}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "rgba(255,255,255,0.9)",
                fontWeight: 500,
                fontSize: { xs: "1.1rem", md: "1.5rem" },
                mb: 2,
              }}
            >
              {info_group.profession.name}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255,255,255,0.85)",
                fontWeight: 400,
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              Astrology, Numerology, Vaastu Consultation
            </Typography>
          </Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Button
              variant="contained"
              size="large"
              href={getBookingUrl()}
              target="_blank"
              sx={{
                bgcolor: "white",
                color: M3Colors.primary,
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                "&:hover": {
                  bgcolor: M3Colors.surface,
                },
              }}
            >
              Book Appointment
            </Button>
            <Button
              variant="outlined"
              size="large"
              href={`tel:${getPhoneNumber()}`}
              sx={{
                borderColor: "white",
                color: "white",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Call Now
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

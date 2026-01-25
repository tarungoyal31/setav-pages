import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DownloadIcon from "@mui/icons-material/Download";
import { siteInfo, getPhoneNumber, getEmail } from "../data/info";
import { M3Colors } from "../../components/colors";

const generateVCard = () => {
  const info = siteInfo.info_group;
  const addressInfo = info.infos.find((i) => i.config_type === "address");
  const address = addressInfo?.address;

  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${info.full_name}
TEL:${getPhoneNumber()}
EMAIL:${getEmail()}
TITLE:${info.profession.name}
ADR:;;${address?.google_location?.formatted_address || "Malviya Nagar, New Delhi"}
URL:https://app.setav.ai/#/g/${info.id}
END:VCARD`;

  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${info.full_name.replace(/\s+/g, "_")}.vcf`;
  link.click();
  URL.revokeObjectURL(url);
};

export default function Contact() {
  const addressInfo = siteInfo.info_group.infos.find(
    (i) => i.config_type === "address"
  );
  const formattedAddress =
    addressInfo?.address?.google_location?.formatted_address ||
    "Malviya Nagar, New Delhi, Delhi 110017, India";

  const contactItems = [
    {
      icon: <PhoneIcon sx={{ fontSize: 32 }} />,
      label: "Phone",
      value: "+91 98108 95239",
      href: `tel:${getPhoneNumber()}`,
      action: "Call Now",
    },
    {
      icon: <EmailIcon sx={{ fontSize: 32 }} />,
      label: "Email",
      value: getEmail(),
      href: `mailto:${getEmail()}`,
      action: "Send Email",
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 32 }} />,
      label: "Address",
      value: formattedAddress,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress)}`,
      action: "View on Map",
    },
  ];

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
          Contact Us
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
          Get in touch for consultations and inquiries
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {contactItems.map((item) => (
            <Paper
              key={item.label}
              elevation={0}
              sx={{
                p: 3,
                bgcolor: M3Colors.surfaceHighest,
                borderRadius: 3,
                textAlign: "center",
                width: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(33.333% - 16px)" },
                minWidth: 280,
              }}
            >
              <Box sx={{ color: M3Colors.primary, mb: 2 }}>{item.icon}</Box>
              <Typography
                variant="subtitle2"
                sx={{ color: M3Colors.onSurfaceVariant, mb: 0.5 }}
              >
                {item.label}
              </Typography>
              <Typography
                sx={{
                  color: M3Colors.onSurface,
                  fontWeight: 500,
                  mb: 2,
                  wordBreak: "break-word",
                  fontSize: item.label === "Address" ? "0.9rem" : "1rem",
                }}
              >
                {item.value}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                href={item.href}
                target={item.label === "Address" ? "_blank" : undefined}
                sx={{
                  borderColor: M3Colors.primary,
                  color: M3Colors.primary,
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: M3Colors.surfaceHigh,
                    borderColor: M3Colors.primary,
                  },
                }}
              >
                {item.action}
              </Button>
            </Paper>
          ))}
        </Box>

        <Stack alignItems="center" sx={{ mt: 4 }}>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={generateVCard}
            sx={{
              bgcolor: M3Colors.primary,
              color: "white",
              borderRadius: 2,
              px: 4,
              py: 1.5,
              "&:hover": {
                bgcolor: M3Colors.secondary,
              },
            }}
          >
            Download Contact Card
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

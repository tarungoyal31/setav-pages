/**
 * ContactSection — phone, email, address cards + vCard download.
 *
 * Config contract:
 *   contact.showContactInformation — if false, renders nothing
 *   contact.phone    — optional; renders phone card
 *   contact.email    — optional; renders email card
 *   contact.address  — optional; renders address card with Google Maps link
 *   identity.name    — used in vCard FN field
 *   identity.profession — used in vCard TITLE field
 *   links.booking    — used in vCard URL field
 *
 * The vCard download is a client island (VCardDownload) since it uses
 * Blob + URL.createObjectURL which are browser APIs.
 */

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import type { ConfigContact, ConfigIdentity, ConfigLinks } from "@/config/types";
import VCardDownload from "@/components/VCardDownload";

interface ContactSectionProps {
  contact: ConfigContact;
  identity: ConfigIdentity;
  links: ConfigLinks;
}

export default function ContactSection({
  contact,
  identity,
  links,
}: ContactSectionProps) {
  if (!contact.showContactInformation) return null;

  const items: Array<{
    icon: React.ReactNode;
    label: string;
    value: string;
    href: string;
    action: string;
    external?: boolean;
  }> = [];

  if (contact.phone) {
    items.push({
      icon: <PhoneIcon sx={{ fontSize: 32 }} />,
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone}`,
      action: "Call Now",
    });
  }

  if (contact.email) {
    items.push({
      icon: <EmailIcon sx={{ fontSize: 32 }} />,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      action: "Send Email",
    });
  }

  if (contact.address) {
    items.push({
      icon: <LocationOnIcon sx={{ fontSize: 32 }} />,
      label: "Address",
      value: contact.address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        contact.address
      )}`,
      action: "View on Map",
      external: true,
    });
  }

  if (items.length === 0) return null;

  return (
    <Box
      component="section"
      aria-labelledby="contact-heading"
      sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}
    >
      <Container maxWidth="lg">
        <Typography
          id="contact-heading"
          variant="h4"
          component="h2"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: "text.primary",
            mb: 1,
          }}
        >
          Contact Us
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            color: "text.secondary",
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
          {items.map((item) => (
            <Paper
              key={item.label}
              elevation={0}
              sx={{
                p: 3,
                bgcolor: "action.hover",
                borderRadius: 3,
                textAlign: "center",
                width: {
                  xs: "100%",
                  sm: "calc(50% - 12px)",
                  md: "calc(33.333% - 16px)",
                },
                minWidth: 280,
              }}
            >
              <Box sx={{ color: "primary.main", mb: 2 }}>{item.icon}</Box>
              <Typography
                variant="subtitle2"
                sx={{ color: "text.secondary", mb: 0.5 }}
              >
                {item.label}
              </Typography>
              <Typography
                sx={{
                  color: "text.primary",
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
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                sx={{ borderRadius: 2 }}
              >
                {item.action}
              </Button>
            </Paper>
          ))}
        </Box>

        {/* vCard download — client island */}
        <Stack alignItems="center" sx={{ mt: 4 }}>
          <VCardDownload
            name={identity.name}
            phone={contact.phone}
            email={contact.email}
            address={contact.address}
            profession={identity.profession}
            bookingUrl={links.booking}
          />
        </Stack>
      </Container>
    </Box>
  );
}

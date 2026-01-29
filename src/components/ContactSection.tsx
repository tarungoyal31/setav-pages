import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { SITE_DATA } from "../data/siteData";
import { M3Colors } from "./colors";
import SectionContainer from "./SectionContainer";
import { downloadVCard } from "../utils/vcard";

export default function ContactSection() {
    return (
        <SectionContainer id="contact" backgroundColor={M3Colors.surface}>
            <Typography
                variant="h4"
                component="h2"
                sx={{ fontWeight: 700, mb: 1, textAlign: "center" }}
            >
                Get in Touch
            </Typography>
            <Box
                sx={{
                    width: 60,
                    height: 4,
                    bgcolor: M3Colors.primary,
                    borderRadius: 2,
                    mb: 6,
                    mx: "auto",
                }}
            />
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                justifyContent="center"
                alignItems="center"
            >
                <Button
                    variant="outlined"
                    size="large"
                    startIcon={<PhoneIcon />}
                    href={`tel:${SITE_DATA.phone}`}
                    sx={{
                        borderRadius: 2,
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        textTransform: "none",
                        fontSize: "1rem",
                        minWidth: 200,
                    }}
                >
                    {SITE_DATA.phoneDisplay}
                </Button>
                <Button
                    variant="outlined"
                    size="large"
                    startIcon={<EmailIcon />}
                    href={`mailto:${SITE_DATA.email}`}
                    sx={{
                        borderRadius: 2,
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        textTransform: "none",
                        fontSize: "1rem",
                        minWidth: 200,
                    }}
                >
                    {SITE_DATA.email}
                </Button>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<ContactPageIcon />}
                    onClick={downloadVCard}
                    sx={{
                        borderRadius: 2,
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        textTransform: "none",
                        fontSize: "1rem",
                        minWidth: 200,
                    }}
                >
                    Save Contact
                </Button>
            </Stack>
        </SectionContainer>
    );
}

import Box from "@mui/material/Box";
import HeroSection from "../components/fitnglow/HeroSection";
import ImagesSection from "../components/fitnglow/ImagesSection";
import WhyUsSection from "../components/fitnglow/WhyUsSection";
import ServicesSection from "../components/fitnglow/ServicesSection";
import AppointmentSection from "../components/fitnglow/AppointmentSection";
import ContactSection from "../components/fitnglow/ContactSection";
import Footer from "../components/fitnglow/Footer";

export default function Home() {
    return (
        <Box>
            <HeroSection />
            <ImagesSection />
            <WhyUsSection />
            <ServicesSection />
            <AppointmentSection />
            <ContactSection />
            <Footer />
        </Box>
    );
}

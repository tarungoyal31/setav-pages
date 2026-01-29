import Box from "@mui/material/Box";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import WhyUsSection from "../components/WhyUsSection";
import ServicesSection from "../components/ServicesSection";
import AppointmentProductsSection from "../components/AppointmentProductsSection";
import ContactSection from "../components/ContactSection";
import FooterSection from "../components/FooterSection";

export default function Home() {
    return (
        <Box>
            <HeroSection />
            <AboutSection />
            <WhyUsSection />
            <ServicesSection />
            <AppointmentProductsSection />
            <ContactSection />
            <FooterSection />
        </Box>
    );
}

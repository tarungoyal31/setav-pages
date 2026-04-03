import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import WhyUsSection from "../components/WhyUsSection";
import ServicesSection from "../components/ServicesSection";
import AppointmentProductsSection from "../components/AppointmentProductsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactSection from "../components/ContactSection";
import FooterSection from "../components/FooterSection";

export default function Home() {
    return (
        <Box>
            <Navbar />
            <HeroSection />
            <AboutSection />
            <WhyUsSection />
            <ServicesSection />
            <AppointmentProductsSection />
            <TestimonialsSection />
            <ContactSection />
            <FooterSection />
        </Box>
    );
}

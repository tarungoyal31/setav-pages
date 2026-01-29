import Box from "@mui/material/Box";
import HeroSection from "../components/ajnaeye/HeroSection";
import ImagesSection from "../components/ajnaeye/ImagesSection";
import WhyUsSection from "../components/ajnaeye/WhyUsSection";
import ServicesSection from "../components/ajnaeye/ServicesSection";
import AppointmentSection from "../components/ajnaeye/AppointmentSection";
import ContactSection from "../components/ajnaeye/ContactSection";
import Footer from "../components/ajnaeye/Footer";

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

import Box from "@mui/material/Box";
import AppBar1Floating from "../components/appbar/AppBar1Floating.tsx";
import Hero1Floating from "../components/hero/Hero1Floating.tsx";
import Features1Floating from "../components/features/Features1Floating.tsx";
import Testimonials1Floating from "../components/testimonials/Testimonials1Floating.tsx";
import Showcase1Floating from "../components/showcase/Showcase1Floating.tsx";
import Highlights1Floating from "../components/highlights/Highlights1Floating.tsx";
import Footer1Floating from "../components/footer/Footer1Floating.tsx";
import Faq1Floating from "../components/faq/Faq1Floating.tsx";

export default function Home() {
    return (
        <Box>
            <AppBar1Floating/>
            <Hero1Floating/>
            <Features1Floating/>
            <Testimonials1Floating/>
            <Showcase1Floating/>
            <Highlights1Floating/>
            <Faq1Floating/>
            <Footer1Floating/>
        </Box>
    );
}

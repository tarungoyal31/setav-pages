import Box from "@mui/material/Box";
import Hero from "./sections/Hero";
import About from "./sections/About";
import ImageGallery from "./sections/ImageGallery";
import WhyUs from "./sections/WhyUs";
import Services from "./sections/Services";
import Testimonials from "./sections/Testimonials";
import YouTubeVideos from "./sections/YouTubeVideos";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function Landing() {
  return (
    <Box>
      <Hero />
      <About />
      <ImageGallery />
      <WhyUs />
      <Services />
      <Testimonials />
      <YouTubeVideos />
      <Contact />
      <Footer />
    </Box>
  );
}

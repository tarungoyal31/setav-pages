/**
 * SectionRunner — async Server Component.
 *
 * Responsibilities (P3.2/P3.3):
 *  1. Filter + sort sections by enabled + order.
 *  2. For sections with source="group", fetch dynamic data server-side
 *     (Services products and Testimonials) with Next.js revalidate cache.
 *  3. Render each section component in order, passing the right slice of config
 *     plus any pre-fetched dynamic data.
 *
 * Design rules:
 *  - All data fetching is on the server — no client-side loading spinners.
 *  - Sections that fail to load data still render gracefully (empty state).
 *  - No site-specific literals in this runner.
 *  - Heading hierarchy: Hero uses <h1>; all other sections use <h2>.
 */

import Box from "@mui/material/Box";
import type { SiteConfig, ConfigSection } from "@/config/types";
import type { ApiProduct, ApiTestimonial, TestimonialRating } from "@/lib/api";
import { fetchGroupProducts, fetchGroupTestimonials } from "@/lib/api";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import GallerySection from "@/sections/GallerySection";
import WhyUsSection from "@/sections/WhyUsSection";
import ServicesSection from "@/sections/ServicesSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import YouTubeSection from "@/sections/YouTubeSection";
import ContactSection from "@/sections/ContactSection";
import FooterSection from "@/sections/FooterSection";

interface SectionRunnerProps {
  config: SiteConfig;
}

/** Dynamic data fetched per-render for source="group" sections. */
interface DynamicData {
  products: ApiProduct[];
  testimonials: ApiTestimonial[];
  testimonialRating: TestimonialRating;
}

function needsDynamic(sections: ConfigSection[]): boolean {
  return sections.some(
    (s) =>
      s.enabled &&
      s.source === "group" &&
      (s.type === "services" || s.type === "testimonials")
  );
}

async function fetchDynamic(groupId: string): Promise<DynamicData> {
  // Fan-out: both fetches start in parallel
  const [products, { testimonials, rating }] = await Promise.all([
    fetchGroupProducts(groupId),
    fetchGroupTestimonials(groupId),
  ]);
  return { products, testimonials, testimonialRating: rating };
}

function renderSection(
  section: ConfigSection,
  config: SiteConfig,
  dynamic: DynamicData
): React.ReactNode {
  switch (section.type) {
    case "hero":
      return (
        <HeroSection
          key="hero"
          identity={config.identity}
          links={config.links}
          contact={config.contact}
        />
      );

    case "about":
      return config.about ? (
        <AboutSection
          key="about"
          about={config.about}
          identity={config.identity}
        />
      ) : null;

    case "gallery":
      return config.gallery ? (
        <GallerySection key="gallery" gallery={config.gallery} />
      ) : null;

    case "whyUs":
      return config.whyUs ? (
        <WhyUsSection key="whyUs" whyUs={config.whyUs} />
      ) : null;

    case "services":
      return (
        <ServicesSection key="services" products={dynamic.products} />
      );

    case "testimonials":
      return (
        <TestimonialsSection
          key="testimonials"
          testimonials={dynamic.testimonials}
          rating={dynamic.testimonialRating}
        />
      );

    case "youtube":
      return config.youtube ? (
        <YouTubeSection key="youtube" youtube={config.youtube} />
      ) : null;

    case "contact":
      return (
        <ContactSection
          key="contact"
          contact={config.contact}
          identity={config.identity}
          links={config.links}
        />
      );

    case "footer":
      return (
        <FooterSection
          key="footer"
          identity={config.identity}
          links={config.links}
        />
      );

    default:
      // Unknown section type — silently skip (forward-compat with v2 catalog)
      return null;
  }
}

export default async function SectionRunner({ config }: SectionRunnerProps) {
  const sections = (config.sections ?? [])
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  // Fetch dynamic data once (shared between services + testimonials)
  const dynamic: DynamicData = needsDynamic(sections)
    ? await fetchDynamic(config.groupId)
    : { products: [], testimonials: [], testimonialRating: { count: 0, average: 0 } };

  return (
    <Box component="main">
      {sections.map((section) => renderSection(section, config, dynamic))}
    </Box>
  );
}

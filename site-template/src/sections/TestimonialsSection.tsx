"use client";

/**
 * TestimonialsSection — renders starred testimonials fetched from the Setav API.
 *
 * "use client" for MUI Emotion context at hydration. Data arrives as a prop
 * already server-fetched in SectionRunner — no client-side data fetching.
 *
 * Renders nothing when testimonials is empty.
 *
 * The aggregate rating (count + average) is also passed in and rendered as
 * a summary badge at the top; this same data is consumed by JSON-LD in P3.4.
 */

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import type { ApiTestimonial, TestimonialRating } from "@/lib/api";

interface TestimonialsSectionProps {
  testimonials: ApiTestimonial[];
  rating: TestimonialRating;
}

export default function TestimonialsSection({
  testimonials,
  rating,
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <Box
      component="section"
      aria-labelledby="testimonials-heading"
      sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}
    >
      <Container maxWidth="lg">
        <Typography
          id="testimonials-heading"
          variant="h4"
          component="h2"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: "text.primary",
            mb: 1,
          }}
        >
          What Our Clients Say
        </Typography>

        {rating.count > 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              mb: 2,
            }}
          >
            <Rating
              value={rating.average}
              readOnly
              precision={0.1}
              size="small"
              aria-label={`Average rating: ${rating.average} out of 5`}
            />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {rating.average} ({rating.count} review{rating.count !== 1 ? "s" : ""})
            </Typography>
          </Box>
        )}

        <Typography
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mb: 5,
            maxWidth: 600,
            mx: "auto",
          }}
        >
          Hear from those who have experienced our consultations
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {testimonials.map((t) => (
            <Card
              key={t.id}
              elevation={0}
              sx={{
                bgcolor: "action.hover",
                borderRadius: 3,
                width: {
                  xs: "100%",
                  sm: "calc(50% - 12px)",
                  md: "calc(33.333% - 16px)",
                },
                minWidth: 280,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <FormatQuoteIcon
                  sx={{
                    fontSize: 36,
                    color: "primary.main",
                    opacity: 0.4,
                    mb: 1,
                  }}
                />
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: "text.primary", mb: 1 }}
                >
                  {t.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.7,
                    mb: 2,
                  }}
                >
                  {t.description}
                </Typography>
                <Rating
                  value={t.star_rating}
                  readOnly
                  size="small"
                  aria-label={`${t.author.name} rated ${t.star_rating} stars`}
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar
                    src={t.author.image}
                    alt={t.author.name}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "text.primary" }}
                  >
                    {t.author.name}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

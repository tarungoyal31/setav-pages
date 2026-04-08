import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import CircularProgress from "@mui/material/CircularProgress";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Testimonial, fetchTestimonials } from "../data/products";
import { M3Colors } from "../../components/colors";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials()
      .then(setTestimonials)
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && testimonials.length === 0) return null;

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: M3Colors.surface }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: M3Colors.onSurface,
            mb: 1,
          }}
        >
          What Our Clients Say
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            color: M3Colors.onSurfaceVariant,
            mb: 5,
            maxWidth: 600,
            mx: "auto",
          }}
        >
          Hear from those who have experienced our consultations
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress sx={{ color: M3Colors.primary }} />
          </Box>
        ) : (
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
                  bgcolor: M3Colors.surfaceHighest,
                  borderRadius: 3,
                  width: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(33.333% - 16px)" },
                  minWidth: 280,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <FormatQuoteIcon
                    sx={{ fontSize: 36, color: M3Colors.primary, opacity: 0.4, mb: 1 }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: M3Colors.onSurface, mb: 1 }}
                  >
                    {t.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: M3Colors.onSurfaceVariant,
                      lineHeight: 1.7,
                      mb: 2,
                    }}
                  >
                    {t.description}
                  </Typography>
                  <Rating value={t.star_rating} readOnly size="small" sx={{ mb: 2 }} />
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      src={t.author.image}
                      alt={t.author.name}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: M3Colors.onSurface }}
                    >
                      {t.author.name}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

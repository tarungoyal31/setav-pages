"use client";

/**
 * ServicesSection — renders active service products fetched from the Setav API.
 *
 * This is a Client Component only because MUI sx props require Emotion context
 * at hydration. The data (products[]) arrives as a prop already fetched on the
 * server in SectionRunner — no client-side data fetching occurs here.
 *
 * Renders nothing when products is empty (graceful empty-state).
 */

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import type { ApiProduct } from "@/lib/api";
import { formatDuration, getServiceUrl } from "@/lib/api";

interface ServicesSectionProps {
  products: ApiProduct[];
}

export default function ServicesSection({ products }: ServicesSectionProps) {
  if (products.length === 0) return null;

  return (
    <Box
      component="section"
      aria-labelledby="services-heading"
      sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.default" }}
    >
      <Container maxWidth="lg">
        <Typography
          id="services-heading"
          variant="h4"
          component="h2"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: "text.primary",
            mb: 1,
          }}
        >
          Our Services
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mb: 5,
            maxWidth: 600,
            mx: "auto",
          }}
        >
          Book a consultation session tailored to your needs
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {products.map((product) => (
            <Card
              key={product.id}
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: "column",
                bgcolor: "action.hover",
                borderRadius: 3,
                transition: "all 0.2s",
                width: {
                  xs: "100%",
                  sm: "calc(50% - 12px)",
                  md: "calc(25% - 18px)",
                },
                minWidth: 240,
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "text.primary", mb: 1 }}
                >
                  {product.name}
                </Typography>
                <Chip
                  icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
                  label={formatDuration(product.duration_in_sec)}
                  size="small"
                  sx={{
                    bgcolor: "background.paper",
                    color: "text.secondary",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 2, minHeight: 40 }}
                >
                  {product.description}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: "primary.main" }}
                >
                  {product.price.display_string}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  href={getServiceUrl(product.group_id, product.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderRadius: 2,
                    py: 1,
                  }}
                >
                  Book Now
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

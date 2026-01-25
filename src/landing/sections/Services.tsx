import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { products, getServiceUrl, formatDuration } from "../data/products";
import { M3Colors } from "../../components/colors";

export default function Services() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: M3Colors.surfaceHigh }}>
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
          Our Services
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
                bgcolor: M3Colors.surfaceHighest,
                borderRadius: 3,
                transition: "all 0.2s",
                width: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(25% - 18px)" },
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
                  sx={{
                    fontWeight: 600,
                    color: M3Colors.onSurface,
                    mb: 1,
                  }}
                >
                  {product.name}
                </Typography>
                <Chip
                  icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
                  label={formatDuration(product.duration_in_sec)}
                  size="small"
                  sx={{
                    bgcolor: M3Colors.surface,
                    color: M3Colors.onSurfaceVariant,
                    mb: 2,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: M3Colors.onSurfaceVariant,
                    mb: 2,
                    minHeight: 40,
                  }}
                >
                  {product.description}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: M3Colors.primary,
                  }}
                >
                  {product.price.display_string}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  href={getServiceUrl(product.id)}
                  target="_blank"
                  sx={{
                    bgcolor: M3Colors.primary,
                    color: "white",
                    borderRadius: 2,
                    py: 1,
                    "&:hover": {
                      bgcolor: M3Colors.secondary,
                    },
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

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import { M3Colors } from "../colors";
import { GROUP_ID } from "../../constants/ajnaeye";
import {
    AppointmentProduct,
    fetchAppointmentProducts,
    formatDuration,
    productDetailUrl,
} from "../../api/setav";

export default function AppointmentSection() {
    const [products, setProducts] = useState<AppointmentProduct[] | null>(null);

    useEffect(() => {
        let cancelled = false;
        fetchAppointmentProducts(GROUP_ID)
            .then((data) => {
                if (!cancelled) setProducts(data);
            })
            .catch(() => {
                if (!cancelled) setProducts([]);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    if (products !== null && products.length === 0) {
        return null;
    }

    return (
        <Box
            sx={{
                bgcolor: M3Colors.surfaceHigh,
                py: { xs: 6, md: 10 },
            }}
        >
            <Container maxWidth="md">
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        textAlign: "center",
                        fontWeight: 700,
                        color: M3Colors.onSurface,
                        mb: 5,
                    }}
                >
                    Book Your Session
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: 3,
                    }}
                >
                    {products === null
                        ? Array.from({ length: 4 }).map((_, index) => (
                              <Skeleton
                                  key={index}
                                  variant="rectangular"
                                  sx={{ borderRadius: 4, height: 320 }}
                              />
                          ))
                        : products.map((product) => (
                              <Paper
                                  key={product.id}
                                  elevation={0}
                                  sx={{
                                      bgcolor: M3Colors.surface,
                                      borderRadius: 4,
                                      overflow: "hidden",
                                      border: `1px solid ${M3Colors.surfaceHighest}`,
                                      display: "flex",
                                      flexDirection: "column",
                                  }}
                              >
                                  <Box
                                      sx={{
                                          bgcolor: M3Colors.primary,
                                          color: "#fff",
                                          py: 2,
                                          px: 3,
                                          textAlign: "center",
                                      }}
                                  >
                                      <Typography
                                          variant="h6"
                                          component="h3"
                                          sx={{ fontWeight: 600 }}
                                      >
                                          {product.name}
                                      </Typography>
                                  </Box>

                                  <Box
                                      sx={{
                                          p: 4,
                                          flex: 1,
                                          display: "flex",
                                          flexDirection: "column",
                                      }}
                                  >
                                      <Typography
                                          variant="h3"
                                          sx={{
                                              textAlign: "center",
                                              fontWeight: 700,
                                              color: M3Colors.onSurface,
                                              mb: 2,
                                          }}
                                      >
                                          <Typography
                                              component="span"
                                              sx={{ fontSize: "1.5rem", verticalAlign: "top" }}
                                          >
                                              ₹
                                          </Typography>
                                          {product.price.units.toLocaleString("en-IN")}
                                      </Typography>

                                      <Box sx={{ textAlign: "center", mb: 3 }}>
                                          <Chip
                                              label={formatDuration(product.duration_in_sec)}
                                              size="small"
                                              sx={{
                                                  bgcolor: `${M3Colors.primary}15`,
                                                  color: M3Colors.primary,
                                                  fontWeight: 600,
                                              }}
                                          />
                                      </Box>

                                      <Typography
                                          sx={{
                                              color: M3Colors.onSurfaceVariant,
                                              textAlign: "center",
                                              lineHeight: 1.6,
                                              mb: 4,
                                              flex: 1,
                                          }}
                                      >
                                          {product.description}
                                      </Typography>

                                      <Button
                                          variant="contained"
                                          fullWidth
                                          size="large"
                                          href={productDetailUrl(GROUP_ID, product.id)}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          sx={{
                                              bgcolor: M3Colors.primary,
                                              color: "#fff",
                                              py: 1.5,
                                              borderRadius: 3,
                                              textTransform: "none",
                                              fontSize: "1.1rem",
                                              fontWeight: 600,
                                              "&:hover": {
                                                  bgcolor: M3Colors.secondary,
                                              },
                                          }}
                                      >
                                          Book Now
                                      </Button>
                                  </Box>
                              </Paper>
                          ))}
                </Box>
            </Container>
        </Box>
    );
}

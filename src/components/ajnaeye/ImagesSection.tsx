import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import { M3Colors } from "../colors";
import { GROUP_ID } from "../../constants/ajnaeye";
import { fetchGroupInfo, flattenGroupImages } from "../../api/setav";

export default function ImagesSection() {
    const [images, setImages] = useState<string[] | null>(null);

    useEffect(() => {
        let cancelled = false;
        fetchGroupInfo(GROUP_ID)
            .then((info) => {
                if (!cancelled) setImages(flattenGroupImages(info));
            })
            .catch(() => {
                if (!cancelled) setImages([]);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    if (images !== null && images.length === 0) {
        return null;
    }

    return (
        <Box
            sx={{
                bgcolor: M3Colors.surfaceHighest,
                py: { xs: 6, md: 8 },
            }}
        >
            <Container maxWidth="lg">
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
                    Discover Ajna Eye
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(3, 1fr)",
                        },
                        gap: 3,
                    }}
                >
                    {images === null
                        ? Array.from({ length: 3 }).map((_, index) => (
                              <Skeleton
                                  key={index}
                                  variant="rectangular"
                                  sx={{
                                      borderRadius: 4,
                                      aspectRatio: "1/1",
                                      width: "100%",
                                      height: "auto",
                                  }}
                              />
                          ))
                        : images.map((imageUrl, index) => (
                              <Box
                                  key={index}
                                  sx={{
                                      position: "relative",
                                      borderRadius: 4,
                                      overflow: "hidden",
                                      aspectRatio: "1/1",
                                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                      transition: "transform 0.3s ease",
                                      "&:hover": {
                                          transform: "scale(1.02)",
                                      },
                                  }}
                              >
                                  <Box
                                      component="img"
                                      src={imageUrl}
                                      alt={`Ajna Eye - Healing Services ${index + 1}`}
                                      loading="lazy"
                                      sx={{
                                          width: "100%",
                                          height: "100%",
                                          objectFit: "cover",
                                      }}
                                  />
                              </Box>
                          ))}
                </Box>
            </Container>
        </Box>
    );
}

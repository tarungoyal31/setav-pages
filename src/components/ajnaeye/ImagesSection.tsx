import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { M3Colors } from "../colors";
import { IMAGES } from "../../constants/ajnaeye";

export default function ImagesSection() {
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
                    {IMAGES.provider.map((imageUrl, index) => (
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

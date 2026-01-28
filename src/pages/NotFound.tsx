import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import AppBar1Floating from "../components/appbar/AppBar1Floating";
import Footer1Floating from "../components/footer/Footer1Floating";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <Box>
            <AppBar1Floating />
            <Container
                sx={{
                    pt: 15,
                    pb: 8,
                    minHeight: "60vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                }}
            >
                <Typography variant="h1" sx={{ fontSize: "6rem", fontWeight: 700 }}>
                    404
                </Typography>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Page Not Found
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    The page you're looking for doesn't exist or has been moved.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </Button>
            </Container>
            <Footer1Floating />
        </Box>
    );
}

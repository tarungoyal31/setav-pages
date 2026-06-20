/**
 * 404 — branded not-found page.
 * Returned when the host does not map to a registered, published site.
 *
 * PRD §3 / SEO §3.1: unknown hosts MUST return a real 404 (no soft-404).
 * Next.js App Router returns HTTP 404 automatically when notFound() is called
 * or when this file is reached.
 */

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        p: 4,
        bgcolor: "#f5f5f5",
      }}
    >
      <Typography variant="h3" component="h1" fontWeight={700} color="#333">
        404
      </Typography>
      <Typography variant="h6" color="text.secondary">
        This site is not available.
      </Typography>
      <Button
        variant="contained"
        component="a"
        href="https://setav.ai"
        sx={{ mt: 2 }}
      >
        Go to Setav
      </Button>
    </Box>
  );
}

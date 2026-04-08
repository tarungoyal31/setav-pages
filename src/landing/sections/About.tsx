import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { aboutText } from "../data/info";
import { M3Colors } from "../../components/colors";

const highlights = [
  { label: "Years Experience", value: "25+" },
  { label: "Economics Graduate", value: "Honors" },
  { label: "Professional Experience", value: "35 Years" },
];

export default function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: M3Colors.surface }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: M3Colors.onSurface,
            mb: 4,
          }}
        >
          About Sanjay Prasad
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          sx={{ mb: 4 }}
        >
          {highlights.map((item) => (
            <Paper
              key={item.label}
              elevation={0}
              sx={{
                p: 2,
                textAlign: "center",
                bgcolor: M3Colors.surfaceHighest,
                borderRadius: 2,
                minWidth: 140,
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: M3Colors.primary }}
              >
                {item.value}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: M3Colors.onSurfaceVariant }}
              >
                {item.label}
              </Typography>
            </Paper>
          ))}
        </Stack>

        <Box sx={{ position: "relative" }}>
          <Typography
            sx={{
              color: M3Colors.onSurface,
              lineHeight: 1.8,
              fontSize: "1.05rem",
              whiteSpace: "pre-line",
              ...(!expanded && {
                display: "-webkit-box",
                WebkitLineClamp: 6,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }),
            }}
          >
            {aboutText}
          </Typography>
          <Button
            onClick={() => setExpanded(!expanded)}
            sx={{
              display: "block",
              mx: "auto",
              mt: 1,
              color: M3Colors.primary,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            {expanded ? "View Less" : "View More"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

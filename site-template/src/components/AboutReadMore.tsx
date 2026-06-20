"use client";

/**
 * AboutReadMore — client island for the About section's expand/collapse toggle.
 *
 * Kept minimal: only the text box + button are client-side.
 * The parent AboutSection (server component) renders everything else.
 */

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface AboutReadMoreProps {
  bio: string;
}

export default function AboutReadMore({ bio }: AboutReadMoreProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box>
      <Typography
        sx={{
          color: "text.primary",
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
        {bio}
      </Typography>
      <Button
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        sx={{
          display: "block",
          mx: "auto",
          mt: 1,
          color: "primary.main",
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        {expanded ? "View Less" : "View More"}
      </Button>
    </Box>
  );
}

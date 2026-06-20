"use client";

/**
 * SectionStub — placeholder for sections not yet ported in P3.1.
 *
 * In P3.2 each section type gets its own full component. Until then
 * the stub renders a minimal, accessible marker so:
 *  - The page structure (landmarks, heading order) is intact
 *  - Developers can visually confirm which sections config enables
 *  - The SSR render loop works end-to-end
 *
 * Stubs are ONLY shown in dev (NODE_ENV !== "production"). In production
 * missing section components simply don't render (see SectionRunner).
 */

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface SectionStubProps {
  type: string;
  order: number;
}

export default function SectionStub({ type, order }: SectionStubProps) {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <Box
      component="section"
      aria-label={`${type} (coming in P3.2)`}
      sx={{
        py: 4,
        px: 3,
        borderTop: "2px dashed",
        borderColor: "divider",
        bgcolor: "background.paper",
        opacity: 0.6,
      }}
    >
      <Typography variant="body2" color="text.secondary" textAlign="center">
        [{order}] <strong>{type}</strong> — section coming in P3.2
      </Typography>
    </Box>
  );
}

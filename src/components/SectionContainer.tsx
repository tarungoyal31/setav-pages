import Box from "@mui/material/Box";
import { ReactNode } from "react";

interface SectionContainerProps {
    children: ReactNode;
    id?: string;
    backgroundColor?: string;
}

export default function SectionContainer({
    children,
    id,
    backgroundColor,
}: SectionContainerProps) {
    return (
        <Box
            id={id}
            component="section"
            sx={{
                py: { xs: 6, md: 10 },
                px: { xs: 2, md: 4 },
                backgroundColor: backgroundColor ?? "transparent",
            }}
        >
            <Box sx={{ maxWidth: 1200, mx: "auto" }}>{children}</Box>
        </Box>
    );
}

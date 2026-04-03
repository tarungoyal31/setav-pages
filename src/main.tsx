import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import { palette } from "./components/colors.ts";

const theme = createTheme({
    palette: {
        primary: {
            main: palette.accent,
            contrastText: "#fff",
        },
        background: {
            default: palette.white,
            paper: palette.white,
        },
        text: {
            primary: palette.text,
            secondary: palette.textMuted,
        },
    },
    typography: {
        fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
        h1: { fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05 },
        h2: { fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 },
        h3: { fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15 },
        h4: { fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2 },
        h5: { fontWeight: 600, letterSpacing: "-0.01em" },
        h6: { fontWeight: 600 },
        body1: { lineHeight: 1.7, letterSpacing: "-0.01em" },
        body2: { lineHeight: 1.7 },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 999,
                    letterSpacing: "-0.01em",
                },
            },
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    </React.StrictMode>
);

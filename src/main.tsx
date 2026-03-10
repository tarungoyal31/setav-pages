import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material";
import {BrowserRouter as Router} from "react-router-dom";
import {M3Colors} from "./components/colors.ts";

const theme = createTheme({
    typography: {
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        h1: { fontFamily: "'Playfair Display', Georgia, serif" },
        h2: { fontFamily: "'Playfair Display', Georgia, serif" },
        h3: { fontFamily: "'Playfair Display', Georgia, serif" },
        h4: { fontFamily: "'Playfair Display', Georgia, serif" },
        h5: { fontFamily: "'Playfair Display', Georgia, serif" },
    },
    palette: {
        primary: {
            main: M3Colors.primary,
            light: M3Colors.primaryLight,
            dark: M3Colors.primaryDark,
            contrastText: "#ffffff",
        },
        secondary: {
            main: M3Colors.accent,
            light: M3Colors.accentLight,
            dark: M3Colors.accentDark,
            contrastText: "#ffffff",
        },
        background: {
            default: M3Colors.surface,
            paper: M3Colors.surfaceHigh,
        },
        text: {
            primary: M3Colors.onSurface,
            secondary: M3Colors.onSurfaceVariant,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none" as const,
                    fontWeight: 600,
                    borderRadius: 50,
                    padding: "12px 32px",
                    fontSize: "1rem",
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

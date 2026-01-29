import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material";
import {BrowserRouter as Router,} from "react-router-dom";
import {M3Colors} from "./components/colors.ts";

const theme = createTheme({
    palette: {
        primary: {
            main: M3Colors.primary,
            contrastText: "#fff",
        },
        secondary: {
            main: M3Colors.secondary,
            contrastText: "#fff",
        },
        background: {
            default: M3Colors.surface,
            paper: M3Colors.surfaceHighest,
        },
        text: {
            primary: M3Colors.onSurface,
            secondary: M3Colors.onSurfaceVariant,
        },
    },
    typography: {
        fontFamily: '"Inter", system-ui, Avenir, Helvetica, Arial, sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 600 },
    },
    components: {},
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

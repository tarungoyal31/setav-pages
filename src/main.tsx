import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material";
import {
    BrowserRouter as Router,
} from "react-router-dom";
import {M3Colors} from "./components/colors.ts";

Amplify.configure(outputs);

const theme = createTheme({
    palette: {
        primary: {
            main: M3Colors.primary,
            contrastText: M3Colors.onSurface,
        },
        secondary: {
            main: M3Colors.secondary,
            contrastText: M3Colors.onSurface,
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

    components: {
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

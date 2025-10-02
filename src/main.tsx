import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import { Amplify } from "aws-amplify";
// import outputs from "../amplify_outputs.json";
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material";
import {
    BrowserRouter as Router,
} from "react-router-dom";

// Amplify.configure(outputs);

const theme = createTheme();

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

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";

import FormOrganizationDetails from "./pages/Form-Organization-Details.tsx";
import FormUserDetails from "./pages/Form-User-Details.tsx";
import FormStepper from "./pages/Form-Stepper.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import FormExtraOrganizationDetails from "./pages/Form-Extra-Organization-Details.tsx";
import { mainTheme } from "./theme.ts";
import LandingPage from "./pages/Landing-Page.tsx";
import OrganizationDetails from "./pages/Organizaiton-Details.tsx";
const theme = createTheme({
  // direction: "rtl",
  typography: {
    fontFamily: "Almarai, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      margin: "2rem 0",
    },
  },
  palette: {
    primary: {
      main: "#bf892d", // Gold
      light: "#d4a24a",
    },
    secondary: {
      main: "#141f2c", // Dark blue
      contrastText: "#fff",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "12px 32px",
          fontSize: "1.1rem",
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/form" element={<FormStepper />}>
            <Route path="organization" element={<FormOrganizationDetails />} />
            <Route path="user" element={<FormUserDetails />} />
            <Route
              path="extra-organization-details"
              element={<FormExtraOrganizationDetails />}
            />
          </Route>
          <Route path="/organization" element={<OrganizationDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);

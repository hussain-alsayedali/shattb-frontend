import "./App.css";

import FormOrganizationDetails from "./pages/Form-Organization-details";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Almarai, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#bf892d",
    },
    secondary: {
      main: "#141f2c",
    },
  },
  components: {},
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <FormOrganizationDetails />
      </ThemeProvider>
    </>
  );
}

export default App;

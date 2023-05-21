import "./App.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Header } from "./components/Header";
import { LaneAvailabilityPage } from "./pages/LaneAvailabilityPage/LaneAvailabilityPage";

const queryClient = new QueryClient();

const darkTheme = createTheme({
  palette: {
    // Enable Dark Mode Toggle
    // mode: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        {<CssBaseline />}
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Header />
            <LaneAvailabilityPage />
          </LocalizationProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

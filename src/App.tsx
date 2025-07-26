import "./App.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { BottomToolbar } from "src/components/bottom-toolbar";
import { Header } from "src/components/header";
import { queryClient } from "src/lib/react-query";
import { HomePage } from "src/pages/home-page";

const darkTheme = createTheme({
  palette: {
    // Enable Dark Mode Toggle
    // mode: "dark",
  },
});

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        {<CssBaseline />}
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Header />
            <HomePage 
              isDrawerOpen={isDrawerOpen}
              onDrawerToggle={handleDrawerToggle}
            />
            <BottomToolbar onDrawerToggle={handleDrawerToggle} />
          </LocalizationProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

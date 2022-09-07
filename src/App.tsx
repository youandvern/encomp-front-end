import React from "react";
import { createTheme, ThemeProvider, Container } from "@mui/material";
import "./App.css";
import HomePage from "./components/HomePage";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import LogInView from "./components/LogInView";
import RegisterView from "./components/RegisterView";

export const GLOBAL_THEME = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#004aad",
    },
    secondary: {
      main: "#faa92f",
    },
  },
});

function App() {
  return (
    <Container maxWidth="md">
      <ThemeProvider theme={GLOBAL_THEME}>
        <Routes>
          <Route path={routes.home.path} element={<HomePage />} />
          <Route path={routes.login.path} element={<LogInView />} />
          <Route path={routes.register.path} element={<RegisterView />} />
        </Routes>
      </ThemeProvider>
    </Container>
  );
}

export default App;

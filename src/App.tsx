import React from "react";
import { createTheme, ThemeProvider, Container } from "@mui/material";
import "./App.css";
import HomePage from "./components/Pages/HomePage";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import LogInView from "./components/LoginForm";
import RegisterView from "./components/RegisterForm";
import ProjectsPage from "./components/Pages/ProjectsPage";

import { Provider } from "react-redux";
import { store } from "./store";
import ErrorManager from "./components/ErrorManager";
import ErrorSnackbar from "./components/ErrorSnackbar";

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
    <Provider store={store}>
      <ThemeProvider theme={GLOBAL_THEME}>
        <Container maxWidth="md">
          <ErrorManager />
          <ErrorSnackbar />
          <Routes>
            <Route path={routes.home.path} element={<HomePage />} />
            <Route path={routes.login.path} element={<LogInView />} />
            <Route path={routes.register.path} element={<RegisterView />} />
            <Route path={routes.projects.path} element={<ProjectsPage />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

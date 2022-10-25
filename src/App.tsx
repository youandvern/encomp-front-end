import { createTheme, ThemeProvider, Container } from "@mui/material";
import "./App.css";
import HomePage from "./components/Pages/HomePage";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import LogInView from "./components/LoginForm";
import RegisterView from "./components/RegisterForm";
import ProjectsPage from "./components/Pages/ProjectsPage";
import LoggedInRoute from "./components/LoggedInRoute";
import LoggedOutRoute from "./components/LoggedOutRoute";

import ErrorManager from "./components/ErrorManager";
import ErrorSnackbar from "./components/ErrorSnackbar";
import TemplateUploadPage from "./components/Pages/TemplateUploadPage";
import TemplateContentPage from "./components/Pages/TemplateContentPage";
import TemplateSelectedRoute from "./components/TemplateSelectedRoute";

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
      light: "#fccc83",
    },
  },
  typography: {
    h1: {
      fontSize: "4rem",
      fontWeight: "500",
    },
    h2: {
      fontSize: "3rem",
      fontWeight: "600",
    },
    h3: {
      fontSize: "2.25rem",
      fontWeight: "600",
    },
    h4: {
      fontSize: "1.875rem",
      fontWeight: "600",
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: "700",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: "700",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={GLOBAL_THEME}>
      <Container maxWidth="md">
        <ErrorManager />
        <ErrorSnackbar />
        <Routes>
          <Route path={routes.home.path} element={<HomePage />} />
          <Route path={routes.login.path} element={<LoggedOutRoute children={<LogInView />} />} />
          <Route
            path={routes.register.path}
            element={<LoggedOutRoute children={<RegisterView />} />}
          />
          <Route
            path={routes.projects.path}
            element={<LoggedInRoute children={<ProjectsPage />} />}
          />
          <Route
            path={routes.templates.path}
            element={<LoggedInRoute children={<TemplateUploadPage />} />}
          />
          <Route
            path={routes.templateContent.path}
            element={<TemplateSelectedRoute children={<TemplateContentPage />} />}
          />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;

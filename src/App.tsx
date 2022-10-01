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

// TODO: use authorized routes
function App() {
  return (
    <ThemeProvider theme={GLOBAL_THEME}>
      <Container maxWidth="md">
        <ErrorManager />
        <ErrorSnackbar />
        <Routes>
          <Route path={routes.home.path} element={<HomePage />} />
          <Route path={routes.login.path} element={<LogInView />} />
          <Route
            path={routes.register.path}
            element={<LoggedOutRoute children={<RegisterView />} />}
          />
          <Route
            path={routes.projects.path}
            element={<LoggedInRoute children={<ProjectsPage />} />}
          />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;

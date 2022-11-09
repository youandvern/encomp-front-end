import { createTheme, ThemeProvider, Container } from "@mui/material";
import "./App.css";
import HomePage from "./components/Pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import LogInView from "./components/LoginForm";
import RegisterView from "./components/RegisterForm";
import ProjectsPage from "./components/Pages/ProjectsPage";
import LoggedInRoute from "./components/LoggedInRoute";
import LoggedOutRoute from "./components/LoggedOutRoute";

import TemplateUploadPage from "./components/Pages/TemplateUploadPage";
import TemplateContentPage from "./components/Pages/TemplateContentPage";
import TemplateSelectedRoute from "./components/TemplateSelectedRoute";
import CalculationDesignPage from "./components/Pages/CalculationDesignPage";
import GlobalBasePage from "./components/Pages/GlobalBasePage";

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
      light: "#b3d4ff",
    },
    secondary: {
      main: "#faa92f",
      light: "#fccc83",
    },
    success: {
      main: "#00af54",
      light: "#d2ffc8",
    },
    error: {
      main: "#bf211e",
      light: "#ffc8cb",
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

// TODO: update error page
const router = createBrowserRouter([
  {
    path: routes.home.path(),
    element: <GlobalBasePage />,
    errorElement: <div>Sorry, this page is not found.</div>,
    children: [
      {
        errorElement: <div>Sorry, this page is not found.</div>,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: routes.login.path(),
            element: <LoggedOutRoute children={<LogInView />} />,
          },
          {
            path: routes.register.path(),
            element: <LoggedOutRoute children={<RegisterView />} />,
          },
          {
            path: routes.projects.path(),
            element: <LoggedInRoute children={<ProjectsPage />} />,
          },
          {
            path: routes.templates.path(),
            element: <LoggedInRoute children={<TemplateUploadPage />} />,
          },
          {
            path: routes.templateContent.path(),
            element: <TemplateSelectedRoute children={<TemplateContentPage />} />,
          },
          {
            path: routes.calculation.path(),
            element: <CalculationDesignPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={GLOBAL_THEME}>
      <Container maxWidth="xl">
        <RouterProvider router={router} />
      </Container>
    </ThemeProvider>
  );
}

export default App;

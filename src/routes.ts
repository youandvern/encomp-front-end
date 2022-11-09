export interface RouteT {
  display: string;
  path: (id?: number) => string;
  description: string;
  requireLogin: boolean;
  onlyLoggedOut: boolean;
  requireSelectedTemplate?: boolean; // TODO: deprecate restricted route component
  requireCalcRunResults?: boolean;
}

// TODO: refactor routes for better typing
// TODO: make paths functions for dynamic path with input type number | ":id"
type routeKeys =
  | "home"
  | "login"
  | "register"
  | "projects"
  | "templates"
  | "templateContent"
  | "calculation";

export const routes: Record<routeKeys, RouteT> = {
  home: {
    display: "Home",
    path: () => "/",
    description: "The home page",
    requireLogin: false,
    onlyLoggedOut: false,
  },
  login: {
    display: "Log In",
    path: () => "/login",
    description: "The log in page",
    requireLogin: false,
    onlyLoggedOut: true,
  },
  register: {
    display: "Register",
    path: () => "/register",
    description: "The user registration in page",
    requireLogin: false,
    onlyLoggedOut: true,
  },
  projects: {
    display: "Projects",
    path: () => "/projects",
    description: "The projects page",
    requireLogin: true,
    onlyLoggedOut: false,
  },
  templates: {
    display: "Templates",
    path: () => "/templates",
    description: "The templates page",
    requireLogin: true,
    onlyLoggedOut: false,
  },
  // TODO: set up route to include template id with direct navigation
  templateContent: {
    display: "Template Editor",
    path: () => "/template-content",
    description: "The template content editor page",
    requireLogin: true,
    onlyLoggedOut: false,
    requireSelectedTemplate: true,
  },
  calculation: {
    display: "Design Portal",
    path: (id) => `/calculation/${id || ":id"}`,
    description: "The calculation design page",
    requireLogin: true,
    onlyLoggedOut: false,
    requireCalcRunResults: true,
  },
};

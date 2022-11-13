export interface RouteT {
  display: string;
  path: (id?: number) => string;
  description: string;
  appendIdType: "none" | "calculation" | "template" | "calculationReport";
  requireLogin: boolean;
  onlyLoggedOut: boolean;
  requireSelectedTemplate?: boolean;
  requireCalcRunResults?: boolean;
}

type routeKeys =
  | "home"
  | "login"
  | "register"
  | "projects"
  | "templates"
  | "templateContent"
  | "calculation"
  | "calculationReport";

export const routes: Record<routeKeys, RouteT> = {
  home: {
    display: "Home",
    path: () => "/",
    description: "The home page",
    appendIdType: "none",
    requireLogin: false,
    onlyLoggedOut: false,
  },
  login: {
    display: "Log In",
    path: () => "/login",
    description: "The log in page",
    appendIdType: "none",
    requireLogin: false,
    onlyLoggedOut: true,
  },
  register: {
    display: "Register",
    path: () => "/register",
    description: "The user registration in page",
    appendIdType: "none",
    requireLogin: false,
    onlyLoggedOut: true,
  },
  projects: {
    display: "Projects",
    path: () => "/projects",
    description: "The projects page",
    appendIdType: "none",
    requireLogin: true,
    onlyLoggedOut: false,
  },
  templates: {
    display: "Templates",
    path: () => "/templates",
    description: "The templates page",
    appendIdType: "none",
    requireLogin: true,
    onlyLoggedOut: false,
  },
  templateContent: {
    display: "Template Editor",
    path: (id) => `/template/${id || ":id"}`,
    description: "The template content editor page",
    appendIdType: "template",
    requireLogin: true,
    onlyLoggedOut: false,
    requireSelectedTemplate: true,
  },
  calculation: {
    display: "Design Portal",
    path: (id) => `/calculation/${id || ":id"}`,
    description: "The calculation design page",
    appendIdType: "calculation",
    requireLogin: true,
    onlyLoggedOut: false,
    requireCalcRunResults: true,
  },
  calculationReport: {
    display: "Calculation Report",
    path: (id) => `/calculation-report/${id || ":id"}`,
    description: "The calculation report print page",
    appendIdType: "calculationReport",
    requireLogin: true, // never display on menu bar when both are true
    onlyLoggedOut: true,
    requireCalcRunResults: true,
  },
};

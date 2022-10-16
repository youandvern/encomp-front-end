export interface RouteT {
  display: string;
  path: string;
  description: string;
  requireLogin: boolean;
  onlyLoggedOut: boolean;
}

export const routes: Record<string, RouteT> = {
  home: {
    display: "Home",
    path: "/",
    description: "The home page",
    requireLogin: false,
    onlyLoggedOut: false,
  },
  login: {
    display: "Log In",
    path: "/login",
    description: "The log in page",
    requireLogin: false,
    onlyLoggedOut: true,
  },
  register: {
    display: "Register",
    path: "/register",
    description: "The user registration in page",
    requireLogin: false,
    onlyLoggedOut: true,
  },
  projects: {
    display: "Projects",
    path: "/projects",
    description: "The projects page",
    requireLogin: true,
    onlyLoggedOut: false,
  },
  templates: {
    display: "Templates",
    path: "/templates",
    description: "The templates page",
    requireLogin: true,
    onlyLoggedOut: false,
  },
};

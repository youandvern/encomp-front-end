interface RouteT {
  display: string;
  path: string;
  description: string;
  requireLogin: boolean;
}

export const routes: Record<string, RouteT> = {
  home: { display: "Home", path: "/", description: "The home page", requireLogin: false },
  login: { display: "Log In", path: "/login", description: "The log in page", requireLogin: false },
  register: {
    display: "Register",
    path: "/register",
    description: "The user registration in page",
    requireLogin: false,
  },
  projects: {
    display: "Projects",
    path: "/projects",
    description: "The projects page",
    requireLogin: true,
  },
};

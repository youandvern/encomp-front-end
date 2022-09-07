interface RouteT {
  display: string;
  path: string;
  description: string;
}

export const routes: Record<string, RouteT> = {
  home: { display: "Home", path: "/", description: "The home page" },
  login: { display: "Log In", path: "/login", description: "The log in page" },
  register: {
    display: "Register",
    path: "/register",
    description: "The user registration in page",
  },
};

import Cookies from "js-cookie";
import ProjectT, { ProjectDto } from "./commonTypes/Project";
import User, { UserLoginDto, UserRegisterDto } from "./commonTypes/User";

///
/// Switch for production deployment
///
export const API_BASE_URL = "http://localhost:8000/api/"; // development
// export const API_BASE_URL = "http://localhost:8000/api/"; // production

///
/// Common Utilities
///

export const LOGGED_OUT = "LOGGED_OUT";

function getCommonPostHeaders() {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  return requestHeaders;
}

function getPostHeadersWithCsrf() {
  const requestHeaders = getCommonPostHeaders();
  const csrfCookie = Cookies.get("csrftoken");
  requestHeaders.set("X-CSRFTOKEN", csrfCookie ? csrfCookie : "not found");
  return requestHeaders;
}

function rejectMessage(response: Response, message: string) {
  switch (response.status) {
    case 401:
      return LOGGED_OUT;
    default:
      return `${message}: ${response.status} - ${response.statusText}`;
  }
}

async function commonApiReturn(response: Response, failMessage: string) {
  if (response.ok) {
    return await response.json();
  } else {
    return Promise.reject(rejectMessage(response, failMessage));
  }
}

///
/// Projects
///

export async function apiFetchProjects(): Promise<ProjectT[]> {
  const response = await fetch(API_BASE_URL + "projects/", { credentials: "include" });
  return await commonApiReturn(response, "Failed to get project");
}

export async function apiCreateProject(projectDto: ProjectDto): Promise<ProjectT> {
  const response = await fetch(API_BASE_URL + "projects/", {
    method: "POST",
    body: JSON.stringify(projectDto),
    headers: getPostHeadersWithCsrf(),
    credentials: "include",
  });
  return await commonApiReturn(response, `Failed to create project ${projectDto.name}`);
}

export async function apiDeleteProject(id: number): Promise<boolean> {
  const response = await fetch(`${API_BASE_URL}projects/${id}/`, {
    method: "DELETE",
    credentials: "include",
  });

  if (response.ok) {
    // DELETE returns 204 code with no json body
    return true;
  } else {
    return Promise.reject(rejectMessage(response, "Failed to delete project"));
  }
}

///
/// Users
///

export async function apiLogin(loginDto: UserLoginDto): Promise<User> {
  const response = await fetch(API_BASE_URL + "auth/login/", {
    method: "POST",
    body: JSON.stringify({ username: loginDto.email, password: loginDto.password }),
    headers: getCommonPostHeaders(),
    credentials: "include",
  });
  if (response.ok) {
    const data = await response.json();
    return data["user"];
  } else {
    return Promise.reject(rejectMessage(response, "Failed to login"));
  }
}

export async function apiRegister(registerDto: UserRegisterDto): Promise<User> {
  const response = await fetch(API_BASE_URL + "auth/register/", {
    method: "POST",
    body: JSON.stringify({
      username: registerDto.email,
      email: registerDto.email,
      password: registerDto.password,
    }),
    headers: getCommonPostHeaders(),
    credentials: "include",
  });
  if (response.ok) {
    const data = await response.json();
    return data["user"];
  } else {
    return Promise.reject(rejectMessage(response, "Failed to register user"));
  }
}

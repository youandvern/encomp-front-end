import ProjectT, { ProjectDto } from "./commonTypes/Project";
import User, { UserLoginDto, UserRegisterDto } from "./commonTypes/User";

///
/// Switch for production deployment
///
export const API_BASE_URL = "http://localhost:8000/api/"; // development
// export const API_BASE_URL = "http://localhost:8000/api/"; // production

///
/// Projects
///

export async function apiFetchProjects(): Promise<ProjectT[]> {
  const response = await fetch(API_BASE_URL + "projects/", { credentials: "include" });
  // TODO: refactor below into api helper
  if (response.ok) {
    return await response.json();
  } else {
    return Promise.reject(`${response.status}: ${response.statusText}`);
  }
}

export async function apiCreateProject(projectDto: ProjectDto): Promise<ProjectT> {
  const response = await fetch(API_BASE_URL + "projects/", {
    method: "POST",
    body: JSON.stringify(projectDto),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.ok) {
    return await response.json();
  } else {
    return Promise.reject(`${response.status}: ${response.statusText}`);
  }
}

export async function apiDeleteProject(id: number): Promise<boolean> {
  const response = await fetch(`${API_BASE_URL}projects/${id}/`, {
    method: "DELETE",
  });

  // DELETE returns 204 code with no json body
  if (!response.ok) {
    console.log(response.status);
  }
  return response.ok;
}

export async function apiLogin(loginDto: UserLoginDto): Promise<User> {
  const response = await fetch(API_BASE_URL + "auth/login/", {
    method: "POST",
    body: JSON.stringify({ username: loginDto.email, password: loginDto.password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.ok) {
    return await response.json();
  } else {
    return Promise.reject(`${response.status}: ${response.statusText}`);
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
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data["user"];
  } else {
    return Promise.reject(`${response.status}: ${response.statusText}`);
  }
}

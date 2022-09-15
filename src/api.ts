import ProjectT, { ProjectDto } from "./commonTypes/Project";

///
/// Switch for production deployment
///
export const API_BASE_URL = "http://localhost:8000/api/"; // development
// export const API_BASE_URL = "http://localhost:8000/api/"; // production

///
/// Projects
///

export async function apiFetchProjects(): Promise<ProjectT[]> {
  const response = await fetch(API_BASE_URL + "projects/");
  return await response.json();
}

export async function apiCreateProject(projectDto: ProjectDto): Promise<ProjectT> {
  const response = await fetch(API_BASE_URL + "projects/", {
    method: "POST",
    body: JSON.stringify(projectDto),
    headers: {
      "Content-Type": "application/json",
    },
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

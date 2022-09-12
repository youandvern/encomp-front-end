import { ProjectT } from "./commonTypes/Projects";

///
/// Switch for production deployment
///
export const API_BASE_URL = "http://localhost:8000/api/"; // development
// export const API_BASE_URL = "http://localhost:8000/api/"; // production

export async function apiFetchProjects(): Promise<ProjectT[]> {
  const response = await fetch(API_BASE_URL + "projects/");
  return await response.json();
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

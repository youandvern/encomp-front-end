export interface ProjectT {
  id: number;
  name: string;
  description?: string;
  created_on: string;
}

export default interface ProjectsT {
  projects: ProjectT[];
}

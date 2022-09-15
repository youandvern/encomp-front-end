export default interface ProjectT {
  id: number;
  name: string;
  description?: string;
  created_on: string;
}

export interface ProjectDto {
  name: string;
  description?: string;
}

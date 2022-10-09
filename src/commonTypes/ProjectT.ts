import { CalculationForProjectT } from "./CalculationT";

export default interface ProjectT {
  id: number;
  name: string;
  description?: string;
  calculations: CalculationForProjectT[];
  created_on: string;
}

export interface ProjectDto {
  name: string;
  description?: string;
}

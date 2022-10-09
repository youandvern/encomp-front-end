export default interface CalculationT {
  id: number;
  projectId: number;
  name: string;
  description?: string;
  input?: { [key: string]: number | string | null };
}

export interface CalculationForProjectT {
  id: number;
  name: string;
  description?: string;
}

export interface CalculationDto {
  name: string;
  description?: string;
  projectId: number;
}

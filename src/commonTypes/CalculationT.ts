export default interface CalculationT {
  id: number;
  projectId: number;
  templateId: number;
  name: string;
  description?: string;
  input?: { [key: string]: number | string | null };
}

export interface CalculationForProjectT {
  id: number;
  name: string;
  templateId: number;
  description?: string;
}

export interface CalculationDto {
  name: string;
  description?: string;
  projectId: number;
  templateId: number;
}

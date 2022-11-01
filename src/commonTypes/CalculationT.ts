import { CalcTypeToParse } from "./CalculationRunTypes";

export default interface CalculationT {
  id: number;
  projectId: number;
  templateId: number;
  name: string;
  description?: string;
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

export interface CalculationRunDto {
  id: number;
  inputs?: { [key: string]: number | string }; // Sent
}

export interface CalculationRunResponse {
  id: number;
  items: CalcTypeToParse[]; // Received
}

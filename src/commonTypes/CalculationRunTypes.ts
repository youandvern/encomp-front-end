export interface CalcTypeToParse {
  type: string;
  [key: string]: any;
}

export interface CalculationTitle {
  value?: string;
}

export interface DescriptionHead {
  value?: string;
}

export interface Assumption {
  value?: string;
}

export type InputT = "number" | "select" | "text";

export interface DeclareVariable {
  value?: number | string;
  name?: string;
  unit?: string;
  description?: string;
  codeRef?: string;
  inputType?: InputT;
  numStep?: number | "any" | null;
  minValue?: number | null;
  maxValue?: number | null;
  inputOptions?: string[] | number[] | null;
  tex?: string;
}

export interface CalcVariable {
  value?: number | string;
  name?: string;
  unit?: string;
  description?: string;
  codeRef?: string;
  finalResult?: boolean;
  calcLength?: "long" | "number" | "short";
  symbolic?: string;
  substituted?: string;
  resultWithUnit?: string;
  error?: string | null;
}

export interface CheckVariable {
  value?: boolean;
  resultMessage?: string;
  unit?: string;
  description?: string;
  codeRef?: string;
  finalResult?: boolean; // rename finalResult
  symbolic?: string;
  substituted?: string;
  resultWithUnit?: string;
}

export interface CheckVariablesText {
  unit?: string;
  description?: string;
  codeRef?: string;
  finalResult?: boolean;
  symbolic?: string;
}

export interface BodyText {
  value?: string;
  codeRef?: string;
}

export interface BodyHeader {
  value?: string;
  codeRef?: string;
  level?: number;
}

// TODO: Declare and Calc tables

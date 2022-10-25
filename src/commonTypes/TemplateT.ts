export default interface TemplateT {
  id: number;
  name: string;
  description?: string;
  createdOn?: string;
}

export interface TemplateInfoT {
  id: number;
  name: string;
  description?: string;
}

export interface TemplateDto {
  name: string;
  description?: string;
  fileContent: string;
}

export interface TemplateContentDto {
  id: number;
  content: string;
}

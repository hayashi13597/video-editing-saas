import { StatusType } from "@/types/form";

// Table component types - moved from constants to avoid circular dependency

export type FieldType =
  | "status"
  | "title"
  | "applicant"
  | "requestDate"
  | "deadline"
  | "points"
  | "action"
  | "image"
  | "freelancer"
  | "startDate"
  | "endDate"
  | "rating";

export interface ColumnConfig {
  key: FieldType;
  label: string;
  className?: string;
}

export interface TableRowData {
  id: string;
  status?: StatusType;
  title?: string;
  applicant?: string;
  requestDate?: string;
  deadline?: string;
  points?: number | string;
  href?: string;
  image?: string;
  freelancer?: string;
  startDate?: string;
  endDate?: string;
  rating?: number;
}

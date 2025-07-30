import { Badge } from "@/components/ui/badge";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
const Grip4 = dynamic(() => import("../../../public/icons/grip-4.svg"), {
  ssr: false
});
import React from "react";

// Define all possible field types
export type FieldType =
  | "status"
  | "title"
  | "applicant"
  | "requestDate"
  | "deadline"
  | "points"
  | "action";

// Define column configuration
export interface ColumnConfig {
  key: FieldType;
  label: string;
  className?: string;
}

// Define row data structure
export interface TableRowData {
  id: string;
  status?: {
    label: string;
    variant?: string;
  };
  title?: string;
  applicant?: string;
  requestDate?: string;
  deadline?: string;
  points?: string;
  href?: string;
}

// Table props interface
export interface TableProps {
  columns: ColumnConfig[];
  data: TableRowData[];
  icon?: boolean;
}

// Default column configurations
export const defaultColumns: ColumnConfig[] = [
  { key: "status", label: "ステータス" },
  { key: "title", label: "企業紹介動画" },
  { key: "applicant", label: "応募者" },
  { key: "requestDate", label: "依頼日" },
  { key: "deadline", label: "納期" },
  { key: "points", label: "ポイント" },
  { key: "action", label: "　" }
];

// Render cell content based on field type
const renderCellContent = (
  field: FieldType,
  data: TableRowData,
  icon: boolean = true
) => {
  switch (field) {
    case "status":
      return data.status ? (
        <Badge className="rounded-full bg-badge text-white">
          {data.status.label}
        </Badge>
      ) : null;

    case "title":
      return data.title ? (
        <p className="body-text line-clamp-1 wrap-anywhere">{data.title}</p>
      ) : null;

    case "applicant":
      return data.applicant ? (
        <p className="body-text line-clamp-1 wrap-anywhere">{data.applicant}</p>
      ) : null;

    case "requestDate":
      return data.requestDate ? (
        <p className="body-text line-clamp-1 wrap-anywhere">
          {data.requestDate}
        </p>
      ) : null;

    case "deadline":
      return data.deadline ? (
        <p className="body-text line-clamp-1 wrap-anywhere">{data.deadline}</p>
      ) : null;

    case "points":
      return data.points ? (
        <p className="body-text line-clamp-1 wrap-anywhere">{data.points}</p>
      ) : null;

    case "action":
      return icon ? (
        <div className="flex-center justify-end h-full">
          <EllipsisVertical size={16} />
        </div>
      ) : null;

    default:
      return null;
  }
};

const Table: React.FC<TableProps> = ({
  columns = defaultColumns,
  data = [],
  icon = true
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {/* Header Row */}
        <div
          className="grid px-3 gap-6 text-gray"
          style={{
            gridTemplateColumns: columns
              .map((column, idx) => {
                if (idx === columns.length - 1) return "max-content";
                if (column.key === "title") return `${12 - columns.length}fr`;
                return "minmax(auto, 1fr)";
              })
              .join(" ")
          }}
        >
          {columns.map(column => (
            <React.Fragment key={column.key}>
              <p className="body-text line-clamp-1 wrap-anywhere">
                {column.label}
              </p>
            </React.Fragment>
          ))}
        </div>

        {/* Data Rows */}
        {data.map(row => (
          <div
            key={row.id}
            className="grid gap-6 px-3 py-2 bg-white rounded-6"
            style={{
              gridTemplateColumns: columns
                .map((column, idx) => {
                  if (idx === columns.length - 1) return "max-content";
                  if (column.key === "title") return `${12 - columns.length}fr`;
                  return "1fr";
                })
                .join(" ")
            }}
          >
            {columns.map(column => (
              <React.Fragment key={column.key}>
                {renderCellContent(column.key, row, icon)}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>

      <Link
        href="/projects"
        className="body-text text-green-main flex-end gap-2"
      >
        <Grip4 /> もっと見る
      </Link>
    </div>
  );
};

export default Table;

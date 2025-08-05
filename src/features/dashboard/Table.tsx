"use client";

import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  CircleAlert,
  EllipsisVertical,
  SquarePen
} from "lucide-react";
import Link from "next/link";
import Grip4 from "../../../public/icons/grip-4.svg";
import React from "react";
import Image from "next/image";
import { StatusType, UserRole } from "@/types/form";
import { cn, getColorStatus, getColorStatusText } from "@/lib/utils";
import PaginationCustom from "./PaginationCustom";
import { routesApp } from "@/constants/routesApp";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import ChatIcon from "../../../public/icons/chat.svg";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

// Define all possible field types
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

// Define column configuration
export interface ColumnConfig {
  key: FieldType;
  label: string;
  className?: string;
}

// Define row data structure
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

// Table props interface
export interface TableProps {
  columns: ColumnConfig[];
  data: TableRowData[];
  icon?: boolean;
  pagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (_page: number) => void;
  isIconVisible?: boolean;
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

const StarRating = ({ rating = 3.4, totalStars = 5 }) => {
  const fullStars = Math.floor(rating); // 3 full stars
  const decimalPart = rating % 1; // 0.4 for partial star
  const emptyStars = totalStars - Math.ceil(rating); // Remaining empty stars

  return (
    <div className="flex">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, index) => (
        <svg
          key={`full-${index}`}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#FFD700" // Yellow for full stars
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}

      {/* Partial Star */}
      {decimalPart > 0 && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="partial">
              <stop offset={`${decimalPart * 100}%`} stopColor="#FFD700" />
              <stop offset={`${decimalPart * 100}%`} stopColor="#D3D3D3" />
            </linearGradient>
          </defs>
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="url(#partial)"
          />
        </svg>
      )}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <svg
          key={`empty-${index}`}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#D3D3D3" // Gray for empty stars
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
};

// Render cell content based on field type
const renderCellContent = (
  field: FieldType,
  data: TableRowData,
  icon: boolean = true,
  isIconVisible: boolean = false,
  role?: UserRole,
  pathname?: string
) => {
  switch (field) {
    case "status":
      return data.status ? (
        <Badge
          className={cn(
            "rounded-full bg-badge text-white w-full max-w-14 h-6",
            getColorStatus(data.status)
          )}
        >
          {getColorStatusText(data.status)}
        </Badge>
      ) : null;

    case "title":
      return data.title ? (
        <p className="body-text line-clamp-1 wrap-anywhere">{data.title}</p>
      ) : null;

    case "applicant":
      return data.applicant ? (
        <p className="body-text line-clamp-1 wrap-anywhere">{data.applicant}</p>
      ) : (
        "-"
      );

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
        <p className="body-text line-clamp-1 wrap-anywhere">
          {Number(data.points).toLocaleString("ja-JP", { currency: "JPY" })}pt
        </p>
      ) : null;

    case "action":
      return icon ? (
        pathname === routesApp.list ? (
          <Link
            href={`${routesApp.projects}/${data.id}`}
            className="flex items-center gap-2"
          >
            <ChevronRight size={16} />
          </Link>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <div
                className={cn(
                  "flex-center justify-end cursor-pointer",
                  isIconVisible ? "invisible" : ""
                )}
              >
                <EllipsisVertical size={16} />
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={7}
              className="border-none shadow-md space-y-1"
            >
              {role === "CLIENT" && (
                <Link
                  href={`${routesApp.feedback}/${data.id}`}
                  className="flex items-center gap-2 body-text p-1"
                >
                  <SquarePen size={20} />
                  案件フィードバック
                </Link>
              )}
              {role === "FREELANCER" && (
                <Link
                  href={`${routesApp.projects}/${data.id}`}
                  className="flex items-center gap-2 body-text p-1"
                >
                  <CircleAlert size={20} />
                  案件詳細をみる
                </Link>
              )}
              <Link
                href={routesApp.chat}
                className="flex items-center gap-2 body-text p-1"
              >
                <ChatIcon width={20} height={20} />
                チャットに入る
              </Link>
            </PopoverContent>
          </Popover>
        )
      ) : null;

    case "image":
      return data.image ? (
        <Image
          src={data.image}
          alt="Project Thumbnail"
          width={74}
          height={54}
          className="w-auto h-auto object-contain"
        />
      ) : null;

    case "freelancer":
      return data.freelancer ? (
        <p className="body-text line-clamp-1 wrap-anywhere">
          {data.freelancer}
        </p>
      ) : (
        "-"
      );

    case "startDate":
      return data.startDate ? (
        <p className="body-text line-clamp-1 wrap-anywhere">{data.startDate}</p>
      ) : null;

    case "endDate":
      return data.endDate ? (
        <p className="body-text line-clamp-1 wrap-anywhere">{data.endDate}</p>
      ) : null;

    case "rating":
      return data.rating ? <StarRating rating={data.rating} /> : null;

    default:
      return null;
  }
};

const Table: React.FC<TableProps> = ({
  columns = defaultColumns,
  data = [],
  icon = true,
  pagination = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  isIconVisible = true
}) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user.role;

  return (
    <div className="space-y-4 pb-[60px]">
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
            className="grid gap-6 px-3 py-2 bg-white rounded-6 items-center"
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
                {renderCellContent(
                  column.key,
                  row,
                  icon,
                  isIconVisible,
                  role,
                  pathname
                )}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>

      {pagination ? (
        <PaginationCustom
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange || (() => {})}
        />
      ) : (
        <Link
          href={routesApp.projects}
          className="body-text text-green-main flex-end gap-2"
        >
          <Grip4 /> もっと見る
        </Link>
      )}
    </div>
  );
};

export default Table;

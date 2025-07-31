import { routesApp } from "@/constants/routesApp";
import { StatusType, UserRole } from "@/types/form";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Retrieves an environment variable, with a fallback option.
 * @param key - The name of the environment variable to retrieve.
 * @param fallback - An optional fallback value to return if the environment variable is not set.
 * @return The value of the environment variable or the fallback value.
 * This function is designed to work in both client-side and server-side contexts.
 * For client-side, it checks for variables prefixed with NEXT_PUBLIC_.
 * For server-side, it accesses all environment variables.
 */
export const getEnvVar = (key: string, fallback?: string): string => {
  // For client-side, only use NEXT_PUBLIC_ prefixed variables
  if (typeof window !== "undefined") {
    return (
      // eslint-disable-next-line
      (window as any).__NEXT_DATA__?.env?.[key] ||
      process.env[key] ||
      fallback ||
      ""
    );
  }

  // For server-side (SSR/SSG), access all environment variables
  return process.env[key] || fallback || "";
};

/**
 * Extracts the first error message from an ApiError object
 * @param error - The ApiError object to extract the message from
 * @param defaultMessage - A default message to return if no specific error message is found
 * @returns A string containing the error message or the default message
 */
export const getErrorMessage = (
  error: ApiError,
  defaultMessage = "エラーが発生しました"
): string => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return defaultMessage;
};

/**
 * Formats a file size in bytes to a human-readable string
 * @param bytes - The size in bytes to format
 * @returns A string representing the formatted size
 */
export function formatSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  // Determine the appropriate unit by calculating the log
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Format with 2 decimal places and round
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Generates a page title based on the current route and user role
 * @param pathname - The current route pathname
 * @param role - The user's role (e.g., CLIENT, FREELANCER)
 * @returns A string representing the page title
 */
export function getPageTile(pathname: string, role: UserRole): string {
  switch (pathname) {
    case routesApp.dashboard:
      return "ダッシュボード";
    case routesApp.profile:
      return "アカウント編集";
    case routesApp.create:
      return role === "CLIENT" ? "案件登録" : "応募可能な案件";
    case routesApp.projects:
      return role === "CLIENT" ? "案件一覧" : "応募済みの案件";
    case routesApp.chat:
      return "チャット";
    default:
      return "ダッシュボード";
  }
}

export function getColorStatus(status: StatusType): string {
  switch (status) {
    case "OPEN":
      return "bg-badge-open text-white";
    case "ASSIGNED":
      return "bg-badge-assigned text-white";
    case "REVIEW":
      return "bg-badge-review text-white";
    case "COMPLETED":
      return "bg-green-main text-white";
    default:
      return "bg-green-main text-white";
  }
}
export function getColorStatusText(status: StatusType): string {
  switch (status) {
    case "OPEN":
      return "募集中";
    case "ASSIGNED":
      return "編集中";
    case "REVIEW":
      return "進行中";
    case "COMPLETED":
      return "完了";
    default:
      return "募集中";
  }
}

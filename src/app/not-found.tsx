import { routesApp } from "@/constants/routesApp";
import Link from "next/link";

export const metadata = {
  title: "404 - ページが見つかりません",
  description: "お探しのページは存在しません。"
};

export default function NotFound() {
  return (
    <main className="flex-center h-screen bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-2xl font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          ページが見つかりません
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          申し訳ありません。お探しのページは見つかりませんでした。
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href={routesApp.dashboard}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            ダッシュボードへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}

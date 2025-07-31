import ClientNotFound from "@/components/ClientNotFound";

export const metadata = {
  title: "404 - ページが見つかりません",
  description: "お探しのページは存在しません。"
};

export default function NotFound() {
  return (
    <main className="flex-center h-screen bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-2xl font-semibold text-green-main">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-text sm:text-7xl">
          ページが見つかりません
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray sm:text-xl/8">
          申し訳ありません。お探しのページは見つかりませんでした。
        </p>
        {/* Client-only actions below */}
        <ClientNotFound />
      </div>
    </main>
  );
}

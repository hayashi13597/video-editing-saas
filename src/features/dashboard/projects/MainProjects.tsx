"use client";

import { columnsListPageData, dummyListPageData } from "@/constants";
import SearchInput from "../SearchInput";
import { routesApp } from "@/constants/routesApp";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Table from "../Table";
import StatusFilter from "./StatusFilter";
import { useSearchParams } from "next/navigation";

const MainProjects = () => {
  const searchParams = useSearchParams();
  // const status = searchParams.get("status") || "";
  // const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";

  return (
    <main className="space-y-6">
      <div className="flex-between">
        <StatusFilter keySearch="status" currentPathname={routesApp.projects} />

        <div className="flex gap-2">
          <SearchInput
            keySearch="search"
            currentPathname={routesApp.projects}
          />
          <Button className="button-text cursor-pointer">
            <Plus className="text-white" size={20} />
            新規案件追加
          </Button>
        </div>
      </div>

      <Table
        data={dummyListPageData}
        columns={columnsListPageData}
        pagination={true}
        totalPages={14}
        currentPage={Number(page)}
      />
    </main>
  );
};

export default MainProjects;

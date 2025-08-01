"use client";

import { columnsListPageData, dummyListPageData } from "@/constants";
import SearchInput from "../SearchInput";
import { routesApp } from "@/constants/routesApp";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Table from "../Table";
import StatusFilter from "../StatusFilter";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const MainProjects = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  return (
    <main className="space-y-6">
      <div className="flex-between">
        {session?.user.role === "CLIENT" ? <StatusFilter keySearch="status" currentPathname={routesApp.projects} /> : (<h3 className="h3-title">応募済みの案件</h3>)}

        <div className="flex gap-2">
          <SearchInput
            keySearch="search"
            currentPathname={routesApp.projects}
          />
          {
            session?.user.role === "CLIENT" && (
              <Button className="button-text cursor-pointer">
                <Plus className="text-white" size={20} />
                新規案件追加
              </Button>
            )
          }
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

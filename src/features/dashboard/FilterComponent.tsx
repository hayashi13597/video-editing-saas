"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SearchInput from "./SearchInput";
import { routesApp } from "@/constants/routesApp";
import { useSession } from "next-auth/react";

const FilterComponent = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center gap-3">
      <SearchInput keySearch="keyword" currentPathname={routesApp.dashboard} />

      {session?.user.role === "CLIENT" && (
        <Button className="button-text cursor-pointer">
          <Plus className="text-white" size={20} />
          新規案件追加
        </Button>
      )}
    </div>
  );
};

export default FilterComponent;

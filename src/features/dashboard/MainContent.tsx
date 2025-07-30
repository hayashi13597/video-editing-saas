"use client";

import CompletedProjectsCard from "@/components/dashboard/CompletedProjects";
import StatsCard from "@/components/dashboard/StatsCards";
import TaskCard from "@/features/dashboard/TaskCard";
import { UserInterface } from "@/types/form";
import { useSession } from "next-auth/react";

const MainContent = () => {
  const { data: session } = useSession();
  const user = session?.user as UserInterface;

  return (
    <main className="space-y-10 pb-[60px]">
      <StatsCard />

      <CompletedProjectsCard user={user} />

      <TaskCard />
    </main>
  );
};

export default MainContent;

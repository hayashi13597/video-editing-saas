import ProjectsListSkeleton from "@/components/common/ProjectsListSkeleton";
import MainProjects from "@/features/dashboard/projects/MainProjects";
import { Suspense } from "react";

export const metadata = {
  title: "案件一覧",
  description:
    "案件一覧ページです。ここでは、プロジェクトの詳細を確認できます。"
};

const Projects = () => {
  return (
    <Suspense fallback={<ProjectsListSkeleton />}>
      <MainProjects />
    </Suspense>
  );
};

export default Projects;

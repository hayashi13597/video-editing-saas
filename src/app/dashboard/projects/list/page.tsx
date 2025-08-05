import ProjectsListSkeleton from "@/components/common/ProjectsListSkeleton";
import MainProjects from "@/features/dashboard/projects/MainProjects";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "応募可能な案件一覧",
  description:
    "応募可能な案件一覧ページです。ここでは、応募可能なプロジェクトの詳細を確認できます。"
};

const ProjectsList = () => {
  return (
    <Suspense fallback={<ProjectsListSkeleton />}>
      <MainProjects />
    </Suspense>
  );
};

export default ProjectsList;

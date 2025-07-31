import MainProjects from "@/features/dashboard/projects/MainProjects";
import { Suspense } from "react";

export const metadata = {
  title: "案件一覧",
  description:
    "案件一覧ページです。ここでは、プロジェクトの詳細を確認できます。"
};

const Projects = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainProjects />
    </Suspense>
  );
};

export default Projects;

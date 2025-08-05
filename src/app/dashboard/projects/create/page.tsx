import CreateProjectForm from "@/features/dashboard/projects/create/CreateProjectForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "案件登録",
  description: "新しい案件を登録するページです。"
};

const CreateProject = () => {
  return <CreateProjectForm />;
};

export default CreateProject;

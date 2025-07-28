import MainContent from "@/features/dashboard/MainContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ダッシュボード",
  description: "ダッシュボードの概要"
};

const Dashboard = () => {
  return <MainContent />;
};

export default Dashboard;

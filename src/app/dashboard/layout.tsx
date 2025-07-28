import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/features/dashboard/header";
import SidebarComponent from "@/features/dashboard/sidebar";
import React from "react";

const DashboardLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider style={
      {
        "--sidebar-width": "18vw",
        "--sidebar-width-icon": "4vw",
      } as React.CSSProperties
    }>
      <SidebarComponent />
      <div className="w-full p-5 space-y-5">
        <Header />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;

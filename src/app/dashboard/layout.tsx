import { SidebarProvider } from "@/components/ui/sidebar";
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
      <main>{children}</main>
    </SidebarProvider>
  );
};

export default DashboardLayout;

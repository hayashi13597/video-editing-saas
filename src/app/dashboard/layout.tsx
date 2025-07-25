import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarComponent from "@/features/dashboard/sidebar";
import React from "react";

const DashboardLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <SidebarComponent />
      <main>{children}</main>
    </SidebarProvider>
  );
};

export default DashboardLayout;

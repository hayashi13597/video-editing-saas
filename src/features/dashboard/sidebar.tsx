"use client";

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  useSidebar
} from "@/components/ui/sidebar";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ChatIcon from "../../../public/icons/chat.svg";
import SmartHomeIcon from "../../../public/icons/smart-home.svg";
import PaperIcon from "../../../public/icons/paper.svg";
import { routesApp } from "@/constants/routesApp";
import TooltipCustom from "@/components/common/TooltipCustom";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { UserRole } from "@/types/form";
import SidebarSkeleton from "@/components/common/SidebarSkeleton";

const SidebarComponent = () => {
  const pathname = usePathname();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { data: session, status } = useSession();
  const userRole = session?.user.role as UserRole;

  if (status === "loading") {
    return <SidebarSkeleton />;
  }

  return (
    <Sidebar collapsible="icon" className="shadow-sm border-none">
      <SidebarHeader className="h-[70px] p-0">
        <div
          className={`h-[70px] flex items-center ${isCollapsed ? "justify-center" : "justify-between"} px-4`}
        >
          {!isCollapsed && (
            <div className="w-[100px] h-[20px] relative">
              <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          )}
          <TooltipCustom
            content={
              isCollapsed ? "サイドバーを展開" : "サイドバーを折りたたむ"
            }
            isCollapsed={isCollapsed}
          >
            <Image
              src="/icons/toggle.svg"
              alt="toggle"
              width={20}
              height={14}
              className="w-auto h-auto cursor-pointer"
              onClick={toggleSidebar}
            />
          </TooltipCustom>
        </div>
      </SidebarHeader>
      <SidebarContent className={`py-1 gap-0 ${isCollapsed ? "" : "px-3"}`}>
        <SidebarGroup className="p-0">
          <TooltipCustom content="ダッシュボード" isCollapsed={isCollapsed}>
            <Link
              href={routesApp.dashboard}
              className={cn(
                "text-text body-text flex items-center gap-2 py-2 px-3 rounded-6 hover:bg-green-main hover:text-white relative",
                isCollapsed ? "justify-center" : "justify-between",
                pathname === routesApp.dashboard && "bg-green-main text-white"
              )}
            >
              <div
                className={`flex items-center ${isCollapsed ? "" : "gap-2"}`}
              >
                <SmartHomeIcon />
                {!isCollapsed && (
                  <span className="line-clamp-1">ダッシュボード</span>
                )}
              </div>
              {!isCollapsed && (
                <div className="flex items-center gap-2">
                  <Badge className="text-white bg-red rounded-full border-none outline-none">
                    5
                  </Badge>
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </Link>
          </TooltipCustom>
        </SidebarGroup>

        {!isCollapsed && (
          <div className="w-full h-[34px] px-3 flex items-center mt-[14px] text-disabled">
            APPS & PAGES
          </div>
        )}

        <Collapsible defaultOpen={!isCollapsed} className="group/collapsible">
          <SidebarGroup className="p-0">
            <SidebarGroupLabel asChild>
              <TooltipCustom content="案件官理" isCollapsed={isCollapsed}>
                <CollapsibleTrigger asChild={isCollapsed ? false : true}>
                  <Link
                    href={isCollapsed ? routesApp.projects : "#"}
                    className={cn(
                      "body-text text-text bg-action-selected py-2 px-3 h-fit mb-1.5 cursor-pointer rounded-6 flex items-center gap-2",
                      isCollapsed &&
                        "flex-center bg-white mb-0 hover:bg-green-main hover:text-white",
                      isCollapsed &&
                        pathname === routesApp.projects &&
                        "bg-green-main text-white"
                    )}
                  >
                    <PaperIcon />
                    {!isCollapsed && (
                      <span className="line-clamp-1">案件官理</span>
                    )}
                    {!isCollapsed && (
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    )}
                  </Link>
                </CollapsibleTrigger>
              </TooltipCustom>
            </SidebarGroupLabel>
            {!isCollapsed && (
              <CollapsibleContent>
                <Link
                  href={routesApp.create}
                  className={cn(
                    "body-text text-text flex items-center gap-2 py-2 pl-7 mb-1.5 rounded-6 hover:bg-green-main hover:text-white",
                    pathname === routesApp.create && "bg-green-main text-white"
                  )}
                >
                  <span className="block w-2.5 h-2.5 border-2 rounded-full" />
                  {userRole === "CLIENT" ? "案件登録" : "応募可能な案件"}
                </Link>
                <Link
                  href={routesApp.projects}
                  className={cn(
                    "body-text text-text flex items-center gap-2 py-2 pl-7 mb-1.5 rounded-6 hover:bg-green-main hover:text-white",
                    pathname === routesApp.projects &&
                      "bg-green-main text-white"
                  )}
                >
                  <span className="block w-2.5 h-2.5 border-2 rounded-full" />
                  {userRole === "CLIENT" ? "案件一覧" : "応募済みの案件"}
                </Link>
              </CollapsibleContent>
            )}
          </SidebarGroup>
        </Collapsible>

        <SidebarGroup className="p-0">
          <TooltipCustom content="チャット" isCollapsed={isCollapsed}>
            <Link
              href={routesApp.chat}
              className={cn(
                "body-text text-text flex items-center gap-2 py-2 px-3 rounded-6 hover:bg-green-main hover:text-white",
                isCollapsed && "justify-center",
                pathname === routesApp.chat && "bg-green-main text-white"
              )}
            >
              <ChatIcon />
              {!isCollapsed && "チャット"}
            </Link>
          </TooltipCustom>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default SidebarComponent;

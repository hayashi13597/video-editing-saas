import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ChatIcon from "../../../public/icons/chat.svg";
import SmartHomeIcon from "../../../public/icons/smart-home.svg";
import { routesApp } from "@/constants/routesApp";

const SidebarComponent = () => {
  return (
    <Sidebar className="shadow-sm border-none">
      <SidebarHeader className="h-[70px] p-0">
        <div className="h-[70px] flex-between px-4">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={20}
            className="w-auto h-auto"
          />
          <Image
            src="/icons/toggle.svg"
            alt="toggle"
            width={20}
            height={14}
            className="w-auto h-auto cursor-pointer"
          />
        </div>
      </SidebarHeader>
      <SidebarContent className="py-1 px-3 gap-0">
        <SidebarGroup className="p-0">
          <Link href={routesApp.dashboard} className="bg-green-main text-white body-text flex justify-between items-center gap-2 py-2 px-3 rounded-6 hover:bg-green-main hover:text-white relative">
            <div className="flex items-center gap-2">
              <SmartHomeIcon />
              <span>ダッシュボード</span>
            </div>
            <ChevronRight className="w-4 h-4" />
            <Badge className="text-white bg-red rounded-full absolute right-9 top-1/2 -translate-y-1/2 border-none outline-none">
              5
            </Badge>
          </Link>
        </SidebarGroup>
        <div className="w-full h-[34px] px-3 flex items-center mt-[14px] text-disabled">
          APPS & PAGES
        </div>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup className="p-0">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="body-text text-text bg-action-selected px-3 py-2 h-fit mb-1.5 cursor-pointer">
                <Image
                  src="/icons/paper.svg"
                  alt="paper"
                  width={22}
                  height={22}
                  className="w-auto h-auto mr-2"
                />
                案件官理
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <Link href={routesApp.create} className="body-text text-text flex items-center gap-2 py-2 pl-7 rounded-6 hover:bg-green-main hover:text-white">
                <span className="block w-2.5 h-2.5 border-2 rounded-full" />案件登録
              </Link>
              <Link href={routesApp.projects} className="body-text text-text flex items-center gap-2 py-2 pl-7 rounded-6 hover:bg-green-main hover:text-white">
                <span className="block w-2.5 h-2.5 border-2 rounded-full" />案件一覧
              </Link>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <SidebarGroup className="p-0">
          <Link href={routesApp.chat} className="body-text text-text flex items-center gap-2 py-2 px-3 rounded-6 hover:bg-green-main hover:text-white">
            <ChatIcon />
            チャット
          </Link>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default SidebarComponent;

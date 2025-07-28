import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "../ui/collapsible";

const SidebarSkeleton = () => {
  return (
    <Sidebar collapsible="icon" className="shadow-sm border-none">
      <SidebarHeader className="h-[70px] p-0">
        <div className="h-[70px] flex items-center justify-between px-4">
          <div className="w-[100px] h-[20px] relative">
            <Skeleton className="w-full h-full" />
          </div>
          <Skeleton className="w-5 h-[14px]" />
        </div>
      </SidebarHeader>

      <SidebarContent className="py-1 gap-0 px-3">
        {/* Dashboard Link Skeleton */}
        <SidebarGroup className="p-0">
          <div className="flex items-center justify-between gap-2 py-2 px-3 rounded-6">
            <div className="flex items-center gap-2 w-full">
              <Skeleton className="w-5 h-5" />
              <Skeleton className="w-full h-4" />
            </div>
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-4 h-4 rounded-full absolute right-9 top-1/2 -translate-y-1/2" />
          </div>
        </SidebarGroup>

        {/* Apps & Pages Header Skeleton */}
        <div className="w-full h-[34px] px-3 flex items-center mt-[14px]">
          <Skeleton className="w-full h-3" />
        </div>

        {/* Collapsible Project Management Section Skeleton */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup className="p-0">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <div className="w-full py-2 px-3 h-fit mb-1.5 cursor-pointer rounded-6 flex items-center gap-2">
                  <Skeleton className="w-5 h-5" />
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-4 h-4 ml-auto" />
                </div>
              </CollapsibleTrigger>
            </SidebarGroupLabel>

            <CollapsibleContent>
              {/* First submenu item skeleton */}
              <div className="flex items-center gap-2 py-2 pl-7 mb-1.5 rounded-6">
                <Skeleton className="w-2.5 h-2.5 rounded-full" />
                <Skeleton className="w-2/3 h-4" />
              </div>

              {/* Second submenu item skeleton */}
              <div className="flex items-center gap-2 py-2 pl-7 mb-1.5 rounded-6">
                <Skeleton className="w-2.5 h-2.5 rounded-full" />
                <Skeleton className="w-2/3 h-4" />
              </div>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Chat Link Skeleton */}
        <SidebarGroup className="p-0">
          <div className="flex items-center gap-2 py-2 px-3 rounded-6">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="w-full h-4" />
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
};

export default SidebarSkeleton;

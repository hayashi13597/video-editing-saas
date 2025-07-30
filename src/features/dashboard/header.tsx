"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";
import HeaderSkeleton from "@/components/common/HeaderSkeleton";
import AvatarPopup from "@/components/dashboard/AvatarPopup";
import { getPageTile } from "@/lib/utils";
import { UserRole } from "@/types/form";
import PointPopup from "@/components/dashboard/PointPopup";
import NotificationPopup from "@/components/dashboard/NotificationPopup";

const Header = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const image = session?.user.image || "/images/avatar.png";
  const name = session?.user.name || "User";
  const email = session?.user.email || "***@gmail.com";
  const role = session?.user.role as UserRole;
  const points = session?.user.points || 0;
  const isLoading = status === "loading";

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  return (
    <header className="flex-between w-full">
      <h1 className="big-title">{getPageTile(pathname, role)}</h1>
      <div className="flex-center gap-4">
        <PointPopup points={points} />
        <NotificationPopup />
        <AvatarPopup image={image} name={name} email={email} />
      </div>
    </header>
  );
};

export default Header;

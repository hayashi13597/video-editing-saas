"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { routesApp } from "@/constants/routesApp";
import { getErrorMessage } from "@/lib/utils";
import { getAuthentication } from "@/orvalApi/endpoints/authentication/authentication";
import { LogOut, UserRoundPen } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const AvatarPopup = ({
  image,
  name,
  email
}: {
  image: string;
  name: string;
  email: string;
}) => {
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await getAuthentication().signOut();
      await signOut({ redirect: false });
      toast.success("サインアウトしました");
      router.push(routesApp.signIn);
    } catch (error) {
      const errorMessage = getErrorMessage(error as ApiError);
      toast.error(errorMessage);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar
          className="cursor-pointer w-[38px] h-[38px]"
          data-id="user-avatar"
        >
          <AvatarImage
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <AvatarFallback className="text-white">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent align="end" className="border-none shadow-sm">
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <div className="flex flex-col">
            <span className="body-text font-bold">{name}</span>
            <span className="body-text text-text">{email}</span>
          </div>
        </div>
        <div className="py-2">
          <Link
            href={routesApp.profile}
            className="flex items-center gap-2 text-text font-medium px-4 py-2 hover:bg-gray-200 transition-colors rounded-6"
          >
            <UserRoundPen size={20} />
            プロフィール
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-red font-medium px-4 py-2 hover:bg-gray-200 transition-colors rounded-6"
            onClick={handleSignOut}
          >
            <LogOut size={20} />
            サインアウト
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AvatarPopup;

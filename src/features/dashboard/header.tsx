"use client";

import Image from 'next/image'
import { usePathname } from 'next/navigation';
import React from 'react'
import { useSession } from 'next-auth/react';
import HeaderSkeleton from '@/components/common/HeaderSkeleton';
import AvatarPopup from '@/components/dasboard/avatar-popup';
import { getPageTile } from '@/lib/utils';
import { UserRole } from '@/types/form';

const Header = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const image = session?.user.image || '/images/avatar.png';
  const name = session?.user.name || 'User';
  const email = session?.user.email || "***@gmail.com";
  const role = session?.user.role as UserRole;
  const isLoading = status === "loading"

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  return (
    <header className='flex-between w-full'>
      <h1 className='big-title'>{getPageTile(pathname, role)}</h1>
      <div className="flex-center gap-4">
        <div className="relative w-6 h-6">
          <Image
            src="/icons/point.svg"
            alt="point"
            fill
            sizes='(max-width: 768px) 20px, 30px'
          />
        </div>
        <div className="relative w-6 h-6">
          <Image
            src="/icons/notification.svg"
            alt="notification"
            fill
            sizes='(max-width: 768px) 20px, 30px'
          />
          <div className='w-3 h-3 bg-red border-2 border-white rounded-full absolute top-0 right-0' />
        </div>
        <AvatarPopup image={image} name={name} email={email} />
      </div>
    </header>
  )
}

export default Header
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  icon: JSX.Element;
  link: string;
  text: string;
}

export function SidebarLink({ icon, link, text }: SidebarLinkProps) {
  const pathname = usePathname();
  const isSelected = pathname === link || pathname.startsWith(link);


  return (
    <Link
      className={cn(
        'flex grow items-center justify-between gap-1 p-3 font-dm-sans text-[0.9375rem] transition duration-500 ease-in-out hover:bg-sidebar-link-active hover:bg-opacity-60 md:py-2',
        isSelected && 'bg-[#194A7A] text-white font-semibold',

      )}
      href={link}
    >
      <span className={cn("flex items-center gap-2 text-[#8B909A]", isSelected && 'text-white',)}>
        <span className="h-5 w-5 shrink-0">
          {icon}
        </span>
        <span>{text}</span>
      </span>
    </Link>
  );
}







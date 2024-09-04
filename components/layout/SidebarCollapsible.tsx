'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { CaretRightIcon } from '@/icons/sidebar';

interface SidebarCollapsibleProps {
    icon?: React.ReactNode;
    text: string;
    nestedLinks: {
      link: string;
      icon: React.ReactNode;
      text: string;
      disabled?: boolean;
      nestedLinks?: {
        icon: React.ReactNode;
        link: string;
        text: string;
        disabled?: boolean;
      }[];
    }[];
  }
  
  export function SidebarCollapsible({
    icon,
    text,
    nestedLinks,
  }: SidebarCollapsibleProps) {
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);
  
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="mb-1 flex items-center justify-between gap-6 text-[0.9375rem] md:gap-px">
          <CollapsibleTrigger
            className={cn(
              'flex grow items-center justify-between gap-4 px-3 py-2 pr-1 text-[0.9375rem] transition duration-500 ease-in-out hover:bg-sidebar-link-active data-[state=open]:bg-white/5 md:py-1.5'
            )}
          >
            <span className={cn("flex items-center gap-2 text-[#8B909A]", open &&  "text-[#113770] font-semibold")}>
              {
                icon ? (
                  <>
                    {icon}
                  </>
                ) : (
                  <span className="h-5 w-5 shrink-0"></span>
                )
              }
  
              <span className="text-left">{text}</span>
            </span>
  
            <span
              className={cn(
                'inline-flex shrink-0 items-center justify-center transition duration-300 ease-in-out text-[#8B909A]',
                open && 'rotate-90'
              )}
            >
              <CaretRightIcon height={20} width={20} className={cn(open &&  "text-[#113770]")} />
            </span>
          </CollapsibleTrigger>
        </div>
  
        <CollapsibleContent>
          <ul className="space-y-2 divide-y animate-in slide-in-from-top-2">
            {
              nestedLinks.map(({ link, text, disabled, icon, nestedLinks }) => {
                const isSelected = pathname === link || !!nestedLinks?.find(({ link }) => link === pathname) || pathname.startsWith(link);
  
                return disabled ?
                  (
                    <button
                      className={cn(
                        'block  py-2.5 pl-11 pr-3 text-[0.9375rem] transition duration-500 ease-in-out hover:bg-opacity-60 disabled:cursor-not-allowed disabled:opacity-60 md:py-1.5',
                        isSelected && 'bg-sidebar-link-active',
                      )}
                      key={link}
                      disabled
                    >
                      <span>{text}</span>
                    </button>
                  )
                  :
                  (
                    <Link
                      className={cn(
                        'flex items-center gap-2 py-2.5 pl-6 pr-3 text-[0.9375rem] text-[#8B909A] transition duration-500 ease-in-out hover:bg-sidebar-link-active hover:bg-opacity-60 md:py-1.5',
                        isSelected && 'bg-[#194A7A] text-white',
                      )}
                      href={link}
                      key={link}
                    >
                      <span>{icon}</span>
                      <span>{text}</span>
                    </Link>
                  );
              })}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    );
  }
  
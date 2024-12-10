"use client";

import { useState } from "react";
import { IndentDecrease } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/icons/core";
import { SidebarLink } from "./SidebarLink";
import { SidebarCollapsible } from "./SidebarCollapsible";
import { useAuth } from "@/contexts/auth";
import { linkGroups } from "./links";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();

  return (
    <div
      className={cn(
        "relative h-full pb-8 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-28" : "w-72"
      )}
    >
      <nav className="relative flex flex-col gap-6 h-full">
        <div className="flex items-center justify-between p-4">
          <Logo className="" isCollapsed={isCollapsed} />
          <Button
            variant="unstyled"
            size="icon"
            className="h-[100px] py-6"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <IndentDecrease className="h-5 w-5" />
          </Button>
        </div>

        <ul className="grow flex flex-col overflow-y-auto px-4 pt-8">
          {linkGroups.map(({ heading, key, links, requiredPermissions }) => (
            <li className="py-6 first-of-type:mb-8" key={key}>
              {
                !!requiredPermissions && requiredPermissions?.length > 0 && !requiredPermissions?.some(permission => user?.permissions.includes(permission)) ? null : (
                  <h2 className={!isCollapsed ? "mb-5 px-3 uppercase text-xs text-[#8B909A]" : "mb-5 px-3 uppercase text-[10px] text-[#8B909A]"}>
                    {heading}
                  </h2>
                )
              }

              <ul className="space-y-6">
                {links?.map((linkItem) => {
                  const { icon, text, nestedLinks, requiredPermissions = [] } = linkItem;
                  const link = 'link' in linkItem ? linkItem.link : undefined;
                  const hasPermission = requiredPermissions.length === 0 || requiredPermissions.some(permission => user?.permissions.includes(permission));

                  if (!hasPermission) return null;

                  return (
                    <li key={link || text}>
                      {!!nestedLinks && !link ? (
                        <SidebarCollapsible
                          icon={icon}
                          nestedLinks={nestedLinks}
                          text={text}
                          isCollapsed={isCollapsed}
                          requiredPermissions={requiredPermissions}
                        />
                      ) : (
                        <SidebarLink
                          icon={icon}
                          link={link!}
                          text={text}
                          isCollapsed={isCollapsed}
                          requiredPermissions={requiredPermissions}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}


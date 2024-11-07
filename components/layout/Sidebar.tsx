"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, IndentDecrease } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/icons/core";
import { SidebarLink } from "./SidebarLink";
import { SidebarCollapsible } from "./SidebarCollapsible";
import {
  ClientHistoryIcon,
  ConversionStatisticsIcon,
  DeliveryIcon,
  EnquiriesIcon,
  FinancialReport,
  Inventory,
  OrderManagement,
  OrdersIcon,
  OrderStatistics,
  OrderTimeLine,
  ReportAndAnalytics,
} from "@/icons/sidebar";
import { Gear } from "@phosphor-icons/react";
import {
  Bag2,
  BagTick2,
  DiscountShape,
  Graph,
  I3Dcube,
  Setting2,
  ShopRemove,
  Trash,
} from "iconsax-react";
import { UserCircle } from "lucide-react";

export const linkGroups = [
  {
    key: "top",
    heading: "MAIN MENU",
    links: [
      {
        link: "/order-timeline",
        text: "Order Timeline",
        icon: <OrderTimeLine />,
      },
      {
        text: "Order Management",
        icon: <OrderManagement />,
        nestedLinks: [
          {
            link: "/order-management/enquiries",
            text: "Enquiries",
            icon: <EnquiriesIcon />,
          },
          {
            link: "/order-management/orders",
            text: "Orders",
            icon: <OrdersIcon />,
          },
          {
            link: "/order-management/delivery",
            text: "Delivery",
            icon: <OrderTimeLine />,
          },
          {
            link: "/order-management/payments",
            text: "Payment",
            icon: <DiscountShape />,
          },
          {
            link: "/order-management/order-history",
            text: "Order History",
            icon: <OrderManagement />,
          },
          {
            link: "/order-management/client-history",
            text: "Client History",
            icon: <ClientHistoryIcon />,
          },
          {
            link: "/order-management/trash",
            text: "Trash",
            icon: <Trash />,
          },
        ],
      },
      {
        text: "Report & Analytics",
        icon: <ReportAndAnalytics />,
        nestedLinks: [
          {
            link: "/report-analytics/order-statistics",
            text: "Order Statistics",
            icon: <OrderStatistics />,
          },
          {
            link: "/report-analytics/financial-report",
            text: "Financial Report",
            icon: <Graph size={20} />,
          },
          {
            link: "/report-analytics/conversion-statistics",
            text: "Conversion Statistics",
            icon: <ConversionStatisticsIcon />,
          },
        ],
      },
      {
        text: "Inventory",
        icon: <Inventory />,
        nestedLinks: [
          {
            link: "/inventory/product-inventory",
            text: "Product Inventory",
            icon: <I3Dcube />,
          },
          {
            link: "/inventory/stock-inventory",
            text: "Stock Inventory",
            icon: <BagTick2 />,
          },
          {
            link: "/inventory/store-inventory",
            text: "Store Inventory",
            icon: <OrderManagement />,
          },
        ],
      },
    ],
  },
  {
    key: "bottom",
    heading: "ADMIN",
    links: [
      {
        text: "Manage Admin",
        icon: <UserCircle size={20} strokeWidth={1.5} />,
        nestedLinks: [
          {
            link: "/admin/branches",
            text: "Branches",
            icon: <Bag2 size={20} />,
          },
          {
            link: "/admin/employees-role",
            text: "Employees Role",
            icon: <EnquiriesIcon />,
          },
          {
            link: "/admin/invite-employee",
            text: "Invite Employee",
            icon: <ShopRemove size={20} />,
          },
          {
            link: "/admin/admin-roles",
            text: "Admin Roles",
            icon: <Setting2 />,
          },
        ],
      },
    ],
  },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
            {/* {isCollapsed ? <ChevronRight className="h-4 w-4" /> :  */}
            <IndentDecrease className="h-5 w-5" />
          </Button>
        </div>

        <ul className="grow flex flex-col overflow-y-auto px-4 pt-8">
          {linkGroups.map(({ heading, key, links }) => (
            <li className="py-6 first-of-type:mb-8" key={key}>
              <h2 className={!isCollapsed ? "mb-5 px-3 uppercase text-xs text-[#8B909A]" : "mb-5 px-3 uppercase text-[10px] text-[#8B909A]"}>
                {heading}
              </h2>

              <ul className="space-y-6">
                {links.map(({ icon, link, text, nestedLinks }) => (
                  <li key={link || text}>
                    {!!nestedLinks && !link ? (
                      <SidebarCollapsible
                        icon={icon}
                        nestedLinks={nestedLinks}
                        text={text}
                        isCollapsed={isCollapsed}
                      />
                    ) : (
                      <SidebarLink
                        icon={icon}
                        link={link}
                        text={text}
                        isCollapsed={isCollapsed}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

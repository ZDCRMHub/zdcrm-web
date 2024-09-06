import Link from 'next/link';

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
} from '@/icons/sidebar';

import {
  SidebarLink,
} from './SidebarLink';
import { Logo } from '@/icons/core';
import { SidebarCollapsible } from './SidebarCollapsible';
import { Gear } from '@phosphor-icons/react';

export const linkGroups = [
  {
    key: 'top',
    heading: 'MAIN MENU',
    links: [
      {
        link: '/order-timeline',
        text: 'Order Timeline',
        icon: <OrderTimeLine />,
      },
      {
        text: 'Order Management',
        icon: <OrderManagement />,
        nestedLinks: [
          {
            link: '/order-management/enquiries',
            text: 'Enquiries',
            icon: <EnquiriesIcon />,
          },
          {
            link: '/order-management/orders',
            text: 'Orders',
            icon: <OrdersIcon />,
          },
          {
            link: '/order-management/delivery',
            text: 'Delivery',
            icon: <OrderTimeLine />,
          },
          {
            link: '/order-management/order-history',
            text: 'Order History',
            icon: <OrderManagement />,
          },
          {
            link: '/order-management/client-history',
            text: 'Client History',
            icon: <ClientHistoryIcon />,
          },
        ],
      },
      {
        text: 'Report & Analytics',
        icon: <ReportAndAnalytics />,
        nestedLinks: [
          {
            link: '/report-analytics/order-statistics',
            text: 'Order Statistics',
            icon: <OrderStatistics />,
          },
          {
            link: '/report-analytics/financial-report',
            text: 'Financial Report',
            icon: <FinancialReport />,
          },
          {
            link: '/report-analytics/conversion-statistics',
            text: 'Conversion Statistics',
            icon: <ConversionStatisticsIcon />,
          },
        ],
      },
      {
        text: 'Inventory',
        icon: <Inventory />,
        nestedLinks: [

          {
            link: '/inventory/product-inventory',
            text: 'Product Inventory',
            icon: <OrderManagement />,
          },
          {
            link: '/inventory/stock-inventory',
            text: 'Stock Inventory',
            icon: <OrderManagement />,
          },

          {
            link: '/inventory/store-inventory',
            text: 'Store Inventory',
            icon: <OrderManagement />,
          },
        ],
      },
    ],
  },
  {
    key: 'bottom',
    heading: 'ADMIN',
    links: [
 
      {
        text: 'Manage Admin',
        icon: <OrderManagement />,
        nestedLinks: [
          {
            link: '/admin/branches',
            text: 'Branches',
            icon: <EnquiriesIcon />,
          },
          {
            link: '/admin/invite-employee',
            text: 'Invite Employee',
            icon: <EnquiriesIcon />,
          },
          {
            link: '/admin/orders',
            text: 'Orders',
            icon: <OrdersIcon />,
          },
        ],
      },
      {
        link: '/admin/admin-roles',
        text: 'Admin Roles',
        icon: <Gear />,
      },

    ],
  },


];

export function Sidebar() {
  return (
    <div className="no-scrollbar h-full pb-8 lg:min-w-[17rem]">
      <nav className="relative flex flex-col gap-6 h-full">
        <Logo className=" pl-4 pr-5" />

        <ul className='grow flex flex-col  overflow-y-scroll pl-4 pr-5 pt-8'>
          {
            linkGroups.map(({ heading, key, links }) => {
              return (
                <li className="py-6 first-of-type:mb-8" key={key}>
                  <h2 className="mb-5 px-3 uppercase text-xs text-[#8B909A]">{heading}</h2>

                  <ul className="space-y-6">
                    {
                      links.map(({ icon, link, text, nestedLinks }) => {
                        return (
                          <li key={link}>
                            {
                              !!nestedLinks && !link && (
                                <SidebarCollapsible
                                  icon={icon}
                                  nestedLinks={nestedLinks}
                                  text={text}
                                />
                              )
                            }

                            {
                              !nestedLinks && !!link && (
                                <SidebarLink icon={icon} link={link} text={text} />
                              )
                            }
                          </li>
                        );
                      })}
                  </ul>
                </li>
              );
            })}
        </ul>
      </nav>
    </div>
  );
}
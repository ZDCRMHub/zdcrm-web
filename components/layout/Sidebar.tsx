import Link from 'next/link';

import {
  DeliveryIcon,
  EnquiriesIcon,
  Inventory,
  OrderManagement,
  OrdersIcon,
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
            icon: <OrderManagement />,
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
            icon: <OrderManagement />,
          },
          {
            link: '/report-analytics/financial-report',
            text: 'Financial Report',
            icon: <OrderManagement />,
          },
          {
            link: '/report-analytics/conversion-statistics',
            text: 'Conversion Statistics',
            icon: <OrderManagement />,
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
    key: 'top',
    heading: 'ADMIN',
    links: [
 
      {
        text: 'Manage Admin',
        icon: <OrderManagement />,
        nestedLinks: [
          {
            link: '/admin/enquiries',
            text: 'Enquiries',
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
      <nav className="relative pl-4 pr-5">
        <Logo />

        <ul className='flex flex-col justify-between'>
          {
            linkGroups.map(({ heading, key, links }) => {
              return (
                <li className="py-6 first-of-type:pt-2" key={key}>
                  <h2 className="mb-5 px-3 uppercase text-xs text-[#8B909A]">{heading}</h2>

                  <ul className="space-y-4">
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
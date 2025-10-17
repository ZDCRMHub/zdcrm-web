import {
  OrderTimeLine,
  OrderManagement,
  EnquiriesIcon,
  OrdersIcon,
  ClientHistoryIcon,
  ReportAndAnalytics,
  OrderStatistics,
  Inventory,
  ConversionStatisticsIcon,
} from "@/icons/sidebar";
import { authTokenStorage } from "@/utils/auth";
import {
  Bag2,
  BagTick2,
  DiscountShape,
  Graph,
  I3Dcube,
  Logout,
  Setting2,
  ShopRemove,
  Trash,
  TruckTick,
} from "iconsax-react";
import { UserCircle } from 'lucide-react';

export const linkGroups = [
  {
    key: "top",
    heading: "MAIN MENU",
    requiredPermissions: undefined,
    links: [
      {
        link: "/order-timeline",
        text: "Order Timeline",
        icon: <OrderTimeLine />,
        requiredPermissions: ["CAN_MANAGE_ORDERS"],
      },
      {
        text: "Order Management",
        icon: <OrderManagement />,
        requiredPermissions: ["CAN_MANAGE_ORDERS"],
        nestedLinks: [
          {
            link: "/order-management/enquiries",
            text: "Enquiries",
            icon: <EnquiriesIcon />,
            requiredPermissions: ["CAN_MANAGE_ENQUIRIES"],
          },
          {
            link: "/order-management/orders",
            text: "Orders",
            icon: <OrdersIcon />,
            requiredPermissions: ["CAN_MANAGE_ORDERS"],
          },
          {
            link: "/order-management/delivery",
            text: "Delivery",
            icon: <OrderTimeLine />,
            requiredPermissions: ["CAN_MANAGE_DELIVERIES"],
          },
          {
            link: "/order-management/payments",
            text: "Payment",
            icon: <DiscountShape />,
            requiredPermissions: ["CAN_MANAGE_ORDERS"],
          },
          {
            link: "/order-management/order-history",
            text: "History",
            icon: <OrderManagement />,
            requiredPermissions: ["CAN_MANAGE_ORDERS_HISTORY"],
          },
          {
            link: "/order-management/client-history",
            text: "Client History",
            icon: <ClientHistoryIcon />,
            requiredPermissions: ["CAN_MANAGE_ORDERS_HISTORY"],
          },
          {
            link: "/order-management/riders-history",
            text: "Riders History",
            icon: <TruckTick />,
            requiredPermissions: ["CAN_MANAGE_ORDERS_HISTORY"],
          },
          {
            link: "/order-management/trash",
            text: "Trash",
            icon: <Trash />,
            requiredPermissions: ["CAN_MANAGE_ORDERS"],
          },
        ],
      },
      {
        text: "Report & Analytics",
        icon: <ReportAndAnalytics />,
        requiredPermissions: ["CAN_MANAGE_ORDERS_STAT", "CAN_MANAGE_FINANCIAL_REPORT"],
        nestedLinks: [
          {
            link: "/report-analytics/overview",
            text: "Overview",
            icon: <ReportAndAnalytics />,
            requiredPermissions: ["CAN_MANAGE_ORDERS_STAT"]
          },
          {
            link: "/report-analytics/order-statistics",
            text: "Order Statistics",
            icon: <OrderStatistics />,
            requiredPermissions: ["CAN_MANAGE_ORDERS_STAT"],
          },
          {
            link: "/report-analytics/financial-report",
            text: "Financial Report",
            icon: <Graph size={20} />,
            requiredPermissions: ["CAN_MANAGE_FINANCIAL_REPORT"],
          },
          {
            link: "/report-analytics/conversion-statistics",
            text: "Conversion Statistics",
            icon: <ConversionStatisticsIcon />,
            requiredPermissions: ["CAN_MANAGE_ORDERS_STAT"],
          },
        ],
      },
      {
        text: "Inventory",
        icon: <Inventory />,
        requiredPermissions: ["CAN_MANAGE_INVENTORIES"],
        nestedLinks: [
          {
            link: "/inventory/gifts",
            text: "Gift Inventory",
            icon: <I3Dcube />,
            requiredPermissions: ["CAN_MANAGE_INVENTORIES"],
          },
          {
            link: "/inventory/stock",
            text: "Cakes, Flowers & Cupcakes",
            icon: <BagTick2 />,
            requiredPermissions: ["CAN_MANAGE_INVENTORIES"],
          },
          {
            link: "/inventory/store",
            text: "Store",
            icon: <OrderManagement />,
            requiredPermissions: ["CAN_MANAGE_INVENTORIES"],
          },
          {
            link: "/inventory/vendors",
            text: "Vendors",
            icon: <OrderManagement />,
            requiredPermissions: ["CAN_MANAGE_INVENTORIES"],
          },
        ],
      },
    ],
  },
  {
    key: "bottom",
    heading: "ADMIN",
    requiredPermissions: ["CAN_MANAGE_STAFFS", "CAN_MANAGE_ROLES", "CAN_MANAGE_BRANCHES", "CAN_MANAGE_INVENTORIES"],
    links: [
      {
        text: "Manage Admin",
        icon: <UserCircle size={20} strokeWidth={1.5} />,
        requiredPermissions: ["CAN_MANAGE_STAFFS", "CAN_MANAGE_ROLES", "CAN_MANAGE_BRANCHES"],
        nestedLinks: [
          {
            link: "/admin/businesses",
            text: "Businesses",
            icon: <Bag2 size={20} />,
            // requiredPermissions: ["CAN_MANAGE_BRANCHES", "CAN_MANAGE_BUSINESSES"],
            requiredPermissions: ["CAN_MANAGE_BRANCHES"],
          },
          {
            link: "/admin/employees-role",
            text: "Employees",
            icon: <EnquiriesIcon />,
            requiredPermissions: ["CAN_MANAGE_ROLES"],
          },
          {
            link: "/admin/invite-employee",
            text: "Invite Employee",
            icon: <ShopRemove size={20} />,
            requiredPermissions: ["CAN_MANAGE_STAFFS"],
          },
          {
            link: "/admin/products",
            text: "Products",
            icon: <I3Dcube />,
            requiredPermissions: ["CAN_MANAGE_INVENTORIES"],
          },
          {
            link: "/admin/dispatch",
            text: "Dispatch",
            icon: <I3Dcube />,
            requiredPermissions: ["CAN_MANAGE_ORDERS"],
          },
          {
            link: "/admin/discount",
            text: "Discount",
            icon: <I3Dcube />,
            requiredPermissions: ["CAN_MANAGE_ORDERS"],
          },
          {
            link: "/admin/properties",
            text: "Order Properties",
            icon: <I3Dcube />,
            requiredPermissions: ["CAN_MANAGE_ORDERS"],
          },
          {
            link: "/admin/admin-roles",
            text: "Roles and Permissions",
            icon: <Setting2 />,
            requiredPermissions: ["CAN_MANAGE_ROLES"],
          },
        ],
      },
    ],
  },
  {
    key: "Logout",
    heading: "LOGOUT",
    requiredPermissions: [],
    actions: [
      {
        text: "Logout",
        icon: <Logout size={20} strokeWidth={1.5} />,
        requiredPermissions: [],
        action: authTokenStorage.logout,
      },
    ],
  },
];


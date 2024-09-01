'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {
  Box,
  ShoppingCart,
  FileText,
  Users,
  UserCog,
  Settings,
  LucideIcon,
  IndentDecrease,
  Truck,
  Clock,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';
import {TbShoppingCart} from 'react-icons/tb';
import {IconType} from 'react-icons';

interface SidebarItemProps {
  icon?: LucideIcon | IconType | null;
  image?: string | null;
  label: string;
  badge?: string | number;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  badge,
  href,
  image,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-2 mb-2 ${
        isActive
          ? 'bg-custom-blue text-white border-b border-amber-400'
          : 'text-[#8B909A] hover:bg-gray-100'
      }`}>
      {Icon && <Icon className='h-5 w-5' />}
      {image && (
        <div
          className={`h-5 w-5 relative ${
            isActive ? '' : 'grayscale brightness-50'
          }`}>
          <Image src={image} alt={label} layout='fill' objectFit='contain' />
        </div>
      )}
      <span className='ml-3 text-sm'>{label}</span>
      {badge && (
        <span className='ml-auto bg-[#F3C948] text-xs h-5 w-5 rounded-full text-[#1E1E1E] flex items-center justify-center font-poppins font-normal'>
          {badge}
        </span>
      )}
    </Link>
  );
};

const OrderManagementDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className='mb-2'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-between w-full bg-white text-gray-700 py-2 px-4 hover:bg-gray-100 rounded'>
        <div className='flex items-center'>
          <ShoppingCart className='h-5 w-5 mr-3' />
          <span className='text-sm'>Order Management</span>
        </div>
        <ChevronRight
          className={`h-5 w-5 transform transition-transform ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className='mt-1 space-y-1'>
          <SidebarItem
            image={'/img/barcode.svg'}
            label='Enquiries'
            href='/order-management/enquiries'
          />
          <SidebarItem
            image={'/img/bag-2.svg'}
            label='Orders'
            href='/order-management/orders'
            badge={24}
          />
          <SidebarItem
            image='/img/box-time.svg'
            label='Delivery'
            href='/order-management/delivery'
          />
          <SidebarItem
            image='/img/shop-remove.svg'
            label='Order History'
            href='/order-management/order-history'
          />
          <SidebarItem
            image='/img/archive-book.svg'
            label='Client History'
            href='/order-management/client-history'
          />
        </div>
      )}
    </div>
  );
};

const ReportDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className='mb-2'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-between w-full bg-white text-gray-700 py-2 px-4 hover:bg-gray-100 rounded'>
        <div className='flex items-center'>
          <ShoppingCart className='h-5 w-5 mr-3' />
          <span className='text-sm'>Report & Analytics</span>
        </div>
        <ChevronRight
          className={`h-5 w-5 transform transition-transform ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className='mt-1 space-y-1'>
          <SidebarItem
            image={'/img/barcode.svg'}
            label='Order Statistics'
            href='/report-analytics/order-statistics'
          />
          <SidebarItem
            image={'/img/bag-2.svg'}
            label='Financial Report'
            href='/report-analytics/financial-report'
            badge={24}
          />
          <SidebarItem
            image='/img/box-time.svg'
            label='Conversion Statistics'
            href='/report-analytics/conversion-statistics'
          />
        </div>
      )}
    </div>
  );
};

const InventoryManagementDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className='mb-2'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-between w-full bg-white text-gray-700 py-2 px-4 hover:bg-gray-100 rounded'>
        <div className='flex items-center'>
          <ShoppingCart className='h-5 w-5 mr-3' />
          <span className='text-sm'>Inventory</span>
        </div>
        <ChevronRight
          className={`h-5 w-5 transform transition-transform ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className='mt-1 space-y-1'>
          <SidebarItem
            image={'/img/barcode.svg'}
            label='Product Inventory'
            href='/inventory/product-inventory'
          />
          <SidebarItem
            image={'/img/bag-2.svg'}
            label='Stock Inventory'
            href='/inventory/stock-inventory'
            badge={24}
          />
          <SidebarItem
            image='/img/box-time.svg'
            label='Delivery'
            href='/order-management/delivery'
          />
          <SidebarItem
            image='/img/shop-remove.svg'
            label='Order History'
            href='/order-management/order-history'
          />
          <SidebarItem
            image='/img/archive-book.svg'
            label='Client History'
            href='/order-management/client-history'
          />
        </div>
      )}
    </div>
  );
};

export function Sidebar() {
  return (
    <div className='w-64 bg-white h-full flex flex-col font-poppins'>
      <div className='py-5 mt-7 px-4 border-b border-gray-200'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Image src='/img/logo.svg' alt='logo' width={28} height={24} />
            <h1 className='ml-2 text-xl font-semibold'>ZDCRM Hub</h1>
          </div>
          <IndentDecrease className='h-5 w-5' />
        </div>
      </div>
      <nav className='flex-1 overflow-y-auto py-4 mt-20 mx-4'>
        <div className='mb-2 text-xs font-normal text-gray-400 uppercase'>
          Main Menu
        </div>
        <SidebarItem
          image='/img/box-time.svg'
          label='Order Timeline'
          href='/order-timeline'
          badge={24}
        />
        <OrderManagementDropdown />

        <ReportDropdown />

        <InventoryManagementDropdown />

        <div className='mt-20 mb-2 text-xs font-semibold text-gray-400 uppercase'>
          Admin
        </div>
        <SidebarItem
          icon={UserCog}
          label='Manage Admins'
          href='/manage-admins'
        />
        <SidebarItem icon={Settings} label='Admin Roles' href='/admin-roles' />
      </nav>
    </div>
  );
}

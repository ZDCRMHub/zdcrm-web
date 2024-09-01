// File: components/OrderManagementDropdown.tsx
'use client';

import React, {useState} from 'react';
import {
  ChevronDown,
  ShoppingCart,
  BarChart2,
  Truck,
  Clock,
  Users,
} from 'lucide-react';

interface DropdownItemProps {
  icon: React.ReactElement;
  label: string;
  badge?: number;
  isActive?: boolean;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  icon,
  label,
  badge,
  isActive = false,
}) => (
  <div
    className={`flex items-center py-3 px-4 ${
      isActive ? 'bg-custom-blue text-white' : 'text-gray-700 hover:bg-gray-100'
    }`}>
    {React.cloneElement(icon, {className: 'h-5 w-5 mr-3'})}
    <span>{label}</span>
    {badge && (
      <span className='ml-auto bg-[#F3C948] text-xs px-2 py-1 rounded-full text-[#1E1E1E]'>
        {badge}
      </span>
    )}
  </div>
);

export function OrderManagementDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative w-64'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-between w-full bg-white border border-gray-300 rounded-t-md px-4 py-2 text-left'>
        <div className='flex items-center'>
          <ShoppingCart className='h-5 w-5 mr-2 text-custom-blue' />
          <span className='text-custom-blue font-semibold'>
            Order Management
          </span>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-custom-blue transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className='absolute w-full bg-white border border-gray-300 border-t-0 rounded-b-md shadow-lg z-10'>
          <DropdownItem
            icon={<BarChart2 />}
            label='Enquiries'
            isActive={true}
          />
          <DropdownItem icon={<ShoppingCart />} label='Orders' badge={24} />
          <DropdownItem icon={<Truck />} label='Delivery' />
          <DropdownItem icon={<Clock />} label='Order History' />
          <DropdownItem icon={<Users />} label='Client History' />
        </div>
      )}
    </div>
  );
}

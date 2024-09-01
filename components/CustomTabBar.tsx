'use client';

import React from 'react';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Badge} from '@/components/ui/badge';

interface TabOption {
  value: string;
  label: string;
  count?: number;
}

interface CustomTabBarProps {
  options: TabOption[];
  defaultValue: string;
  onValueChange?: (value: string) => void;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  options,
  defaultValue,
  onValueChange,
}) => {
  return (
    <Tabs
      defaultValue={defaultValue}
      className='w-full mb-6'
      onValueChange={onValueChange}>
      <TabsList className='grid grid-cols-3 gap-4'>
        {options.map(option => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            className='flex items-center justify-between px-4 py-2 rounded-lg'>
            <span>{option.label}</span>
            {option.count !== undefined && (
              <Badge variant='secondary' className='ml-2 bg-gray-200'>
                {option.count}
              </Badge>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default CustomTabBar;

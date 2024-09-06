import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface HeaderProps {
  title: string;
  branchOptions: string[];
  dateOptions: string[];
  onBranchChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  branchOptions,
  dateOptions,
  onBranchChange,
  onDateChange,
}) => {
  return (
    <div className='flex justify-between items-center mb-6'>
      <h1 className='text-3xl font-medium text-[#17181C]'>{title}</h1>
      <div className='flex space-x-4'>
        <Select onValueChange={onBranchChange} defaultValue={branchOptions[0]}>
          <SelectTrigger className='w-[180px] bg-white'>
            <SelectValue placeholder='Select Branch' />
          </SelectTrigger>
          <SelectContent>
            {branchOptions.map(branch => (
              <SelectItem key={branch} value={branch}>
                {branch}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={onDateChange} defaultValue={dateOptions[0]}>
          <SelectTrigger className='w-[180px] bg-white'>
            <SelectValue placeholder='Select Date' />
          </SelectTrigger>
          <SelectContent>
            {dateOptions.map(date => (
              <SelectItem key={date} value={date}>
                {date}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Header;

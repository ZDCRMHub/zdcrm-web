import React from 'react';
import { Card, CardDescription, CardHeader } from '../../../../../components/ui/card';
import { Separator } from '../../../../../components/ui/separator';
import Image from 'next/image';

interface OrderStatisticsCardProps {
  header: string;
  icon: React.ReactNode;
  value: string;
  percentage: number;
  additionalText?: string;
  iconBg: string;
  isPositive: boolean;
}

const OrderStatisticsCard: React.FC<OrderStatisticsCardProps> = ({
  header,
  icon,
  value,
  percentage,
  additionalText,
  isPositive,
  iconBg,
}) => {
  return (
    <Card className='px-6 py-4'>
      <CardHeader className='p-0'>{header}</CardHeader>

      <Separator />

      <div className='flex justify-between items-center mt-5'>
        <div className='flex items-center gap-2.5 mb-1.5'>
          <div className='p-2 rounded-[6px]' style={{ backgroundColor: iconBg }}>
            {icon}
          </div>
          <span className='text-[1.5rem] text-dark-grey font-semibold'>{value}</span>
        </div>
        <div className='flex items-center gap-1'>
          <p className='border-border-grey border rounded-[6px] px-2.5 flex gap-1 text-sm'>
            <span
              className={`${isPositive ? `text-green-500` : `text-red-500`}`}>
              {isPositive ? '↑' : '↓'}
            </span>
            <span>{Math.abs(percentage)}%</span>
          </p>
          {
            additionalText &&
            <p className="text-xs">
              {additionalText}
            </p>
          }
          <div></div>
        </div>
      </div>
    </Card>
  );
};

export default OrderStatisticsCard;

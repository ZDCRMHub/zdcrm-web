import React from 'react';
import {Card, CardDescription, CardHeader} from '../../../../../components/ui/card';
import {Separator} from '../../../../../components/ui/separator';
import Image from 'next/image';

interface OrderStatisticsCardProps {
  header: string;
  icon: string;
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
        <div className='flex items-center gap-6 mb-1.5'>
          <div className='p-2 rounded-[6px]' style={{backgroundColor: iconBg}}>
            <Image src={icon} alt={icon} width={24} height={24} />
          </div>
          <span className='text-3xl text-dark-grey font-bold'>{value}</span>
        </div>
        <div className='flex items-center gap-1'>
          <div className='border-border-grey border rounded-[6px] px-2.5 flex gap-1'>
            <span
              className={`${isPositive ? `text-green-500` : `text-red-500`}`}>
              {isPositive ? '↑' : '↓'}
            </span>
            <span>{Math.abs(percentage)}%</span>
          </div>
          {additionalText && <div>{additionalText}</div>}
          <div></div>
        </div>
      </div>
    </Card>
  );
};

export default OrderStatisticsCard;

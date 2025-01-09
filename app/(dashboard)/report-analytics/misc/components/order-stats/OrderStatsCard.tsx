import React from 'react';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { OrderTimeLine } from '@/icons/sidebar';
import { Box, Box1, BoxRemove, BoxSearch, BoxTick, BoxTime, I3DCubeScan, Money, TruckTime } from 'iconsax-react';

interface OrderStatsCardProps {
    key_text: string;
    value: number
}

const OrderStatsCard: React.FC<OrderStatsCardProps> = ({
    key_text,
    value,
    
}) => {
    const title_text: Record<string, any> = {
        total_orders: {
            title: "Total Orders",
            icon: <Box1 className="text-white" />,
            iconBg: '#22292F'

        },
        soa_orders: {
            title: "SOA",
            icon: <Box />,
            iconBg: '#FFC600'
        },
        sorted_orders: {
            title: "Sorted Orders",
            icon: <I3DCubeScan className="text-white" />,
            iconBg: '#33860C'
        },
        dispatch_orders: {
            title: "Orders in Dispatch",
            icon: <TruckTime className="text-white" />,
            iconBg: '#17181C'          
        },
        dis_cl_deliveries: {
            title: "Dispatched to Clients",
            icon: <BoxTick className="" />,
            iconBg: '#FFC600'
        },
        delivered_deliveries: {
            title: "Delivered Orders",
            icon: <OrderTimeLine className="text-white" />,
            iconBg: '#33860C'
        },
        cancelled_orders: {
            title: "Cancelled Orders",
            icon: <BoxRemove className="text-white" />,
            iconBg: '#ff0000'
        },
        pending_payments: {
            title: "Pending Payment",
            icon: <BoxTime className="" />,
            iconBg: '#FFC600'
        },
    }
const item = title_text[key_text] || {}
    return (
        <Card className='px-6 py-4'>
            <CardHeader className='p-0'>{item?.title}</CardHeader>

            <Separator />

            <div className='flex justify-between items-center mt-5'>
                <div className='flex items-center gap-2.5 mb-1.5'>
                    <div className='p-2 rounded-[6px]' style={{ backgroundColor: item?.iconBg }}>
                        {item?.icon}
                    </div>
                    <span className={cn('text-[1.5rem] text-dark-grey font-semibold',
                        // isPositive ? `text-green-800` : '!text-red-500'
                    )}>{value}</span>
                </div>
                {/* <div className='flex items-center gap-1'>
                    <p className='border-border-grey border rounded-[6px] px-2.5 flex gap-1 text-sm'>
                        <span
                            className={`${isPositive ? `text-green-500` : `!text-red-500`}`}>
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
                </div> */}
            </div>
        </Card>
    );
};

export default OrderStatsCard;

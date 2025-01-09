import React from 'react';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { OrderTimeLine } from '@/icons/sidebar';
import { Box, BoxRemove, BoxSearch, I3DCubeScan, Money, TruckTime } from 'iconsax-react';
import { formatCurrency } from '@/utils/currency';

interface FinancialStatsCardProps {
    key_text: string;
    value: number
}

const FinancialStatsCard: React.FC<FinancialStatsCardProps> = ({
    key_text,
    value,

}) => {
    // {
    //     "total_revenue": "string",
    //     "total_inventory_cost": "string",
    //     "total_misc_expenses": "string",
    //     "total_delivery_fees": "string",
    //     "total_delivery_expenses": "string",
    //     "net_profit": "string",
    //     "order_count": 0,
    //     "items_sold": 0
    //   }

    const title_text: Record<string, any> = {
        total_revenue: {
            title: "Total Revenue",
            icon: <Money className="text-white" />,
            iconBg: '#131253',
            is_money: true
        },
        total_inventory_cost: {
            title: "Total Inventory Cost",
            icon: <Box />,
            iconBg: '#FFC600',
            is_money: true
        },
        total_misc_expenses: {
            title: "Total Misc Expenses",
            icon: <I3DCubeScan className="text-white" />,
            iconBg: '#33860C',
            is_money: true
        },
        total_delivery_fees: {
            title: "Total Delivery Fees",
            icon: <Money className="" />,
            iconBg: '#FFC600',
            is_money: true
        },
        total_delivery_expenses: {
            title: "Total Delivery Expenses",
            icon: <OrderTimeLine className="text-white" />,
            iconBg: '#ff0000',
            is_money: true
        },
        net_profit: {
            title: "Net Profit",
            icon: <OrderTimeLine className="text-white" />,
            iconBg: '#33860C',
            is_money: true
        },
        order_count: {
            title: "Order Count",
            icon: <BoxRemove className="text-white" />,
            iconBg: '#131253'
        },
        items_sold: {
            title: "Items Sold",
            icon: <BoxRemove className="text-white" />,
            iconBg: '#131253'
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
                    )}>
                        {
                            item.is_money ?
                                formatCurrency(value, "NGN") : value
                        }
                    </span>

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

export default FinancialStatsCard;

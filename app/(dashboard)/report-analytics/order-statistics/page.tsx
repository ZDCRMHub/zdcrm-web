'use client';

import Header from '@/components/report-analytics/Header';
import OrderStatisticsCard from '@/components/report-analytics/OrderStatisticsCard';
import ReusablePieChart from '@/components/report-analytics/OrderStatusChart';
import ComparisonModal from '@/components/report-analytics/ComparisonModal';
import TopProductsTable from '@/components/report-analytics/TopProductsTable';
import {Button} from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const orderData = [
  {name: 'Orders Delivered', value: 8},
  {name: 'Orders Sorted', value: 8},
  {name: 'Sent to Dispatch', value: 8},
];

const deliveryData = [
  {name: 'Lagos Island', value: 12},
  {name: 'Lagos Central', value: 15},
  {name: 'Lagos Mainland', value: 4},
  {name: 'Other places', value: 14},
];

const page = () => {
  const branchOptions = ['All Branches', 'Branch A', 'Branch B', 'Branch C'];
  const dateOptions = [
    'Today',
    'Yesterday',
    'Last 7 days',
    'Last 30 days',
    'Custom',
  ];

  const handleBranchChange = (value: string) => {
    console.log('Selected branch:', value);
    // Add your logic here
  };

  const handleDateChange = (value: string) => {
    console.log('Selected date range:', value);
    // Add your logic here
  };

  return (
    <div className='w-full max-w-7xl mx-auto pt-12'>
      <Header
        title='Order Statistics'
        branchOptions={branchOptions}
        dateOptions={dateOptions}
        onBranchChange={handleBranchChange}
        onDateChange={handleDateChange}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <OrderStatisticsCard
          header='Total Orders'
          icon='/img/box-time.svg'
          value='430'
          percentage={34}
          isPositive={true}
          additionalText='From last month'
          iconBg='#E6E6E6'
        />
        <OrderStatisticsCard
          header='Total Revenue'
          icon='/img/cash.svg'
          value='₦2,000,000.00'
          percentage={27}
          isPositive={true}
          iconBg='#E6E6E6'
        />
        <OrderStatisticsCard
          header='Net Profit'
          icon='/img/box-time.svg'
          value='₦1,600,600.00'
          percentage={15}
          isPositive={false}
          iconBg='#4A0E4E'
        />
        <OrderStatisticsCard
          header='Processed Orders'
          icon='/path-to-icon/processed.svg'
          value='430'
          percentage={34}
          isPositive={true}
          additionalText='From last month'
          iconBg='#FFF3D0'
        />
        <OrderStatisticsCard
          header='Completed Orders'
          icon='/path-to-icon/completed.svg'
          value='430'
          percentage={45}
          isPositive={true}
          additionalText='From last month'
          iconBg='#E6F5EA'
        />
        <OrderStatisticsCard
          header='Canceled Orders'
          icon='/path-to-icon/canceled.svg'
          value='430'
          percentage={15}
          isPositive={false}
          additionalText='From last month'
          iconBg='#FFE7E7'
        />
      </div>

      <div className='flex justify-end my-14'>
        <ComparisonModal />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-20 mb-10'>
        <ReusablePieChart
          title='Order Status'
          subtitle='Total Earnings of the Month'
          data={orderData}
          centerLabel={{value: '₦250,000', label: 'Total'}}
          trendup
        />

        <ReusablePieChart
          title='Order Delivery Zone'
          subtitle=''
          data={deliveryData}
          centerLabel={{value: '₦250,000', label: ''}}
          trendup={false}
        />

        <TopProductsTable />
      </div>

      <div className='flex justify-end mb-24 gap-6'>
        <Select>
          <SelectTrigger className='w-[153px]'>
            <SelectValue placeholder='Extract File' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='All'>All</SelectItem>
            <SelectItem value='Net Profit'>Net Profit</SelectItem>
            <SelectItem value='Total Revenue'>Total Revenue</SelectItem>
            <SelectItem value='Total Orders'>Total Orders</SelectItem>
          </SelectContent>
        </Select>
        <Button className='bg-amber-400 text-black border border-black px-11'>
          Download
        </Button>
      </div>
    </div>
  );
};

export default page;

import React, {useState} from 'react';
import {Search, RefreshCcw, ChevronDown, MoreHorizontal} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Select} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Badge} from '@/components/ui/badge';
import TabBar from '../TabBar';
import {useRouter} from 'next/navigation';
import OrderDetailsPanel from '../order-management/OrderDetailsPanel';

type StatusColor =
  | 'bg-green-100 text-green-800'
  | 'bg-yellow-100 text-yellow-800'
  | 'bg-purple-100 text-purple-800'
  | 'bg-gray-100 text-gray-800'
  | 'bg-red-100 text-red-800'
  | 'bg-blue-100 text-blue-800';

const statusColors: Record<string, StatusColor> = {
  SOA: 'bg-green-100 text-green-800',
  SORTED: 'bg-yellow-100 text-yellow-800',
  'DIS CL': 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-gray-100 text-gray-800',
  CANCELED: 'bg-red-100 text-red-800',
  'SENT TO DISPATCH': 'bg-blue-100 text-blue-800',
};

type Category = 'C' | 'W' | 'TB';

const categoryColors: Record<Category, string> = {
  C: 'bg-green-500',
  W: 'bg-blue-500',
  TB: 'bg-purple-500',
};

interface CategoryBadgeProps {
  category: Category;
  isActive: boolean;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({category, isActive}) => {
  return (
    <span
      className={`inline-block w-6 h-6 rounded-full ${
        isActive
          ? categoryColors[category]
          : 'bg-transparent border border-gray-400'
      } mr-1`}>
      <span className='sr-only'>{category}</span>
    </span>
  );
};

interface Order {
  orderId: string;
  customerName: string;
  phoneNumber: string;
  zone: string;
  enquiryItems: string[];
  recipientName: string;
  recipientPhone: string;
  category: Category[];
  orderNotes: string;
  status: string;
}

interface OrderRowProps {
  order: Order;
  onOpenOrderDetails: (orderId: string) => void;
}

const OrderRow: React.FC<OrderRowProps> = ({order, onOpenOrderDetails}) => {
  return (
    <TableRow>
      <TableCell>{order.orderId}</TableCell>
      <TableCell>
        <div>{order.customerName}</div>
        <div className='text-sm text-gray-500'>{order.phoneNumber}</div>
        <div className='text-xs text-gray-400'>{order.zone}</div>
      </TableCell>
      <TableCell>
        {order.enquiryItems.map((item, idx) => (
          <div key={idx}>{item}</div>
        ))}
      </TableCell>
      <TableCell>
        <div>{order.recipientName}</div>
        <div className='text-sm text-gray-500'>{order.recipientPhone}</div>
      </TableCell>

      <TableCell>
        <div className='flex'>
          {(['C', 'W', 'F', 'TB'] as Category[]).map(cat => (
            <CategoryBadge
              key={cat}
              category={cat}
              isActive={order.category.includes(cat)}
            />
          ))}
        </div>
      </TableCell>

      <TableCell>{order.orderNotes}</TableCell>
      <TableCell>
        <Badge
          className={statusColors[order.status] || 'bg-gray-100 text-gray-800'}>
          {order.status}
        </Badge>
      </TableCell>
      {/* <TableCell>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => handleOpenOrderDetails(order.orderId)}
          aria-label={`Open order details for ${order.orderId}`}>
          {'>>'}
        </Button>
      </TableCell> */}

      <TableCell>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => onOpenOrderDetails(order.orderId)}
          aria-label={`Open order details for ${order.orderId}`}>
          {'>>'}
        </Button>
      </TableCell>
    </TableRow>
  );
};

interface TabButtonProps {
  name: string;
  count: number;
  isActive: boolean;
  onClick: (name: string) => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  name,
  count,
  isActive,
  onClick,
}) => (
  <button
    className={`px-4 py-2 text-sm font-medium ${
      isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
    }`}
    onClick={() => onClick(name)}>
    {name}{' '}
    <span className='ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full'>
      {count}
    </span>
  </button>
);

const OrderDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Orders');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const tabs = [
    {name: 'All Orders', count: 450},
    {name: 'SOA', count: 40},
    {name: 'Sorted', count: 36},
    {name: 'Sent to dispatch', count: 18},
    {name: 'DIS CL', count: 40},
    {name: 'Delivered', count: 23},
    {name: 'DEL CL', count: 23},
    {name: 'Canceled Orders', count: 5},
  ];

  // const [activeTab, setActiveTab] = useState(tabs[0].name);

  const orders: Order[] = [
    {
      orderId: 'PF/LM6765',
      customerName: 'Ife Adebayo',
      phoneNumber: '08067556644',
      zone: 'Zone: Lagos Mainland',
      enquiryItems: [
        'Adeline Faultline Cake',
        'Moet Chandon',
        'Large size teddy',
      ],
      recipientName: 'Simisola',
      recipientPhone: '07023544455',
      category: ['C'], // These must match the 'Category' type
      orderNotes: 'Call Simisola',
      status: 'SOA',
    },
    {
      orderId: 'ZD/LM6765',
      customerName: 'Ife Adebayo',
      phoneNumber: '08067556644',
      zone: 'Zone: Lagos Mainland',
      enquiryItems: ['A stem of chrys', 'Moet Chandon', 'Large size teddy'],
      recipientName: 'Simisola',
      recipientPhone: '07023544455',
      category: ['W', 'TB'], // These must match the 'Category' type
      orderNotes: 'Deliver at door step',
      status: 'SORTED',
    },
    {
      orderId: 'ZD/LI6765',
      customerName: 'Ife Adebayo',
      phoneNumber: '08067556644',
      zone: 'Zone: Lagos Island',
      enquiryItems: [
        'Delectable Choco cake',
        'Moet Chandon',
        'Large size teddy',
      ],
      recipientName: 'Simisola',
      recipientPhone: '07023544455',
      category: ['C', 'W', 'TB'], // These must match the 'Category' type
      orderNotes: 'Deliver at door step',
      status: 'DIS CL',
    },
    {
      orderId: 'PF/LC6765',
      customerName: 'Ife Adebayo',
      phoneNumber: '08067556644',
      zone: 'Zone: Lagos Central',
      enquiryItems: ['Choco Drip Drop 104', 'Moet Chandon', 'Large size teddy'],
      recipientName: 'Simisola',
      recipientPhone: '07023544455',
      category: ['C', 'W', 'TB'], // These must match the 'Category' type
      orderNotes: 'Call Adeola',
      status: 'DELIVERED',
    },
    {
      orderId: 'PF/LM6765',
      customerName: 'Ife Adebayo',
      phoneNumber: '08067556644',
      zone: 'Zone: Lagos Mainland',
      enquiryItems: [
        'Adeline Faultline Cake',
        'Moet Chandon',
        'Large size teddy',
      ],
      recipientName: 'Simisola',
      recipientPhone: '07023544455',
      category: ['C', 'W', 'TB'], // These must match the 'Category' type
      orderNotes: 'Deliver at door step',
      status: 'CANCELED',
    },
    {
      orderId: 'ZD/LC6765',
      customerName: 'Ife Adebayo',
      phoneNumber: '08067556644',
      zone: 'Zone: Lagos Central',
      enquiryItems: [
        'Adeline Faultline Cake',
        'Moet Chandon',
        'Large size teddy',
      ],
      recipientName: 'Simisola',
      recipientPhone: '07023544455',
      category: ['C', 'W', 'TB'], // These must match the 'Category' type
      orderNotes: 'Call Simisola',
      status: 'SENT TO DISPATCH',
    },
  ];

  const handleOpenOrderDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
  };

  const handleCloseOrderDetails = () => {
    setSelectedOrderId(null);
  };

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <div className='flex justify-between items-center mb-6 gap-4'>
        <div className='flex items-center gap-2 w-80'>
          <div className='relative flex-1 w-full'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <Input
              type='text'
              placeholder='Search (client name, customer rep, phone number)'
              className='pl-10 pr-4 py-2 w-full focus:border'
            />
          </div>
          <Select>
            <option>Filter orders by</option>
          </Select>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='default' className='bg-black text-white'>
            + Add Order
          </Button>
          <Button
            variant='outline'
            className='bg-green-50 text-green-600 hover:bg-green-100'>
            <RefreshCcw className='mr-2 h-4 w-4' /> Refresh
          </Button>
        </div>
      </div>

      {/* <div className='flex space-x-4 border-b mb-4'>
        {tabs.map(tab => ( */}
      <TabBar tabs={tabs} onTabClick={setActiveTab} activeTab={activeTab} />
      {/* ))}
      </div> */}

      <div className='mb-4'>
        <Button
          variant='ghost'
          className='w-full justify-between text-left font-semibold'>
          TODAY
          <ChevronDown className='h-4 w-4' />
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customers Details</TableHead>
            <TableHead>Enquiry Item</TableHead>
            <TableHead>Recipient Details</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Order Notes</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        {/* <TableBody>
          {orders.map((order, index) => (
            <OrderRow key={index} order={order} />
          ))}
        </TableBody> */}
        <TableBody>
          {orders.map((order, index) => (
            <OrderRow
              key={index}
              order={order}
              onOpenOrderDetails={handleOpenOrderDetails}
            />
          ))}
        </TableBody>
      </Table>

      <div className='mt-4'>
        <Button
          variant='ghost'
          className='w-full justify-between text-left font-semibold'>
          TOMORROW
          <ChevronDown className='h-4 w-4' />
        </Button>
      </div>

      <div className='mt-4'>
        <Button
          variant='ghost'
          className='w-full justify-between text-left font-semibold'>
          IN 72 HOURS
          <ChevronDown className='h-4 w-4' />
        </Button>
      </div>

      <div className='mt-4'>
        <Button
          variant='ghost'
          className='w-full justify-between text-left font-semibold'>
          IN 7 DAYS
          <ChevronDown className='h-4 w-4' />
        </Button>
      </div>

      {selectedOrderId && (
        <OrderDetailsPanel
          orderId={selectedOrderId}
          onClose={handleCloseOrderDetails}
        />
      )}
    </div>
  );
};

export default OrderDashboard;

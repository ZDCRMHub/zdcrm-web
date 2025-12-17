import {ChevronDown, PlusCircle, RefreshCw, Search, User} from 'lucide-react';

interface TimelineItemProps {
  title: string;
  subtitle: string;
  time: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({title, subtitle, time}) => (
  <div className='bg-[#367917] bg-opacity-5 rounded-lg shadow pl-7 pr-10 pt-4 pb-3 mb-4 border border-custom-blue'>
    <div className='flex justify-between items-start'>
      <div>
        <h3 className='text-lg font-semibold text-custom-blue mb-6'>{title}</h3>
        {subtitle && <p className='text-sm text-gray-500 mb-14'>{subtitle}</p>}
      </div>
      <div className='flex items-center'>
        <button className='text-gray-600 bg-white hover:text-gray-800 mr-2 flex items-center py-2 px-2.5 rounded shadow'>
          <PlusCircle className='h-5 w-5 mr-1' />
          <span className='text-sm'>Add Note</span>
        </button>
        <div className='relative'>
          <select className='appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
            <option>Status</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
            <ChevronDown className='h-4 w-4' />
          </div>
        </div>
      </div>
    </div>
    <p className='text-sm text-red-500 mt-2 text-right'>{time}</p>
  </div>
);

export function OrderTimeline() {
  return (
    <div className='max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
      <div className='flex items-center justify-between'>
        <div className='relative rounded-md shadow-sm w-[346px] h-10'>
          <input
            type='text'
            className='form-input block w-full  h-full sm:text-sm sm:leading-5 pr-10 py-2 px-4 text-lg'
            placeholder='Search (client name, customer rep, phone number...)'
          />
          <div className='absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none'>
            <Search className='h-5 w-5 text-gray-400' />
          </div>
        </div>
        <button className='ml-4 bg-green-100 py-[18.5px] px-[14.5px] rounded-md text-green-600 hover:bg-green-200 flex items-center'>
          <RefreshCw className='h-5 w-5 mr-1' />
          <span>Refresh</span>
        </button>
      </div>
      <div className='mt-14'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-normal text-custom-blue mb-4'>
            <span className='font-semibold'>Today</span>, 22nd of 2024
          </h2>

          <button className='mr-9'>
            <ChevronDown />
          </button>
        </div>
        <TimelineItem
          title='Samson Juliet just placed an order ZD/LM6746'
          subtitle='Adeola Tomi'
          time='08:00 PM'
        />
        <TimelineItem
          title='Adekunle Wahab just carted an item'
          subtitle='Omotola started a discussion with Adekunle Wahab'
          time='06:00 PM'
        />
        {/* Add more TimelineItem components as needed */}
      </div>
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Tomorrow</h2>
        {/* Add TimelineItem components for tomorrow */}
      </div>
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>In 72 Hours</h2>
        {/* Add TimelineItem components for 72 hours from now */}
      </div>
      <div>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>In 7 Days</h2>
        {/* Add TimelineItem components for 7 days from now */}
      </div>
    </div>
  );
}

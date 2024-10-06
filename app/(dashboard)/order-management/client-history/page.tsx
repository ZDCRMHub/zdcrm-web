import {ClientHistoryDataTable} from '@/app/(dashboard)/order-management/client-history/misc/components/ClientHistoryDataTable';
import Layout from '@/components/layout/Layout';
import React from 'react';

const page = () => {
  return (
    <div className='w-full md:w-[95%] max-w-[1759px] mx-auto p-4 px-8'>
      <ClientHistoryDataTable />
    </div>
  );
};

export default page;

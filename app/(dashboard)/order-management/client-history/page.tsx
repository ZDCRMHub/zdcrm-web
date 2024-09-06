import {ClientHistoryDataTable} from '@/app/(dashboard)/order-management/client-history/misc/components/ClientHistoryDataTable';
import Layout from '@/components/layout/Layout';
import React from 'react';

const page = () => {
  return (
    <div className='container mx-auto p-4 px-8'>
      <ClientHistoryDataTable />
    </div>
  );
};

export default page;

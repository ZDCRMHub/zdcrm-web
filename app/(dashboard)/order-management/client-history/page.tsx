import {ClientHistoryDataTable} from '@/components/client-history/ClientHistoryDataTable';
import Layout from '@/components/Layout';
import React from 'react';

const page = () => {
  return (
    <div className='container mx-auto p-4'>
      <ClientHistoryDataTable />
    </div>
  );
};

export default page;

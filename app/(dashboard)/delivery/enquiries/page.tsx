'use client'
import Layout from '@/components/Layout';
import React from 'react';
import EnquiriesTable from '../../order-management/enquiries/misc/components/EnquiriesTable';

const page = () => {
  return (
    <Layout>
      <EnquiriesTable />
    </Layout>
  );
};

export default page;

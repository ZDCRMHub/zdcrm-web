'use client'
import Layout from '@/components/layout/Layout';
import {OrderTimeline} from '@/components/order/OrderTimeline';
import React from 'react';

const page = () => {
  return (
    <Layout>
      <OrderTimeline />
    </Layout>
  );
};

export default page;

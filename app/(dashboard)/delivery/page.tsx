'use client'
import Layout from '@/components/layout/Layout';
import React from 'react';
import { OrderTimeline } from './misc/DeliveryOrderTimeline';

const page = () => {
  return (
    <Layout>
      <OrderTimeline />
    </Layout>
  );
};

export default page;

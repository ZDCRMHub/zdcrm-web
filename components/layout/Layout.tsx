import React from 'react';
import {Navbar} from '@/components/layout/Navbar';
import {Sidebar} from '@/components/layout/Sidebar';

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar />
      <div className='flex flex-col flex-1 overflow-hidden'>
        <Navbar />
        <main className='flex-1 overflow-x-hidden overflow-y-auto bg-[#FAFAFA]'>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

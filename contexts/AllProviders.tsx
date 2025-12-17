'use client';
import React, { Suspense } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from './auth';
import { CloudinaryLoadingProvider } from './CloudinaryProvider';
import { Spinner } from '@/icons/core';
const queryClient = new QueryClient();


const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CloudinaryLoadingProvider>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen w-screen">
                <Spinner />
              </div>}>
            {children}
          </Suspense>
        </CloudinaryLoadingProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default AllProviders
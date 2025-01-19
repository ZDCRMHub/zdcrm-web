'use client';
import React from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from './auth';
import { CloudinaryLoadingProvider } from './CloudinaryProvider';
const queryClient = new QueryClient();


const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CloudinaryLoadingProvider>
          {children}
        </CloudinaryLoadingProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default AllProviders
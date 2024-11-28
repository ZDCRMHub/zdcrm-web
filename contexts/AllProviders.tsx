'use client';
import React from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from './auth';
const queryClient = new QueryClient();


const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
          {/* <UserProvider> */}
              {children}
          {/* </UserProvider> */}
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default AllProviders
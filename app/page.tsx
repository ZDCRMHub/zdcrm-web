'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Spinner } from '@/components/ui';

import { useAuth } from '../contexts/auth';

export default function Home() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, isAuthenticating } = useAuth()
  useEffect(() => {
    if (!isAuthenticated && !isLoading && !isAuthenticating) {
      router.push('/login');
    } else if (isAuthenticated && !isLoading && !isAuthenticating) {
      router.push('/order-timeline');
    }
  }, [user, isAuthenticated, isLoading, isAuthenticating, router]);

  if (isLoading || isAuthenticating) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Spinner />
      </div>
    )
  }
  return <div>Redirecting...</div>;
}

'use client'
import { useAuth } from '@/contexts/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function useCheckPermission(requiredPermissions: string[]) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && requiredPermissions.length > 0) {
      const hasPermission = requiredPermissions.some(permission => user.permissions.includes(permission));
      if (!hasPermission) {
        router.replace('/unauthorized'); 
      }
    }
  }, [user, requiredPermissions, router]);
}


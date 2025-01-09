import React from 'react'

import { Spinner } from '@/components/ui';
import { useAuth } from '@/contexts/auth'
import { useRouter } from 'next/navigation';

const RedirectionPage = () => {
  const { user, isAuthenticating, isAuthenticated } = useAuth();
  const router = useRouter();
  // {
  //   "permissions": [
  //     "CAN_MANAGE_BRANCHES",
  //     "CAN_MANAGE_DELIVERIES",
  //     "CAN_MANAGE_ENQUIRIES",
  //     "CAN_MANAGE_FINANCIAL_REPORT",
  //     "CAN_MANAGE_INVENTORIES",
  //     "CAN_MANAGE_ORDERS",
  //     "CAN_MANAGE_ORDERS_HISTORY",
  //     "CAN_MANAGE_ORDERS_STAT",
  //     "CAN_MANAGE_ROLES",
  //     "CAN_MANAGE_STAFFS"
  //   ]
  // }
  React.useEffect(() => {
    if (!isAuthenticated && !isAuthenticating) {
      router.push('/login');
    }
    else if (isAuthenticated && !isAuthenticating) {
      if (user?.permissions.includes('CAN_MANAGE_ORDERS_HISTORY')) {
        router.push('/order-timeline');
      }
      else if (user?.permissions.includes('CAN_MANAGE_ORDERS')) {
        router.push('/order-management/orders');
      } else if (user?.permissions.includes('CAN_MANAGE_INVENTORIES')) {
        router.push('/inventory/products');
      } else if (user?.permissions.includes('CAN_MANAGE_ENQUIRIES')) {
        router.push('/order-management/enquiries');
      } else if (user?.permissions.includes('CAN_MANAGE_DELIVERIES')) {
        router.push('/order-management/delivery');
      } else if (user?.permissions.includes('CAN_MANAGE_FINANCIAL_REPORT')) {
        router.push('/report-analytics/financial-report');
      } else if (user?.permissions.includes('CAN_MANAGE_STAFFS')) {
        router.push('/admin/employees-role');
      } else if (user?.permissions.includes('CAN_MANAGE_ROLES')) {
        router.push('/admin/admin-roles');
      } else if (user?.permissions.includes('CAN_MANAGE_BRANCHES')) {
        router.push('/branches');
      } else {
        router.push('/order-timeline');
      }
    }
  }, [user, router, isAuthenticating]);

  if (isAuthenticating) {
    return <div className='flex items-center justify-center'><Spinner /></div>
  }

  return (
    <div>

    </div>
  )
}

export default RedirectionPage
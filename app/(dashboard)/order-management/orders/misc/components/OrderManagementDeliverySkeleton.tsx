'use client'

import React from 'react'
import { Skeleton, Card } from "@/components/ui"
import { Separator } from "@/components/ui/separator"

const OrderManagementDeliverySkeleton = () => {
  return (
    <div className='max-w-[1440px] mx-auto p-4 space-y-6 px-8'>
      <header className='flex items-center mb-10'>
        <Skeleton className="h-10 w-10 rounded-full mr-2" />
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-60 ml-2.5" />
      </header>

      <section className="grid md:grid-cols-2 gap-8">
        <Card className='flex-1 space-y-4 p-5 rounded-2xl'>
          <div className='flex justify-between items-center'>
            <Skeleton className="h-6 w-40" />
          </div>

          <Separator />

          {[...Array(6)].map((_, index) => (
            <div key={index} className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </Card>

        <Card className='flex-1 space-y-4 p-5 rounded-2xl'>
          <div className='flex justify-between items-center'>
            <Skeleton className="h-6 w-40" />
          </div>

          <Separator />

          {[...Array(4)].map((_, index) => (
            <div key={index} className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </Card>

        <div className='flex flex-col space-y-8 p-5 rounded-2xl'>
          {[...Array(4)].map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
          <Skeleton className="h-14 w-full" />
        </div>
      </section>
    </div>
  )
}

export default OrderManagementDeliverySkeleton


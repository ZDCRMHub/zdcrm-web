import { Skeleton } from "@/components/ui/skeleton"

export function OrderStatsDeliveryZoneChartSkeleton() {
  // Function to generate a random height between 40% and 100%
  const randomHeight = () => `${Math.floor(Math.random() * 61) + 40}%`;

  return (
    <div className="w-full h-[90%] flex flex-col pt-5">
      <div className="flex-1 flex items-end">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex-1 flex items-end justify-center space-x-2">
            <Skeleton className={`w-8 h-24`} />
            <Skeleton className={`w-8 h-60`} />
          </div>
        ))}
      </div>
      <Skeleton className="h-2 w-full mt-4" /> {/* X-axis */}
      <div className="flex justify-center mt-4 space-x-4">
        <Skeleton className="h-4 w-20" /> {/* Legend item */}
        <Skeleton className="h-4 w-20" /> {/* Legend item */}
      </div>
    </div>
  )
}


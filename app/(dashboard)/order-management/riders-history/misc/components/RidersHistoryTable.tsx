import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/currency";
import { FilterSearch } from "iconsax-react";
import { Button, LinkButton, Spinner } from "@/components/ui";
import { ChevronLeft, ChevronRight, Inbox } from "lucide-react";
import {  maskString } from "@/utils/strings";
import Link from "next/link";
import { TRiderHistory } from "../../../misc/api/getRiderHistory";

type StatusColor =
  | "bg-green-100 hover:bg-green-100 text-green-800"
  | "bg-yellow-100 hover:bg-yellow-100 text-yellow-800"
  | "bg-purple-100 hover:bg-purple-100 text-purple-800"
  | "bg-gray-100 hover:bg-gray-100 text-gray-800"
  | "bg-red-100 hover:bg-red-100 text-red-800"
  | "bg-blue-100 hover:bg-blue-100 text-blue-800";

export const ORDER_STATUS_COLORS: Record<string, StatusColor> = {
  SOA: "bg-green-100 hover:bg-green-100 text-green-800",
  SOR: "bg-yellow-100 hover:bg-yellow-100 text-yellow-800",
  PND: "bg-purple-100 hover:bg-purple-100 text-purple-800",
  COM: "bg-gray-100 hover:bg-gray-100 text-gray-800",
  CAN: "bg-red-100 hover:bg-red-100 text-red-800",
  STD: "bg-blue-100 hover:bg-blue-100 text-blue-800",
};



interface OrderRowProps {
  rider: TRiderHistory;
}

const OrderRow: React.FC<OrderRowProps> = ({ rider }) => {
  return (
    <TableRow>
      <TableCell className="min-w-[150px]">
        <div>{rider.name}</div>
      </TableCell>
      <TableCell className="py-6">
        <div>{maskString(rider.phone_number, 3, true)}</div>
      </TableCell>

      <TableCell className="py-6">
        <div>{rider.orders_delivered}</div>
      </TableCell>

      <TableCell className="py-6">
        <div>{rider.delivery_platform}</div>
      </TableCell>

      <TableCell className="py-6">
        <div>
          {formatCurrency(parseInt(rider.total_delivery_fee), "NGN")}
        </div>
      </TableCell>

      <TableCell className="py-6">
        <Link href={`/order-management/riders-history/${rider.id}`}>
          {">>"}
        </Link>
      </TableCell>
    </TableRow>
  );
};

interface ClientHistoryTableProps {
  data?: TRiderHistory[];
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  type?: string;
  isFiltered?: boolean;
}
const ClientHistoryTable = ({
  data,
  isLoading,
  isFetching,
  error,
  isFiltered,
}: ClientHistoryTableProps) => {
  const tableRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const checkForScrolling = React.useCallback(() => {
    requestAnimationFrame(() => {
      if (tableRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tableRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    });
  }, []);

  React.useEffect(() => {
    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener("scroll", checkForScrolling);
      window.addEventListener("resize", checkForScrolling);
      checkForScrolling();
    }

    return () => {
      if (tableElement) {
        tableElement.removeEventListener("scroll", checkForScrolling);
      }
      window.removeEventListener("resize", checkForScrolling);
    };
  }, [checkForScrolling]);

  React.useEffect(() => {
    checkForScrolling();
  }, [data, checkForScrolling]);

  const scrollTable = (direction: "left" | "right") => {
    if (tableRef.current) {
      const scrollAmount = 300;
      const currentScroll = tableRef.current.scrollLeft;
      const newScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      tableRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });

      setTimeout(checkForScrolling, 300);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[50vh] py-[10vh]">
        <Spinner />
      </div>
    );
  if (error) return <div>Error fetching data</div>;
  if (!data) return null;

  return (
    <div className="relative h-[93%]">
      <div className="flex items-center gap-4 h-3">
        <div className={cn("overflow-hidden rounded-full mb-1 grow")}>
          <div
            className={cn(
              "bg-[#F8F9FB] h-1 w-full overflow-hidden",
              isFetching && !isLoading && "bg-blue-200"
            )}
          >
            <div
              className={cn(
                "h-full w-full origin-[0_50%] animate-indeterminate-progress rounded-full bg-primary opacity-0 transition-opacity",
                isFetching && !isLoading && "opacity-100"
              )}
            ></div>
          </div>
        </div>
        <section className="flex items-center gap-2 shrink-0 px-5 -translate-y-full">
          <Button
            className="z-10 h-7 w-7"
            onClick={() => scrollTable("left")}
            variant="light"
            size="icon"
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            className="z-10 h-7 w-7"
            onClick={() => scrollTable("right")}
            variant="light"
            size="icon"
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </section>
      </div>

      <div ref={tableRef} className="overflow-auto max-h-full">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px] max-w-[500px]">
                    Rider&apos; Name
                  </TableHead>
                  <TableHead className="min-w-[150px]">Phone Number</TableHead>
                  <TableHead className="min-w-[200px]">
                    Number of Orders Delivered
                  </TableHead>
                  <TableHead className="min-w-[150px]">
                    Delivery Platform
                  </TableHead>
                  <TableHead className="min-w-[150px]">
                    Total Delivery Fee
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((rider, index) => (
                  <OrderRow key={index} rider={rider} />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {data.length === 0 && isFiltered && (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[50vh] py-[10vh]">
          <Inbox size={60} />
          <div className="text-[#494949] text-center text-lg font-medium font-manrope max-w-sm text-balance">
            No Orders Found
          </div>
          <LinkButton href="./riders/new-rider"></LinkButton>
        </div>
      )}
      {data.length === 0 && !isFiltered && (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[50vh] py-[10vh]">
          <FilterSearch size={60} />
          <div className="text-[#494949] text-center text-lg font-medium font-manrope max-w-sm text-balance">
            No riders match your filters. Clear filters and try again
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientHistoryTable;

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
import OrderDetailSheetHistory from "./OrderDetailSheetHistory";
import { format } from "date-fns";
import { convertNumberToNaira } from "@/utils/currency";
import { FilterSearch, Tag } from "iconsax-react";
import { TOrder } from "../types";
import { Button, LinkButton, Spinner } from "@/components/ui";
import { ChevronLeft, ChevronRight, Inbox } from "lucide-react";
import { useBooleanStateControl } from "@/hooks";
import { convertKebabAndSnakeToTitleCase } from "@/utils/strings";
import { ORDER_STATUS_COLORS } from "./OrdersTable";
import {
  CATEGORIES_ENUMS,
  DELIVERY_ZONES_ENUMS,
  ORDER_STATUS_ENUMS,
} from "@/constants";

type StatusColor =
  | "bg-green-100 hover:bg-green-100 text-green-800"
  | "bg-yellow-100 hover:bg-yellow-100 text-yellow-800"
  | "bg-purple-100 hover:bg-purple-100 text-purple-800"
  | "bg-gray-100 hover:bg-gray-100 text-gray-800"
  | "bg-red-100 hover:bg-red-100 text-red-800"
  | "bg-blue-100 hover:bg-blue-100 text-blue-800";

const statusColors: Record<string, StatusColor> = {
  paid_website_card: "bg-green-100 hover:bg-green-100 text-green-800",
  paid_naira_transfer: "bg-green-100 hover:bg-green-100 text-green-800",
  paid_pos: "bg-green-100 hover:bg-green-100 text-green-800",
  paid_usd_transfer: "bg-green-100 hover:bg-green-100 text-green-800",
  paid_paypal: "bg-green-100 hover:bg-green-100 text-green-800",
  cash_paid: "bg-green-100 hover:bg-green-100 text-green-800",
  paid_bitcoin: "bg-green-100 hover:bg-green-100 text-green-800",
  not_received_paid: "bg-yellow-100 hover:bg-yellow-100 text-yellow-800",
  part_payment: "bg-yellow-100 hover:bg-yellow-100 text-yellow-800",
  not_paid_go_ahead: "bg-red-100 hover:bg-red-100 text-red-800",
  // PND: 'bg-purple-100 hover:bg-purple-100 text-purple-800',
  // COM: 'bg-gray-100 hover:bg-gray-100 text-gray-800',
  // STD: 'bg-blue-100 hover:bg-blue-100 text-blue-800',
};

interface OrderRowProps {
  order: TOrder;
}

const OrderRow: React.FC<OrderRowProps> = ({ order }) => {
  const {
    state: isSheetOpen,
    toggle: toggleSheet,
    setFalse: closeSheet,
    setTrue: openSheet,
  } = useBooleanStateControl();

  return (
    <TableRow>
      <TableCell className="min-w-[150px]">
        <div>{order.order_number}</div>
        <div className="text-[0.825rem] text-gray-500 truncate">
          {order.created_by.name}
        </div>
      </TableCell>
      <TableCell className="min-w-[150px]">
        <div>{DELIVERY_ZONES_ENUMS[order.delivery.zone]}</div>
        <div className="text-[0.825rem] text-gray-500 truncate">
          {order.branch?.name}
        </div>
      </TableCell>
      <TableCell className="">
        <div>{order.customer?.name}</div>
        <div className="text-sm text-gray-500">{order.customer.phone}</div>
      </TableCell>
      <TableCell className=" uppercase">
        {format(order.delivery.delivery_date, "dd/MMM/yyyy")}
      </TableCell>
      <TableCell>
        <div>
          {order.delivery.delivery_platform || "-"} -{" "}
          {order.delivery.driver_name || "-"}{" "}
        </div>
        <div className="text-sm text-gray-500">
          {order.delivery.driver_phone}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2 min-w-max">
          {order.items.map((item) => (
            <Badge
              key={item.id}
              variant="outline"
              className={cn(
                "flex items-center justify-center bg-transparent text-[#A7A7A7] font-normal rounded-sm h-5 w-5",
                item.is_sorted && "text-white bg-[#367917] border-transparent"
              )}
            >
              {CATEGORIES_ENUMS[item.product.category.name]}
            </Badge>
          ))}
        </div>
      </TableCell>
      <TableCell className="min-w-[180px] max-w-[500px]">
        {order.message}
      </TableCell>
      <TableCell className="min-w-max">
        <div className="font-bold">
          {convertNumberToNaira(Number(order.total_amount) || 0)}
        </div>
        <div className="text-sm text-[#494949]">{order.payment_status}</div>
      </TableCell>
      <TableCell className="min-w-max">
        <Badge
          className={cn(
            ORDER_STATUS_COLORS[order.status] ||
              "bg-gray-100 text-gray-800 w-full text-center min-w-max",
            "rounded-md w-max"
          )}
        >
          {ORDER_STATUS_ENUMS[order.status]}
        </Badge>
      </TableCell>

      <TableCell>
        <Button
          variant="ghost"
          size="sm"
          aria-label={`Open order details for ${order?.id}`}
          onClick={openSheet}
        >
          {">>"}
        </Button>
        <OrderDetailSheetHistory
          order={order}
          isSheetOpen={isSheetOpen}
          closeSheet={closeSheet}
        />
      </TableCell>
    </TableRow>
  );
};

interface OrdersTableProps {
  data?: TOrder[];
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  type?: string;
  isFiltered?: boolean;
}
const OrdersTableHistory = ({
  data,
  isLoading,
  isFetching,
  error,
  isFiltered,
}: OrdersTableProps) => {
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
                  <TableHead className="min-w-[150px]">Order ID</TableHead>
                  <TableHead className="min-w-[150px]">Delivery Zone</TableHead>
                  <TableHead className="min-w-[200px] max-w-[500px]">
                    Customers Details
                  </TableHead>
                  <TableHead className="min-w-[175px] max-w-[500px]">
                    Delivery Date
                  </TableHead>
                  <TableHead>Rider Details</TableHead>
                  <TableHead className="w-[170px]">Category</TableHead>
                  <TableHead className="min-w-[180px]">
                    Message on Order
                  </TableHead>
                  <TableHead className="min-w-[150px]">Total Amount</TableHead>
                  <TableHead className="min-w-[175px] max-w-[500px]">
                    {" "}
                    Status
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((order, index) => (
                  <OrderRow key={index} order={order} />
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
          <LinkButton href="./orders/new-order">Create New Order</LinkButton>
        </div>
      )}
      {data.length === 0 && !isFiltered && (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[50vh] py-[10vh]">
          <FilterSearch size={60} />
          <div className="text-[#494949] text-center text-lg font-medium font-manrope max-w-sm text-balance">
            No orders match your filters. Clear filters and try again
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTableHistory;

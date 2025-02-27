import React, { useState } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useBooleanStateControl } from "@/hooks";
import { Button, ConfirmActionModal, ConfirmDeleteModal, LinkButton, Spinner } from "@/components/ui";
import { ElipsisHorizontal } from "@/icons/core";

import { TEnquiry } from "../types";
import { useUpdateEnquiryStatus } from "../api";
import { formatAxiosErrorMessage } from "@/utils/errors";
import { useQueryClient } from "@tanstack/react-query";
import { Edit, FilterSearch, I3DRotate, Trash } from "iconsax-react";
import { ChevronLeft, ChevronRight, Inbox } from "lucide-react";

interface EnquiriesTableProps {
  data?: TEnquiry[]
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  type?: string;
  isFiltered?: boolean
}

export default function EnquiriesTable({ data, isLoading, isFetching, error, type = "active", isFiltered }: EnquiriesTableProps) {
  const [selectedEnquiry, setSelectedEnquiry] = useState<TEnquiry | null>(null);

  const handleOpen = (enquiry: TEnquiry) => {
    setSelectedEnquiry(enquiry);
  };

  const {
    state: isConfirmDeleteModalOpen,
    setTrue: openConfirmDeleteModal,
    setFalse: closeConfirmDeleteModal,
  } = useBooleanStateControl();
  const {
    state: isConfirmRestoreModalOpen,
    setTrue: openConfirmRestoreModal,
    setFalse: closeConfirmRestoreModal,
  } = useBooleanStateControl();




  const { mutate, isPending } = useUpdateEnquiryStatus();
  const queryClient = useQueryClient();
  const confirmUpdateEnquiryStatus = (status: "DEL" | "STD") => {
    if (selectedEnquiry) {
      mutate({ id: selectedEnquiry.id, status }, {
        onSuccess: () => {
          toast.success("Enquiry deleted successfully");
          closeConfirmRestoreModal();
          closeConfirmDeleteModal();
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as unknown as any);
          toast.error(`Failed to delete enquiry : ${errorMessage}`);
        }
      });
    }
  }



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
      tableElement.addEventListener('scroll', checkForScrolling);
      window.addEventListener('resize', checkForScrolling);
      checkForScrolling();
    }

    return () => {
      if (tableElement) {
        tableElement.removeEventListener('scroll', checkForScrolling);
      }
      window.removeEventListener('resize', checkForScrolling);
    };
  }, [checkForScrolling]);

  React.useEffect(() => {
    checkForScrolling();
  }, [data, checkForScrolling]);

  const scrollTable = (direction: 'left' | 'right') => {
    if (tableRef.current) {
      const scrollAmount = 300;
      const currentScroll = tableRef.current.scrollLeft;
      const newScroll = direction === 'left'
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

      tableRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });

      setTimeout(checkForScrolling, 300);
    }
  };


  if (isLoading) return <div className='flex items-center justify-center w-full h-full min-h-[50vh] py-[10vh]'><Spinner /></div>;
  if (error) return <div>Error fetching data</div>;
  if (!data) return null;

  return (
    <div className="relative h-[93%]">
      <div className="flex items-center gap-4 h-3">
        <div className={cn('overflow-hidden rounded-full mb-1 grow')}>
          <div className={cn("bg-[#F8F9FB] h-1 w-full overflow-hidden", isFetching && !isLoading && 'bg-blue-200')}>
            <div className={cn("h-full w-full origin-[0_50%] animate-indeterminate-progress rounded-full bg-primary opacity-0 transition-opacity", isFetching && !isLoading && 'opacity-100')}></div>
          </div>
        </div>
        <section className='flex items-center gap-2 shrink-0 px-5 -translate-y-full'>
          <Button
            className="z-10 h-7 w-7"
            onClick={() => scrollTable('left')}
            variant="light"
            size="icon"
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            className="z-10 h-7 w-7"
            onClick={() => scrollTable('right')}
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
                  <TableCell>Customer Details</TableCell>
                  <TableCell >Enquiry Item</TableCell>
                  <TableCell className="w-max max-w-[350px] min-w-[180px]">Delivery Notes</TableCell>
                  <TableCell className="w-max max-w-[200px] min-w-[150px]">Delivery Date</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((enquiry, index) => (
                  <TableRow key={enquiry.id}>
                    <TableCell>
                      <div className="font-medium !min-w-max">
                        {enquiry.customer.name}
                      </div>
                      <div className="text-sm text-gray-500">{enquiry.customer.phone}</div>
                    </TableCell>
                    <TableCell>
                      {enquiry.items.map((item, idx) => (
                        <div key={idx} className="!min-w-max">
                          {item.product.name}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell className="w-max max-w-[350px] min-w-[180px]">{enquiry.message}</TableCell>
                    <TableCell className="uppercase">
                      {format(new Date(enquiry.create_date), "dd/MMM/yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        {enquiry.items.map((item) => (
                          <Badge
                            key={item.id}
                            variant="outline"
                            className="flex items-center justify-center bg-transparent text-[#A7A7A7] font-normal rounded-sm h-5 w-5"
                          >
                            {item.product.category.name.charAt(0)}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="min-w-full max-w-max grid grid-cols-[1fr,0.5fr] items-center ">
                        <Badge
                          variant="secondary"
                          className={cn(
                            "rounded-md w-max",
                            `${enquiry.status === "STD"
                              ? "bg-[#F4F0FF] text-[#8C62FF]"
                              : enquiry.status === "FND"
                                ? "bg-[#E7F7EF] text-[#0CAF60]"
                                : enquiry.status === "CON"
                                  ? "bg-[#BF6A021C] text-[#BF6A02]"
                                  : " bg-[#bf0f021c] text-[#bf3102]"
                            }`
                          )}
                        >
                          {enquiry.status === "STD" ? "STARTED DISCUSSION" :
                            enquiry.status === "FND" ? "FINALIZED DISCUSSION" :
                              enquiry.status === "DEL" ? "DELETED" :
                                "CONVERTED"}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <ElipsisHorizontal className="h-6 w-6" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="py-0 px-0 w-[235px]"
                          >
                            {
                              type === "active" ? (
                                <>
                                  <DropdownMenuItem>
                                    <Link
                                      href={`./enquiries/edit-enquiry/${enquiry.id}`}
                                      className="w-full"
                                    >
                                      <span className="flex items-center gap-2 pl-6 py-3">
                                        <Edit size={20} />
                                        Edit Enquiry
                                      </span>
                                    </Link>
                                  </DropdownMenuItem>

                                  <DropdownMenuItem>
                                    <Link
                                      href={`./enquiries/edit?enwuiry_id=${enquiry.id}`}
                                      className="w-full"
                                    >
                                      <span className="flex items-center gap-2 pl-6 py-3">
                                        <I3DRotate size={24} />
                                        Enquiry Details
                                      </span>
                                    </Link>
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    onSelect={() => {
                                      setSelectedEnquiry(enquiry);
                                      openConfirmDeleteModal();
                                    }}
                                    className="cursor-pointer"

                                  >
                                    <span className="flex items-center gap-2 pl-6  py-3">
                                      <Trash size={24} />

                                      Delete Enquiry
                                    </span>
                                  </DropdownMenuItem>
                                </>

                              )
                                :
                                (
                                  <DropdownMenuItem
                                    onSelect={() => {
                                      setSelectedEnquiry(enquiry);
                                      openConfirmRestoreModal();
                                    }}
                                    className="cursor-pointer"
                                  >
                                    <span className="flex items-center gap-2 pl-6  py-3">
                                      {/* <Image
                                src="/img/restore.svg"
                                alt=""
                                width={24}
                                height={24}
                              /> */}
                                      Restore Enquiry
                                    </span>
                                  </DropdownMenuItem>
                                )
                            }


                          </DropdownMenuContent>
                        </DropdownMenu>

                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>




      {
        data.length === 0 && !isFiltered && (
          <div className='flex flex-col items-center justify-center w-full h-full min-h-[50vh] py-[10vh]'>
            <Inbox size={60} />
            <div className='text-[#494949] text-center text-lg font-medium font-manrope max-w-sm text-balance'>No Enquiry Found</div>
            <LinkButton href="./enquiries/new-enquiry" className="px-10 h-14 mt-4">
              Create Enquiry
            </LinkButton>
          </div>
        )
      }
      {
        data.length === 0 && isFiltered && (
          <div className='flex flex-col items-center justify-center w-full h-full min-h-[50vh] py-[10vh]'>
            <FilterSearch size={60} />
            <div className='text-[#494949] text-center text-lg font-medium font-manrope max-w-sm text-balance'>No enquiries match your filters. Clear filters and try again</div>
          </div>
        )
      }
      <ConfirmDeleteModal
        isModalOpen={isConfirmDeleteModalOpen}
        closeModal={closeConfirmDeleteModal}
        deleteFn={() => confirmUpdateEnquiryStatus("DEL")}
        isDeleting={isPending}
        heading="Delete Enquiry"
        subheading="This action means order enquiry be removed."
      />
      <ConfirmActionModal
        isModalOpen={isConfirmRestoreModalOpen}
        closeModal={closeConfirmRestoreModal}
        confirmFn={() => confirmUpdateEnquiryStatus("STD")}
        heading="Restore Enquiry"
        isConfirming={isPending}
        subheading="This action will restore this enquiry and add it to the enquiry list."
      />
    </div>
  );
}

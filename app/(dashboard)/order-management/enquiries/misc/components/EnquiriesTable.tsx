import { format } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useBooleanStateControl } from "@/hooks";
import { Button, ConfirmActionModal, ConfirmDeleteModal, Spinner } from "@/components/ui";
import { ElipsisHorizontal } from "@/icons/core";

import { TEnquiry } from "../types";
import { useUpdateEnquiryStatus } from "../api";
import { formatAxiosErrorMessage } from "@/utils/errors";
import { useQueryClient } from "@tanstack/react-query";
import { I3DRotate, Trash } from "iconsax-react";

interface EnquiriesTableProps {
  data?: TEnquiry[]
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  type?: string;
}

export default function EnquiriesTable({ data, isLoading, isFetching, error, type = "active" }: EnquiriesTableProps) {
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


  if (isLoading) return <div className='flex items-center justify-center w-full h-full min-h-[50vh] py-[10vh]'><Spinner /></div>;
  if (error) return <div>Error fetching data</div>;
  if (!data) return null;

  return (
    <div className="w-full md:w-[95%] max-w-[1792px] max-md:px-8">
      <div
        className={cn(
          'overflow-hidden rounded-full mb-1',
        )}
      >
        <div className={cn("bg-[#F8F9FB] h-1 w-full overflow-hidden",
          isFetching && !isLoading && 'bg-blue-200'
        )}>

          <div className={cn("h-full w-full origin-[0_50%] animate-indeterminate-progress rounded-full bg-primary opacity-0 transition-opacity", isFetching && !isLoading && 'opacity-100')}></div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Customer Details</TableCell>
            <TableCell >Enquiry Item</TableCell>
            <TableCell className="w-max max-w-[250px] min-w-[180px]">Delivery Notes</TableCell>
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
              <TableCell>{enquiry.message}</TableCell>
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
                                href={`./enquiries/${enquiry.id}`}
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




// const EnquiriesTableRow = ({ enquiry }: { enquiry: TEnquiry }) => {
//   return (
//     <TableRow>
//       <TableCell>{enquiry.customer.name}</TableCell>
//       <TableCell>
//         {enquiry.items.map((item, idx) => (
//           <div key={idx} className="!min-w-max">
//             {item.product.name}
//           </div>
//         ))}
//       </TableCell>
//       <TableCell>{enquiry.message}</TableCell>
//       <TableCell className="uppercase">
//         {format(new Date(enquiry.create_date), "dd/MMM/yyyy")}
//       </TableCell>
//       <TableCell>
//         <div className="flex space-x-1">
//           {enquiry.items.map((item) => (
//             <Badge
//               key={item.id}
//               variant="outline"
//               className="flex items-center justify-center bg-transparent text-[#A7A7A7] font-normal rounded-sm h-5 w-5"
//             >
//               {item.product.category.name.charAt(0)}
//             </Badge>
//           ))}
//         </div>
//       </TableCell>
//       <TableCell>
//         <div className="min-w-full max-w-max grid grid-cols-[1fr,0.5fr] items-center ">
//           <Badge
//             variant="secondary"
//             className={cn(
//               "rounded-md w-max",
//               `${enquiry.status === "STD"
//                 ? "bg-[#E7F7EF] text-[#0CAF60]"
//                 : enquiry.status === "FND"
//                   ? "bg-[#BF6A021C] text-[#BF6A02]"
//                   : "bg-[#F4F0FF] text-[#8C62FF]"
//               }`
//             )}
//           >
//             {enquiry.status === "STD" ? "STARTED DISCUSSION" :
//               enquiry.status === "FND" ? "FINALIZED DISCUSSION" :
//                 "STILL DISCUSSING"}
//           </Badge>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="h-8 w-8 p-0">
//                 <ElipsisHorizontal className="h-6 w-6" />
//                 <span className="sr-only">Open menu</span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent
//               align="end"
//               className="py-4 px-0 w-[235px]"
//             >
//               <DropdownMenuItem>
//                 <Link
//                   href={`./${enquiry.id}`}
//                   className="w-full"
//                 >
//                   <span className="flex items-center gap-2 pl-6 py-3">
//                     <Image
//                       src="/img/3d-rotate.svg"
//                       alt=""
//                       width={24}
//                       height={24}
//                     />
//                     Enquiry Details
//                   </span>
//                 </Link>
//               </DropdownMenuItem>
//               {/* <DropdownMenuItem onSelect={openConfirmApproveModal}>
//               <span className='flex items-center gap-2 pl-6 py-3'>
//                 <Image
//                   src='/img/cash.svg'
//                   alt=''
//                   width={24}
//                   height={24}
//                 />
//                 Payment Confirmed
//               </span>
//             </DropdownMenuItem> */}
//               <DropdownMenuItem onSelect={openConfirmDeleteModal}>
//                 <span className="flex items-center gap-2 pl-6  py-3">
//                   <Image
//                     src="/img/trash.svg"
//                     alt=""
//                     width={24}
//                     height={24}
//                   />
//                   Delete Enquiry
//                 </span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//           <div/>
//       </TableCell>
//     </TableRow>
//   );
// };


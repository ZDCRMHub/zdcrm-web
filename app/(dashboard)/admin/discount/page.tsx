"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdOutlineModeEdit } from "react-icons/md";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { IoChevronUp } from "react-icons/io5";
import { Spinner, SuccessModal } from "@/components/ui";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import {
  useGetAllDiscounts,
  useCreateDiscount,
  useUpdateDiscount,
} from "./misc/api";
import { TDiscountItem } from "./misc/types";
import { useGetCategories } from "../../inventory/misc/api";
import ErrorModal from "@/components/ui/modal-error";
import { extractErrorMessage } from "@/utils/errors";
import { useDebounce } from "@/hooks";

const Page = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  
  const [newDiscount, setNewDiscount] = useState<{
    type: string;
    amount: string;
  }>({
    type: "",
    amount: "",
  });
  const [editingDiscount, setEditingDiscount] = useState<TDiscountItem | null>(
    null
  );
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const createDiscountMutation = useCreateDiscount();
  const updateDiscountMutation = useUpdateDiscount();

  const {
    data: discountsData,
    isLoading: isLoadingDiscounts,
    isFetching,
    error: discountsError,
  } = useGetAllDiscounts({
    paginate: true,
    page: currentPage,
    size: pageSize,
  });

  useEffect(() => {
    if (discountsData || discountsError) {
      setIsInitialLoading(false);
    }
  }, [discountsData, discountsError]);

  const handleEditClick = (discount: TDiscountItem) => {
    setEditingDiscount(discount);
    setIsSheetOpen(true);
  };

  if (isInitialLoading && isLoadingDiscounts) {
    return (
      <div className="flex items-center justify-center h-full w-full py-[30vh]">
        <Spinner size={18} />
      </div>
    );
  }

  if (discountsError) return <div>Error: {discountsError?.message}</div>;

  const handleCreate = () => {
    if (!newDiscount.type || !newDiscount.amount) {
      setErrorMessage("Please fill in all required fields");
      setIsErrorModalOpen(true);
      return;
    }

    createDiscountMutation.mutate(
      {
        type: newDiscount.type,
        amount: parseInt(newDiscount.amount),
      },
      {
        onSuccess: () => {
          setSuccessMessage("Discount created successfully");
          setIsSuccessModalOpen(true);
          setNewDiscount({ type: "", amount: "" });
        },
        onError: (error: unknown) => {
          const errMessage = extractErrorMessage(
            (error as any)?.response?.data as any
          );
          setErrorMessage(errMessage || "Failed to create discount");
          setIsErrorModalOpen(true);
        },
      }
    );
  };

  const handleUpdate = () => {
    if (!editingDiscount) return;

    updateDiscountMutation.mutate(
      {
        id: editingDiscount.id,
        data: {
          type: editingDiscount.type,
          amount: parseFloat(editingDiscount.amount),
          is_active: editingDiscount.is_active,
        },
      },
      {
        onSuccess: () => {
          setSuccessMessage("Discount updated successfully");
          setIsSuccessModalOpen(true);
          setEditingDiscount(null);
        },
        onError: (error: unknown) => {
          const errMessage = extractErrorMessage(
            (error as any)?.response?.data as any
          );
          setErrorMessage(errMessage || "Failed to update discount");
          setIsErrorModalOpen(true);
        },
      }
    );
  };

  const handleStatusChange = (id: number, value: boolean) => {
    updateDiscountMutation.mutate(
      {
        id,
        data: { is_active: value },
      },
      {
        onSuccess: () => {
          setSuccessMessage("Discount status updated successfully");
          setIsSuccessModalOpen(true);
        },
        onError: (error: unknown) => {
          const errMessage = extractErrorMessage(
            (error as any)?.response?.data as any
          );
          setErrorMessage(errMessage || "Failed to update discount status");
          setIsErrorModalOpen(true);
        },
      }
    );
  };

  const renderPaginationItems = () => {
    if (!discountsData) return null;

    const items = [];
    for (let i = 1; i <= discountsData.number_of_pages; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={currentPage === i}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <>
      <section className="mt-7 pb-7 mx-10 rounded-xl bg-white border-[1px] border-[#0F172B1A] px-[118px] pt-[35px]">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-medium">Discount Management</h1>
            <p>Manage your discounts here.</p>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-start">
          <h2 className="text-2xl font-semibold">Discount List</h2>
          <div className="flex gap-2">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button className="h-12 flex gap-4 bg-transparent text-sm px-6 text-[#111827] border border-solid rounded-[10px]">
                  Add New Discount
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold pb-8">
                    {editingDiscount ? "Edit Discount" : "Add New Discount"}
                  </SheetTitle>
                  <SheetDescription className="flex flex-col gap-3">
                    <Label htmlFor="type" className="text-[#111827]">
                      Discount type <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="type"
                      value={
                        editingDiscount ? editingDiscount.type : newDiscount.type
                      }
                      onChange={(e) =>
                        editingDiscount
                          ? setEditingDiscount({
                              ...editingDiscount,
                              type: e.target.value,
                            })
                          : setNewDiscount({
                              ...newDiscount,
                              type: e.target.value,
                            })
                      }
                      className="h-14"
                    />

                    <Label htmlFor="amount" className="text-[#111827]">
                      Amount <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      value={
                        editingDiscount
                          ? editingDiscount.amount
                          : newDiscount.amount
                      }
                      onChange={(e) =>
                        editingDiscount
                          ? setEditingDiscount({
                              ...editingDiscount,
                              amount: e.target.value,
                            })
                          : setNewDiscount({
                              ...newDiscount,
                              amount: e.target.value,
                            })
                      }
                      className="h-14"
                    />
                  </SheetDescription>
                </SheetHeader>
                <SheetFooter className="mt-20">
                  <SheetClose asChild>
                    <Button
                      type="button"
                      className="w-full bg-white text-black border border-solid h-14"
                      onClick={() => {
                        setEditingDiscount(null);
                        setNewDiscount({
                          type: "",
                          amount: "",
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </SheetClose>
                  <Button
                    type="submit"
                    className="w-full bg-[#111827] h-14"
                    onClick={editingDiscount ? handleUpdate : handleCreate}
                    disabled={
                      createDiscountMutation.isPending ||
                      updateDiscountMutation.isPending
                    }
                  >
                    {createDiscountMutation.isPending ||
                    updateDiscountMutation.isPending ? (
                      <Spinner className="ml-2" />
                    ) : editingDiscount ? (
                      "Update"
                    ) : (
                      "Create"
                    )}
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[22.9%]">Type</TableHead>
              <TableHead className="w-[22.9%]">Amount</TableHead>
              <TableHead className="w-[22.9%] text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {discountsData?.data?.map((discount: TDiscountItem) => (
              <TableRow key={discount.id}>
                <TableCell className="font-medium">{discount.type}</TableCell>
                <TableCell>{discount.amount}</TableCell>
                <TableCell className="text-right flex gap-[10px]">
                  <Select
                    value={discount.is_active ? "active" : "deactive"}
                    onValueChange={(value) =>
                      handleStatusChange(discount.id, value === "active")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select Action"
                        className={
                          discount.is_active
                            ? "bg-[#E7F7EF] text-[#0CAF60] border-none"
                            : "bg-[rgba(224,49,55,0.31)] text-[#E03137] border-none"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem className="" value="active">
                          Active
                        </SelectItem>
                        <SelectItem value="deactive">Deactivate</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <div
                    className="p-2 rounded-lg bg-[#2F78EE] flex items-center cursor-pointer"
                    onClick={() => handleEditClick(discount)}
                  >
                    <MdOutlineModeEdit color="#fff" size={20} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="w-full flex justify-between items-center mt-6">
          <div>
            <Pagination className="flex justify-start">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (discountsData?.previous_page) {
                        setCurrentPage(discountsData.previous_page);
                      }
                    }}
                    className={
                      !discountsData?.previous_page
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>

                {renderPaginationItems()}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (discountsData?.next_page) {
                        setCurrentPage(discountsData.next_page);
                      }
                    }}
                    className={
                      !discountsData?.next_page
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-xs text-[#687588] ">
              Showing{" "}
              {discountsData?.data.length ? (currentPage - 1) * pageSize + 1 : 0}{" "}
              to{" "}
              {discountsData?.data.length
                ? (currentPage - 1) * pageSize + discountsData.data.length
                : 0}{" "}
              of {discountsData?.count} entries
            </p>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                setPageSize(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="flex gap-4 bg-transparent border border-solid border-[#F1F2F4] text-[#111827] rounded-[10px] text-sm px-[10px]">
                <div className="flex items-center gap-4">
                  Show {pageSize}
                  <IoChevronUp />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[10, 25, 50, 100].map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <SuccessModal
        isModalOpen={isSuccessModalOpen}
        closeModal={() => setIsSuccessModalOpen(false)}
        heading="Success!"
        subheading={successMessage}
        buttonText="Okay"
      />

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={setIsErrorModalOpen}
        heading="Something went wrong"
        subheading={errorMessage}
      />
    </>
  );
};

export default Page;

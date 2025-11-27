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
import { SelectSingleCombo, Spinner, SuccessModal } from "@/components/ui";
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
  useGetAllDispatch,
  UsecreateDispatch,
  useUpdateDispatch,
} from "./misc/api";
import { TDispatchItem } from "./misc/types";
import ErrorModal from "@/components/ui/modal-error";
import { extractErrorMessage } from "@/utils/errors";
import { ZONES_OPTIONS } from "@/constants";

const Page = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [newDispatch, setNewDispatch] = useState<{
    state: string;
    location: string;
    delivery_price: string;
    zone?: string;
  }>({
    state: "",
    location: "",
    delivery_price: "",
    zone: "",
  });
  const [editingDispatch, setEditingDispatch] = useState<TDispatchItem | null>(
    null
  );
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const createDispatchMutation = UsecreateDispatch();
  const updateDispatchMutation = useUpdateDispatch();

  const {
    data: dispatchData,
    isLoading: isLoadingDispatch,
    isFetching,
    error: dispatchError,
  } = useGetAllDispatch({
    paginate: true,
    page: currentPage,
    size: pageSize,
  });

  useEffect(() => {
    if (dispatchData || dispatchError) {
      setIsInitialLoading(false);
    }
  }, [dispatchData, dispatchError]);

  const handleEditClick = (dispatch: TDispatchItem) => {
    setEditingDispatch(dispatch);
    setIsSheetOpen(true);
  };

  if (isInitialLoading && isLoadingDispatch) {
    return (
      <div className="flex items-center justify-center h-full w-full py-[30vh]">
        <Spinner size={18} />
      </div>
    );
  }

  if (dispatchError) return <div>Error: {dispatchError?.message}</div>;

  const handleCreate = () => {
    if (
      !newDispatch.state ||
      !newDispatch.delivery_price ||
      !newDispatch.location ||
      !newDispatch.zone
    ) {
      setErrorMessage("Please fill in all required fields");
      setIsErrorModalOpen(true);
      return;
    }

    createDispatchMutation.mutate(
      {
        state: newDispatch.state,
        location: newDispatch.location,
        delivery_price: parseFloat(newDispatch.delivery_price),
        zone: newDispatch.zone,
      },
      {
        onSuccess: () => {
          setSuccessMessage("Dispatch created successfully");
          setIsSuccessModalOpen(true);
          setNewDispatch({ state: "", location: "", delivery_price: "", zone: "" });
        },
        onError: (error: unknown) => {
          const errMessage = extractErrorMessage(
            (error as any)?.response?.data as any
          );
          setErrorMessage(errMessage || "Failed to create dispatch");
          setIsErrorModalOpen(true);
        },
      }
    );
  };

  const handleUpdate = () => {
    if (!editingDispatch) return;

    updateDispatchMutation.mutate(
      {
        id: editingDispatch.id,
        data: {
          state: editingDispatch.state,
          zone: editingDispatch.zone,
          location: editingDispatch.location,
          delivery_price: parseFloat(editingDispatch.delivery_price),
        },
      },
      {
        onSuccess: () => {
          setSuccessMessage("Dispatch updated successfully");
          setIsSuccessModalOpen(true);
          setEditingDispatch(null);
        },
        onError: (error: unknown) => {
          const errMessage = extractErrorMessage(
            (error as any)?.response?.data as any
          );
          setErrorMessage(errMessage || "Failed to update dispatch");
          setIsErrorModalOpen(true);
        },
      }
    );
  };

  const renderPaginationItems = () => {
    if (!dispatchData) return null;

    const items = [];
    for (let i = 1; i <= dispatchData.number_of_pages; i++) {
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
            <h1 className="text-xl font-medium">Delivery price Management</h1>
            <p>Manage your delivery price here.</p>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-start">
          <h2 className="text-2xl font-semibold">Delivery Settings</h2>
          <div className="flex gap-2">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button className="h-12 flex gap-4 bg-transparent text-sm px-6 text-[#111827] border border-solid rounded-[10px]">
                  Add New Dispatch
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold pb-8">
                    {editingDispatch ? "Edit Dispatch" : "Add New Dispatch"}
                  </SheetTitle>
                  <SheetDescription className="flex flex-col gap-3">
                    <Label htmlFor="state" className="text-[#111827]">
                      State <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="state"
                      value={
                        editingDispatch
                          ? editingDispatch.state
                          : newDispatch.state
                      }
                      onChange={(e) =>
                        editingDispatch
                          ? setEditingDispatch({
                            ...editingDispatch,
                            state: e.target.value,
                          })
                          : setNewDispatch({
                            ...newDispatch,
                            state: e.target.value,
                          })
                      }
                      className="h-14"
                    />

                    <Label htmlFor="location" className="text-[#111827]">
                      Location <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="location"
                      value={
                        editingDispatch
                          ? editingDispatch.location
                          : newDispatch.location
                      }
                      onChange={(e) =>
                        editingDispatch
                          ? setEditingDispatch({
                            ...editingDispatch,
                            location: e.target.value,
                          })
                          : setNewDispatch({
                            ...newDispatch,
                            location: e.target.value,
                          })
                      }
                      className="h-14"
                    />

                    <Label htmlFor="delivery-price" className="text-[#111827]">
                      Delivery Price <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="delivery-price"
                      type="number"
                      value={
                        editingDispatch
                          ? editingDispatch.delivery_price
                          : newDispatch.delivery_price
                      }
                      onChange={(e) =>
                        editingDispatch
                          ? setEditingDispatch({
                            ...editingDispatch,
                            delivery_price: e.target.value,
                          })
                          : setNewDispatch({
                            ...newDispatch,
                            delivery_price: e.target.value,
                          })
                      }
                      className="h-14"
                    />

                    <SelectSingleCombo
                      name="zone"
                      label="Delivery Zone"
                      options={ZONES_OPTIONS}
                      valueKey={"value"}
                      labelKey={"label"}
                      placeholder="Select delivery zone"
                      value={
                        editingDispatch
                          ? editingDispatch.zone || undefined
                          : newDispatch.zone || undefined
                      }
                      onChange={(selected) => {
                        if (editingDispatch) {
                          setEditingDispatch({
                            ...editingDispatch,
                            zone: selected ? selected : "",
                          });
                        } else {
                          setNewDispatch({
                            ...newDispatch,
                            zone: selected ? selected : "",
                          });
                        }
                      }}
                    />
                  </SheetDescription>
                </SheetHeader>
                <SheetFooter className="mt-20">
                  <SheetClose asChild>
                    <Button
                      type="button"
                      className="w-full bg-white text-black border border-solid h-14"
                      onClick={() => {
                        setEditingDispatch(null);
                        setNewDispatch({
                          state: "",
                          location: "",
                          delivery_price: "",
                          zone: "LM",
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </SheetClose>
                  <Button
                    type="submit"
                    className="w-full bg-[#111827] h-14"
                    onClick={editingDispatch ? handleUpdate : handleCreate}
                    disabled={
                      createDispatchMutation.isPending ||
                      updateDispatchMutation.isPending
                    }
                  >
                    {createDispatchMutation.isPending ||
                      updateDispatchMutation.isPending ? (
                      <Spinner className="ml-2" />
                    ) : editingDispatch ? (
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
              <TableHead className="w-[22.9%]">State</TableHead>
              <TableHead className="w-[22.9%]">Location</TableHead>
              <TableHead className="w-[22.9%]">Delivery Zone</TableHead>
              <TableHead className="w-[12.8%]">Delivery Price</TableHead>
              <TableHead className="w-[22.9%] text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dispatchData?.data?.map((dispatch: TDispatchItem) => (
              <TableRow key={dispatch.id}>
                <TableCell className="font-medium">{dispatch.state}</TableCell>
                <TableCell>{dispatch.location}</TableCell>
                <TableCell>{dispatch.zone_display}</TableCell>
                <TableCell>{dispatch.delivery_price}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end">
                    <div
                      className="p-2 rounded-lg bg-[#2F78EE] flex items-center cursor-pointer"
                      onClick={() => handleEditClick(dispatch)}
                    >
                      <MdOutlineModeEdit color="#fff" size={20} />
                    </div>
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
                      if (dispatchData?.previous_page) {
                        setCurrentPage(dispatchData.previous_page);
                      }
                    }}
                    className={
                      !dispatchData?.previous_page
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
                      if (dispatchData?.next_page) {
                        setCurrentPage(dispatchData.next_page);
                      }
                    }}
                    className={
                      !dispatchData?.next_page
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
              {dispatchData?.data.length ? (currentPage - 1) * pageSize + 1 : 0}{" "}
              to{" "}
              {dispatchData?.data.length
                ? (currentPage - 1) * pageSize + dispatchData.data.length
                : 0}{" "}
              of {dispatchData?.count} entries
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

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
  useGetAllProperties,
  useCreateProperty,
  useUpdateProperty,
} from "./misc/api";
import { TPropertyItem } from "./misc/types";
import ErrorModal from "@/components/ui/modal-error";
import { extractErrorMessage } from "@/utils/errors";
import { useDebounce } from "@/hooks";
import { cn } from "@/lib/utils";

const Page = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("");
  const debouncedSearchText = useDebounce(searchTerm, 300);
  const [newProperty, setNewProperty] = useState<{
    name: string;
    type: string;
    cost_price: string;
    selling_price: string;
  }>({
    name: "",
    type: "",
    cost_price: '0',
    selling_price: '0',
  });
  const [editingProperty, setEditingProperty] = useState<TPropertyItem | null>(
    null
  );
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const createPropertyMutation = useCreateProperty();
  const updatePropertyMutation = useUpdateProperty();

  const {
    data: propertiesData,
    isLoading: isLoadingProperties,
    isFetching,
    error: propertiesError,
  } = useGetAllProperties({
    page: currentPage,
    size: pageSize,
    search: debouncedSearchText || undefined,
    type: filterType || undefined,
  });

  useEffect(() => {
    if (propertiesData || propertiesError) {
      setIsInitialLoading(false);
    }
  }, [propertiesData, propertiesError]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleEditClick = (property: TPropertyItem) => {
    setEditingProperty(property);
    setIsSheetOpen(true);
  };

  if (isInitialLoading && isLoadingProperties) {
    return (
      <div className="flex items-center justify-center h-full w-full py-[30vh]">
        <Spinner size={18} />
      </div>
    );
  }

  if (propertiesError) return <div>Error: {propertiesError?.message}</div>;

  const handleCreate = () => {
    if (
      !newProperty.name ||
      !newProperty.selling_price ||
      !newProperty.cost_price ||
      !newProperty.type
    ) {
      setErrorMessage("Please fill in all required fields");
      setIsErrorModalOpen(true);
      return;
    }

    createPropertyMutation.mutate(
      {
        name: newProperty.name,
        type: newProperty.type,
        cost_price: parseFloat(newProperty.cost_price),
        selling_price: parseFloat(newProperty.selling_price),
      },
      {
        onSuccess: () => {
          setSuccessMessage("Property created successfully");
          setIsSuccessModalOpen(true);
          setNewProperty({
            name: "",
            type: "",
            cost_price: "",
            selling_price: "",
          });
        },
        onError: (error: unknown) => {
          const errMessage = extractErrorMessage(
            (error as any)?.response?.data as any
          );
          setErrorMessage(errMessage || "Failed to create property");
          setIsErrorModalOpen(true);
        },
      }
    );
  };

  const handleUpdate = () => {
    if (!editingProperty) return;

    updatePropertyMutation.mutate(
      {
        id: editingProperty.id,
        data: {
          name: editingProperty.name,
          type: editingProperty.type,
          cost_price: parseFloat(editingProperty.cost_price),
          selling_price: parseFloat(editingProperty.selling_price),
          is_active: editingProperty.is_active,
        },
      },
      {
        onSuccess: () => {
          setSuccessMessage("Property updated successfully");
          setIsSuccessModalOpen(true);
          setEditingProperty(null);
        },
        onError: (error: unknown) => {
          const errMessage = extractErrorMessage(
            (error as any)?.response?.data as any
          );
          setErrorMessage(errMessage || "Failed to update property");
          setIsErrorModalOpen(true);
        },
      }
    );
  };

  const handleStatusChange = (id: number, value: boolean) => {
    updatePropertyMutation.mutate(
      {
        id,
        data: { is_active: value },
      },
      {
        onSuccess: () => {
          setSuccessMessage("Property status updated successfully");
          setIsSuccessModalOpen(true);
        },
        onError: (error: unknown) => {
          const errMessage = extractErrorMessage(
            (error as any)?.response?.data as any
          );
          setErrorMessage(errMessage || "Failed to update property status");
          setIsErrorModalOpen(true);
        },
      }
    );
  };

  const renderPaginationItems = () => {
    if (!propertiesData) return null;

    const items = [];
    for (let i = 1; i <= propertiesData.number_of_pages; i++) {
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
            <h1 className="text-xl font-medium">Order Properties Management</h1>
            <p>Manage your order properties here.</p>
          </div>
          <div className="relative">
            <Input
              type="search"
              placeholder="Search what you need"
              className="h-14 w-[485px]"
              value={searchTerm}
              onChange={handleSearch}
            />
            <CiSearch
              size={20}
              color="#111827"
              className="absolute top-[30%] right-[24px]"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-between items-start">
          <h2 className="text-2xl font-semibold">Property List</h2>
          <div className="flex items-center gap-4">
            <Select
              value={filterType}
              onValueChange={(value) => {
                setFilterType(value === "ALL" ? "" : value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-12 w-[200px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ALL">All Types</SelectItem>
                  <SelectItem value="TOPPING">Topping</SelectItem>
                  <SelectItem value="LAYER">Layer</SelectItem>
                  <SelectItem value="WHIPPED_CREAM">Whipped Cream</SelectItem>
                  <SelectItem value="GLASS_VASE">Glass Vase</SelectItem>
                  <SelectItem value="BOUQUET">Bouquet</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button className="h-12 flex gap-4 bg-transparent text-sm px-6 text-[#111827] border border-solid rounded-[10px]">
                  Add New Property
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold pb-8">
                    {editingProperty ? "Edit Property" : "Add New Property"}
                  </SheetTitle>
                  <SheetDescription className="flex flex-col gap-3">
                    <Label htmlFor="name" className="text-[#111827]">
                      Property Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={
                        editingProperty
                          ? editingProperty.name
                          : newProperty.name
                      }
                      onChange={(e) =>
                        editingProperty
                          ? setEditingProperty({
                              ...editingProperty,
                              name: e.target.value,
                            })
                          : setNewProperty({
                              ...newProperty,
                              name: e.target.value,
                            })
                      }
                      className="h-14"
                    />

                    <Label htmlFor="category" className="text-[#111827]">
                      Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={
                        editingProperty
                          ? editingProperty.type
                          : newProperty.type
                      }
                      onValueChange={(value) =>
                        editingProperty
                          ? setEditingProperty({
                              ...editingProperty,
                              type: value,
                            })
                          : setNewProperty({
                              ...newProperty,
                              type: value,
                            })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="TOPPING">Topping</SelectItem>
                          <SelectItem value="LAYER">Layer</SelectItem>
                          <SelectItem value="WHIPPED_CREAM">
                            Whipped Cream
                          </SelectItem>
                          <SelectItem value="GLASS_VASE">Glass Vase</SelectItem>
                          <SelectItem value="BOUQUET">Bouquet</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Label htmlFor="cost-price" className="text-[#111827]">
                      Cost Price <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="cost-price"
                      type="number"
                      value={
                        editingProperty
                          ? editingProperty.cost_price
                          : newProperty.cost_price
                      }
                      onChange={(e) =>
                        editingProperty
                          ? setEditingProperty({
                              ...editingProperty,
                              cost_price: e.target.value,
                            })
                          : setNewProperty({
                              ...newProperty,
                              cost_price: e.target.value,
                            })
                      }
                      className="h-14"
                    />

                    <Label htmlFor="selling-price" className="text-[#111827]">
                      Selling Price <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="selling-price"
                      type="number"
                      value={
                        editingProperty
                          ? editingProperty.selling_price
                          : newProperty.selling_price
                      }
                      onChange={(e) =>
                        editingProperty
                          ? setEditingProperty({
                              ...editingProperty,
                              selling_price: e.target.value,
                            })
                          : setNewProperty({
                              ...newProperty,
                              selling_price: e.target.value,
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
                        setEditingProperty(null);
                        setNewProperty({
                          name: "",
                          type: "",
                          cost_price: "",
                          selling_price: "",
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </SheetClose>
                  <Button
                    type="submit"
                    className="w-full bg-[#111827] h-14"
                    onClick={editingProperty ? handleUpdate : handleCreate}
                    disabled={
                      createPropertyMutation.isPending ||
                      updatePropertyMutation.isPending
                    }
                  >
                    {createPropertyMutation.isPending ||
                    updatePropertyMutation.isPending ? (
                      <Spinner className="ml-2" />
                    ) : editingProperty ? (
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
        <div className="flex items-center gap-4 h-3 my-4">
          <div className="overflow-hidden rounded-full mb-1 grow">
            <div className={cn("overflow-hidden rounded-full mb-1 grow")}>
              <div
                className={cn(
                  "bg-[#F8F9FB] h-1 w-full overflow-hidden",
                  isFetching  && "bg-blue-200"
                )}
              >
                <div
                  className={cn(
                    "h-full w-full origin-[0_50%] animate-indeterminate-progress rounded-full bg-primary opacity-0 transition-opacity",
                    isFetching  && "opacity-100"
                  )}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[22.9%]">Name</TableHead>
              <TableHead className="w-[22.9%]">Type</TableHead>
              <TableHead className="w-[12.8%]">Cost Price</TableHead>
              <TableHead className="w-[12.8%]">Selling Price</TableHead>
              <TableHead className="w-[22.9%] text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {propertiesData?.data?.map((property: TPropertyItem) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.name}</TableCell>
                <TableCell>{property.type}</TableCell>
                <TableCell>{property.cost_price}</TableCell>
                <TableCell>{property.selling_price}</TableCell>
                <TableCell className="text-right flex gap-[10px]">
                  <Select
                    value={property.is_active ? "active" : "deactive"}
                    onValueChange={(value) =>
                      handleStatusChange(property.id, value === "active")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select Action"
                        className={
                          property.is_active
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
                    onClick={() => handleEditClick(property)}
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
                      if (propertiesData?.previous_page) {
                        setCurrentPage(propertiesData.previous_page);
                      }
                    }}
                    className={
                      !propertiesData?.previous_page
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
                      if (propertiesData?.next_page) {
                        setCurrentPage(propertiesData.next_page);
                      }
                    }}
                    className={
                      !propertiesData?.next_page
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
              {propertiesData?.data.length
                ? (currentPage - 1) * pageSize + 1
                : 0}{" "}
              to{" "}
              {propertiesData?.data.length
                ? (currentPage - 1) * pageSize + propertiesData.data.length
                : 0}{" "}
              of {propertiesData?.count} entries
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

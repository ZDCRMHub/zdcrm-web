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
  useGetAllProducts,
  useCreateProduct,
  useUpdateProduct,
} from "./misc/api";
import { TProductItem } from "./misc/types";
import { useGetCategories } from "../../inventory/misc/api";
import ErrorModal from "@/components/ui/modal-error";
import { extractErrorMessage } from "@/utils/errors";
import { useDebounce } from "@/hooks";

const Page = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchText = useDebounce(searchTerm, 300);
  const [newProduct, setNewProduct] = useState<{
    name: string;
    category: string;
    selling_price: string;
  }>({
    name: "",
    category: "",
    selling_price: "",
  });
  const [editingProduct, setEditingProduct] = useState<TProductItem | null>(
    null
  );
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { data: categories } = useGetCategories();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isFetching,
    error: productsError,
  } = useGetAllProducts({
    paginate: true,
    page: currentPage,
    size: pageSize,
    search: debouncedSearchText || undefined,
  });

  useEffect(() => {
    if (productsData || productsError) {
      setIsInitialLoading(false);
    }
  }, [productsData, productsError]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleEditClick = (product: TProductItem) => {
    setEditingProduct(product);
    setIsSheetOpen(true);
  };

  if (isInitialLoading && isLoadingProducts) {
    return (
      <div className="flex items-center justify-center h-full w-full py-[30vh]">
        <Spinner size={18} />
      </div>
    );
  }

  if (productsError) return <div>Error: {productsError?.message}</div>;

  const handleCreate = () => {
    if (!newProduct.name || !newProduct.selling_price) {
      setErrorMessage("Please fill in all required fields");
      setIsErrorModalOpen(true);
      return;
    }

    createProductMutation.mutate(
      {
        name: newProduct.name,
        category: parseInt(newProduct.category),
        selling_price: parseFloat(newProduct.selling_price),
      },
      {
        onSuccess: () => {
          setSuccessMessage("Product created successfully");
          setIsSuccessModalOpen(true);
          setNewProduct({ name: "", category: "", selling_price: "" });
        },
        onError: (error: unknown) => {
          const errMessage = extractErrorMessage(
            (error as any)?.response?.data as any
          );
          setErrorMessage(errMessage || "Failed to create product");
          setIsErrorModalOpen(true);
        },
      }
    );
  };

  const handleUpdate = () => {
    if (!editingProduct) return;

    updateProductMutation.mutate(
      {
        id: editingProduct.id,
        data: {
          name: editingProduct.name,
          selling_price: parseFloat(editingProduct.selling_price),
          is_active: editingProduct.is_active,
        },
      },
      {
        onSuccess: () => {
          setSuccessMessage("Product updated successfully");
          setIsSuccessModalOpen(true);
          setEditingProduct(null);
        },
        onError: (error: unknown) => {
          const errMessage = extractErrorMessage(
            (error as any)?.response?.data as any
          );
          setErrorMessage(errMessage || "Failed to update product");
          setIsErrorModalOpen(true);
        },
      }
    );
  };

  const handleStatusChange = (id: number, value: boolean) => {
    updateProductMutation.mutate(
      {
        id,
        data: { is_active: value },
      },
      {
        onSuccess: () => {
          setSuccessMessage("Product status updated successfully");
          setIsSuccessModalOpen(true);
        },
        onError: (error: unknown) => {
          const errMessage = extractErrorMessage(
            (error as any)?.response?.data as any
          );
          setErrorMessage(errMessage || "Failed to update product status");
          setIsErrorModalOpen(true);
        },
      }
    );
  };

  const renderPaginationItems = () => {
    if (!productsData) return null;

    const items = [];
    for (let i = 1; i <= productsData.number_of_pages; i++) {
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
            <h1 className="text-xl font-medium">Product Management</h1>
            <p>Manage your products here.</p>
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
          <h2 className="text-2xl font-semibold">Product List</h2>
          <div className="flex gap-2">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button className="h-12 flex gap-4 bg-transparent text-sm px-6 text-[#111827] border border-solid rounded-[10px]">
                  Add New Product
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold pb-8">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </SheetTitle>
                  <SheetDescription className="flex flex-col gap-3">
                    <Label htmlFor="product-name" className="text-[#111827]">
                      Product Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="product-name"
                      value={
                        editingProduct ? editingProduct.name : newProduct.name
                      }
                      onChange={(e) =>
                        editingProduct
                          ? setEditingProduct({
                              ...editingProduct,
                              name: e.target.value,
                            })
                          : setNewProduct({
                              ...newProduct,
                              name: e.target.value,
                            })
                      }
                      className="h-14"
                    />

                    <Label htmlFor="category" className="text-[#111827]">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={
                        editingProduct
                          ? editingProduct.category.id.toString()
                          : newProduct.category
                      }
                      onValueChange={(value) =>
                        editingProduct
                          ? setEditingProduct({
                              ...editingProduct,
                              category:
                                categories?.find(
                                  (cat) => cat.id === parseInt(value)
                                ) || editingProduct.category,
                            })
                          : setNewProduct({ ...newProduct, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {categories?.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Label htmlFor="selling-price" className="text-[#111827]">
                      Selling Price <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="selling-price"
                      type="number"
                      value={
                        editingProduct
                          ? editingProduct.selling_price
                          : newProduct.selling_price
                      }
                      onChange={(e) =>
                        editingProduct
                          ? setEditingProduct({
                              ...editingProduct,
                              selling_price: e.target.value,
                            })
                          : setNewProduct({
                              ...newProduct,
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
                        setEditingProduct(null);
                        setNewProduct({
                          name: "",
                          category: "",
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
                    onClick={editingProduct ? handleUpdate : handleCreate}
                    disabled={
                      createProductMutation.isPending ||
                      updateProductMutation.isPending
                    }
                  >
                    {createProductMutation.isPending ||
                    updateProductMutation.isPending ? (
                      <Spinner className="ml-2" />
                    ) : editingProduct ? (
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
              <TableHead className="w-[22.9%]">Name</TableHead>
              <TableHead className="w-[22.9%]">Category</TableHead>
              <TableHead className="w-[12.8%]">Selling Price</TableHead>
              <TableHead className="w-[22.9%] text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsData?.data?.map((product: TProductItem) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>{product.selling_price}</TableCell>
                <TableCell className="text-right flex gap-[10px]">
                  <Select
                    value={product.is_active ? "active" : "deactive"}
                    onValueChange={(value) =>
                      handleStatusChange(product.id, value === "active")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select Action"
                        className={
                          product.is_active
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
                    onClick={() => handleEditClick(product)}
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
                      if (productsData?.previous_page) {
                        setCurrentPage(productsData.previous_page);
                      }
                    }}
                    className={
                      !productsData?.previous_page
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
                      if (productsData?.next_page) {
                        setCurrentPage(productsData.next_page);
                      }
                    }}
                    className={
                      !productsData?.next_page
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
              {productsData?.data.length ? (currentPage - 1) * pageSize + 1 : 0}{" "}
              to{" "}
              {productsData?.data.length
                ? (currentPage - 1) * pageSize + productsData.data.length
                : 0}{" "}
              of {productsData?.count} entries
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

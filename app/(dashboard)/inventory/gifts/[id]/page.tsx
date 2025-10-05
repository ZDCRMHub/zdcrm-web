"use client";

import React, { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Calendar, Check, Circle, Edit, MoveLeft, User } from "lucide-react";
import { ArrowDown2, Bag, Category2 } from "iconsax-react";

import { Button } from "@/components/ui/button";

import {
  useGetProductInventoryDetails,
  useGetProductInventoryHistory,
} from "../../misc/api";
import {
  ProductsInventoryHistoryTable,
  ProductsInventoryUpdateModal,
} from "../../misc/components";
import { useBooleanStateControl, useDebounce } from "@/hooks";
import { TProductVariation } from "../../misc/types/products";
import {
  SelectSingleCombo,
  Skeleton,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
  Input,
  RangeDatePicker,
} from "@/components/ui";
import Image from "next/image";
import { useGetAllUsers } from "@/app/(dashboard)/admin/employees-role/misc/api";
import { Controller, useForm } from "react-hook-form";
import { DateRange } from "react-day-picker";
import { subMonths } from "date-fns";


const today = new Date();
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
const monthsAgo = subMonths(new Date(), 20);



const InventoryDetailsPage = () => {
  const product_id = useParams().id as string;
  const variation_id = useSearchParams().get("variation") as string;

  const router = useRouter();

  const {
    state: isUpdateModalOpen,
    setTrue: openUpdateModal,
    setFalse: closeUpdateModal,
  } = useBooleanStateControl();


  
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const debouncedSearchText = useDebounce(searchText, 300);
    const [selectedStatuses, setSelectedStatuses] = useState<string | undefined>(
      "PND,SOA,SOR"
    );
    const { data: employees, isLoading: isLoadingEmployees } = useGetAllUsers();
  
    const [selectedCategory, setSelectedCategory] = useState<
      number | undefined
    >();
    const [selectedRep, setSelectedRep] = useState<number | null>(null);
    const [selectedDeliveryZone, setSelectedDeliveryZone] = useState<
      string | null
    >(null);
  
    const [filteredOrderNumber, setFilteredOrderNumber] = useState<
      string | undefined
    >("");
    const debouncedOrderNumber = useDebounce(filteredOrderNumber, 500);
    const { control, register, setValue, watch } = useForm<{
      date: DateRange;
    }>({
      defaultValues: {
        date: {
          from: monthsAgo,
          to: tomorrow,
        },
      },
    });
  
  const {
    data,
    isLoading,
    isFetching,
    refetch: refetchData,
  } = useGetProductInventoryDetails(product_id);
  const [selectedVariant, setSelectedVariant] = useState<
    TProductVariation | undefined
  >(undefined);
  const {
    data: historyData,
    isLoading: isHistoryLoading,
    isFetching: isHistoryFetching,
    error: historyError,
    refetch: refetchHistory,
  } = useGetProductInventoryHistory(selectedVariant?.id || variation_id);

  React.useEffect(() => {
    if (variation_id && data && !isLoading) {
      setSelectedVariant(
        data?.variations.find(
          (variation) => variation.id.toString() == variation_id
        ) || data?.variations[0]
      );
    }
  }, [variation_id, data, isLoading]);
  const refetch = () => {
    refetchData();
    refetchHistory();
  };
  const itemCategory = data?.category.name;
  const inventoryImage =
    data?.image_one || `/img/placeholders/${itemCategory}.svg`;

  return (
    <section className="mx-16 mt-8">
      <div className="flex gap-6">
        <button onClick={() => router.back()}>
          <MoveLeft size={20} />
        </button>
        <h1 className="uppercase text-xl font-bold">{data?.name}</h1>
      </div>

      <SelectSingleCombo
        options={
          data?.variations.map((variation) => ({
            value: variation.id.toString(),
            label: variation.size,
          })) || []
        }
        value={selectedVariant?.id.toString()}
        onChange={(value) => {
          setSelectedVariant(
            data?.variations.find(
              (variation) => variation.id.toString() == value
            )
          );
        }}
        labelKey={"label"}
        valueKey={"value"}
        name="variation"
        placeholder="Select Variation"
        size="thin"
        containerClass="max-w-[500px]"
      />

      <section className="grid md:grid-cols-2 max-w-6xl gap-6 mt-10">
        <article className=" flex ">
          <div className="p-8 bg-[#F6F6F6] rounded-xl w-full max-w-[522px] shadow-inner shadow-white">
            <p className="text-2xl font-medium text-center mb-3">Inventory</p>
            <div className="bg-white py-9 rounded-[20px] items-center flex flex-col gap-1 ">
              <div className="relative flex items-center justify-center gap-2 width-[120px] h-[120px] shrink-0 mx-auto">
                {isLoading ? (
                  <Skeleton className="w-full h-[120px] rounded-[20px]" />
                ) : (
                  <Image
                    src={inventoryImage}
                    alt={data?.name as string}
                    className="object-cover text-xs rounded-[20px]"
                    width={120}
                    height={120}
                    priority
                  />
                )}
              </div>
              <p className="flex items-center text-2xl text-[#113770] font-bold">
                {data?.name}
              </p>
              <p className="text-2xl text-[#113770] font-bold">
                {selectedVariant?.size}
              </p>
              <div className="bg-white rounded-[20px] items-center flex flex-col gap-2 mt-4 ">
                <p className="text-base !uppercase">
                  Quantity at hand:{" "}
                  <span className="text-[1.25rem] text-[#113770] font-bold">
                    {selectedVariant?.quantity}
                  </span>
                </p>
                <Button
                  className="bg-[#1E1E1E] rounded-none text-sm w-[161px]"
                  onClick={openUpdateModal}
                >
                  Adjust Stock
                </Button>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="mt-16">
        <header className="flex items-center justify-between mb-6">
          <h3 className="uppercase mb-[18px]">
            stock history
            <span className="text-sm text-[#8B909A] ml-2">
              Stock history for {data?.name} - {selectedVariant?.size}
            </span>
          </h3>

          <div className="flex items-center gap-4 ">
            <Button variant="outline" size="sm" onClick={refetch}>
              Refresh
            </Button>
            <Menubar className="!p-0">
              <MenubarMenu>
                <MenubarTrigger className="relative flex items-center gap-4 text-xs cursor-pointer text-[#8B909A] !h-10">
                  Filter orders by <ArrowDown2 size={16} />
                  {(selectedCategory ||
                    debouncedSearchText ||
                    (selectedStatuses &&
                      selectedStatuses !== "PND,SOA,SOR")) && (
                    <Circle
                      size={10}
                      className="absolute top-0 right-0 text-[#FF4D4F] bg-[#FF4D4F] rounded-full"
                    />
                  )}
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger className="py-3 flex items-center gap-2">
                      <Bag size={18} />
                      Order Number
                      {filteredOrderNumber?.trim() !== "" && (
                        <Circle
                          size={6}
                          className="absolute top-0 right-0 text-[#FF4D4F] bg-[#FF4D4F] rounded-full"
                        />
                      )}
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <Input
                        type="text"
                        placeholder="Search by order number"
                        className="w-full focus:border min-w-[350px] text-xs !h-10"
                        value={filteredOrderNumber}
                        onChange={(e) => {
                          setFilteredOrderNumber(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarSub>
                    <MenubarSubTrigger className="py-3 flex items-center gap-2">
                      <Calendar size={18} />
                      Date Range
                      {watch("date.from") &&
                        watch("date.to") &&
                        (watch("date.from")?.getTime() !==
                          monthsAgo.getTime() ||
                          watch("date.to")?.getTime() !==
                            tomorrow.getTime()) && (
                          <Circle
                            size={6}
                            className="absolute top-0 right-0 text-[#FF4D4F] bg-[#FF4D4F] rounded-full"
                          />
                        )}
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <Controller
                        control={control}
                        name="date"
                        render={({ field: { onChange, value } }) => (
                          <RangeDatePicker
                            className="max-w-[17.1875rem] border border-[#d6d6d6]/50 bg-white px-4 py-3 text-sm"
                            id="dateFilter"
                            placeholder="Select a date range"
                            placeholderClassName="text-[#556575]"
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarSub>
                    <MenubarSubTrigger className="relative py-3 flex items-center gap-2">
                      <User size={18} />
                      Customer Rep
                      {selectedRep && (
                        <Circle
                          size={6}
                          className="absolute top-0 right-0 text-[#FF4D4F] bg-[#FF4D4F] rounded-full"
                        />
                      )}
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      {employees?.data?.map((employee) => (
                        <MenubarItem
                          key={employee.id}
                          onClick={() => setSelectedRep(employee.id)}
                        >
                          {selectedRep === employee.id && (
                            <Check className="mr-2 h-4 w-4" />
                          )}
                          {employee.name}
                        </MenubarItem>
                      ))}
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </header>
        <div className="px-6 bg-white md:p-10 rounded-[20px] border border-solid border-[#FCF0F2] mb-14">
          <ProductsInventoryHistoryTable
            data={historyData?.data!}
            isLoading={isHistoryLoading}
            isFetching={isHistoryFetching}
            error={historyError}
          />
        </div>
      </section>

      {selectedVariant && (
        <ProductsInventoryUpdateModal
          isModalOpen={isUpdateModalOpen}
          closeModal={closeUpdateModal}
          product={data!}
          variation={selectedVariant}
          refetch={refetch}
        />
      )}
    </section>
  );
};

export default InventoryDetailsPage;

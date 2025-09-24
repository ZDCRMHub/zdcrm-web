"use client";

import React, { useState } from "react";
import { useParams, useRouter, useSearchParams, } from "next/navigation";
import { Edit, MoveLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useGetProductInventoryDetails, useGetStockInventoryHistory, useGetStockInventoryDetails } from "../../misc/api";
import { ProductsInventoryHistoryTable, StockInventoryUpdateModal } from "../../misc/components";
import { useBooleanStateControl } from "@/hooks";
import { TStockVariation } from "../../misc/types/stock";
import { SelectSingleCombo, Skeleton } from "@/components/ui";
import Image from "next/image";
import { useGetAllUsers } from "@/app/(dashboard)/admin/employees-role/misc/api";


const InventoryDetailsPage = () => {
  const product_id = useParams().id as string;
  const variation_id = useSearchParams().get('variation') as string;

  const router = useRouter();

  const {
    state: isUpdateModalOpen,
    setTrue: openUpdateModal,
    setFalse: closeUpdateModal,
  } = useBooleanStateControl();
  const {
    state: isUpdateNameModalOpen,
    setTrue: openUpdateNameModal,
    setFalse: closeUpdateNameModal,
  } = useBooleanStateControl();



  const { data, isLoading, isFetching, refetch: refetchData } = useGetStockInventoryDetails(product_id)
  const [selectedVariant, setSelectedVariant] = useState<TStockVariation | undefined>(data?.variations.find(variation => variation.id.toString() == variation_id) || data?.variations[0]);
  const [selectedEmployee, setSelectedEmployee] = useState<string | undefined>("all");
  const { data: historyData, isLoading: isHistoryLoading, isFetching: isHistoryFetching, error: historyError, refetch: refetchHistory } = useGetStockInventoryHistory(selectedVariant?.id, {
    updated_by: selectedEmployee,
  })
  const { data: allEmployees } = useGetAllUsers()


  React.useEffect(() => {
    if (variation_id && data && !isLoading) {
      setSelectedVariant(data?.variations.find(variation => variation.id.toString() == variation_id) || data?.variations[0]);
    }
  }, [variation_id, data, isLoading]);
  const refetch = () => {
    refetchData();
    refetchHistory();
  }


  const itemCategory = data?.category.name
  const inventoryImage = data?.image_one || `/img/placeholders/${itemCategory}.svg`


  return (
    <section className="mx-16 mt-8">
      <div className="flex gap-6 mb-3">
        <button onClick={() => router.back()}>
          <MoveLeft size={20} />
        </button>
        <h1 className="uppercase text-xl font-bold">{data?.name}</h1>
      </div>

      <SelectSingleCombo
        options={data?.variations.map(variation => ({ value: variation.id.toString(), label: `${variation.size || variation.flavour || variation.color} ${data.category.name == "Cake" ? "inches" : ""}` })) || []}
        value={selectedVariant?.id.toString()}
        onChange={(value) => {
          setSelectedVariant(data?.variations.find(variation => variation.id.toString() == value));
        }}
        labelKey={'label'}
        valueKey={'value'}
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
                {
                  isLoading ?
                    <Skeleton className="w-full h-[120px] rounded-[20px]" />
                    :
                    <Image
                      src={inventoryImage}
                      alt={data?.name as string}
                      className="object-cover text-xs rounded-[20px]"
                      width={120}
                      height={120}
                      priority
                    />
                }
              </div>
              <p className="flex items-center text-2xl text-[#113770] font-bold">{data?.name}</p>
              <p className="text-2xl text-[#113770] font-bold">
                {selectedVariant?.size} {data?.category.name == "Cake" && "inches" || selectedVariant?.flavour || selectedVariant?.color}
              </p>
              <div className="bg-white rounded-[20px] items-center flex flex-col gap-2 mt-4 ">
                <p className="text-base !uppercase">
                  Quantity at hand:{" "}
                  <span className="text-[1.25rem] text-[#113770] font-bold">{selectedVariant?.quantity}</span>
                </p>
                <Button className="bg-[#1E1E1E] rounded-none text-sm w-[161px]" onClick={openUpdateModal}>
                  Adjust Stock
                </Button>
              </div>
            </div>
          </div>
        </article>

      </section>


      <section className="mt-16">
        <header className= "flex items-center justify-between mb-6">
          <h3 className="uppercase mb-[18px]">
            stock history
            <span className="text-sm text-[#8B909A] ml-2">Stock history for {data?.name} - {selectedVariant?.size || selectedVariant?.flavour || selectedVariant?.color} {data?.category.name == "Cake" ? "inches" : ""}</span>
          </h3>

          <div className="flex items-center gap-4 ">
            <Button variant="outline" size="sm" onClick={refetch}>
              Refresh
            </Button>

            {/* filtyer by employees */}
            <SelectSingleCombo
              options={[{ label: "All Employees", value: "all" }, ...(allEmployees?.data.map(employee => ({ value: employee.id, label: employee.name })) || [])]}
              value={selectedEmployee}
              onChange={(value) => {
                setSelectedEmployee(value);
                refetchHistory();
              }}
              labelKey={'label'}
              valueKey={'value'}
              name="employee"
              placeholder="Filter by Employee"
              containerClass="max-w-[300px] !h-9 !text-xs"
              className="h-9"
              size="sm"
              
            />
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


      {
        selectedVariant &&
        <StockInventoryUpdateModal
          isModalOpen={isUpdateModalOpen}
          closeModal={closeUpdateModal}
          stock={data!}
          variation={selectedVariant}
          refetch={refetch}
        />
      }
    </section>
  );
};

export default InventoryDetailsPage;

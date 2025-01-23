"use client";

import React, { useState } from "react";
import { useParams, useRouter, useSearchParams, } from "next/navigation";
import { MoveLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useGetProductInventoryDetails, useGetStockInventoryHistory, useGetStockInventoryDetails } from "../../misc/api";
import { ProductsInventoryHistoryTable, StockInventoryUpdateModal } from "../../misc/components";
import { useBooleanStateControl } from "@/hooks";
import { TStockVariation } from "../../misc/types/stock";
import { SelectSingleCombo } from "@/components/ui";


const InventoryDetailsPage = () => {
  const product_id = useParams().id as string;
  const variation_id = useSearchParams().get('variation') as string;

  const router = useRouter();

  const {
    state: isUpdateModalOpen,
    setTrue: openUpdateModal,
    setFalse: closeUpdateModal,
  } = useBooleanStateControl();



  const { data, isLoading, isFetching, refetch: refetchData } = useGetStockInventoryDetails(product_id)
  const [selectedVariant, setSelectedVariant] = useState<TStockVariation | undefined>(data?.variations.find(variation => variation.id.toString() == variation_id) || data?.variations[0]);
  const { data: historyData, isLoading: isHistoryLoading, isFetching: isHistoryFetching, error: historyError, refetch: refetchHistory } = useGetStockInventoryHistory(selectedVariant?.id)
  React.useEffect(() => {
    if (variation_id && data && !isLoading) {
      setSelectedVariant(data?.variations.find(variation => variation.id.toString() == variation_id) || data?.variations[0]);
    }
  }, [variation_id, data, isLoading]);
  const refetch = () => {
    refetchData();
    refetchHistory();
  }

  return (
    <section className="mx-16 mt-8">
      <div className="flex gap-6 mb-3">
        <button onClick={() => router.back()}>
          <MoveLeft size={20} />
        </button>
        <h1 className="uppercase text-xl font-bold">{data?.name}</h1>
      </div>

      <SelectSingleCombo
        options={data?.variations.map(variation => ({ value: variation.id.toString(), label: variation.size || variation.flavour || variation.color })) || []}
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

      <div className="mt-10 flex ">
        <div className="p-8 bg-[#F6F6F6] rounded-xl w-full max-w-[522px] shadow-inner shadow-white">
          <p className="text-2xl font-medium text-center mb-3">Stock</p>
          <div className="bg-white py-9 rounded-[20px] items-center flex flex-col gap-4">
            <p className="text-[18px] uppercase">Quantity at hand</p>
            <p className="text-2xl text-[#113770] font-bold">{selectedVariant?.quantity}</p>
            <Button className="bg-[#1E1E1E] rounded-none text-sm w-[161px]" onClick={openUpdateModal}>
              Adjust Stock
            </Button>
          </div>
        </div>
      </div>


      <section className="mt-16">
        <h3 className="uppercase mb-[18px]">stock history</h3>
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

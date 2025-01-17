"use client";

import React, { useState } from "react";
import { useParams, useRouter, } from "next/navigation";
import { MoveLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useGetProductInventoryDetails, useGetProductInventoryHistory } from "../../misc/api";
import { ProductsInventoryHistoryTable, ProductsInventoryUpdateModal } from "../../misc/components";
import { useBooleanStateControl } from "@/hooks";


const InventoryDetailsPage = () => {
  const product_id = useParams().id as string;

  const router = useRouter();

  const {
    state: isUpdateModalOpen,
    setTrue: openUpdateModal,
    setFalse: closeUpdateModal,
  } = useBooleanStateControl();



  const { data, isLoading, isFetching } = useGetProductInventoryDetails(product_id)
  const { data: historyData, isLoading: isHistoryLoading, isFetching: isHistoryFetching, error: historyError } = useGetProductInventoryHistory(product_id)
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(undefined);

  return (
    <section className="mx-16 mt-8">
      <div className="flex gap-6">
        <button onClick={() => router.back()}>
          <MoveLeft size={20} />
        </button>
        <h1 className="uppercase text-xl font-bold">{data?.name}</h1>
      </div>


      <div className="mt-10 flex gap-[110px]">
        <div className="p-8 bg-[#F6F6F6] rounded-xl max-w-[522px] shadow-inner shadow-white">
          <p className="text-2xl font-medium text-center mb-3">Stock</p>
          <div className="bg-white py-9 rounded-[20px] items-center flex flex-col gap-4">
            <p className="text-[18px] uppercase">Quantity at hand</p>
            <p className="text-2xl text-[#113770] font-bold">{data?.quantity}</p>
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
        data &&
        <ProductsInventoryUpdateModal
          isModalOpen={isUpdateModalOpen}
          closeModal={closeUpdateModal}
          product={data}
        />
      }
    </section>
  );
};

export default InventoryDetailsPage;

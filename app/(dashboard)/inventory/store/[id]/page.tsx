"use client";

import React, { useState } from "react";
import { useParams, useRouter, } from "next/navigation";
import { MoveLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useGetStoreInventoryDetails, useGetStoreInventoryHistory } from "../../misc/api";
import { ProductsInventoryHistoryTable, StoreInventoryUpdateModal } from "../../misc/components";
import { useBooleanStateControl } from "@/hooks";


const StoreInventoryDetailsPage = () => {
  const product_id = useParams().id as string;

  const router = useRouter();

  const {
    state: isUpdateModalOpen,
    setTrue: openUpdateModal,
    setFalse: closeUpdateModal,
  } = useBooleanStateControl();

  const [modalOperationMode, setModalOperationMode] = React.useState<'add' | 'subtract' | 'both'>('add');

  const openAddModal = () => {
    setModalOperationMode('add');
    openUpdateModal();
  }

  const openSubtractModal = () => {
    setModalOperationMode('subtract');
    openUpdateModal();
  }

  const { data, isLoading, isFetching, refetch:refetchData } = useGetStoreInventoryDetails(product_id)
  const { data: historyData, isLoading: isHistoryLoading, isFetching: isHistoryFetching, error: historyError, refetch:refetchHistory } = useGetStoreInventoryHistory(product_id)

  const refetch = () => {
    refetchData();
    refetchHistory();
  }

  
  return (
    <section className="mx-16 mt-8">
      <div className="flex gap-6">
        <button onClick={() => router.back()}>
          <MoveLeft size={20} />
        </button>
        <h1 className="uppercase text-xl font-bold">{data?.name}</h1>
      </div>


      <section className="grid md:grid-cols-2 max-w-5xl gap-4 mt-8">
        <article className="flex">
          <div className="p-4 bg-[#F6F6F6] rounded-lg w-full max-w-[450px] shadow-inner shadow-white">
            <p className="text-2xl font-medium text-center mb-3">Stock</p>
            <div className="bg-white py-9 rounded-[20px] items-center flex flex-col gap-4">
              <p className="text-[18px] uppercase">Quantity at hand</p>
              <p className="text-2xl text-[#113770] font-bold">{data?.quantity}</p>
              <div className="flex gap-2">
                <Button className="bg-[#FFC600] hover:bg-[#E6B200] text-black rounded-none text-xs w-[6rem] h-8" onClick={openAddModal}>
                  Add Stock
                </Button>
                <Button className="bg-[#1E1E1E] hover:bg-[#000000] text-white rounded-none text-xs w-[6rem] h-8" onClick={openSubtractModal}>
                  Subtract
                </Button>
              </div>
            </div>
          </div>
        </article>

        <article className="flex p-4 bg-[#F6F6F6]">
          <div className="p-4 bg-white h-full rounded-lg w-full max-w-[450px] shadow-inner shadow-white">
            <p className="text-lg font-medium text-center mb-2">Product Description</p>
            <p className="text-sm text-[#113770]">{'No description available'}</p>
          </div>
        </article>
      </section>


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
        <StoreInventoryUpdateModal
          isModalOpen={isUpdateModalOpen}
          closeModal={closeUpdateModal}
          product={data}
          refetch={refetch}
          operationMode={modalOperationMode}
        />
      }
    </section>
  );
};

export default StoreInventoryDetailsPage;

'use client'
import React from 'react'
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { AddCircle, Hashtag, MinusCirlce } from 'iconsax-react';
import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Input,
} from "@/components/ui";

import { TStoreInventoryItem } from '../types/store';
import FormError from '@/components/ui/formError';
import { useUpdateProductInventory } from '../api';
import { extractErrorMessage } from '@/utils/errors';
import toast from 'react-hot-toast';
import { Spinner } from '@/icons/core';

const storeInventorySchema = z.object({
    quantity: z.number().int().nonnegative(),
    cost_price: z.number()
        .min(1, {
            message: "Cost price must be greater than 0"
        }).int({
            message: "Cost price must be a number"
        }).positive({ message: "Cost price must be a positive number" }),
});
interface StoreInventoryUpdateModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    refetch: () => void;
    product: TStoreInventoryItem
}

const StoreInventoryUpdateModal: React.FC<StoreInventoryUpdateModalProps> = ({ isModalOpen, closeModal, product, refetch }) => {
    const { register, formState: { errors }, setValue, handleSubmit, watch, getValues, setError } = useForm({
        defaultValues: {
            quantity: product.quantity,
            cost_price: parseInt(product.cost_price),
        },
        resolver: zodResolver(storeInventorySchema)
    })

    const quantityMinus = () => {
        const prevQuantity = watch('quantity') || 0
        setValue('quantity', Math.max(0, prevQuantity - 1))
    }
    const quantityPlus = () => {
        const prevQuantity = Number(watch('quantity') || 0)
        setValue('quantity', prevQuantity + 1)
    }

      const {mutate, isPending} =  useUpdateProductInventory()
        const submit = (data: { quantity: number; cost_price: number }) => {
        if (isNaN(data.cost_price)) {
            alert("Cost price cannot be NaN");
            setError("cost_price", {
                type: "manual",
                message: "Cost price cannot be NaN"
            })
            return;
        }
        mutate({data, id: product.id},
            {
                onSuccess: () => {
                    toast.success("Store inventory updated successfully")
                    refetch();
                    closeModal()
                },
                onError: (error) => {
                    const erMessage  = extractErrorMessage(error)
                    toast.error(erMessage)
                }
            }
        )
    }
    



    return (
        <Dialog open={isModalOpen} onOpenChange={closeModal} modal>

            <DialogContent className=" max-w-[596px] ">
                {/* <DialogClose className="absolute right-8">
                    <IoIosClose size={30} />
                </DialogClose> */}
                <DialogHeader className="">
                    <DialogTitle className="text-xl font-semibold uppercase">
                        stock adjustment
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(submit)} id="FORM" className='flex flex-col gap-8 p-8 pt-6'>
                    <div className="mt-9 bg-[#72ADE614] h-24 rounded-xl py-3 pl-5 flex gap-10 items-center">
                        <Image
                            src={product.image_one || "/placeholder.png"}
                            alt={product.name}
                            width={78}
                            height={69}
                            className="rounded-xl text-[0.6rem]"
                        />
                        <div className="flex flex-col gap-2">
                            <h3 className="uppercase font-bold">{product.name}</h3>
                            <div className="flex gap-3">
                                <Hashtag />
                                <p className="text-xs">
                                    Stocked Product:{" "}
                                    <span className="font-semibold">{product.quantity}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs">Quantity</p>
                        <div className="grid grid-cols-[max-content,1fr,max-content] items-center border border-solid border-[#E1E1E1] py-3 px-[18px] gap-4 mt-2">
                            <div className="cursor-pointer" onClick={quantityMinus}>
                                <MinusCirlce size={24} />
                            </div>
                            <Input
                                className="font-bold text-sm appearance-none w-full text-center"
                                {...register('quantity', { valueAsNumber: true })}
                                pattern="^[0-9]*$"

                            />
                            <div className="cursor-pointer" onClick={quantityPlus}>
                                <AddCircle size={24} />
                            </div>
                        </div>
                        {
                            !!errors.quantity && (
                                <FormError errorMessage={errors.quantity?.message} />
                            )
                        }
                    </div>
                    {/* <div>
                        <p className="text-xs">Low in Stock</p>
                        <div className="border border-solid border-[#E1E1E1] py-3 px-[18px] flex gap-12 mt-2">
                            <div className="cursor-pointer" onClick={lowStockMinus}>
                                <CiCircleMinus size={20} />
                            </div>
                            <div className="font-bold text-sm">{lowStockCounter}</div>
                            <div className="cursor-pointer" onClick={lowStockPlus}>
                                <CiCirclePlus size={20} />
                            </div>
                        </div>
                    </div> */}
                    <Input
                        label="Cost Price (₦)"
                        id="price"
                        type="number"
                        {...register('cost_price', {
                            valueAsNumber: true
                        })}
                        pattern="^[0-9]*$"
                        hasError={!!errors.cost_price}
                        errorMessage={errors.cost_price?.message}
                        placeholder='Enter cost price'
                    />
                    <DialogFooter className="p-2">
                        <Button
                            type="submit"
                            id='FORM'
                            disabled={isPending}    
                            className="bg-[#17181C] mt-10 mb-3 w-full p-6 h-[70px] rounded-[10px]"
                        >
                            Save Changes
                            {
                                isPending && <Spinner/>
                            }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default StoreInventoryUpdateModal

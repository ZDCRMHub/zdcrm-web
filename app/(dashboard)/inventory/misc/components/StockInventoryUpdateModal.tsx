'use client'
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import Image from 'next/image';
import { AddCircle, Hashtag, MinusCirlce } from 'iconsax-react';
import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import {
    AmountInput,
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

import FormError from '@/components/ui/formError';
import { useUpdateStockInventory } from '../api';
import { extractErrorMessage } from '@/utils/errors';
import toast from 'react-hot-toast';
import { Spinner } from '@/icons/core';
import { TStockInventoryItem, TStockVariation } from '../types/stock';

const stockInventorySchema = z.object({
    quantity: z.number().int().nonnegative(),
    cost_price: z.number().min(1, { message: 'Cost price is required' }),
       selling_price: z.number().min(1, { message: 'Selling price is required' }),
   });
interface StockInventoryUpdateModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    refetch: () => void;
    stock: TStockInventoryItem
    variation: TStockVariation

}

const StockInventoryUpdateModal: React.FC<StockInventoryUpdateModalProps> = ({ isModalOpen, closeModal, variation, stock, refetch }) => {
    const { register, formState: { errors }, setValue, handleSubmit, watch, control, setError } = useForm({
        defaultValues: {
            quantity: variation.quantity,
            cost_price: parseInt(variation.cost_price),
            selling_price: parseInt(variation.selling_price),
        },
        resolver: zodResolver(stockInventorySchema)
    })

    const quantityMinus = () => {
        const prevQuantity = watch('quantity') || 0
        setValue('quantity', Math.max(0, prevQuantity - 1))
    }
    const quantityPlus = () => {
        const prevQuantity = Number(watch('quantity') || 0)
        setValue('quantity', prevQuantity + 1)
    }

    const { mutate, isPending } = useUpdateStockInventory()
    const submit = (data: { quantity: number; cost_price: number }) => {
        if (isNaN(data.cost_price)) {
            alert("Cost price cannot be NaN");
            setError("cost_price", {
                type: "manual",
                message: "Cost price cannot be NaN"
            })
            return;
        }
        mutate({ data, id: variation.id },
            {
                onSuccess: () => {
                    refetch()
                    toast.success("stock inventory updated successfully")
                    closeModal()
                },
                onError: (error) => {
                    const erMessage = extractErrorMessage(error)
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
                            src={stock.image_one || "/placeholder.png"}
                            alt={stock.name}
                            width={78}
                            height={69}
                            className="rounded-xl text-xs"
                        />
                        <div className="flex flex-col gap-2">
                            <h3 className="uppercase font-bold">{stock.name} - {variation.size || variation.flavour || variation.color}</h3>
                            <div className="flex gap-3">
                                <p className="text-xs">
                                    Stocked stock:{" "}
                                    <span className="font-semibold">{variation.quantity}</span>
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

                    <Controller
                        name={`cost_price`}
                        control={control}
                        render={({ field }) => (
                            <AmountInput
                                {...field}
                                label="Cost Price"
                                value={field.value ?? ''}
                                placeholder='Cost Price'
                                hasError={!!errors.selling_price}
                                errorMessage={errors.selling_price?.message}
                            />
                        )}
                    />
                    <Controller
                        name={`selling_price`}
                        control={control}
                        render={({ field }) => (
                            <AmountInput
                                {...field}
                                label="Selling Price"
                                value={field.value ?? ''}
                                placeholder='Selling Price'
                                hasError={!!errors.selling_price}
                                errorMessage={errors.selling_price?.message}
                            />
                        )}
                    />

                    <DialogFooter className="p-2">
                        <Button
                            type="submit"
                            id='FORM'
                            disabled={isPending}
                            className="bg-[#17181C] mt-10 mb-3 w-full p-6 h-[70px] rounded-[10px]"
                        >
                            {
                                isPending  ? "Saving Changes" : "Save Changes"
                            }
                            {
                                isPending && <Spinner color='white' />
                            }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default StockInventoryUpdateModal

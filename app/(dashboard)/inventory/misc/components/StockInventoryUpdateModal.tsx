'use client'
import React, { useEffect } from 'react'
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
import { useUpdateStockInventory, useUpdateStockInventoryName } from '../api';
import { extractErrorMessage } from '@/utils/errors';
import toast from 'react-hot-toast';
import { Spinner } from '@/icons/core';
import { TStockInventoryItem, TStockVariation } from '../types/stock';
import { useRouter } from 'next/navigation';

const stockInventorySchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    quantity: z.number().int().nonnegative(),
});
interface StockInventoryUpdateModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    refetch: () => void;
    stock: TStockInventoryItem
    variation: TStockVariation

}
type updateStockInventoryFormType = z.infer<typeof stockInventorySchema>
const StockInventoryUpdateModal: React.FC<StockInventoryUpdateModalProps> = ({ isModalOpen, closeModal, variation, stock, refetch }) => {
    const { register, formState: { errors }, setValue, handleSubmit, watch, control, setError } = useForm<updateStockInventoryFormType>({
        defaultValues: {
            quantity: variation.quantity,
            name: stock.name
        },
        resolver: zodResolver(stockInventorySchema)
    })

    const router = useRouter();

    const quantityMinus = () => {
        const prevQuantity = watch('quantity') || 0
        setValue('quantity', Math.max(0, prevQuantity - 1))
    }
    const quantityPlus = () => {
        const prevQuantity = Number(watch('quantity') || 0)
        setValue('quantity', prevQuantity + 1)
    }

    const { mutate: updateName, isPending: isUpdatingName } = useUpdateStockInventoryName()
    const { mutate, isPending } = useUpdateStockInventory()
    const submit = (data: updateStockInventoryFormType) => {
        updateName(
            { id: stock.id, data: { name: data.name } },
            {
                onSuccess: () => {
                    toast.success("stock name updated successfully")
                    mutate({
                        data: {
                            quantity: data.quantity,
                        },
                        id: variation.id
                    },
                        {
                            onSuccess: () => {
                                refetch()
                                toast.success("stock inventory updated successfully")
                                router.replace(`/inventory/stock/${stock.id}?variation=${variation.id}`)
                                closeModal()
                            },
                            onError: (error) => {
                                const erMessage = extractErrorMessage(error)
                                toast.error(erMessage)
                            }
                        }
                    )
                },
                onError: (error) => {
                    const erMessage = extractErrorMessage(error)
                    toast.error(erMessage)
                }
            }
        )

    }

    useEffect(() => {
        setValue('quantity', variation.quantity)
        setValue('name', stock.name)
    }, [variation])




    return (
        <Dialog open={isModalOpen} onOpenChange={closeModal} modal>

            <DialogContent className=" max-w-[596px] ">

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
                            <h3 className="uppercase font-bold">{stock.name} - {variation.size || variation.flavour || variation.color} {stock.category.name == "Cake" && " inches"}</h3>

                            <div className="flex gap-3">
                                <p className="text-xs">
                                    Stocked quantity:{" "}
                                    <span className="font-semibold">{variation.quantity}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <Input
                        label="Product Name"
                        className="font-medium text-sm appearance-none w-full"
                        {...register('name')}
                        placeholder='Product Name'
                        hasError={!!errors.name}
                        errorMessage={errors.name?.message}
                    />
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



                    <DialogFooter className="p-2">
                        <Button
                            type="submit"
                            id='FORM'
                            disabled={isPending || isUpdatingName}
                            className="bg-[#17181C] mt-10 mb-3 w-full p-6 h-[70px] rounded-[10px]"
                        >
                            {
                                isUpdatingName || isPending ? "Saving Changes" : "Save Changes"
                            }
                            {
                                isUpdatingName || isPending && <Spinner color='white' />
                            }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default StockInventoryUpdateModal

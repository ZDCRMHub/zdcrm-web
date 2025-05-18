'use client'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
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

import { TProductInventoryItem, TProductVariation } from '../types/products';
import FormError from '@/components/ui/formError';
import { useUpdateProductInventory, useUpdateProductInventoryName } from '../api';
import { extractErrorMessage } from '@/utils/errors';
import toast from 'react-hot-toast';
import { Spinner } from '@/icons/core';

const UpdateproductInventorySchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    quantity: z.number().int().nonnegative(),
});
type UpdateProductInventorySchemaType = z.infer<typeof UpdateproductInventorySchema>;
interface ProductsInventoryUpdateModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    refetch: () => void;
    product: TProductInventoryItem
    variation: TProductVariation

}

const ProductsInventoryUpdateModal: React.FC<ProductsInventoryUpdateModalProps> = ({ isModalOpen, closeModal, product, refetch, variation }) => {
    const { register, formState: { errors }, setValue, handleSubmit, watch, control, setError } = useForm<UpdateProductInventorySchemaType>({
        defaultValues: {
            quantity: variation.quantity,
            name: product.name,
        },
        resolver: zodResolver(UpdateproductInventorySchema)
    })

    const quantityMinus = () => {
        const prevQuantity = watch('quantity') || 0
        setValue('quantity', Math.max(0, prevQuantity - 1))
    }
    const quantityPlus = () => {
        const prevQuantity = Number(watch('quantity') || 0)
        setValue('quantity', prevQuantity + 1)
    }

    const { mutate: updateName, isPending: isUpdatingName } = useUpdateProductInventoryName()
    const { mutate, isPending } = useUpdateProductInventory()
    const submit = (data: UpdateProductInventorySchemaType) => {
        updateName(
            { id: product.id, data: { name: data.name } },
            {
                onSuccess: () => {
                    toast.success("product name updated successfully")
                    mutate({
                        data: {
                            quantity: data.quantity,
                        },
                        id: variation.id
                    },
                        {
                            onSuccess: () => {
                                refetch()
                                toast.success("Product inventory updated successfully")
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
        setValue('name', product.name)
    }, [variation])





    return (
        <Dialog open={isModalOpen} onOpenChange={closeModal} modal>

            <DialogContent className=" max-w-[596px] ">
                <DialogHeader className="">
                    <DialogTitle className="text-xl font-semibold uppercase">
                        product adjustment
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(submit)} id="FORM" className='flex flex-col gap-8 p-8 pt-6'>
                    <div className="mt-9 bg-[#72ADE614] h-24 rounded-xl py-3 pl-5 flex gap-10 items-center">
                        <Image
                            src={product.image_one || "/placeholder.png"}
                            alt={product.name}
                            width={78}
                            height={69}
                            className="rounded-xl"
                        />
                        <div className="flex flex-col gap-2">
                            <h3 className="uppercase font-bold">{product.name} - {variation.size} {product.category.name == "Cake" && " inches"}</h3>
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

export default ProductsInventoryUpdateModal

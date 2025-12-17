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
    adjustmentAmount: z.number().int().min(1, { message: 'Amount must be at least 1' }).optional(),
});

type QuantityOperationMode = 'add' | 'subtract' | 'both';

interface StockInventoryUpdateModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    refetch: () => void;
    stock: TStockInventoryItem
    variation: TStockVariation
    operationMode?: QuantityOperationMode;
}
type updateStockInventoryFormType = z.infer<typeof stockInventorySchema>
const StockInventoryUpdateModal: React.FC<StockInventoryUpdateModalProps> = ({ 
    isModalOpen, 
    closeModal, 
    variation, 
    stock, 
    refetch,
    operationMode = 'both' 
}) => {
    const { register, formState: { errors }, setValue, handleSubmit, watch, control, setError } = useForm<updateStockInventoryFormType>({
        defaultValues: {
            quantity: variation.quantity,
            name: stock.name,
            adjustmentAmount: undefined,
        },
        resolver: zodResolver(stockInventorySchema)
    })

    const router = useRouter();
    const [customError, setCustomError] = React.useState<string>('');

    const quantityMinus = () => {
        const prevQuantity = watch('quantity') || 0
        setValue('quantity', Math.max(0, prevQuantity - 1))
    }
    const quantityPlus = () => {
        const prevQuantity = Number(watch('quantity') || 0)
        setValue('quantity', prevQuantity + 1)
    }

    const validateAdjustment = (amount: number, operation: 'add' | 'subtract'): boolean => {
        if (operation === 'subtract') {
            const resultingQuantity = variation.quantity - amount;
            if (resultingQuantity < 0) {
                setCustomError(`Cannot subtract ${amount}. Only ${variation.quantity} items available in stock.`);
                return false;
            }
        }
        setCustomError('');
        return true;
    };

    const { mutate: updateName, isPending: isUpdatingName } = useUpdateStockInventoryName()
    const { mutate, isPending } = useUpdateStockInventory()
    const submit = (data: updateStockInventoryFormType) => {
        let finalQuantity = data.quantity;

        // Handle adjustment operations
        if (operationMode !== 'both' && data.adjustmentAmount) {
            if (operationMode === 'add') {
                finalQuantity = variation.quantity + data.adjustmentAmount;
            } else if (operationMode === 'subtract') {
                if (!validateAdjustment(data.adjustmentAmount, 'subtract')) {
                    return; // Stop submission if validation fails
                }
                finalQuantity = variation.quantity - data.adjustmentAmount;
            }
        }

        updateName(
            { id: stock.id, data: { name: data.name } },
            {
                onSuccess: () => {
                    toast.success("stock name updated successfully")
                    mutate({
                        data: {
                            quantity: finalQuantity,
                        },
                        id: variation.id
                    },
                        {
                            onSuccess: () => {
                                refetch()
                                const operationText = operationMode === 'add' ? 'added to' : 
                                                    operationMode === 'subtract' ? 'subtracted from' : 'updated for';
                                toast.success(`Stock inventory ${operationText} successfully`)
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
        setValue('adjustmentAmount', undefined)
        setCustomError('')
    }, [variation, stock.name, setValue])

    // Reset adjustment amount when modal closes
    useEffect(() => {
        if (!isModalOpen) {
            setValue('adjustmentAmount', undefined)
            setCustomError('')
        }
    }, [isModalOpen, setValue])

    const getModalTitle = () => {
        switch (operationMode) {
            case 'add': return 'Add to Stock';
            case 'subtract': return 'Subtract from Stock';
            default: return 'Stock Adjustment';
        }
    };

    const renderQuantityInput = () => {
        if (operationMode === 'both') {
            return (
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
                    {!!errors.quantity && (
                        <FormError errorMessage={errors.quantity?.message} />
                    )}
                </div>
            );
        } else {
            return (
                <div>
                    <p className="text-xs">
                        {operationMode === 'add' ? 'Amount to Add' : 'Amount to Subtract'}
                    </p>
                    <Input
                        className="font-bold text-sm appearance-none w-full mt-2"
                        {...register('adjustmentAmount', { 
                            valueAsNumber: true,
                            onChange: (e) => {
                                const value = parseInt(e.target.value) || 0;
                                if (operationMode === 'subtract' && value > 0) {
                                    validateAdjustment(value, 'subtract');
                                } else {
                                    setCustomError('');
                                }
                            }
                        })}
                        placeholder={`Enter amount to ${operationMode}`}
                        pattern="^[0-9]*$"
                    />
                    {!!errors.adjustmentAmount && (
                        <FormError errorMessage={errors.adjustmentAmount?.message} />
                    )}
                    {customError && (
                        <FormError errorMessage={customError} />
                    )}
                    <div className="mt-2 text-xs text-gray-500">
                        Current quantity: <span className="font-semibold">{variation.quantity}</span>
                        {operationMode === 'add' && watch('adjustmentAmount') && (
                            <span> → New quantity: <span className="font-semibold text-green-600">
                                {variation.quantity + (watch('adjustmentAmount') || 0)}
                            </span></span>
                        )}
                        {operationMode === 'subtract' && watch('adjustmentAmount') && !customError && (
                            <span> → New quantity: <span className="font-semibold text-blue-600">
                                {Math.max(0, variation.quantity - (watch('adjustmentAmount') || 0))}
                            </span></span>
                        )}
                    </div>
                </div>
            );
        }
    };




    return (
        <Dialog open={isModalOpen} onOpenChange={closeModal} modal>

            <DialogContent className=" max-w-[596px] ">

                <DialogHeader className="">
                    <DialogTitle className="text-xl font-semibold uppercase">
                        {getModalTitle()}
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
                    
                    {renderQuantityInput()}

                    <DialogFooter className="p-2">
                        <Button
                            type="submit"
                            id='FORM'
                            disabled={isPending || isUpdatingName || !!customError}
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

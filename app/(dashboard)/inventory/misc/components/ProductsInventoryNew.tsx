import React from 'react';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { Add, Book } from 'iconsax-react';
import { Plus, User, X } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { AmountInput, Button, SelectSingleCombo } from '@/components/ui';
import { Separator } from '@radix-ui/react-select';
import { Input, Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { APIAxios } from "@/utils/axios";
import { useGetAllBranches } from '@/app/(dashboard)/admin/branches/misc/api';
import ErrorModal from '@/components/ui/modal-error';
import useErrorModalState from '@/hooks/useErrorModalState';
import { extractErrorMessage, formatAxiosErrorMessage } from '@/utils/errors';
import { useLoading } from '@/contexts';
import useCloudinary from '@/hooks/useCloudinary';

import CustomImagePicker from './CustomImagePicker';
import { useGetProductCategories } from '../api';



const MAX_FILE_SIZE = 1000000;

const schema = z.object({
    name: z.string().min(1, { message: 'Item name is required' }).max(255),
    category: z.number(),
    branch: z.number(),
    quantity: z.number().int().positive({ message: 'Quantity must be a positive integer' }),
    cost_price: z.number().min(1, { message: 'Cost price is required' }),
    selling_price: z.number().min(1, { message: 'Selling price is required' }),
    image_one: z.any().nullable().refine(
        file => {
            if (!file) {
                throw z.ZodError.create([{
                    path: ['image_one'],
                    message: 'Please select a file.',
                    code: 'custom',
                }]);
            }
            if (!file.type.startsWith('image/')) {
                throw z.ZodError.create([{
                    path: ['image_one'],
                    message: 'Please select an image file.',
                    code: 'custom',
                }]);
            }
            return file.size <= MAX_FILE_SIZE;
        },
        {
            message: 'Max image size is 10MB.',
        }
    ),
});

type FormType = z.infer<typeof schema>;

const createProductInventory = async (data: FormType) => {
    console.log(data)
    const res = await APIAxios.post('/inventory/create-product-inventory/', data, {
        // headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
};

export default function NewProductInventorySheet() {
    const { register, control, handleSubmit, formState: { errors, isDirty }, setValue, reset } = useForm<FormType>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            category: undefined,
            branch: undefined,
            image_one: null,
        }
    });

    const { data: categories, isLoading: categoriesLoading } = useGetProductCategories();
    const { data: branches, isLoading: branchesLoading } = useGetAllBranches();
    const {
        isErrorModalOpen,
        errorModalMessage,
        openErrorModalWithMessage,
        closeErrorModal,
        setErrorModalState
    } = useErrorModalState()

    const queryClient = useQueryClient();
    const { uploadToCloudinary } = useCloudinary()
    const { isUploading } = useLoading()
    const { mutate: createProductInvetory, isPending: isCreating } = useMutation({
        mutationFn: createProductInventory,
        onSuccess: () => {
            reset()
            setValue('image_one', null)
            toast.success('Product Inventory created successfully');
            queryClient.invalidateQueries({ queryKey: ['productsInventory'] });
        },
        onError: (error: unknown) => {
            const errorMessage = extractErrorMessage(error) || formatAxiosErrorMessage(error as any)
            openErrorModalWithMessage(errorMessage)
        }
    });

    const onSubmit = async (data: FormType) => {
        let image_one: string | undefined
        const imageFile = data.image_one
        if (data.image_one) {
            const data = await uploadToCloudinary(imageFile)
            image_one = data.secure_url
        }
        const dataToSubmit = {
            ...data,
            image_one: imageFile ? image_one : undefined,
        }
        createProductInvetory(dataToSubmit);
    };
    console.log(errors)


    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant='default' className='bg-black text-white'>
                        <Plus className='mr-2 h-4 w-4' /> Add New Product Item
                    </Button>
                </SheetTrigger>

                <SheetContent className='!w-[80vw] !max-w-[450px] h-screen flex flex-col overflow-y-scroll px-0'>
                    <SheetTitle className='border-b pb-4 px-8'>
                        <h2 className='text-xl font-semibold flex items-center gap-4'>
                            <span className='bg-[#E8EEFD] p-2 rounded-full'>
                                <Book size={25} variant='Bold' color='#194A7A' />
                            </span>
                            <span>Add Product Inventory</span>
                        </h2>
                    </SheetTitle>
                    <SheetClose className='absolute top-full left-[-100%]'>
                        <Add className='mr-2 h-6 w-6 rotate-45' />
                    </SheetClose>

                    <Separator />

                    <form onSubmit={handleSubmit(onSubmit)} className='grow flex flex-col gap-8 px-8 py-10'>
                        <CustomImagePicker
                            control={control}
                            name="image_one"
                            errors={errors}
                            hasError={!!errors.image_one}
                            errorMessage={errors.image_one?.message as string}
                        />
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Product Name"
                                    value={field.value?.toString() ?? ''}
                                    placeholder='Item name'
                                    hasError={!!errors.name}
                                    errorMessage={errors.name?.message}
                                />
                            )}
                        />


                        <Controller
                            name="branch"
                            control={control}
                            render={({ field }) => (
                                <SelectSingleCombo
                                    {...field}
                                    name='branch'
                                    value={field.value?.toString() || ''}
                                    options={branches?.data?.map(bra => ({ label: bra.name, value: bra.id.toString() })) || []}
                                    valueKey='value'
                                    labelKey="label"
                                    label="Branch"
                                    placeholder='Select Branch'
                                    onChange={(value) => field.onChange(Number(value))}
                                    isLoadingOptions={branchesLoading}
                                    hasError={!!errors.branch}
                                    errorMessage={errors.branch?.message}
                                />
                            )}
                        />
                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <SelectSingleCombo
                                    {...field}
                                    name='branch'
                                    value={field.value?.toString() || ''}
                                    options={categories?.map(bra => ({ label: bra.name, value: bra.id.toString() })) || []}
                                    valueKey='value'
                                    labelKey="label"
                                    label="Category"
                                    placeholder='Select Category'
                                    onChange={(value) => field.onChange(Number(value))}
                                    isLoadingOptions={categoriesLoading}
                                    hasError={!!errors.category}
                                    errorMessage={errors.category?.message}
                                />
                            )}
                        />




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

                        <Input
                            type='number'
                            placeholder='Quantity'
                            hasError={!!errors.quantity}
                            errorMessage={errors.quantity?.message}
                            pattern="^[0-9]*$"
                            {...register('quantity', { valueAsNumber: true })}
                        // onChange={(e) => setValue('quantity', parseInt(e.target.value) || 0)}
                        />


                        <div className="flex items-center gap-4 mt-auto">
                            <SheetClose asChild>
                                <Button type="button" className='h-14 w-full' variant="outline">Cancel</Button>
                            </SheetClose>
                            <Button type="submit" className='h-14 w-full' variant="black" disabled={!isDirty || isCreating || isUploading}>
                                {(isCreating || isUploading) ? 'Saving...' : 'Save Record'}
                            </Button>
                        </div>
                    </form>
                </SheetContent>
            </Sheet>


            <ErrorModal
                heading='An error Occured'
                subheading={errorModalMessage || "Check your inputs"}
                isErrorModalOpen={isErrorModalOpen}
                setErrorModalState={setErrorModalState}
            >
                <div className="p-5 rounded-t-2xl rounded-b-3xl bg-red-200">
                    <Button variant="destructive" className='w-full' onClick={closeErrorModal}>
                        Okay
                    </Button>
                </div>
            </ErrorModal>
        </>
    );
}


import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Badge } from '@/components/ui/badge';
import { Button, SelectSingleCombo } from '@/components/ui';
import { Plus, User, X } from 'lucide-react';
import { Add, Book } from 'iconsax-react';
import { Separator } from '@radix-ui/react-select';
import { Input, Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { APIAxios } from "@/utils/axios";
import CustomImagePicker from './CustomImagePicker';
import { useGetCategories } from '../api/getCategories';
import { useGetAllBranches } from '@/app/(dashboard)/admin/branches/misc/api';
import toast from 'react-hot-toast';



const schema = z.object({
    name: z.string().min(1, { message: 'Item name is required' }).max(255),
    // category: z.number(),
    branch: z.number(),
    quantity: z.number().int().positive({ message: 'Quantity must be a positive integer' }),
    cost_price: z.number().int().positive({ message: 'Cost price must be a positive integer' }),
    // image_one: z.instanceof(File, { message: 'Image is required' }).refine(file => file.size > 0, { message: 'Image is required' }),
});

type FormType = z.infer<typeof schema>;

const createStoreInventory = async (data: FormType) => {
    console.log(data)
    const res = await APIAxios.post('/inventory/create-store-inventory/', data, {
        // headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
};

export default function NewStoreInventorySheet() {
    const { control, handleSubmit, formState: { errors, isDirty }, setValue, reset } = useForm<FormType>({
        resolver: zodResolver(schema),
    });

    const { data: categories, isLoading: categoriesLoading } = useGetCategories();
    const { data: branches, isLoading: branchesLoading } = useGetAllBranches();

    const queryClient = useQueryClient();
    const { mutate: createStoreInvetory, isPending: isCreating } = useMutation({
        mutationFn: createStoreInventory,
        onSuccess: () => {
            reset()
            toast.success('Store Inventory created successfully');
            queryClient.invalidateQueries({ queryKey: ['storeInventory'] });
        },
    });

    const onSubmit = (data: FormType) => {
        createStoreInvetory(data);
    };
    console.log(errors)


    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant='default' className='bg-black text-white'>
                    <Plus className='mr-2 h-4 w-4' /> Add New Store Item
                </Button>
            </SheetTrigger>

            <SheetContent className='!w-[80vw] !max-w-[450px] h-screen flex flex-col overflow-y-scroll px-0'>
                <SheetTitle className='border-b pb-4 px-8'>
                    <h2 className='text-xl font-semibold flex items-center gap-4'>
                        <span className='bg-[#E8EEFD] p-2 rounded-full'>
                            <Book size={25} variant='Bold' color='#194A7A' />
                        </span>
                        <span>Add Store Inventory</span>
                    </h2>
                </SheetTitle>
                <SheetClose className='absolute top-full left-[-100%]'>
                    <Add className='mr-2 h-6 w-6 rotate-45' />
                </SheetClose>

                <Separator />

                <form onSubmit={handleSubmit(onSubmit)} className='grow flex flex-col gap-8 px-8 py-10'>
                    {/* <CustomImagePicker
                        control={control}
                        name="image_one"
                        errors={errors}
                    /> */}
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
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
                                placeholder='Select Branch'
                                onChange={(value) => field.onChange(Number(value))}
                                isLoadingOptions={branchesLoading}
                                hasError={!!errors.branch}
                                errorMessage={errors.branch?.message}
                            />
                        )}
                    />


                    <Input
                        type='number'
                        placeholder='Cost Price'
                        hasError={!!errors.cost_price}
                        errorMessage={errors.cost_price?.message}
                        pattern='[0-9]*'
                        onChange={(e) => setValue('cost_price', parseInt(e.target.value) || 0)}
                    />

                    <Input
                        type='number'
                        placeholder='Quantity'
                        hasError={!!errors.quantity}
                        errorMessage={errors.quantity?.message}
                        pattern='[0-9]*'
                        onChange={(e) => setValue('quantity', parseInt(e.target.value) || 0)}
                    />


                    <div className="flex items-center gap-4 mt-auto">
                        <SheetClose asChild>
                            <Button type="button" className='h-14 w-full' variant="outline">Cancel</Button>
                        </SheetClose>
                        <Button type="submit" className='h-14 w-full' variant="black" disabled={!isDirty || isCreating}>
                            {isCreating ? 'Saving...' : 'Save Record'}
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}


import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, SelectSingleCombo } from '@/components/ui';
import { Plus, User, X } from 'lucide-react';
import { Add, Book } from 'iconsax-react';
import { Separator } from '@radix-ui/react-select';
import { Input, Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { APIAxios } from "@/utils/axios";
import { useGetAllBranches } from '@/app/(dashboard)/admin/branches/misc/api';
import toast from 'react-hot-toast';
import { useGetStockCategories } from '../api';
import { PRODUCT_TYPES_OPTIONS } from '@/constants';

const variationSchema = z.object({
    size: z.string().optional(),
    color: z.string().optional(),
    flavour: z.string().optional(),
    selling_price: z.string().nullable(),
    cost_price: z.string().min(1, { message: 'Cost price is required' }),
    quantity: z.number().int().positive({ message: 'Quantity must be a positive integer' }),
});

const schema = z.object({
    name: z.string().min(1, { message: 'Item name is required' }).max(255),
    category: z.number(),
    branch: z.number(),
    variations: z.array(variationSchema).min(1, { message: 'At least one variation is required' })

}).refine((data) => {
    const category = data.category;
    return data.variations.every((variation) => {
        if (category === 8) {
            return !!variation.size;
        } else if (category === 9) {
            return !!variation.color;
        } else if (category === 10) {
            return !!variation.flavour;
        }
        return true;
    });
}, {
    message: "Variations must include the correct fields based on the selected category",
});


type FormType = z.infer<typeof schema>;

const createStockInventory = async (data: FormType) => {
    console.log(data)
    const res = await APIAxios.post('/inventory/create-stock-inventory/', data, {
        // headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
};

export default function NewInventorySheet() {
    const { control, handleSubmit, formState: { errors, isDirty }, watch, reset } = useForm<FormType>({
        resolver: zodResolver(schema),
        defaultValues: {
            variations: [{ selling_price: null, cost_price: '', quantity: 0 }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "variations",
    });

    const { data: categories, isLoading: categoriesLoading } = useGetStockCategories();
    const { data: branches, isLoading: branchesLoading } = useGetAllBranches();

    const queryClient = useQueryClient();
    const { mutate: createStockInvetory, isPending: isCreating } = useMutation({
        mutationFn: createStockInventory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stockInventory'] });
            toast.success('Stock inventory created successfully');
            reset();
        },
    });

    const onSubmit = (data: FormType) => {
        if (data.category === 8) {
            data.variations.forEach(variation => {
                delete variation.color;
                delete variation.flavour;
            });
        } else if (data.category === 9) {
            data.variations.forEach(variation => {
                delete variation.size;
                delete variation.flavour;
            });
        } else if (data.category === 10) {
            data.variations.forEach(variation => {
                delete variation.size;
                delete variation.color;
            });
        }
        createStockInvetory(data);
    };
    console.log(errors)
    const selectedCategoryName = categories?.find(cat => cat.id === watch('category'))?.name;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant='default' className='bg-black text-white'>
                    <Plus className='mr-2 h-4 w-4' /> Add New Stock Item
                </Button>
            </SheetTrigger>

            <SheetContent className='!w-[80vw] !max-w-[450px] h-screen flex flex-col overflow-y-scroll px-0'>
                <SheetTitle className='border-b pb-4 px-8'>
                    <h2 className='text-xl font-semibold flex items-center gap-4'>
                        <span className='bg-[#E8EEFD] p-2 rounded-full'>
                            <Book size={25} variant='Bold' color='#194A7A' />
                        </span>
                        <span>Add Inventory</span>
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
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <SelectSingleCombo
                                {...field}
                                name='category'
                                value={field.value?.toString() || ''}
                                options={categories?.map(cat => ({ label: cat.name, value: cat.id.toString() })) || []}
                                valueKey='value'
                                labelKey="label"
                                placeholder='Item category'
                                onChange={(value) => field.onChange(Number(value))}
                                isLoadingOptions={categoriesLoading}
                                hasError={!!errors.category}
                                errorMessage={errors.category?.message}
                            />
                        )}
                    />



                    {fields.map((field, index) => (
                        <div key={field.id} className="space-y-4">
                            <h3 className="font-semibold">Variation {index + 1}</h3>
                            {watch('category') === 8 && (
                                <Controller
                                    name={`variations.${index}.size`}
                                    control={control}
                                    render={({ field }) => (
                                       
                                        <SelectSingleCombo
                                            options={
                                                PRODUCT_TYPES_OPTIONS.Cakes.sizes
                                            }
                                            label="Size"
                                            valueKey="value"
                                            labelKey="label"
                                            placeholder="Select Size"
                                            {...field}
                                            hasError={!!errors.variations?.[index]?.size}
                                            errorMessage={errors.variations?.[index]?.size?.message as string}
                                        />
                                    )}
                                />
                            )}
                            {watch('category') === 9 && (
                                <Controller
                                    name={`variations.${index}.color`}
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            value={field.value || ''}
                                            placeholder='Colour'
                                            hasError={!!errors.variations?.[index]?.color}
                                            errorMessage={errors.variations?.[index]?.color?.message}
                                        />
                                    )}
                                />
                            )}
                            {watch('category') === 10 && (
                                <Controller
                                    name={`variations.${index}.flavour`}
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            value={field.value || ''}
                                            placeholder='Flavour'
                                            hasError={!!errors.variations?.[index]?.flavour}
                                            errorMessage={errors.variations?.[index]?.flavour?.message}
                                        />
                                    )}
                                />
                            )}
                            <Controller
                                name={`variations.${index}.selling_price`}
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        value={field.value ?? ''}
                                        placeholder='Selling Price'
                                        hasError={!!errors.variations?.[index]?.selling_price}
                                        errorMessage={errors.variations?.[index]?.selling_price?.message}
                                    />
                                )}
                            />
                            <Controller
                                name={`variations.${index}.cost_price`}
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder='Cost Price'
                                        hasError={!!errors.variations?.[index]?.cost_price}
                                        errorMessage={errors.variations?.[index]?.cost_price?.message}
                                    />
                                )}
                            />
                            <Controller
                                name={`variations.${index}.quantity`}
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder='Quantity'
                                        hasError={!!errors.variations?.[index]?.quantity}
                                        errorMessage={errors.variations?.[index]?.quantity?.message}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                )}
                            />
                            {index > 0 && (
                                <Button type="button" onClick={() => remove(index)} variant="outline">
                                    Remove Variation
                                </Button>
                            )}
                        </div>
                    ))}

                    <Button
                        type="button"
                        onClick={() => append({ selling_price: null, cost_price: '', quantity: 0 })}
                        variant="outline"
                    >
                        Add Variation
                    </Button>

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


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

const variationSchema = z.object({
    size: z.string().nullable(),
    color: z.string().nullable(),
    flavour: z.string().nullable(),
    selling_price: z.string().nullable(),
    cost_price: z.string().min(1, { message: 'Cost price is required' }),
    quantity: z.number().int().positive({ message: 'Quantity must be a positive integer' }),
});

const schema = z.object({
    name: z.string().min(1, { message: 'Item name is required' }).max(255),
    category: z.string(),
    description: z.string().optional(),
    variations: z.array(variationSchema).min(1, { message: 'At least one variation is required' }),
    // image: z.instanceof(File, { message: 'Image is required' }).refine(file => file.size > 0, { message: 'Image is required' }),
});

type FormType = z.infer<typeof schema>;

const createStockInventory = async (data: FormType) => {
    // const formData = new FormData();
    // formData.append('name', data.name);
    // formData.append('category', data.category.toString());
    // if (data.description) formData.append('description', data.description);
    // formData.append('variations', JSON.stringify(data.variations));
    // formData.append('image', data.image);

    const res = await APIAxios.post('/inventory/create-stock-inventory/', data, {
        // headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
};

export default function NewInventorySheet() {
    const { control, handleSubmit, formState: { errors, isDirty }, setValue } = useForm<FormType>({
        resolver: zodResolver(schema),
        defaultValues: {
            variations: [{ size: null, color: null, flavour: null, selling_price: null, cost_price: '', quantity: 0 }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "variations",
    });

    const { data: categories, isLoading: categoriesLoading } = useGetCategories();

    const queryClient = useQueryClient();
    const { mutate: createStockInvetory, isPending: isCreating } = useMutation({
        mutationFn: createStockInventory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stockInventory'] });
        },
    });

    const onSubmit = (data: FormType) => {
        createStockInvetory(data);
    };

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
                        name="image"
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
                            />
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder='Description'
                                hasError={!!errors.description}
                                errorMessage={errors.description?.message}
                            />
                        )}
                    />

                    {fields.map((field, index) => (
                        <div key={field.id} className="space-y-4">
                            <h3 className="font-semibold">Variation {index + 1}</h3>
                            <Controller
                                name={`variations.${index}.size`}
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        value={field.value || ''}
                                        placeholder='Size'
                                        hasError={!!errors.variations?.[index]?.size}
                                        errorMessage={errors.variations?.[index]?.size?.message}
                                    />
                                )}
                            />
                            <Controller
                                name={`variations.${index}.color`}
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        value={field.value || ''}
                                        placeholder='Color'
                                        hasError={!!errors.variations?.[index]?.color}
                                        errorMessage={errors.variations?.[index]?.color?.message}
                                    />
                                )}
                            />
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
                        onClick={() => append({ size: null, color: null, flavour: null, selling_price: null, cost_price: '', quantity: 0 })}
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


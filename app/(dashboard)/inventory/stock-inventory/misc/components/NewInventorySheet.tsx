import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Badge } from '@/components/ui/badge';
import { Button, SelectSingleCombo } from '@/components/ui';
import { Plus, User, X } from 'lucide-react';
import { Add, Book } from 'iconsax-react';
import { Separator } from '@radix-ui/react-select';
import { Input, Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui';
import CustomImagePicker from './CustomImagePicker';

// Define the schema using zod
const schema = z.object({
    itemName: z.string().min(1, { message: 'Item name is required' }),
    branch: z.string().min(1, { message: 'Branch is required' }),
    category: z.string().min(1, { message: 'Category is required' }),
    amount: z.string().min(1, { message: 'Amount is required' }),
    image: z.instanceof(File, { message: 'Image is required' }).refine(file => file.size > 0, { message: 'Image is required' }),
});
type formType = z.infer<typeof schema>;

export default function NewInventorySheet() {
    const { control, handleSubmit, formState: { errors, isDirty }, setValue } = useForm<formType>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: formType) => {
        console.log(data);
        // Handle form submission
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
                    <CustomImagePicker  
                        control={control}
                        name="image"
                        errors={errors}
                    />
                    <Controller
                        name="itemName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder='Item name'
                                errorMessage={errors.itemName?.message}
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
                                options={[
                                    { label: 'Prestige Flowers', value: 'category-1' },
                                    { label: 'Zuzu Delights', value: 'category-2' },
                                ]}
                                valueKey='value'
                                labelKey="label"
                                placeholder='Branch'
                                onChange={field.onChange}
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
                                options={[
                                    { label: 'Cake', value: 'category-1' },
                                    { label: 'Flowers', value: 'category-2' },
                                    { label: 'Wine', value: 'category-3' },
                                    { label: 'Teddy Bear', value: 'category-4' },
                                ]}
                                valueKey='value'
                                labelKey="label"
                                placeholder='Item category'
                                onChange={field.onChange}
                            />
                        )}
                    />

                    <Controller
                        name="amount"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder='Amount'
                                errorMessage={errors.amount?.message}
                            />
                        )}
                    />


                    <div className="flex items-center gap-4 mt-auto">
                        <SheetClose asChild>
                            <Button type="submit" className='h-14 w-full' variant="outline">Cancel</Button>
                        </SheetClose>
                        <Button type="submit" className='h-14 w-full' variant="black" disabled={!isDirty}>Save Record</Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}

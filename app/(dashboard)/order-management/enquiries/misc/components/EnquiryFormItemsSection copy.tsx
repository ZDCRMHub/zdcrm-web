// import React, { useEffect } from 'react';
// import { Controller, useFieldArray, UseFormWatch, Control, UseFormSetValue } from "react-hook-form";
// import { TrashIcon } from 'lucide-react';

// import { SelectSingleCombo } from "@/components/ui";
// import { useGetCategories, useGetProducts } from '@/app/(dashboard)/inventory/misc/api';

// import { EnquiryItemCardAdditionalItems } from ".";
// import { NewEnquiryFormValues } from "../utils/schema";
// import ProductVariationSelector from './ProductVariationSelector';

// interface EnquiryItemsSectionProps {
//     control: Control<NewEnquiryFormValues>;
//     watch: UseFormWatch<NewEnquiryFormValues>;
//     setValue: UseFormSetValue<NewEnquiryFormValues>;
//     register: any;
//     errors: any;
//     index: number;
// }

// const EnquiryItemsSection: React.FC<EnquiryItemsSectionProps> = ({
//     control,
//     watch,
//     setValue,
//     register,
//     errors,
//     index
// }) => {
//     const { data: categories, isLoading: categoriesLoading } = useGetCategories();
//     const { data: products, isLoading: productsLoading } = useGetProducts({
//         category: watch(`items.${index}.category`)
//     });

//     const { remove: deleteItems } = useFieldArray({
//         control,
//         name: `items`
//     });

//     const selectedCategory = watch(`items.${index}.category`);
//     const matchedCategory = categories?.find(cat => cat.id === Number(selectedCategory));

//     useEffect(() => {
//         setValue(`items.${index}.product_id`, 0);
//         setValue(`items.${index}.inventories`, []);
//     }, [index, selectedCategory, setValue]);

//     const handleProductVariationChange = (selectedItems: any[]) => {
//         const newInventories = selectedItems.reduce((acc: any[], item: any) => {
//             const existingInventory = acc.find(inv => inv.product_inventory_id === item.product_id);
//             if (existingInventory) {
//                 existingInventory.variations.push({
//                     stock_variation_id: item.id,
//                     quantity: 1
//                 });
//             } else {
//                 acc.push({
//                     product_inventory_id: item.product_id,
//                     variations: [{
//                         stock_variation_id: item.id,
//                         quantity: 1
//                     }],
//                     properties: {}
//                 });
//             }
//             return acc;
//         }, []);

//         setValue(`items.${index}.inventories`, newInventories);
//     };

//     const productVariations = products?.flatMap(product => 
//         product.variations.map(variation => ({
//             id: variation.id,
//             name: product.name,
//             variation: variation.size || variation.color || variation.flavour
//         }))
//     ) || [];

//     return (
//         <div className="rounded-md mb-10">
//             <div className="flex items-center gap-2 mb-4 ">
//                 <div className='flex items-center justify-center px-4 py-1.5 bg-yellow-500 max-w-max'>
//                     Item {index + 1}
//                 </div>
//                 <button
//                     onClick={() => deleteItems(index)}
//                     className='flex items-center justify-center px-3 py-1.5 bg-red-500 text-white max-w-max'
//                 >
//                     <TrashIcon size={20} />
//                     <span className="sr-only">Remove</span>
//                 </button>
//             </div>

//             <div className="grid grid-cols-2 xl:grid-cols-3 gap-10 mb-8">
//                 <Controller
//                     name={`items.${index}.category`}
//                     control={control}
//                     render={({ field }) => (
//                         <SelectSingleCombo
//                             {...field}
//                             value={field.value ? field.value.toString() : ''}
//                             label="Item Category"
//                             options={categories?.map(cat => ({ label: cat.name, value: cat.id.toString() })) || []}
//                             valueKey='value'
//                             labelKey="label"
//                             placeholder='Item category'
//                             onChange={(value) => field.onChange(parseInt(value))}
//                             isLoadingOptions={categoriesLoading}
//                             hasError={!!errors.items?.[index]?.category}
//                             errorMessage={errors.items?.[index]?.category?.message}
//                         />
//                     )}
//                 />
//                 <Controller
//                     name={`items.${index}.inventories`}
//                     control={control}
//                     render={({ field }) => (
//                         <ProductVariationSelector
//                             options={productVariations}
//                             onChange={handleProductVariationChange}
//                             label="Product and Variation"
//                             disabled={!selectedCategory || (!productsLoading && !products?.length)}
//                             placeholder={
//                                 (!productsLoading && !products?.length) ?
//                                     'No products found' :
//                                     selectedCategory ?
//                                         'Select product and variation' :
//                                         'Select category first'
//                             }
//                             isLoadingOptions={productsLoading}
//                         />
//                     )}
//                 />
//                 <div>
//                     <label htmlFor="">Quantity</label>
//                     <div className="flex items-center justify-start gap-2 h-14">
//                         <button
//                             type="button"
//                             onClick={() => {
//                                 const newQuantity = watch('items')?.[index].quantity - 1;
//                                 if (newQuantity >= 1) {
//                                     setValue(`items.${index}.quantity`, newQuantity);
//                                 }
//                             }}
//                             className="flex items-center justify-center border border-[#0F172B] text-lg text-center p-2 leading-3"
//                         >
//                             -
//                         </button>
//                         <span className="w-9 text-center">
//                             {watch('items')?.[index].quantity}
//                         </span>
//                         <button
//                             type="button"
//                             onClick={() => {
//                                 const newQuantity = watch('items')?.[index].quantity + 1;
//                                 setValue(`items.${index}.quantity`, newQuantity);
//                             }}
//                             className="flex items-center justify-center border border-[#0F172B] text-lg text-center p-2 leading-3"
//                         >
//                             +
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <EnquiryItemCardAdditionalItems
//                 index={index}
//                 control={control}
//                 register={register}
//                 errors={errors}
//             />
//         </div>
//     );
// };

// export default EnquiryItemsSection;


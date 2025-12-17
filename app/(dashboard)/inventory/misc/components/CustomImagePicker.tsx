import React, { useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Upload } from 'lucide-react';
import { Gallery } from 'iconsax-react';
import FormError from '@/components/ui/formError';

interface CustomImagePickerProps {
    control: Control<any>;
    name: string;
    errors: FieldErrors;
    hasError?: boolean
    errorMessage?: string
}

const CustomImagePicker: React.FC<CustomImagePickerProps> = ({ control, name, hasError, errorMessage }) => {
    const [preview, setPreview] = useState<string | null>(null);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="w-full">
                    <label htmlFor="image-upload" className=" cursor-pointer">
                        <p className="text-xs text-[#1E1E1E] mb-2.5">
                            Add Item Image (800x800)
                            <span className="text-[10px] text-[#909090] ml-0.5">
                                500kb
                            </span>
                        </p>
                        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 bg-[#F8F8F8] transition-colors w-full max-w-[250px] aspect-[5/3]">
                            {(!!field.value && preview) ? (
                                <img src={preview} alt="Preview" className="mx-auto max-h-40 object-contain" />
                            ) : (
                                <div className="text-gray-500">
                                    <div className="flex items-center justify-center p-2 h-14 w-14 bg-[#EAEAEA] rounded-full">

                                        <Gallery className="mx-auto h-5 w-5 text-black" />
                                    </div>
                                    <p className="sr-only">Click or drag file to upload</p>
                                </div>
                            )}
                        </div>
                    </label>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                field.onChange(file);
                                setPreview(URL.createObjectURL(file));
                            }
                        }}
                    />
                    {hasError && <FormError errorMessage={errorMessage || "Required"} />}
                </div>
            )}
        />
    );
};

export default CustomImagePicker;
'use client'

import React, { useState, useRef, ChangeEvent } from 'react'
import { Trash2, Upload } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DocumentUpload } from 'iconsax-react'
import FormError from './formError'
import Image from 'next/image'

interface FilePickerProps {
    title?: string
    label?: string
    maxSize?: number
    acceptedFileTypes?: string[]
    onFileSelect: (file: File | null) => void
    className?: string
    variant?: 'default' | 'preview'
    hasError?: boolean
    errorMessage?: string
    optional?: boolean

}

export default function FilePicker({
    title = "Upload File",
    label,
    maxSize = 5,
    acceptedFileTypes = ["image/*", "application/pdf"],
    onFileSelect,
    className,
    variant = 'default',
    hasError,
    errorMessage,
    optional = false
}: FilePickerProps) {
    const [dragActive, setDragActive] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFiles = (file: File) => {
        if (file.size > maxSize * 1024 * 1024) {
            alert(`File size should not exceed ${maxSize} MB`)
            return
        }
        setSelectedFile(file)
        onFileSelect(file)
    }

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files[0])
        }
    }

    const onButtonClick = () => {
        inputRef.current?.click()
    }

    const handleRemove = () => {
        setSelectedFile(null)
        onFileSelect(null)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    return (
        <div className={cn("w-full", className)}>
            {
                label &&
                <Label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">{label || title}
                    {
                        !optional && <span className="text-red-500"> *</span>
                    }
                </Label>
            }
            <div
                className={cn(
                    "mt-1 flex justify-center border-2 border-dashed rounded-md",
                    dragActive ? "border-primary" : "border-gray-300",
                    hasError ? "border-destructive" : "",
                    variant == 'preview' && "aspect-square max-w-60",
                    "focus-within:outline-none focus-within:border-[1.25px] focus-within:border-solid focus-within:border-[#31A5F9] focus-within:bg-[#E3F2FD]"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <div className="relative flex text-sm text-gray-600 w-full">
                    <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark py-1 px-2 h-14 w-full"
                    >
                        {
                            variant === 'default' && (
                                <div className="flex items-center gap-2 cursor-pointer w-full truncate ">
                                    <DocumentUpload className="h-7 w-7 text-[#2463EB]" />
                                    <div>
                                        <p className="mt-2 text-[0.825rem] font-poppins text-[#2463EB] truncate">
                                            {
                                                selectedFile ? selectedFile.name : `${title} (Max. ${maxSize} MB)`
                                            }

                                        </p>
                                        <p className="mt-1 text-xs text-[#828282]">
                                            Supported file type: {acceptedFileTypes.join(', ')}.
                                        </p>
                                    </div>
                                </div>
                            )
                        }

                        {
                            variant === 'preview' &&

                            <div className="relative w-full max-w-60 aspect-square">
                                {
                                    (selectedFile && selectedFile?.type.startsWith('image/')) ?
                                        <Image
                                            src={URL.createObjectURL(selectedFile)} alt={selectedFile.name}
                                            className="w-full rounded-md object-cover"
                                            fill

                                        />

                                        :
                                        <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-md">
                                            <Upload size={24} />
                                        </div>
                                }
                            </div>
                        }
                        <Button
                            type="button" onClick={handleRemove} variant="destructive" size="sm"
                            className={cn("absolute aspect-square -right-[5%] -top-[30%] mt-2 rounded-full bg-red-100 text-red-400 hover:text-white", !selectedFile && "hidden",
                                variant === 'preview' && "right-2 top-2"
                            )}
                        >
                            <Trash2 size={16} />
                        </Button>
                        <Input
                            id="file-upload"
                            ref={inputRef}
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleChange}
                            accept={acceptedFileTypes.join(',')}
                        />
                    </label>
                </div>

            </div>

            {
                hasError &&
                <FormError errorMessage={errorMessage} />
            }
        </div>
    )
}
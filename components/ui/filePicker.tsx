import React, { useState, useRef, ChangeEvent } from 'react'
import { DocumentUpload } from 'iconsax-react'

import FormError from './formError'
import { Label } from './label'

interface CustomFilePickerProps {
    title: string
    maxSize: number
    supportedFileTypes: string[]
    onFileSelect: (file: File) => void
    hasError?: boolean
    errorMessage?: string

}

export default function FilePicker({
    title = "Proof of Payment",
    maxSize = 2,
    supportedFileTypes = ["JPEG", "PNG", "PDF"],
    onFileSelect,
    hasError,
    errorMessage
}: CustomFilePickerProps) {
    const [dragActive, setDragActive] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

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

    const handleFiles = (file: File) => {
        if (file.size > maxSize * 1024 * 1024) {
            alert(`File size should not exceed ${maxSize} MB`)
            return
        }
        const fileExtension = file.name.split('.').pop()?.toUpperCase()
        if (fileExtension && !supportedFileTypes.includes(fileExtension)) {
            alert(`Unsupported file type. Please upload ${supportedFileTypes.join(', ')}`)
            return
        }
        onFileSelect(file)
    }

    const onButtonClick = () => {
        inputRef.current?.click()
    }



    return (
        <div>
            <div className="w-full max-w-lg mx-auto">
                <Label className="text-sm text-[#0F172B] font-poppins font-medium">{title}</Label>
                <div
                    className={`relative border-2 border-dashed rounded-lg px-4 py-2.5 ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={onButtonClick}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        className="hidden"
                        onChange={handleChange}
                        accept={supportedFileTypes.map(type => `.${type.toLowerCase()}`).join(',')}
                    />
                    <div className="flex items-center gap-2 ">
                        <DocumentUpload className="h-7 w-7 text-[#2463EB]" />
                        <div>
                            <p className="mt-2 text-[0.825rem] font-poppins text-[#2463EB]">
                                Upload {title} (Max. {maxSize} MB)
                            </p>
                            <p className="mt-1 text-xs text-[#828282]">
                                Supported file type: {supportedFileTypes.join(', ')}.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {
                hasError && errorMessage && (
                    <FormError errorMessage={errorMessage} />
                )
            }
        </div>
    )
}
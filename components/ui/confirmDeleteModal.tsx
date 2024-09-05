import React from 'react'

import { Dialog, DialogContent, DialogDescription, DialogFooter, Button, Textarea, DialogHeader, DialogClose, DialogTitle } from '@/components/ui'
import { WarningIcon } from '@/icons/core'
import { X } from '@phosphor-icons/react'

interface ModalProps {
    isModalOpen: boolean
    closeModal: () => void
    deleteFn: () => void
    customDeleteText?: string
    customTitleText?: string
    icon?: React.ReactNode
    heading?: string
    subheading?: string | React.ReactNode

}
const confirmDeleteModal: React.FC<ModalProps> = ({ isModalOpen, closeModal, customDeleteText, customTitleText, icon, heading, subheading, deleteFn }) => {
    return (
        <Dialog open={isModalOpen} >
            <DialogContent onPointerDownOutside={closeModal} className='p-0 !rounded-2xl'>
                <div className="border-b  border-[#E6E6E6] p-6 xl:p-8 !pb-4 xl:pb-5">
                    <DialogTitle className="text-black text-base font-medium">{customTitleText ? customTitleText : "Confirm Action"}</DialogTitle>
                    <DialogClose
                        onClick={closeModal}
                        className="absolute right-4 top-6 rounded-full p-1 opacity-70 transition-opacity hover:opacity-100 bg-[#F2F2F2] focus:outline-none focus:ring-0 focus:ring-ring focus:ring-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                </div>

                <div className="flex flex-col gap-2.5 items-center my-6 p-6 xl:p-8">

                    {
                        icon ??
                        <WarningIcon className="text-[#EB5757]" height={60} width={60} />
                    }
                    <h3 className="text-[#EB5757] text-xl font-semibold mt-2">
                        {
                            heading ?? "Confirm Delete"
                        }
                    </h3>
                    <p className="text-[#828282] text-xs">
                        {
                            subheading ?? "Are you sure you want to delete"
                        }
                    </p>
                </div>

                <DialogFooter className='grid grid-cols-2 p-6 xl:p-8'>
                <Button className="h-14" variant="outline" onClick={closeModal}>
                        No, Cancel
                    </Button>
                    <Button className="h-14 bg-black" onClick={deleteFn}>
                        {customDeleteText ?? "Yes, Delete"}
                    </Button>                  
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default confirmDeleteModal
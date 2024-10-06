import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    Button,
    Textarea,
    DialogHeader,
    DialogClose,
    DialogTitle,
} from "@/components/ui";
import { OrderManagement, OrderTimeLine } from "@/icons/sidebar";
import { cn } from "@/lib/utils";
import { X } from "@phosphor-icons/react";
import { TruckTime } from "iconsax-react";
import Image from "next/image";
import React from "react";

interface ModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    heading?: string;
    subheading?: string | React.ReactNode;
}
const EditDeliveryDetailsModal: React.FC<ModalProps> = ({
    isModalOpen,
    closeModal,
    heading,
    subheading,
}) => {
    return (
        <Dialog open={isModalOpen} >
            <DialogContent
                onPointerDownOutside={closeModal}
                className="p-0 !rounded-2xl w-full md:w-[85vw] max-w-[1024px]"
            >
                <DialogHeader>
                    <div className='flex items-center gap-5  p-4 border-b'>
                        <div className='h-10 w-10 flex items-center justify-center bg-custom-white rounded-full'>
                            <TruckTime className='text-custom-blue' stroke="#194a7a" size={18} />
                        </div>
                        <p className='text-custom-blue font-medium'>Payment Details</p>
                    </div>
                </DialogHeader>
                <DialogClose
                    onClick={closeModal}
                    className="absolute right-4 top-6 rounded-full p-1 opacity-70 transition-opacity hover:opacity-100 bg-[#F2F2F2] focus:outline-none focus:ring-0 focus:ring-ring focus:ring-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </DialogClose>

                <form className="flex flex-col gap-2.5 items-center px-6">

                </form>

                <DialogFooter className="">
                    <div className="w-full flex items-center justify-end gap-5 p-6">
                        <Button className="h-14 w-[200px]" onClick={closeModal} variant="outline">
                            Cancel
                        </Button>
                        <Button className="h-14 w-[200px]" onClick={closeModal} variant="black">
                            Save
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditDeliveryDetailsModal;

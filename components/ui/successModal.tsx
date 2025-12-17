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
import { SuccessConfetti } from "@/icons/core";
import { OrderManagement, OrderTimeLine } from "@/icons/sidebar";
import { cn } from "@/lib/utils";
import { X } from "@phosphor-icons/react";
import Image from "next/image";
import React from "react";

interface ModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  heading?: string;
  subheading?: string | React.ReactNode;
  headingClass?: string
  buttonText?: string;
}
const SuccessModal: React.FC<ModalProps> = ({
  isModalOpen,
  closeModal,
  heading,
  subheading,
  headingClass,
  buttonText,
}) => {
  return (
    <Dialog open={isModalOpen}> 
      <DialogContent
        onPointerDownOutside={closeModal}
        className="p-0 !rounded-2xl w-[569px]"
      >
        <div className="border-b border-[#E6E6E6] p-6 xl:p-8 !pb-4 xl:pb-5 h-[80px]">
          <DialogClose
            onClick={closeModal}
            className="absolute right-4 top-6 rounded-full p-1 opacity-70 transition-opacity hover:opacity-100 bg-[#F2F2F2] focus:outline-none focus:ring-0 focus:ring-ring focus:ring-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <div className="flex flex-col gap-2.5 items-center px-6">
          <SuccessConfetti width={265} height={140} />
          <h3 className={cn("text-[#1E1E1E] text-xl font-medium mt-2 text-center", headingClass)}>
            {heading ?? "Success!"}
          </h3>
          <p className="text-[#828282] text-xs">
            {subheading ?? ""}
          </p>
        </div>

        <DialogFooter className="">
          <div className="w-full flex justify-center p-6">
            <Button className="h-14 w-[216px] bg-black" onClick={closeModal}>
              {
                buttonText ?? "Okay"
              }
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;

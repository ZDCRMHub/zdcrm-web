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
  Spinner,
} from "@/components/ui";
import { OrderManagement, OrderTimeLine } from "@/icons/sidebar";
import { X } from "@phosphor-icons/react";
import React from "react";

interface ModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  confirmFn: () => void;
  cancelAction?: () => void;
  isConfirming?: boolean;
  customConfirmText?: string;
  customCancelText?: string;
  customTitleText?: string;
  icon?: React.ReactNode;
  heading?: string;
  subheading?: string | React.ReactNode;
}
const ConfirmActionModal: React.FC<ModalProps> = ({
  isModalOpen,
  closeModal,
  customConfirmText,
  customCancelText,
  customTitleText,
  cancelAction,
  isConfirming,
  icon,
  heading,
  subheading,
  confirmFn,
}) => {
  return (
    <Dialog open={isModalOpen}>
      <DialogContent
        onPointerDownOutside={closeModal}
        className="p-0 !rounded-2xl max-w-[500px]"
      >
        <div className="border-b  border-[#E6E6E6] p-6 xl:p-8 !pb-4 xl:pb-5">
          <DialogTitle className="text-black text-base font-medium">
            {customTitleText ? customTitleText : "Confirm Action"}
          </DialogTitle>
          <DialogClose
            onClick={closeModal}
            className="absolute right-4 top-6 rounded-full p-1 opacity-70 transition-opacity hover:opacity-100 bg-[#F2F2F2] focus:outline-none focus:ring-0 focus:ring-ring focus:ring-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <div className="flex flex-col gap-2.5 items-center my-6 p-6 xl:p-8">
          {icon ?? (
            <OrderTimeLine className="text-[#4A9725]" height={55} width={55} />
          )}
          <h3 className="text-[#194A7A] text-xl font-semibold mt-2">
            {heading ?? "Confirm Action"}
          </h3>
          <p className="text-[#828282] text-xs text-center text-balance">
            {subheading ?? "Click confirm button to confirm action"}
          </p>
        </div>

        <DialogFooter className="grid grid-cols-2 gap-5 p-6 pt-2 xl:p-8 xl:pt-2">
          <Button className="flex items-center h-14 bg-black" onClick={confirmFn}>
            {customConfirmText ?? "Confirm"}
            {
              isConfirming && <Spinner className="ml-2" size={20} />
            }
          </Button>
          <Button className="h-14" variant="outline"
            onClick={
              () => {
                cancelAction && cancelAction();
                closeModal();
              }
            }
          >
            {customCancelText ?? "No, Cancel"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmActionModal;

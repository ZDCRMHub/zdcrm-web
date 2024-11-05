import {
  Dialog,
  DialogContent,
  DialogFooter,
  Button,
  DialogClose,
  DialogTitle,
  Input,
  SuccessModal,
} from "@/components/ui";
import { OrderTimeLine } from "@/icons/sidebar";
import { X } from "@phosphor-icons/react";

interface ModalProps {
  isSuccessModalOpen: boolean;
  isModalOpen: boolean;
  closeBitcoinModal: () => void;
  nextStep: () => void;
  customConfirmText?: string;
  customTitleText?: string;
  icon?: React.ReactNode;
  heading?: string;
  subheading?: string | React.ReactNode;
  value?: string;
}

const ConfirmBitcoinModal: React.FC<ModalProps> = ({
  isSuccessModalOpen,
  isModalOpen,
  closeBitcoinModal,
  customConfirmText,
  customTitleText,
  icon,
  heading,
  subheading,
  nextStep,
  value,
}) => {

  const handleConfirm = () => {
    console.log(`Confirmed action`);
  };

  return (
    <Dialog open={isModalOpen}>
      <DialogContent
        onPointerDownOutside={closeBitcoinModal}
        className="p-0 !rounded-2xl"
      >
        <div className="border-b  border-[#E6E6E6] p-6 xl:p-8 !pb-4 xl:pb-5">
          <DialogTitle className="text-black text-base font-medium">
            {customTitleText ? customTitleText : "Confirm Action"}
          </DialogTitle>
          <DialogClose
            onClick={closeBitcoinModal}
            className="absolute right-4 top-6 rounded-full p-1 opacity-70 transition-opacity hover:opacity-100 bg-[#F2F2F2] focus:outline-none focus:ring-0 focus:ring-ring focus:ring-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <div className="flex flex-col gap-2.5 items-center p-6 my-0 xl:p-8 pb-0">
          {icon ?? (
            <OrderTimeLine className="text-[#4A9725]" height={55} width={55} />
          )}
          <h3 className="text-[#194A7A] text-xl font-semibold mt-2">
            {heading ?? "Confirm Action"}
          </h3>
          <p className="text-[#828282] text-xs">
            {subheading ?? "Click confirm button to confirm action"}
          </p>
        </div>

        <div className="w-full max-w-[350px] mx-auto">
          <Input
            className="h-14 mx-auto mb-5 border border-solid border-[#31A5F980] bg-[#E3F2FD]"
            value={
              value == "paid_bitcoin"
                ? "Bitcoin"
                : value == "paid_usd_transfer"
                ? "USD Transfer"
                : "Paypal"
            }
            disabled
          />
          <div>
            <p className="mb-3 text-sm">
              Amount Paid{" "}
              {value == "paid_bitcoin"
                ? "(Bitcoin)"
                : value == "paid_usd_transfer"
                ? "(USD Transfer)"
                : "(Paypal)"}
            </p>
            <Input
              className="h-14 mx-auto"
              type="number"
            />
          </div>
        </div>

        <DialogFooter className="grid grid-cols-2 p-6 xl:p-8">
          <Button className="h-14 bg-black" onClick={nextStep}>
            {customConfirmText ?? "Confirm"}
          </Button>
          <Button
            className="h-14"
            variant="outline"
            onClick={closeBitcoinModal}
          >
            No, Cancel
          </Button>
        </DialogFooter>
      </DialogContent>

      <SuccessModal
        closeModal={handleConfirm}
        isModalOpen={isSuccessModalOpen}
        heading='Order Approved!'
        subheading='Enquiry has been approved as an order'
      />
    </Dialog>
  );
};

export default ConfirmBitcoinModal;

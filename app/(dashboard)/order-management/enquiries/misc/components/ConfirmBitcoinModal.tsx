import {
  Dialog,
  DialogContent,
  DialogFooter,
  Button,
  DialogClose,
  DialogTitle,
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
  Input,
} from "@/components/ui";
import { OrderTimeLine } from "@/icons/sidebar";
import { X } from "@phosphor-icons/react";

interface ModalProps {
  isModalOpen: boolean;
  closeBitcoinModal: () => void;
  nextStep: () => void;
  customConfirmText?: string;
  customTitleText?: string;
  icon?: React.ReactNode;
  heading?: string;
  subheading?: string | React.ReactNode;
  value?: string ;
}

const ConfirmBitcoinModal: React.FC<ModalProps> = ({
  isModalOpen,
  closeBitcoinModal,
  customConfirmText,
  customTitleText,
  icon,
  heading,
  subheading,
  nextStep,
  value
}) => {
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

        {/* <Select value={selectedPaymentMethod}>
          <SelectTrigger className="w-[90%] max-w-[350px] h-14 mx-auto mb-4">
            <SelectValue placeholder="Select payment Method" />
          </SelectTrigger>
          <SelectContent className="px-8">
            {paymentOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                onClick={() => setSelectedPaymentMethod(option.value)}
                className="py-2 my-1 hover:!bg-primary hover:!text-white cursor-pointer rounded-lg border hover:border-transparent"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
        <div className="w-[90%] max-w-[350px] mx-auto">
          <Input className="w-[90%] max-w-[350px] h-14 mx-auto mb-5" value={value} disabled />
          <div>
            <p className="pl-4 mb-3">Amount Paid (Bitcoin)</p>
            <Input className="w-[90%] max-w-[350px] h-14 mx-auto" type="number" />
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
    </Dialog>
  );
};

export default ConfirmBitcoinModal;

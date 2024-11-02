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
} from "@/components/ui";
import { paymentOptions } from "@/constants";
import { useBooleanStateControl } from "@/hooks";
import { OrderManagement, OrderTimeLine } from "@/icons/sidebar";
import { X } from "@phosphor-icons/react";
import React from "react";
import ConfirmBitcoinModal from "./ConfirmBitcoinModal";

interface ModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  nextStep: () => void;
  customConfirmText?: string;
  customTitleText?: string;
  icon?: React.ReactNode;
  heading?: string;
  subheading?: string | React.ReactNode;
}
const ConfirmPaymentModal: React.FC<ModalProps> = ({
  isModalOpen,
  closeModal,
  customConfirmText,
  customTitleText,
  icon,
  heading,
  subheading,
  nextStep,
}) => {
  // export const paymentOptions = [
  //     { label: "Not Paid (But Go Ahead)", value: "not_paid_go_ahead" },
  //     { label: "Paid (Website Card)", value: "paid_website_card" },
  //     { label: "Paid (Naira Transfer)", value: "paid_naira_transfer" },
  //     { label: "Paid (POS)", value: "paid_pos" },
  //     { label: "Paid (USD Transfer)", value: "paid_usd_transfer" },
  //     { label: "Paid (Paypal)", value: "paid_paypal" },
  //     { label: "Cash Paid", value: "cash_paid" },
  //     { label: "Part Payment", value: "part_payment" },
  //     { label: "Paid (Bitcoin)", value: "paid_bitcoin" },
  //     { label: "Not Received (Paid)", value: "not_received_paid" }
  //   ];

  ////TODO
  //create modal for the three payment options
  //if selected payment option is not bitcoin/usd/paypal etc, just call nextStep() which opens the success modal
  ///else open the respective modals

  const {
    state: isConfirmBitcoinModalOpen,
    setTrue: openConfirmBitcoinModal,
    setFalse: closeConfirmBitcoinModal,
  } = useBooleanStateControl();
  const {
    state: isConfirmPartPaymentModalOpen,
    setTrue: openConfirmPartPaymentModal,
    setFalse: closeConfirmPartPaymentModal,
  } = useBooleanStateControl();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<
    string | undefined
  >(undefined);

  const submit = () => {
    console.log(selectedPaymentMethod);
    if (
      selectedPaymentMethod == "paid_bitcoin" ||
      "paid_paypal" ||
      "paid_usd_transfer"
    ) {
      openConfirmBitcoinModal();
      closeModal();
      console.log(selectedPaymentMethod);
    } else if (selectedPaymentMethod == "part_payment") {
      openConfirmPartPaymentModal();
    } else if (
      selectedPaymentMethod == "not_paid_go_ahead" ||
      "paid_website_card" ||
      "paid_naira_transfer" ||
      "paid_pos" ||
      "cash_paid" ||
      "not_received_paid"
    ) {
      nextStep();
    }
  };

  return (
    <Dialog open={isModalOpen}>
      <DialogContent
        onPointerDownOutside={closeModal}
        className="p-0 !rounded-2xl"
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

        <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} >
          <SelectTrigger className="w-[90%] max-w-[350px] h-14 mx-auto mb-4">
            <SelectValue placeholder="Select payment Method" />
          </SelectTrigger>
          <SelectContent className="px-8">
            {paymentOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                // onClick={() => setSelectedPaymentMethod(option.value)}
                className="py-2 my-1 hover:!bg-primary hover:!text-white cursor-pointer rounded-lg border hover:border-transparent"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DialogFooter className="grid grid-cols-2 p-6 xl:p-8">
          <Button className="h-14 bg-black" onClick={submit}>
            {customConfirmText ?? "Confirm"}
          </Button>
          <Button className="h-14" variant="outline" onClick={closeModal}>
            No, Cancel
          </Button>
        </DialogFooter>
      </DialogContent>

      <ConfirmBitcoinModal
        isModalOpen={isConfirmBitcoinModalOpen}
        closeBitcoinModal={closeConfirmBitcoinModal}
        nextStep={nextStep}
        value={selectedPaymentMethod}
        heading="Client made payment"
        subheading="This action converts Enquiries to Order"
      />
    </Dialog>
  );
};

export default ConfirmPaymentModal;

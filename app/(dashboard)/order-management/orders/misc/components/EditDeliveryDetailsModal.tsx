import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogClose,
    Button,
    Textarea,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Input,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    SelectSingleCombo,
    SingleDatePicker,
    TimePicker,
} from "@/components/ui";
import { X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TruckTime } from "iconsax-react";

const schema = z.object({
    deliveryNote: z.string().min(1, "Delivery note is required"),
    deliveryMethod: z.string().min(1, "Delivery method is required"),
    deliveryAddress: z.string().min(1, "Delivery address is required"),
    deliveryZone: z.string().min(1, "Delivery zone is required"),
    deliveryDate: z.date(),
    dispatchTime: z.string().min(1, "Dispatch time is required"),
});

type FormData = z.infer<typeof schema>;

interface ModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
}

const EditDeliveryDetailsModal: React.FC<ModalProps> = ({
    isModalOpen,
    closeModal,
}) => {
    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            deliveryNote: "Deliver in person",
            deliveryMethod: "Dispatch",
            deliveryAddress: "No. 6, Adeniran close, Ikeja",
            deliveryZone: "Lagos Mainland (LM)",
            deliveryDate: new Date(),
            dispatchTime: "10:00 AM",
        },
    });

    const onSubmit = (data: FormData) => {
        closeModal();
    };

    return (
        <Dialog open={isModalOpen}>
            <DialogContent
                onPointerDownOutside={closeModal}
                className="p-0 !rounded-2xl w-full md:w-[85vw] max-w-[1024px]"
            >
                <DialogHeader>
                    <div className="flex items-center gap-5 p-4 border-b">
                        <div className="h-10 w-10 flex items-center justify-center bg-custom-white rounded-full">
                            <TruckTime className="text-custom-blue" size={18} />
                        </div>
                        <p className="text-custom-blue font-medium">Delivery Details</p>
                    </div>
                </DialogHeader>
                <DialogClose
                    onClick={closeModal}
                    className="absolute right-4 top-6 rounded-full p-1 opacity-70 transition-opacity hover:opacity-100 bg-[#F2F2F2] focus:outline-none focus:ring-0 focus:ring-ring focus:ring-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </DialogClose>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-8 py-6">
                        <FormField
                            control={form.control}
                            name="deliveryNote"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className=""
                                            label="Delivery Note"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="deliveryMethod"
                                render={({ field }) => (
                                    <FormItem>
                                        <SelectSingleCombo
                                            label="Delivery Method"
                                            options={[
                                                { value: "Dispatch", label: "Dispatch" },
                                                { value: "Pickup", label: "Pickup" },
                                            ]}
                                            {...field}
                                            valueKey={"value"}
                                            labelKey={"label"}
                                            placeholder="Select delivery method"

                                        />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="deliveryAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className=""
                                                label="Delivery Address"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="deliveryZone"
                                render={({ field }) => (
                                    <FormItem>
                                        <SelectSingleCombo
                                            label="Delivery Zone"
                                            options={[
                                                { value: "Lagos Mainland (LM)", label: "Lagos Mainland (LM)" },
                                                { value: "Lagos Central (LC)", label: "Lagos Central (LC)" },
                                                { value: "Lagos Island (LI)", label: "Lagos Island (LI)" },
                                            ]}
                                            {...field}
                                            valueKey={"value"}
                                            labelKey={"label"}
                                            placeholder="Select delivery zone"

                                        />

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="deliveryDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <SingleDatePicker
                                            label="Delivery Date"
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Select delivery date"
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dispatchTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <TimePicker
                                            name="dispatchTime"
                                            label="Dispatch Time"
                                            control={form.control}
                                        />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>

                <DialogFooter className="p-6">
                    <Button className="h-14 w-[200px]" onClick={closeModal} variant="outline">
                        Cancel
                    </Button>
                    <Button className="h-14 w-[200px]" onClick={form.handleSubmit(onSubmit)} variant="default">
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditDeliveryDetailsModal;
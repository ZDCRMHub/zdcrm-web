import React from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import Image from "next/image";
import { Card } from "@/components/ui";
import { formatCurrency } from "@/utils/currency";
import { format } from "date-fns";
import { TOrder } from "../types";

interface ModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    order: TOrder; // Replace 'any' with your actual order type
}

const OrderSummaryExportModal: React.FC<ModalProps> = ({
    isModalOpen,
    closeModal,
    order,
}) => {
    if (!order) return null;

    const subtotal = order.items.reduce((acc: number, item: any) => acc + (item.quantity * (item.inventories[0]?.variations[0]?.variation_details?.cost_price || 0)), 0);
    const total = Number(order.total_amount);
    const deliveryFee = Number(order.delivery.dispatch?.delivery_price) || 0;
    // const discount = order.discount?.amount || 0;
    const discount =  0;
    const tax = total - subtotal - deliveryFee + discount;

    return (
        <Dialog open={isModalOpen}>
            <DialogContent
                onPointerDownOutside={closeModal}
                className="flex flex-col items-center justify-center p-0 !rounded-2xl min-w-full lg:min-w-[50%] max-w-[600px] max-h-[90vh] overflow-y-auto"
            >
                <DialogClose
                    onClick={closeModal}
                    className="rounded-full p-2 hover:bg-gray-100 focus:outline-none"
                >
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close</span>
                </DialogClose>

                <Card className="shadow-md w-[450px] text-[0.7rem] rounded-none">
                    <header className="flex items-center gap-4 bg-[#194A7A] text-white p-4">
                        <div className="flex items-center justify-center bg-white p-2 rounded-md">
                            <Image src='/img/logo.svg' alt='logo' width={40} height={32} />
                        </div>

                        <div className="text-right font-poppins">
                            <h2 className="text-xl font-semibold">{order.branch.name}</h2>
                            <p className="text-xs text-balance">113 Freeman St, Adekunle 101223, Lagos, Nigeria, Lagos, Lagos State</p>
                            <p className="text-xs font-medium">zuzudelight@gmail.com | +234 8154354433</p>
                        </div>
                    </header>

                    <div className="px-4 py-6">
                        <div className="flex justify-between mb-6">
                            <div>
                                <h3 className="font-medium text-[0.625rem] text-[#113770]">BILLED TO:</h3>
                                <p className="text-[#545B6A] text-sm">{order.customer.name}</p>
                                <p className="text-[#8E8E8E] text-[0.625rem]">Phone Number: {" "}
                                    <span className="text-[#0F172B] font-medium">
                                        {order.customer.phone}
                                    </span>
                                </p>
                                <p className="text-[#8E8E8E] text-[0.625rem]">Delivery Address: {" "}
                                    <span className="text-[#0F172B] font-medium">
                                        {order.delivery.address}
                                    </span>
                                </p>
                            </div>
                            <div className="text-right">
                                <p>Order ID: {order.order_number}</p>
                                <p>Issued Date: {format(new Date(order.create_date), 'yyyy-MM-dd')}</p>
                            </div>
                        </div>

                        <div className="mb-6 font-poppins">
                            <h3 className="font-medium text-[0.625rem] text-[#113770]">PAY INTO:</h3>

                            <p className="text-[#545B6A] text-[0.65rem]">
                                Bank Name: {" "}
                                <span className="font-medium">
                                    9 Payment Service Bank (9PSB)
                                </span>
                            </p>

                            <p className="text-[#545B6A] text-[0.65rem]">
                                Account Name: {" "}
                                <span className="font-medium">
                                    Zuzu delight
                                </span>
                            </p>

                            <p className="text-[#545B6A] text-[0.65rem]">
                                Account Number: {" "}
                                <span className="font-medium">
                                    000222999111
                                </span>
                            </p>

                        </div>

                        <table className="w-full mb-6 rounded-t-xl overflow-hidden">
                            <thead className="bg-[#194A7A] text-white">
                                <tr className=" overflow-hidden">
                                    <th className="py-2 px-4 text-left rounded-tl-2xl">Description</th>
                                    <th className="py-2 px-4 text-center">Qty</th>
                                    <th className="py-2 px-4 text-right">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item: any, index: number) => (
                                    <tr key={index} className="border-b text-[0.625rem]">
                                        <td className="py-2 px-4">{item.product.name}</td>
                                        <td className="py-2 px-4 text-center">{item.quantity}</td>
                                        <td className="py-2 px-4 text-right">{formatCurrency(item.inventories[0]?.variations[0]?.variation_details?.cost_price || 0, 'NGN')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex justify-end">
                            <div className="w-full divide-y">
                                <div className="flex justify-between py-1.5 px-4">
                                    <span className="text-[#8E8E8E]">Sub total</span>
                                    <span>{formatCurrency(subtotal, 'NGN')}</span>
                                </div>
                                <div className="flex justify-between py-1.5 px-4">
                                    <span className="text-[#8E8E8E]">Tax</span>
                                    <span>{formatCurrency(tax, 'NGN')}</span>
                                </div>
                                <div className="flex justify-between py-1.5 px-4">
                                    <span className="text-[#8E8E8E]">Discount</span>
                                    <span className="text-red-500">-{formatCurrency(discount, 'NGN')}</span>
                                </div>
                                <div className="flex justify-between pt-1.5 pb-5 px-4">
                                    <span className="text-[#8E8E8E]">Delivery Fee</span>
                                    <span>{formatCurrency(deliveryFee, 'NGN')}</span>
                                </div>
                                <div className="flex justify-between font-semibold text-lg border-t border-t-[#31A5F9] pt-2 mt-3">
                                    <span>Total</span>
                                    <span>{formatCurrency(total, 'NGN')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <DialogFooter className="px-6 py-4 bg-gray-50">
                    <div className="w-full flex justify-center gap-4">
                        <Button className="h-14 w-[216px]" onClick={closeModal} variant="outline">
                            Download
                        </Button>
                        <Button className="h-14 w-[216px] bg-black" onClick={closeModal}>
                            Share
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent >
        </Dialog >
    );
};

export default OrderSummaryExportModal;


'use client'
import React from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { UserCheck, Phone, Calendar } from "lucide-react";

import { Card, CardContent, CardTitle, Spinner } from "@/components/ui";
import { Button } from "@/components/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useBooleanStateControl } from '@/hooks';
import { useQueryClient } from '@tanstack/react-query';

import OrderDiscussCardNewNoteModal from './OrderDiscussCardNewNoteModal';
import {  TOrder, TOrderDiscussion } from '../types';
import {  useUpdateOrderStatus } from '../api';


interface OrderDiscussCardProps {
    discussions: TOrderDiscussion[] | undefined
    isExpanded?: boolean;
    hideOtherDetails?: boolean;
    type?: 'order' | 'order';
    order?: TOrder
    refetch: () => void;
}
const OrderDiscussCard = ({ discussions, refetch, isExpanded = false, hideOtherDetails = false, type = "order", order }: OrderDiscussCardProps) => {
    const {
        state: isModalOpen,
        setTrue: openModal,
        setFalse: closeModal,
        setState: setModalState
    } = useBooleanStateControl();

    const [isOpen, setIsOpen] = React.useState(isExpanded);
    const { mutate, isPending } = useUpdateOrderStatus(order?.id);
    const queryClient = useQueryClient();

    const updateOrderStatus = (new_status: "PND" | "SOA" | "SOR" | "STD" | "COM" | "CAN") => {
        mutate({ id: order?.id || 0, status: new_status }, {
            onSuccess: () => {
                toast.success("Order status updated successfully");
                queryClient.invalidateQueries({
                    queryKey: ['order-details']
                });
            }
        });

    }
    return (
        <Card className={cn("mb-4 border border-[#194A7A] bg-[#f4f6f3] !rounded-md", !isOpen && "py-3")}>
            <Accordion
                type="single"
                collapsible
                value={isOpen ? 'item-1' : ''}
                onValueChange={(value) => setIsOpen(value === 'item-1')}
            >
                <AccordionItem value="item-1" className='!border-none !outline-none'>
                    <AccordionTrigger className="hover:no-underline px-6 py-4 no-underline !border-none">
                        <div className='grow grid grid-cols-[1fr,0.35fr] gap-5'>
                            <CardTitle className='text-[#194A7A] font-semibold text-[1.35rem] text-left no-underline'>
                                {discussions?.[discussions?.length - 1].message}
                            </CardTitle>

                            {!isOpen && (
                                <div className="flex items-center justify-between gap-x-2.5 pr-4 flex-wrap">
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <div className="flex items-center justify-center w-6 h-6 bg-[#FFF1C2] rounded-full -left-[25px] top-2">
                                            <UserCheck size={13} className="text-[#25272B]" />
                                        </div>
                                        <span>{discussions?.[discussions?.length - 1].user.name}</span>
                                    </div>
                                    <p className='text-xs text-[#F84343] shrink-0'>
                                        {format(discussions?.[discussions?.length - 1].create_date || 0, 'hh:mm a')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <CardContent className='flex items-start pt-4'>
                            <section className='flex-[2]'>

                                {
                                    discussions && discussions?.length && (
                                        <ul className="space-y-2 pl-4 border-l-2 border-gray-200">
                                            {
                                                discussions?.map((event: any, index: number) => (
                                                    <li key={index} className="grid grid-cols-[1fr,0.3fr] lg:flex items-center gap-4 lg:gap-8 relative">
                                                        <section>
                                                            <div className="absolute flex items-center justify-center w-5 h-5 bg-[#6B6D70] rounded-full -left-[25px] top-2">
                                                                <Phone size={14} className="text-white" />
                                                            </div>
                                                            <p className="font-medium">{event.message}</p>
                                                            {/* <p className="text-sm text-gray-500">{event.details}</p> */}
                                                        </section>
                                                        <div className="flex items-center gap-x-2.5 flex-wrap">
                                                            <div className="flex items-center space-x-2 text-sm text-gray-500 ">
                                                                <div className="flex items-center justify-center w-6 h-6 bg-[#FFF1C2] rounded-full -left-[25px] top-2">
                                                                    <UserCheck size={13} className="text-[#25272B]" />
                                                                </div>
                                                                <span>{event.user.name}</span>
                                                            </div>
                                                            <p className='text-xs text-[#F84343]'>
                                                                {format(event.create_date.split("+")[0], 'hh:mm a')}
                                                            </p>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    )
                                }
                            </section>
                            {
                                !hideOtherDetails &&
                                <div className="flex items-center gap-4">
                                    <Button variant="outline" onClick={openModal}><Calendar size={16} /> + Add Note</Button>
                                    {
                                        !!order && order?.status !== 'CON' && order?.status !== 'DEL' && (
                                            <Select
                                                defaultValue={order?.status}
                                                onValueChange={(value) => updateOrderStatus(value as any)}
                                            >
                                                <SelectTrigger className="max-w-[200px] text-sm min-w-[150px]">
                                                    <SelectValue placeholder="Status" />
                                                    {
                                                        isPending && <Spinner size={17} />
                                                    }
                                                </SelectTrigger>
                                                <SelectContent>

                                                    <SelectItem value="PND">Payment Made</SelectItem>
                                                    <SelectItem value="SOA">SOA</SelectItem>
SOR                                                    <SelectItem value="STD">Sent to Dispatch</SelectItem>
                                                    <SelectItem value="DEL">Delivered</SelectItem>
                                                    <SelectItem value="CAN">Cancelled</SelectItem>

                                                </SelectContent>
                                            </Select>
                                        )
                                    }

                                </div>
                            }
                        </CardContent>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <OrderDiscussCardNewNoteModal
                order_id={order?.id || 0}
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                setModalOpen={setModalState}
            />
        </Card>
    );
};

export default OrderDiscussCard;
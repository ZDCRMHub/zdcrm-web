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
import { useUpdateOrderStatus } from '@/app/(dashboard)/order-management/misc/api';

import AddNewNoteModal from './AddNewNoteModal';
import { TOrderTimeItem } from '../api/geTOrderTimeline';


const OrderTimelineCard = ({ order, isExpanded = false, hideOtherDetails = false }: { order: TOrderTimeItem; isExpanded?: boolean; hideOtherDetails?: boolean }) => {
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
        mutate({ id: order?.order || 0, status: new_status }, {
            onSuccess: () => {
                toast.success("Order status updated successfully");
                queryClient.invalidateQueries({
                    queryKey: ['order-timeline-list']
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
                            <CardTitle className='text-[#194A7A] font-semibold text-[1.125rem] text-left no-underline'>
                                {order.message}
                            </CardTitle>

                            {!isOpen && (
                                <div className="flex items-center justify-between gap-x-2.5 pr-4 flex-wrap">
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <div className="flex items-center justify-center w-6 h-6 bg-[#FFF1C2] rounded-full -left-[25px] top-2">
                                            <UserCheck size={13} className="text-[#25272B]" />
                                        </div>
                                        <span>{order.user?.name}</span>
                                    </div>
                                    <p className='text-[0.675rem] text-[#F84343] shrink-0'>
                                        {format(order.create_date, 'dd/MM/yyyy hh:mm a')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <CardContent className='flex items-start pt-4'>
                            <section className='flex-[2]'>

                                {order.other_discussions.length > 0 && (
                                    <ul className="space-y-2 pl-4 border-l-2 border-gray-200">
                                        {order.other_discussions.map((discussion, index: number) => (
                                            <li key={index} className="grid grid-cols-[1fr,0.3fr] lg:flex items-center gap-4 lg:gap-8 relative">
                                                <section>
                                                    <div className="absolute flex items-center justify-center w-5 h-5 bg-[#6B6D70] rounded-full -left-[25px] top-2">
                                                        <Phone size={14} className="text-white" />
                                                    </div>
                                                    <p className="font-medium">{discussion.message} </p>
                                                </section>
                                                <div className="flex items-center gap-x-2.5 flex-wrap">
                                                    <div className="flex items-center space-x-2 text-sm text-gray-500 ">
                                                        <div className="flex items-center justify-center w-6 h-6 bg-[#FFF1C2] rounded-full -left-[25px] top-2">
                                                            <UserCheck size={13} className="text-[#25272B]" />
                                                        </div>
                                                        <span>{discussion.user?.name}</span>
                                                    </div>
                                                    <p className='text-[0.675rem] text-[#F84343] shrink-0'>
                                                        {format(order.create_date, 'dd/MM/yyyy hh:mm a')}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                            {
                                !hideOtherDetails &&
                                <div className="flex items-center gap-4">
                                    <Button variant="outline" onClick={openModal}><Calendar size={16} /> + Add Note</Button>
                                    <Select defaultValue={order?.order_details?.status?.toString()} onValueChange={(value) => updateOrderStatus(value as any)}>
                                        <SelectTrigger className="max-w-[200px] text-sm min-w-[150px]">
                                            <SelectValue placeholder="Status" />
                                            {
                                                isPending && <Spinner />
                                            }
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PND">Pending</SelectItem>
                                            <SelectItem value="SOA">SOA</SelectItem>
                                            <SelectItem value="SOR">Sorted</SelectItem>
                                            <SelectItem value="STD">Sent to Dispatch</SelectItem>
                                            <SelectItem value="COM">Delivered</SelectItem>
                                            <SelectItem value="DEL">Delivered</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            }
                        </CardContent>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <AddNewNoteModal isModalOpen={isModalOpen} closeModal={closeModal} setModalOpen={setModalState} order_id={order.order} />
        </Card>
    );
};

export default OrderTimelineCard;
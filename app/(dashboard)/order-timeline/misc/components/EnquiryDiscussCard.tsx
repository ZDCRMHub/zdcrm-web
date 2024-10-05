'use client'
import React from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui";
import { Button } from "@/components/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui";
import { UserCheck, Phone, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import AddNewNoteModal from './AddNewNoteModal';
import { useBooleanStateControl } from '@/hooks';
import { TDiscusssion } from './Timeline';
import { format } from 'date-fns';

const EnquiryDiscussCard = ({ order, isExpanded = false, hideOtherDetails = false }: { order: TDiscusssion; isExpanded?: boolean; hideOtherDetails?: boolean }) => {
    const {
        state: isModalOpen,
        setTrue: openModal,
        setFalse: closeModal,
        setState: setModalState
    } = useBooleanStateControl();

    const [isOpen, setIsOpen] = React.useState(isExpanded);

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
                        <div className='grow grid grid-cols-[1fr,0.35fr]'>
                            <CardTitle className='text-[#194A7A] font-semibold text-[1.35rem] text-left no-underline'>
                                {order.customerName} just {order.action} {order.type !== 'enquiry' && order.orderId}
                            </CardTitle>

                            {!isOpen && (
                                <div className="flex items-center justify-between gap-4 pr-4">
                                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                                        <div className="flex items-center justify-center w-6 h-6 bg-[#FFF1C2] rounded-full -left-[25px] top-2">
                                            <UserCheck size={13} className="text-[#25272B]" />
                                        </div>
                                        <span>{order.agent}</span>
                                    </div>
                                    <p className='text-xs text-[#F84343]'>
                                        {format(order.time, 'hh:mm a')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <CardContent className='flex items-start pt-4'>
                            <section className='flex-[2]'>
                                <div className="flex items-center gap-4 pr-4">
                                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                                        <div className="flex items-center justify-center w-6 h-6 bg-[#FFF1C2] rounded-full -left-[25px] top-2">
                                            <UserCheck size={13} className="text-[#25272B]" />
                                        </div>
                                        <span>{order.agent}</span>
                                    </div>
                                    <p className='text-xs text-[#F84343]'>
                                        {format(order.time, 'hh:mm a')}
                                    </p>
                                </div>
                                {order.timeline.length > 0 && (
                                    <ul className="space-y-2 pl-4 border-l-2 border-gray-200">
                                        {order.timeline.map((event: any, index: number) => (
                                            <li key={index} className="relative">
                                                <div className="absolute flex items-center justify-center w-5 h-5 bg-[#6B6D70] rounded-full -left-[25px] top-2">
                                                    <Phone size={14} className="text-white" />
                                                </div>
                                                <p className="font-medium">{event.agent} {event.action}</p>
                                                <p className="text-sm text-gray-500">{event.details}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                            {
                                !hideOtherDetails &&
                                <div className="flex items-center gap-4">
                                    <Button variant="outline" onClick={openModal}><Calendar size={16} /> + Add Note</Button>
                                    <Select defaultValue={order.type == 'enquiry' ? 'Still Discussing' : 'Payment Made'}>
                                        <SelectTrigger className="max-w-[200px] text-sm min-w-[150px]">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {order.type === 'enquiry' ? (
                                                <>
                                                    <SelectItem value="Still Discussing">Still Discussing</SelectItem>
                                                    <SelectItem value="Finalized Discussion">Finalized Discussion</SelectItem>
                                                </>
                                            ) : (
                                                <>
                                                    <SelectItem value="Payment Made">Payment Made</SelectItem>
                                                    <SelectItem value="SOA">SOA</SelectItem>
                                                    <SelectItem value="Sorted">Sorted</SelectItem>
                                                    <SelectItem value="Sent to Dispatch">Sent to Dispatch</SelectItem>
                                                    <SelectItem value="DIS CL">DIS CL</SelectItem>
                                                    <SelectItem value="Delivered">Delivered</SelectItem>
                                                </>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                            }
                        </CardContent>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <AddNewNoteModal isModalOpen={isModalOpen} closeModal={closeModal} setModalOpen={setModalState} />
        </Card>
    );
};

export default EnquiryDiscussCard;
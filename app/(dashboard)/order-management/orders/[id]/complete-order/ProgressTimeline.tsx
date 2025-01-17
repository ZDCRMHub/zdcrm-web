import { cn } from '@/lib/utils';
import React, { useEffect } from 'react';
import { useBooleanStateControl } from '@/hooks';
import { AddDeliveryNoteModal } from '../../../misc/components';
import { useUpdateDeliveryStatus } from '../../../misc/api';
import { Button } from '@/components/ui';
import { Check, X } from 'lucide-react';
import { TOrder } from '../../../misc/types';

interface Props {
    orderId: number;
    orderNumber: string;
    currentStatus: "PND" | "DIS" | "DSC" | "DEL" | "CAN";
    onDelivered?: () => void;
    order: TOrder;
}

const ProgressTimeline = ({ orderId, orderNumber, currentStatus, onDelivered, order }: Props) => {
    const steps = [
        { label: "Pending", status: "PND" },
        { label: "Sent to dispatch", status: "DIS" },
        { label: "Dispatch to client", status: "DSC" },
        { label: "Delivered", status: "DEL" },
    ];

    const {
        state: isAddDeliveryNoteModalOpen,
        setTrue: openAddDeliveryNoteModal,
        setFalse: closeAddDeliveryNoteModal,
    } = useBooleanStateControl();

    const { mutate: updateStatus, isPending } = useUpdateDeliveryStatus(orderId);

    const currentStep = steps.findIndex(step => step.status === currentStatus);

    useEffect(() => {
        if (currentStatus === "DEL" && onDelivered) {
            onDelivered();
        }
    }, [currentStatus, onDelivered]);

    const handleStatusUpdate = (status: "PND" | "DIS" | "DSC" | "DEL" | "CAN") => {
        updateStatus({ id: orderId, status });
    };

    const isDelivered = currentStatus === "DEL";
    const isCancelled = currentStatus === "CAN";

    return (
        <div className="bg-[#194A7A] text-white w-full max-w-[800px] pb-6 rounded-xl space-y-6">
            <div className="relative w-full h-2 bg-[#FFC6004D] rounded-full overflow-hidden">
                <div
                    className={cn(
                        "absolute left-0 h-full rounded-full transition-all duration-500 ease-in-out",
                        isDelivered ? "bg-green-500" : isCancelled ? "bg-red-500" : "bg-[#FFC600]"
                    )}
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                >
                </div>
            </div>
            <h2 className="text-2xl font-semibold text-center my-6">{orderNumber}</h2>
            <div className="relative">
                <div className="absolute top-2 left-[8.33%] h-0.5 bg-gray-300 w-5/6"></div>
                <div className="relative flex justify-between">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center w-1/4">
                            <div
                                className={cn(
                                    "relative z-10 flex items-center justify-center w-4 h-4 rounded-full mb-2 bg-white transition-all duration-[2s]",
                                    index === currentStep && "scale-125 [box-shadow:0px_0px_0px_4px_#ffffff7c]",
                                    index === currentStep && !isDelivered && "animate-pulse"
                                )}
                            >
                                {index === currentStep && isDelivered && <Check className="w-3 h-3 text-green-500" />}
                                {index === currentStep && isCancelled && <X className="w-3 h-3 text-red-500" />}
                                {(index !== currentStep || (!isDelivered && !isCancelled)) && (
                                    <span className='h-2 w-2 bg-black rounded-full' />
                                )}
                            </div>
                            <div className="text-center">
                                <div className="text-sm font-medium">{step.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center space-x-4 flex-wrap">
                {steps.map((step) => (
                    <Button
                        key={step.status}
                        className={cn(
                            "px-4 py-1.5 text-sm rounded transition-all duration-[2s]",
                            currentStatus === step.status
                                ? "bg-black text-white scale-105"
                                : "border-white border bg-transparent text-white"
                        )}
                        onClick={() => handleStatusUpdate(step.status as any)}
                        disabled={currentStatus === step.status}
                    >
                        {step.label}
                    </Button>
                ))}
                {
                    order?.delivery.status === "DEL" &&
                    <Button
                        className={cn("px-4 py-1.5 text-sm rounded transition-all duration-[2s]")}
                        onClick={openAddDeliveryNoteModal}
                        disabled={isCancelled}
                        variant="yellow"
                    >
                        Enter Feedback
                    </Button>
                }
            </div>

            <AddDeliveryNoteModal
                isModalOpen={isAddDeliveryNoteModalOpen}
                closeModal={closeAddDeliveryNoteModal}
            />
        </div>
    );
};

export default ProgressTimeline;


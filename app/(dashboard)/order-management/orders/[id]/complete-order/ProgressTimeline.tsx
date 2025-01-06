import { cn } from '@/lib/utils';
import React from 'react';
import { useBooleanStateControl } from '@/hooks';
import { AddDeliveryNoteModal } from '../../misc/components';
interface Props {
    orderNumber: string,
    currentStep: number
}
const ProgressTimeline = ({ orderNumber, currentStep }: Props) => {
    const steps = [
        { label: "Order has been shipped", subtext: "PICK UP AT THE OFFICE" },
        { label: "Out for Delivery", subtext: "" },
        { label: "Delivered", subtext: "NO. 8, ADENIRAN CLOSE, LEKKI PHASE 1" }
    ];
    const {
        state: isAddDeliveryNoteModalOpen,
        setTrue: openAddDeliveryNoteModal,
        setFalse: closeAddDeliveryNoteModal,
    } = useBooleanStateControl()



    return (
        <div className="bg-[#194A7A] text-white w-full max-w-[800px] pb-6 rounded-xl space-y-6">
            <div className="relative w-full h-2 bg-[#FFC6004D] rounded-full overflow-hidden">
                <div
                    className="absolute left-0 h-full bg-[#FFC600] rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                >
                </div>
            </div>
            <h2 className="text-2xl font-semibold text-center my-6">{orderNumber}</h2>
            <div className="relative">
                <div className="absolute top-2 left-[16.67%] h-0.5 bg-gray-300 w-2/3"></div>
                <div className="relative flex justify-between">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center w-1/3">
                            <div
                                className={cn("relative z-10 flex items-center justify-center w-4 h-4 rounded-full mb-2 bg-white",
                                    index === currentStep && "[box-shadow:0px_0px_0px_4px_#ffffff7c;]"

                                )}
                            >
                                <span className='h-2 w-2 bg-black rounded-full' />

                            </div>
                            <div className="text-center">
                                <div className="text-sm font-medium">{step.label}</div>
                                {step.subtext && <div className="text-xs text-gray-300">{step.subtext}</div>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center space-x-4">
                <button className="px-6 py-1.5 border-white border bg-transparent text-white text-sm rounded">Shipped</button>
                <button className="px-6 py-1.5 bg-black text-white text-sm rounded" onClick={openAddDeliveryNoteModal}>Delivered</button>
            </div>


            <AddDeliveryNoteModal
                isModalOpen={isAddDeliveryNoteModalOpen}
                closeModal={closeAddDeliveryNoteModal}
            />
        </div>
    );
};

export default ProgressTimeline;
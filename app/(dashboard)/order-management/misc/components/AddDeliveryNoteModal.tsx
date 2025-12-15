import { Dialog, DialogContent, DialogDescription, DialogFooter, Button, Textarea, SuccessModal, DialogTitle, DialogHeader } from '@/components/ui'
import { useBooleanStateControl } from '@/hooks'
import React from 'react'
import { useAddFeedback } from '../api/postAddOrderFeedback'
import toast from 'react-hot-toast'
import { SmallSpinner } from '@/icons/core'

interface ModalProps {
    isModalOpen: boolean
    closeModal: () => void
    orderId: number,
    orderNumber?: string
}
const AddDeliveryNoteModal: React.FC<ModalProps> = ({ isModalOpen, closeModal, orderId, orderNumber }) => {
    const [feedback, setFeedback] = React.useState<string>('')
    const {
        state: isSuccessModalOpen,
        setTrue: openSuccessModal,
        setFalse: closeSuccessModal,
    } = useBooleanStateControl()
    const { mutate: addFeedback, isPending } = useAddFeedback()
    const handleAddFeedback = () => {
        if (feedback.trim() === '') {
            toast.error('Please enter feedback before completing the delivery');
            return;
        }
        addFeedback({ id: orderId, data: { feedback } }, {
            onSuccess: () => {
                toast.success('Client feedback submitted successfully');
                openSuccessModal()
                setFeedback('')
                closeModal()
            }
        })
    }


    return (
        <>

            <Dialog open={isModalOpen} >
                <DialogContent onPointerDownOutside={closeModal} className="max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>
                            Client&apos;s Feedback
                        </DialogTitle>
                    </DialogHeader>
                    <div className="p-3">
                        <Textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Enter client feedback"
                            className="w-full rounded-md"
                            rows={7}
                        />
                        <DialogFooter className='flex mt-4'>
                            <Button className="ml-auto" size="thin" onClick={handleAddFeedback}>
                                Complete Delivery
                                {
                                    isPending && <SmallSpinner />
                                }
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

            <SuccessModal isModalOpen={isSuccessModalOpen} closeModal={closeSuccessModal} headingClass="text-xl" heading={`The Order ${orderNumber} has been successfully completed`} />
        </>
    )
}

export default AddDeliveryNoteModal
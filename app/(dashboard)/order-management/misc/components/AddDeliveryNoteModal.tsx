import { Dialog, DialogContent, DialogDescription, DialogFooter, Button, Textarea, SuccessModal, DialogTitle, DialogHeader } from '@/components/ui'
import { useBooleanStateControl } from '@/hooks'
import React from 'react'

interface ModalProps {
    isModalOpen: boolean
    closeModal: () => void
    orderId: number

}
const AddDeliveryNoteModal: React.FC<ModalProps> = ({ isModalOpen, closeModal, }) => {
    const {
        state: isSuccessModalOpen,
        setTrue: openSuccessModal,
        setFalse: closeSuccessModal,
    } = useBooleanStateControl()
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
                            placeholder="Enter client feedback"
                            className="w-full rounded-md"
                            rows={7}
                        />
                        <DialogFooter className='flex mt-4'>
                            <Button className="ml-auto" size="thin" onClick={() => { openSuccessModal(); closeModal() }}>
                                Complete Delivery
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

            <SuccessModal isModalOpen={isSuccessModalOpen} closeModal={closeSuccessModal} headingClass="text-xl" heading="Order complete" subheading="order has been completely delivered" />
        </>
    )
}

export default AddDeliveryNoteModal
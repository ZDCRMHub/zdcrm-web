import { Dialog, DialogContent, DialogDescription, DialogFooter, Button, Textarea, SuccessModal } from '@/components/ui'
import { useBooleanStateControl } from '@/hooks'
import React from 'react'

interface ModalProps {
    isModalOpen: boolean
    closeModal: () => void

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
                <DialogContent onPointerDownOutside={closeModal}>


                    <Textarea
                        placeholder="Enter client feedback"
                        className="w-full rounded-md"
                        rows={7}
                    />
                    <DialogFooter className='flex'>
                        <Button className="ml-auto" size="thin" onClick={() => { openSuccessModal(); closeModal() }}>
                            Complete Delivery
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <SuccessModal isModalOpen={isSuccessModalOpen} closeModal={closeSuccessModal} headingClass="text-xl" heading="Order complete" subheading="order has been completely delivered" />
        </>
    )
}

export default AddDeliveryNoteModal
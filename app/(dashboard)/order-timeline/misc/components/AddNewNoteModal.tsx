import { Dialog, DialogContent, DialogDescription, DialogFooter, Button, Textarea } from '@/components/ui'
import React from 'react'

interface ModalProps {
    isModalOpen: boolean
    closeModal: () => void
    setModalOpen: (value: boolean) => void

}
const AddNewNoteModal: React.FC<ModalProps> = ({ isModalOpen, closeModal, setModalOpen }) => {
    return (
        <Dialog open={isModalOpen} >
            <DialogContent onPointerDownOutside={closeModal}>


                <Textarea
                    placeholder="Leave note"
                    className="w-full rounded-md"
                    rows={7}
                />
                <DialogFooter className='flex'> 
                    <Button className="ml-auto" size="thin" onClick={closeModal}>
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default AddNewNoteModal
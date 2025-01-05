import { Dialog, DialogContent, DialogDescription, DialogFooter, Button, Textarea, DialogHeader, Spinner } from '@/components/ui'
import React from 'react'
import { useAddNoteToDiscussion } from '../api'
import toast from 'react-hot-toast'

interface ModalProps {
    isModalOpen: boolean
    closeModal: () => void
    setModalOpen: (value: boolean) => void
    enquiry_id: number

}
const AddNewNoteModal: React.FC<ModalProps> = ({ isModalOpen, closeModal, enquiry_id, setModalOpen }) => {
    const [newNote, setNewNote] = React.useState('')
    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewNote(e.target.value)
    }
    const { mutate, isPending } = useAddNoteToDiscussion({ id: enquiry_id })
    const handleSubmit = () => {
        if (!newNote) return;
        if (newNote.length < 10) {
            toast.error('Note should be atleast 10 characters long')
        }
        mutate({ id: enquiry_id, message: newNote }, {
            onSuccess: () => {
                closeModal()
            }
        })
    }

    return (
        <Dialog open={isModalOpen} >
            <DialogContent onPointerDownOutside={closeModal} className="!p-0 !rounded-2xl max-w-[500px]">
                <DialogHeader>
                    Add New Note
                </DialogHeader>
                <div className='flex flex-col gap-5 p-5'>
                    <Textarea
                        placeholder="Leave note"
                        className="w-full rounded-md"
                        rows={7}
                        value={newNote}
                        onChange={handleNoteChange}
                    />
                    <DialogFooter className='flex'>
                        <Button className="ml-auto" size="thin" onClick={handleSubmit} disabled={isPending}>
                            Submit
                            {
                                isPending && <Spinner className="ml-2 h-4 w-4" />
                            }
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default AddNewNoteModal
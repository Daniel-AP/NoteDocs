import { Modal, SaveAction, useModalStore } from "../stores/modalStore"

export const useConfirmSave = () => {

    const toggleModal = useModalStore(s => s.toggleModal)
    const setResolveSaveAction = useModalStore(s => s.setResolveSaveAction)
    
    const confirmSave = (): Promise<SaveAction> => {
        toggleModal(Modal.SAVE)
        return new Promise(resolve => {
            setResolveSaveAction(resolve)
        })
    }

    return { confirmSave }

}
import { memo } from "react"
import { Button, Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { useEditorStore } from "../stores/editorStore"
import { Modal, SaveAction, useModalStore } from "../stores/modalStore"

export const SaveModal = memo(() => {

    const editor = useEditorStore(s => s.editor)
    const { modalOpen, toggleModal, resolveSaveAction } = useModalStore()

    const handleTransitionEnd = () => {

        if(!modalOpen[Modal.SAVE]) setTimeout(() => editor?.commands.focus())

    }

    const handleAction = (action: SaveAction) => {

        toggleModal(Modal.SAVE)
        resolveSaveAction(action)

    }

    return (
        <Dialog
            open={modalOpen[Modal.SAVE]}
            transition
            onClose={() => handleAction(SaveAction.CANCEL)}
            onTransitionEnd={handleTransitionEnd}
            className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 py-12 transition duration-300 ease-out data-[closed]:opacity-0"
        >
            <DialogPanel className="border rounded-xl bg-white relative overflow-hidden p-8 mx-10">
                <DialogTitle className="font-bold text-2xl">¿Guardar cambios?</DialogTitle>
                <Description className="mt-5 mb-8">
                    Tienes cambios sin guardar en este archivo. ¿Deseas guardarlos antes de cerrarlo?
                </Description>
                <div className="flex gap-3">
                    <Button
                        onClick={() => handleAction(SaveAction.SAVE)}
                        className="flex-grow p-2 rounded bg-blue-200 hover:bg-blue-300 active:bg-blue-400"
                    >
                        Guardar
                    </Button>
                    <Button
                        onClick={() => handleAction(SaveAction.NO_SAVE)}
                        className="flex-grow p-2 rounded border hover:bg-gray-100 active:bg-gray-200"
                    >
                        No guardar
                    </Button>
                    <Button
                        onClick={() => handleAction(SaveAction.CANCEL)}
                        className="flex-grow p-2 rounded border hover:bg-gray-100 active:bg-gray-200"
                    >
                        Cancelar
                    </Button>
                </div>
            </DialogPanel>
        </Dialog>
    )

})
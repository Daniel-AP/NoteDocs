import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { memo } from "react"
import { useEditorStore } from "../stores/editorStore"
import { Modal, useModalStore } from "../stores/modalStore"
import { Kbd } from "../components/Kbd"
import { CloseIcon } from "../icons/CloseIcon"
import shortcuts from "../shortcuts.json"

export const ShortcutsModal = memo(() => {

    const editor = useEditorStore(s => s.editor)
    const { modalOpen, toggleModal } = useModalStore()

    const handleTransitionEnd = () => {

        if(!modalOpen[Modal.SHORTCUTS]) setTimeout(() => editor?.commands.focus())

    }

    return (
        <Dialog
            open={modalOpen[Modal.SHORTCUTS]}
            onClose={() => toggleModal(Modal.SHORTCUTS)}
            onTransitionEnd={handleTransitionEnd}
            transition
            className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 py-12 transition duration-300 ease-out data-[closed]:opacity-0"
        >
            <DialogPanel className="h-full w-[95%] sm:w-[90%] md:w-[80%] lg:w-[50rem] border rounded-xl bg-white relative overflow-hidden py-4">
                <Button
                    title="Cerrar"
                    onClick={() => toggleModal(Modal.SHORTCUTS)}
                    className="absolute flex items-center justify-center right-3 top-3 p-2 rounded-md bg-white hover:bg-blue-50 active:bg-blue-100"
                >
                    <CloseIcon size={20}/>
                </Button>
                <div className="h-full overflow-y-auto p-12 pt-10 pe-14">
                    <DialogTitle className="font-bold text-3xl">Atajos de teclado</DialogTitle>
                    {
                        shortcuts.map(s => (
                            <section tabIndex={0} key={s.name}>
                                <h2 className="font-bold text-lg mt-12 mb-5">{ s.name }</h2>
                                <table>
                                    <tbody>
                                        {
                                            s.shortcuts.map(t => (
                                                <tr key={t.action} tabIndex={0} className="transition duration-200 hover:bg-blue-50">
                                                    <td>{ t.action }</td>
                                                    <td>
                                                        <Kbd keyComb={t.keys} />
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </section>
                        ))
                    }
                </div>
            </DialogPanel>
        </Dialog>
    )

})
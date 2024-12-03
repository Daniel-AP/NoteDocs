import { Button } from "@headlessui/react"
import { useEditorStore } from "../stores/editorStore"
import { Modal, useModalStore } from "../stores/modalStore"
import { ShortcutsIcon } from "../icons/ShortcutsIcon"

export const Footer = () => {
    
    const { charCount, wordCount } = useEditorStore()
    const toggleModal = useModalStore(s => s.toggleModal)

    return (
        <footer className="flex py-2 px-4 bg-blue-50 text-sm justify-between">
            <div className="flex">
                <p>{ charCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") } caracter(es)</p>
                <div className="w-[1px] bg-slate-300 h-full mx-4"></div>
                <p>{ wordCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") } palabra(s)</p>
            </div>
            <Button
                title="Atajos de teclado"
                onClick={() => toggleModal(Modal.SHORTCUTS)}
                className="px-1 hover:bg-blue-100 active:bg-blue-200 rounded"
            >
                <ShortcutsIcon size={20} />
            </Button>
        </footer>
    )

}
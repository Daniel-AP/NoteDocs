import { create } from "zustand"

export enum SaveAction {
    SAVE="SAVE",
    NO_SAVE="NO_SAVE",
    CANCEL="CANCEL"
}

export enum Modal {
    SAVE="SAVE",
    SHORTCUTS="SHORTCUTS"
}

type Store = {
    isAnyModalOpen: boolean
    modalOpen: Record<Modal, boolean>
    toggleModal: (modalName: Modal) => void,
    resolveSaveAction: (value: SaveAction) => void
    setResolveSaveAction: (res: (value: SaveAction) => void) => void
}

export const useModalStore = create<Store>()((set) => ({
    isAnyModalOpen: false,
    modalOpen: {
        SAVE: false,
        SHORTCUTS: false
    },
    toggleModal: (modalName) => set(s => {
        if(s.isAnyModalOpen && !s.modalOpen[modalName]) return s
        return {
            modalOpen: { ...s.modalOpen, [modalName]: !s.modalOpen[modalName] },
            isAnyModalOpen: !s.modalOpen[modalName]
        }
    }),
    resolveSaveAction: () => {},
    setResolveSaveAction: (res) => set(() => ({ resolveSaveAction: res }))
}))
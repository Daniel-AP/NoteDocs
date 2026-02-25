import { useMemo } from "react"
import { useAppStore } from "../stores/appStore"
import { Modal, useModalStore } from "../stores/modalStore"
import { useActions } from "./useActions"
import { useShortcut } from "./useShortcut"

type Combo = string[]
type Binding = { combo: Combo; run: () => void }

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(n, max))

export const useAppShortcuts = () => {

    const selectedTab = useAppStore(s => s.selectedTab)
    const tabTitle = useAppStore(s => s.tabTitle)
    const setSelectedTab = useAppStore(s => s.setSelectedTab)
    const toggleModal = useModalStore(s => s.toggleModal)

    const { handleSaveFile, handleOpenFiles, handleAddTab, handleDelTab } = useActions()

    const maxIndex = Math.max(0, tabTitle.length-1)

    const bindings: Binding[] = useMemo(() => {
        
        const goToTab = (index: number) => () => setSelectedTab(clamp(index, 0, maxIndex))

        return [
        // file
        { combo: ["Control", "S"], run: () => handleSaveFile(selectedTab) },
        { combo: ["Control", "O"], run: () => handleOpenFiles() },

        // navigation
        { combo: ["Control", "K"], run: () => toggleModal(Modal.SHORTCUTS) },
        { combo: ["Control", "Tab"], run: () => setSelectedTab(clamp(selectedTab + 1, 0, maxIndex)) },
        { combo: ["Control", "Shift", "Tab"], run: () => setSelectedTab(clamp(selectedTab-1, 0, maxIndex)) },
        { combo: ["Control", "T"], run: () => handleAddTab() },
        { combo: ["Control", "W"], run: () => handleDelTab(selectedTab) },

        // Ctrl + 1..9
        { combo: ["Control", "1"], run: goToTab(0) },
        { combo: ["Control", "2"], run: goToTab(1) },
        { combo: ["Control", "3"], run: goToTab(2) },
        { combo: ["Control", "4"], run: goToTab(3) },
        { combo: ["Control", "5"], run: goToTab(4) },
        { combo: ["Control", "6"], run: goToTab(5) },
        { combo: ["Control", "7"], run: goToTab(6) },
        { combo: ["Control", "8"], run: goToTab(7) },
        { combo: ["Control", "9"], run: goToTab(8) },
        ]
    }, [
        selectedTab,
        maxIndex,
        setSelectedTab,
        toggleModal,
        handleSaveFile,
        handleOpenFiles,
        handleAddTab,
        handleDelTab,
    ])

    bindings.forEach(b => useShortcut(b.combo as string[], b.run))

}
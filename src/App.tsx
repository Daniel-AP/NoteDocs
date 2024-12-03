import { useEffect } from "react"
import { useAppStore } from "./stores/appStore"
import { Modal, useModalStore } from "./stores/modalStore"
import { useAppLifeCycle } from "./hooks/useAppLifeCycle"
import { useShortcut } from "./hooks/useShortcut"
import { useActions } from "./hooks/useActions"
import { Header } from "./components/Header"
import { Editor } from "./components/Editor"
import { Footer } from "./components/Footer"
import { SaveModal } from "./modals/SaveModal"
import { ShortcutsModal } from "./modals/ShortcutsModal"

export const App = () => {

    const isAppStateLoaded = useAppStore(s => s.isAppStateLoaded)
    const selectedTab = useAppStore(s => s.selectedTab)
    const tabTitle = useAppStore(s => s.tabTitle)
    const setSelectedTab = useAppStore(s => s.setSelectedTab)
    const toggleModal = useModalStore(s => s.toggleModal)

    const {
        handleQuitApp,
        handleStateLoaded
    } = useAppLifeCycle()

    const {
        handleSaveFile,
        handleOpenFiles,
        handleAddTab,
        handleDelTab
    } = useActions()
    
    // file shortcuts
    useShortcut(["Control", "S"], () => handleSaveFile(selectedTab))
    useShortcut(["Control", "O"], () => handleOpenFiles())

    // navigation shortcuts
    useShortcut(["Control", "K"], () => toggleModal(Modal.SHORTCUTS))
    useShortcut(["Control", "Tab"], () => setSelectedTab(Math.min(selectedTab+1, tabTitle.length-1)))
    useShortcut(["Control", "Shift", "Tab"], () => setSelectedTab(Math.max(selectedTab-1, 0)))
    useShortcut(["Control", "T"], () => handleAddTab())
    useShortcut(["Control", "W"], () => handleDelTab(selectedTab))

    useShortcut(["Control", "1"], () => setSelectedTab(Math.min(0, tabTitle.length-1)))
    useShortcut(["Control", "2"], () => setSelectedTab(Math.min(1, tabTitle.length-1)))
    useShortcut(["Control", "3"], () => setSelectedTab(Math.min(2, tabTitle.length-1)))
    useShortcut(["Control", "4"], () => setSelectedTab(Math.min(3, tabTitle.length-1)))
    useShortcut(["Control", "5"], () => setSelectedTab(Math.min(4, tabTitle.length-1)))
    useShortcut(["Control", "6"], () => setSelectedTab(Math.min(5, tabTitle.length-1)))
    useShortcut(["Control", "7"], () => setSelectedTab(Math.min(6, tabTitle.length-1)))
    useShortcut(["Control", "8"], () => setSelectedTab(Math.min(7, tabTitle.length-1)))
    useShortcut(["Control", "9"], () => setSelectedTab(Math.min(8, tabTitle.length-1)))

    useEffect(() => {

        window.appBridge.onAppStateLoaded(handleStateLoaded)
        window.appBridge.onOpenExtNotes(handleOpenFiles)
        window.appBridge.onBeforeQuit(handleQuitApp)

    }, [])

    if(!isAppStateLoaded) return <></>

    return (
        <div className="flex flex-col h-full">
            <Header />
            <div className="h-[1.5px] w-full bg-[#e5e7eb]"></div>
            <main className="flex flex-grow overflow-auto">
                <Editor />
            </main>
            <div className="h-[1.5px] w-full bg-[#e5e7eb]"></div>
            <Footer />
            <SaveModal />
            <ShortcutsModal />
        </div>
    )

}
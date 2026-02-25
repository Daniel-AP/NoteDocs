import { useEffect } from "react"
import { useAppStore } from "./stores/appStore"
import { useAppLifeCycle } from "./hooks/useAppLifeCycle"
import { useActions } from "./hooks/useActions"
import { Header } from "./components/Header"
import { Editor } from "./components/Editor"
import { Footer } from "./components/Footer"
import { SaveModal } from "./modals/SaveModal"
import { ShortcutsModal } from "./modals/ShortcutsModal"
import { useAppShortcuts } from "./hooks/useAppShortcuts"

export const App = () => {

    const isAppStateLoaded = useAppStore(s => s.isAppStateLoaded)

    const { handleQuitApp, handleStateLoaded } = useAppLifeCycle()
    const { handleOpenFiles } = useActions()

    useAppShortcuts()

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
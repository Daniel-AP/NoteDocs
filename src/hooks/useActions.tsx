import { extensions } from "../components/Editor"
import { isJSONContent } from "../helpers/isJSONContent"
import { defaultTabData, defaultTabTitle, useAppStore } from "../stores/appStore"
import { SaveAction, useModalStore } from "../stores/modalStore"
import { useConfirmSave } from "./useConfirmSave"

export const useActions = () => {

    const selectedTab = useAppStore(s => s.selectedTab)
    const unsavedChanges = useAppStore(s => s.unsavedChanges)
    const tabTitle = useAppStore(s => s.tabTitle)
    const setSelectedTab = useAppStore(s => s.setSelectedTab)
    const setPathTab = useAppStore(s => s.setPathTab)
    const addTab = useAppStore(s => s.addTab)
    const delTab = useAppStore(s => s.delTab)
    const delUnsavedChanges = useAppStore(s => s.delUnsavedChanges)
    const setTabTitle = useAppStore(s => s.setTabTitle)
    const setLastSavedContent = useAppStore(s => s.setLastSavedContent)

    const isAnyModalOpen = useModalStore(s => s.isAnyModalOpen)

    const { confirmSave } = useConfirmSave()

    const handleAddTab = () => {

        if(isAnyModalOpen) return
        
        addTab(defaultTabTitle, { ...defaultTabData })

    }

    const handleDelTab = async(index: number) => {

        if(isAnyModalOpen) return

        if(unsavedChanges.has(index)) {

            const saveAction = await confirmSave()

            if(saveAction === SaveAction.CANCEL) return
            if(saveAction === SaveAction.SAVE) await handleSaveFile(index)
            
        }

        delTab(index)
        
        if(tabTitle.length-1 === 0) return window.appBridge.quitApp()
        if(selectedTab >= index) setSelectedTab((selectedTab || 1)-1)

        
    }

    const handleSaveFile = async(index: number) => {

        if(isAnyModalOpen) return
        if(!unsavedChanges.has(index)) return

        const { content, path:filePath } = useAppStore.getState().tabData[index]
        
        const { path, name } = await window.appBridge.saveNote({
            name: tabTitle[index],
            content: content,
            path: filePath
        })

        if(!path) return

        delUnsavedChanges(index)
        setPathTab(index, path)
        setTabTitle(index, name)
        setLastSavedContent(index, content)

    }

    const handleOpenFiles = async(paths?: string[]) => {

        const tabData = useAppStore.getState().tabData

        const alreadyLoadedPaths = new Set(tabData.map(d => d.path))
        const filteredPaths = paths?.filter(p => !alreadyLoadedPaths.has(p))

        const notes = await window.appBridge.openNotes(filteredPaths)

        notes.forEach(note => {

            if(alreadyLoadedPaths.has(note.path)) return
            if(!isJSONContent(note.content, extensions)) return

            setLastSavedContent(tabTitle.length, note.content)
            addTab(note.name, {
                content: note.content,
                cursorPos: 1,
                path: note.path
            })

        })

    }

    return {
        handleAddTab,
        handleDelTab,
        handleSaveFile,
        handleOpenFiles
    }

}
import { JSONContent } from "@tiptap/react"
import { TabData, useAppStore } from "../stores/appStore"
import { AppState } from "../types"
import { isJSONContent } from "../helpers/isJSONContent"
import { extensions } from "../components/Editor"

export const useAppLifeCycle = () => {

    const setIsAppStateLoaded = useAppStore(s => s.setIsAppStateLoaded)
    const setSelectedTab = useAppStore(s => s.setSelectedTab)
    const loadTitles = useAppStore(s => s.loadTitles)
    const loadTabData = useAppStore(s => s.loadTabData)
    const loadLastSaved = useAppStore(s => s.loadLastSaved)
    const loadUnsavedChanges = useAppStore(s => s.loadUnsavedChanges)

    const handleQuitApp = async() => {

        const {
            selectedTab,
            unsavedChanges,
            tabTitle,
            tabData,
            lastSavedContent
        } = useAppStore.getState()

        const numberOfTabs = tabTitle.length
        const state: AppState = {
            selectedTab,
            tabs: []
        }

        for (let i = 0; i < numberOfTabs; i++) {
            
            state.tabs.push({
                title: tabTitle[i],
                ...tabData[i],
                lastSaved: lastSavedContent[i],
                hasUnsavedChanges: unsavedChanges.has(i)
            })

        }

        await window.appBridge.saveAppState(state)

    }

    const handleStateLoaded = (state: AppState) => {

        if(!state.tabs.length) return setIsAppStateLoaded(true)

        const titles: string[] = []
        const tabData: TabData[] = []
        const lastSavedContent: JSONContent[] = []
        const unsavedChanges: Set<number> = new Set<number>()

        let selectedTab = state.selectedTab

        state.tabs.forEach((tab, i) => {

            const {
                title,
                content,
                cursorPos,
                path,
                lastSaved,
                hasUnsavedChanges
            } = tab

            try {

                if(!isJSONContent(content, extensions) && !!content.content?.length) {
                    if(selectedTab >= i) selectedTab -= 1
                    return
                }

            } catch (error) {
                return
            }
            
            titles.push(title)
            tabData.push({
                content,
                cursorPos,
                path
            })
            lastSavedContent.push(lastSaved)
            
            if(hasUnsavedChanges) unsavedChanges.add(i)
            
        })

        loadTitles(titles)
        loadTabData(tabData)
        loadLastSaved(lastSavedContent)
        loadUnsavedChanges(unsavedChanges)

        setSelectedTab(selectedTab)
        setIsAppStateLoaded(true)

    }

    return {
        handleQuitApp,
        handleStateLoaded
    }

}
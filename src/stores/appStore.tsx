import { JSONContent } from "@tiptap/react"
import { create } from "zustand"

export type TabData = {
    content: JSONContent,
    cursorPos: number,
    path: string
}

type Store = {
    isAppStateLoaded: boolean,
    setIsAppStateLoaded: (val: boolean) => void,
    selectedTab: number,
    setSelectedTab: (index: number) => void,
    showScrollArrows: boolean,
    toggleScrollArrows: () => void,
    tabTitle: string[],
    setTabTitle: (index: number, title: string) => void,
    tabData: TabData[],
    addTab: (title: string, data: TabData) => void,
    delTab: (index: number) => void
    setContentTab: (index: number, content: JSONContent) => void,
    setCursorPosTab: (index: number, pos: number) => void,
    setPathTab: (index: number, path: string) => void,
    unsavedChanges: Set<number>,
    addUnsavedChanges: () => void,
    delUnsavedChanges: (index: number) => void,
    tabs: (HTMLElement | null)[],
    lastSavedContent: JSONContent[],
    setLastSavedContent: (index: number, content: JSONContent) => void,
    loadTitles: (titles: string[]) => void,
    loadTabData: (data: TabData[]) => void,
    loadLastSaved: (lastSaved: JSONContent[]) => void,
    loadUnsavedChanges: (changes: Set<number>) => void
}

export const defaultTabTitle = "Sin título"
export const defaultTabData = {
    content: { type: "doc", content: [] },
    cursorPos: 1,
    path: ""
}

export const useAppStore = create<Store>()((set) => ({
    isAppStateLoaded: false,
    setIsAppStateLoaded: (val) => set(() => ({ isAppStateLoaded: val })),
    selectedTab: 0,
    setSelectedTab: (index) => set(() => ({ selectedTab: index })),
    showScrollArrows: false,
    toggleScrollArrows: () => set(s => ({ showScrollArrows: !s.showScrollArrows })),
    tabTitle: [defaultTabTitle],
    setTabTitle: (index, title) => set(s => {
        const tabTitle = [...s.tabTitle]
        tabTitle[index] = title
        return { tabTitle }
    }),
    tabData: [{ ...defaultTabData }],
    addTab: (title, data) => set(s => ({
        tabTitle: [...s.tabTitle, title],
        tabData: [...s.tabData, data],
        selectedTab: s.tabTitle.length,
    })),
    delTab: (index) => set(s => ({
        tabTitle: s.tabTitle.filter((_, i) => i !== index),
        tabData: s.tabData.filter((_, i) => i !== index),
        tabs: s.tabs.filter((_, i) => i !== index),
        lastSavedContent: s.lastSavedContent.filter((_, i) => i !== index),
        unsavedChanges: new Set([...s.unsavedChanges].filter(i => i !== index).map(i => i > index ? i - 1 : i))
    })),
    setContentTab: (index, content) => set(s => {
        const tabData = [...s.tabData]
        tabData[index].content = content
        return { tabData }
    }),
    setCursorPosTab: (index, pos) => set(s => {
        const tabData = [...s.tabData]
        tabData[index].cursorPos = pos
        return { tabData }
    }),
    setPathTab: (index, path) => set(s => {
        const tabData = [...s.tabData]
        tabData[index].path = path
        return { tabData }
    }),
    unsavedChanges: new Set(),
    addUnsavedChanges: () => set(s => ({ unsavedChanges: new Set([...s.unsavedChanges, s.selectedTab]) })),
    delUnsavedChanges: (index) => set(s => ({ unsavedChanges: new Set([...s.unsavedChanges].filter(v => v !== index)) })),
    tabs: [],
    lastSavedContent: [],
    setLastSavedContent: (index, content) => set(s => {
        const lastSavedContent = [...s.lastSavedContent]
        lastSavedContent[index] = content
        return { lastSavedContent }
    }),
    loadTitles: (titles) => set(() => ({ tabTitle: titles })),
    loadTabData: (data) => set(() => ({ tabData: data })),
    loadLastSaved: (lastSaved) => set(() => ({ lastSavedContent: lastSaved })),
    loadUnsavedChanges: (changes) => set(() => ({ unsavedChanges: changes }))
}))